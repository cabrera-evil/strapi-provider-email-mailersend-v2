export interface SendOptions {
  from?: string;
  to: string;
  cc: string;
  bcc: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
  attachments?: [
    {
      filename: string;
      type: string;
      content_id: string;
      content: Buffer | string;
      disposition: string;
    },
  ];
  [key: string]: unknown;
}
