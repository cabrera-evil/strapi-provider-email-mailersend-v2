import { splitNameEmail } from '@/helpers/split-name.helper';
import { SendOptions } from '@/types/send-options.type';
import { Settings } from '@/types/settings.type';
import { Attachment, EmailParams, MailerSend, Recipient } from 'mailersend';
import sharp from 'sharp';

export = {
  provider: 'mailersend-v2',
  name: 'MailerSend v2',
  init(providerOptions: { apiKey: string }, settings: Settings) {
    const mailersend = new MailerSend({
      apiKey: providerOptions.apiKey,
    });
    return {
      async send(options: SendOptions) {
        const _attachments: Attachment[] = [];
        for (const attachment of options?.attachments ?? []) {
          const isImage = attachment.type?.split('/')[0] === 'image';
          let result =
            attachment.content instanceof Buffer
              ? attachment.content.toString('base64')
              : attachment.content;
          if (isImage) {
            const image =
              attachment.content instanceof Buffer
                ? sharp(attachment.content)
                : sharp(Buffer.from(attachment.content as string, 'base64'));
            const resultImage = await image.png().toBuffer();
            result = resultImage.toString('base64');
          }
          _attachments.push({
            filename: isImage
              ? `${attachment.filename}.png`
              : attachment.filename,
            content: result.toString(),
            disposition: attachment.disposition,
            id: attachment.content_id,
          });
        }
        return new Promise((resolve) => {
          const [nameFrom, emailFrom] = splitNameEmail(options.from as string);
          const recipients = [new Recipient(options.to)];
          const emailParams = new EmailParams()
            .setFrom({
              email: emailFrom || settings.defaultFrom,
              name: nameFrom || settings.defaultFromName,
            })
            .setTo(recipients)
            .setReplyTo({
              email: options?.replyTo || settings.defaultReplyTo,
            })
            .setSubject(options.subject)
            .setText(options.text)
            .setHtml(options.html)
            .setAttachments(_attachments);
          mailersend.email
            .send(emailParams)
            .then((response) => {
              return resolve(response);
            })
            .catch((error) => {
              return resolve([
                null,
                [{ messages: [error.message] }],
                'Mailersend Error',
              ]);
            });
        });
      },
    };
  },
};
