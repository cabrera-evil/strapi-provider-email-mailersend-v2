/// <reference types="node" />
interface Settings {
  defaultFrom: string
  defaultReplyTo: string
  defaultFromName: string
}
interface SendOptions {
  from?: string
  to: string
  cc: string
  bcc: string
  replyTo?: string
  subject: string
  text: string
  html: string
  attachments?: [
    {
      filename: string
      type: string
      content_id: string
      content: Buffer | string
      disposition: string
    },
  ]
  [key: string]: unknown
}
declare const _default: {
  init(
    providerOptions: {
      apiKey: string
    },
    settings: Settings,
  ): {
    send(options: SendOptions): Promise<unknown>
  }
}
export = _default
