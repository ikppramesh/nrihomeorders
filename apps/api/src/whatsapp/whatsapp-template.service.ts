import { Injectable } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';

@Injectable()
export class WhatsappTemplateService {
  constructor(private readonly wa: WhatsappService) {}

  async requestReceived(phone: string, name: string, service: string) {
    return this.wa.sendRaw({
      messaging_product: 'whatsapp', to: phone, type: 'template',
      template: {
        name: 'request_received', language: { code: 'en' },
        components: [{ type: 'body', parameters: [{ type: 'text', text: name }, { type: 'text', text: service }, { type: 'text', text: '4 hours' }] }],
      },
    });
  }

  async quoteReady(phone: string, orderId: string, total: string) {
    return this.wa.sendRaw({
      messaging_product: 'whatsapp', to: phone, type: 'interactive',
      interactive: {
        type: 'button',
        header: { type: 'text', text: `Quote Ready — #${orderId}` },
        body: { text: `Your fully itemised quote is ready.\nTotal: $${total}\n\nAll costs broken down — no hidden fees.` },
        footer: { text: 'Valid 48 hours. No payment until you approve.' },
        action: {
          buttons: [
            { type: 'reply', reply: { id: `approve_${orderId}`, title: 'Approve & Pay' } },
            { type: 'reply', reply: { id: `reject_${orderId}`, title: 'Reject' } },
            { type: 'reply', reply: { id: `ask_${orderId}`, title: 'Ask a Question' } },
          ],
        },
      },
    });
  }

  async billPaid(phone: string, biller: string, amount: string, txnId: string) {
    return this.wa.sendRaw({
      messaging_product: 'whatsapp', to: phone, type: 'template',
      template: {
        name: 'bill_paid', language: { code: 'en' },
        components: [{ type: 'body', parameters: [{ type: 'text', text: biller }, { type: 'text', text: amount }, { type: 'text', text: txnId }] }],
      },
    });
  }

  async inspectionPass(phone: string, item: string, details: string) {
    return this.wa.queueText(phone, `✅ Inspection PASSED — ${item}\n\n${details}\n\nWe are packing now. Tracking number will follow.`);
  }

  async inspectionFail(phone: string, item: string, reason: string, orderId: string) {
    return this.wa.sendRaw({
      messaging_product: 'whatsapp', to: phone, type: 'interactive',
      interactive: {
        type: 'list',
        header: { type: 'text', text: '❌ Product Rejected — Action Needed' },
        body: { text: `We inspected your ${item} and found:\n\n${reason}\n\nPhotos sent. What would you like to do?` },
        action: {
          button: 'Choose an Option',
          sections: [{
            title: 'Next Steps',
            rows: [
              { id: `alt_${orderId}`,    title: 'Try Different Vendor',  description: 'We find another supplier' },
              { id: `skip_${orderId}`,   title: 'Skip This Item',        description: 'Refund this item only' },
              { id: `cancel_${orderId}`, title: 'Cancel & Full Refund',  description: 'Cancel entire order' },
            ],
          }],
        },
      },
    });
  }

  async shipped(phone: string, courier: string, tracking: string, eta: string) {
    return this.wa.queueText(phone, `📦 Your package is on its way!\n\nCourier: ${courier}\nTracking: ${tracking}\nEstimated delivery: ${eta}\n\nWe'll update you at every transit milestone.`);
  }

  async renewalReminder(phone: string, label: string, amount: string, dueDate: string, days: number) {
    const urgency = days <= 1 ? '🚨 URGENT — Last Chance' : days <= 7 ? '⚠️ Action Needed' : '📅 Reminder';
    return this.wa.sendRaw({
      messaging_product: 'whatsapp', to: phone, type: 'interactive',
      interactive: {
        type: 'button',
        header: { type: 'text', text: `${urgency}: ${label}` },
        body: { text: `Your ${label} is due in ${days} day${days !== 1 ? 's' : ''} on ${dueDate}.\nApprox: ₹${amount}\n\nShall we schedule payment?` },
        action: {
          buttons: [
            { type: 'reply', reply: { id: `renew_yes`, title: 'Yes, Schedule It' } },
            { type: 'reply', reply: { id: `renew_no`,  title: "I'll Handle It"   } },
          ],
        },
      },
    });
  }
}
