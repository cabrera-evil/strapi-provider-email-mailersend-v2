import { Recipient, EmailParams, MailerSend, Attachment } from 'mailersend'
import sharp from 'sharp'
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
function splitNameEmail(from?: string) {
  //If no email bracket present, return as is
  if (!from?.includes('<')) return ['', from]

  //Split into name and email
  let [name, email] = from.split('<')

  //Trim and fix up
  name = name.trim()
  email = email.replace('>', '').trim()

  //Return as array
  return [name, email]
}
export = {
  init(providerOptions: { apiKey: string }, settings: Settings) {
    const mailersend = new MailerSend({
      apiKey: providerOptions.apiKey,
    })
    return {
      async send(options: SendOptions) {
        const {
          from,
          to,
          cc,
          bcc,
          replyTo,
          subject,
          text,
          html,
          attachments,
          ...rest
        } = options
        const _attachments: Attachment[] = []

        for (const attachment of attachments ?? []) {
          const isImage = attachment.type?.split('/')[0] === 'image'
          let result =
            attachment.content instanceof Buffer
              ? attachment.content.toString('base64')
              : attachment.content
          if (isImage) {
            const image =
              attachment.content instanceof Buffer
                ? sharp(attachment.content)
                : sharp(Buffer.from(attachment.content, 'base64'))
            const resultImage = await image.png().toBuffer()
            result = resultImage.toString('base64')
          }
          _attachments.push({
            filename: isImage
              ? `${attachment.filename}.png`
              : attachment.filename,
            content: result,
            disposition: attachment.disposition,
            id: attachment.content_id,
          })
        }
        return new Promise((resolve, reject) => {
          const [nameFrom, emailFrom] = splitNameEmail(from as string)
          const recipients = [new Recipient(to)]

          const emailParams = new EmailParams()
            .setFrom({
              email: emailFrom || settings.defaultFrom,
              name: nameFrom || settings.defaultFromName,
            })
            .setTo(recipients)
            .setReplyTo({
              email: replyTo || settings.defaultReplyTo,
            })
            .setSubject(subject)
            .setText(text)
            .setHtml(html)
            .setAttachments(_attachments)
          mailersend.email
            .send(emailParams)
            .then((response) => {
              return resolve(response)
            })
            .catch((error) => {
              console.error('Mailersend Error', error)
              return resolve([
                null,
                [{ messages: [error.message] }],
                'Mailersend Error',
              ])
            })
        })
      },
    }
  },
}
