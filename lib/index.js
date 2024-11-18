'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
const mailersend_1 = require('mailersend')
const sharp_1 = __importDefault(require('sharp'))
function splitNameEmail(from) {
  //If no email bracket present, return as is
  if (!(from === null || from === void 0 ? void 0 : from.includes('<')))
    return ['', from]
  //Split into name and email
  let [name, email] = from.split('<')
  //Trim and fix up
  name = name.trim()
  email = email.replace('>', '').trim()
  //Return as array
  return [name, email]
}
module.exports = {
  init(providerOptions, settings) {
    const mailersend = new mailersend_1.MailerSend({
      apiKey: providerOptions.apiKey,
    })
    return {
      send(options) {
        return __awaiter(this, void 0, void 0, function* () {
          var _a
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
            } = options,
            rest = __rest(options, [
              'from',
              'to',
              'cc',
              'bcc',
              'replyTo',
              'subject',
              'text',
              'html',
              'attachments',
            ])
          const _attachments = []
          for (const attachment of attachments !== null &&
          attachments !== void 0
            ? attachments
            : []) {
            const isImage =
              ((_a = attachment.type) === null || _a === void 0
                ? void 0
                : _a.split('/')[0]) === 'image'
            let result =
              attachment.content instanceof Buffer
                ? attachment.content.toString('base64')
                : attachment.content
            if (isImage) {
              const image =
                attachment.content instanceof Buffer
                  ? (0, sharp_1.default)(attachment.content)
                  : (0, sharp_1.default)(
                      Buffer.from(attachment.content, 'base64'),
                    )
              const resultImage = yield image.png().toBuffer()
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
            const [nameFrom, emailFrom] = splitNameEmail(from)
            const recipients = [new mailersend_1.Recipient(to)]
            const emailParams = new mailersend_1.EmailParams()
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
        })
      },
    }
  },
}
