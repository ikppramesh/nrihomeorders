import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { prisma, MessageDirection, MessageStatus, ConversationAgentState } from '@nri/database';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);
  private readonly phoneNumberId: string;
  private readonly accessToken: string;
  private readonly apiVersion: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
    @InjectQueue('whatsapp-outbound') private readonly queue: Queue,
  ) {
    this.phoneNumberId = config.get('WHATSAPP_PHONE_NUMBER_ID', '');
    this.accessToken   = config.get('WHATSAPP_ACCESS_TOKEN', '');
    this.apiVersion    = config.get('WHATSAPP_API_VERSION', 'v21.0');
  }

  private get url() {
    return `https://graph.facebook.com/${this.apiVersion}/${this.phoneNumberId}/messages`;
  }

  async queueText(to: string, text: string, orderId?: string) {
    return this.queue.add('send-text', { to, text, orderId });
  }

  async queueTemplate(to: string, name: string, components: any[] = [], orderId?: string) {
    return this.queue.add('send-template', { to, name, components, orderId });
  }

  async queueInteractive(to: string, payload: any, orderId?: string) {
    return this.queue.add('send-interactive', { to, payload, orderId });
  }

  async queueDocument(to: string, link: string, caption: string, filename: string, orderId?: string) {
    return this.queue.add('send-document', { to, link, caption, filename, orderId });
  }

  async sendRaw(payload: any): Promise<string | null> {
    try {
      const res = await firstValueFrom(
        this.http.post(this.url, payload, {
          headers: { Authorization: `Bearer ${this.accessToken}`, 'Content-Type': 'application/json' },
        }),
      );
      return res.data?.messages?.[0]?.id ?? null;
    } catch (err: any) {
      this.logger.error(`Meta API: ${err.response?.data?.error?.message}`);
      throw err;
    }
  }

  async processWebhook(payload: any) {
    if (payload.object !== 'whatsapp_business_account') return;
    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.field !== 'messages') continue;
        for (const msg of change.value.messages ?? [])
          await this.handleInbound(msg, change.value.contacts?.[0]);
        for (const st of change.value.statuses ?? [])
          await this.handleStatus(st);
      }
    }
  }

  private async handleInbound(msg: any, contact?: any) {
    const phone = msg.from;
    let conv = await prisma.whatsappConversation.findFirst({ where: { customerPhone: phone, isActive: true } });
    if (!conv) {
      const customer = await prisma.customer.findFirst({ where: { whatsappPhone: phone } });
      conv = await prisma.whatsappConversation.create({
        data: { customerPhone: phone, customerName: contact?.profile?.name, customerId: customer?.id, agentState: ConversationAgentState.BOT },
      });
    }
    await prisma.whatsappMessage.create({
      data: {
        conversationId: conv.id,
        wamid: msg.id,
        direction: MessageDirection.INBOUND,
        messageType: msg.type,
        content: this.extractText(msg),
        rawPayload: msg,
        receivedAt: new Date(parseInt(msg.timestamp, 10) * 1000),
        status: MessageStatus.DELIVERED,
      },
    });
    await this.markRead(msg.id);
  }

  private async handleStatus(st: any) {
    const map: Record<string, MessageStatus> = {
      sent: MessageStatus.SENT, delivered: MessageStatus.DELIVERED,
      read: MessageStatus.READ, failed: MessageStatus.FAILED,
    };
    await prisma.whatsappMessage.updateMany({
      where: { wamid: st.id },
      data: { status: map[st.status] ?? MessageStatus.SENT, statusUpdatedAt: new Date(), failureReason: st.errors?.[0]?.title },
    });
  }

  private async markRead(id: string) {
    try {
      await firstValueFrom(this.http.post(this.url, { messaging_product: 'whatsapp', status: 'read', message_id: id }, { headers: { Authorization: `Bearer ${this.accessToken}` } }));
    } catch { /* non-critical */ }
  }

  private extractText(m: any): string {
    if (m.type === 'text') return m.text?.body ?? '';
    if (m.type === 'interactive') return m.interactive?.button_reply?.title ?? m.interactive?.list_reply?.title ?? '';
    return `[${m.type}]`;
  }

  async getConversations(page = 1, limit = 20, state?: string) {
    const where = state ? { agentState: state as any } : {};
    const [conversations, total] = await Promise.all([
      prisma.whatsappConversation.findMany({
        where, orderBy: { updatedAt: 'desc' },
        skip: (page - 1) * limit, take: limit,
        include: {
          customer: { select: { name: true, email: true, subscriptionPlan: true } },
          messages: { orderBy: { createdAt: 'desc' }, take: 1 },
        },
      }),
      prisma.whatsappConversation.count({ where }),
    ]);
    return { conversations, total };
  }

  async getMessages(conversationId: string) {
    return prisma.whatsappMessage.findMany({ where: { conversationId }, orderBy: { createdAt: 'asc' } });
  }

  async adminReply(conversationId: string, text: string) {
    const conv = await prisma.whatsappConversation.findUnique({ where: { id: conversationId } });
    if (!conv) return;
    await this.queueText(conv.customerPhone, text);
    await prisma.whatsappMessage.create({
      data: { conversationId, direction: MessageDirection.OUTBOUND, messageType: 'text', content: text, status: MessageStatus.QUEUED },
    });
  }
}
