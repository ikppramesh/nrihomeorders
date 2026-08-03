import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Processor('whatsapp-outbound')
export class WhatsappQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(WhatsappQueueProcessor.name);
  constructor(private readonly wa: WhatsappService) { super(); }

  async process(job: Job) {
    const { name, data } = job;
    let payload: any;

    if (name === 'send-text') {
      payload = { messaging_product: 'whatsapp', to: data.to, type: 'text', text: { body: data.text, preview_url: false } };
    } else if (name === 'send-template') {
      payload = { messaging_product: 'whatsapp', to: data.to, type: 'template', template: { name: data.name, language: { code: 'en' }, components: data.components ?? [] } };
    } else if (name === 'send-interactive') {
      payload = { messaging_product: 'whatsapp', to: data.to, ...data.payload };
    } else if (name === 'send-document') {
      payload = { messaging_product: 'whatsapp', to: data.to, type: 'document', document: { link: data.link, caption: data.caption, filename: data.filename } };
    } else {
      this.logger.warn(`Unknown job: ${name}`);
      return;
    }

    const wamid = await this.wa.sendRaw(payload);
    this.logger.log(`Sent ${name} → ${data.to}: ${wamid}`);
  }
}
