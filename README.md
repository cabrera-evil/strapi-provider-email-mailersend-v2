# Strapi Provider Email MailerSend v2

[![Release Version](https://img.shields.io/github/v/release/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2/releases)
[![Last Commit](https://img.shields.io/github/last-commit/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2/commits/main)
[![Issues](https://img.shields.io/github/issues/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2/pulls)
[![Forks](https://img.shields.io/github/forks/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2/network/members)
[![Stars](https://img.shields.io/github/stars/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2/stargazers)
[![License](https://img.shields.io/github/license/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2/blob/main/LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2)
[![Code Size](https://img.shields.io/github/languages/code-size/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2)
[![Repository Size](https://img.shields.io/github/repo-size/cabrera-evil/strapi-provider-email-mailersend-v2)](https://github.com/cabrera-evil/strapi-provider-email-mailersend-v2)
[![NPM Version](https://img.shields.io/npm/v/strapi-provider-email-mailersend-v2)](https://www.npmjs.com/package/strapi-provider-email-mailersend-v2)
[![NPM Downloads](https://img.shields.io/npm/dt/strapi-provider-email-mailersend-v2)](https://www.npmjs.com/package/strapi-provider-email-mailersend-v2)

Welcome to the Strapi Provider Email MailerSend v2 repository!

## Table of Contents

- [Strapi Provider Email MailerSend v2](#strapi-provider-email-mailersend-v2)
  - [Table of Contents](#table-of-contents)
  - [Installing](#installing)
  - [Usage](#usage)
    - [Environment Variables](#environment-variables)
  - [License](#license)

## Installing

Using npm:

```bash
npm install strapi-provider-email-mailersend-v2
```

Using yarn:

```bash
yarn add strapi-provider-email-mailersend-v2
```

Using pnpm:

```bash
pnpm add strapi-provider-email-mailersend-v2
```

## Usage

Configure the provider in your Strapi project:

```js
module.exports = {
  // ...
  email: {
    provider: 'strapi-provider-email-mailersend-v2',
    providerOptions: {
      apiKey: 'your-api-key', // Required
    },
    settings: {
      defaultFrom: 'no-reply@example.com', // Default sender email
      defaultReplyTo: 'support@example.com', // Default reply-to email
    },
  },
  // ...
};
```

### Environment Variables

Alternatively, configure the provider using environment variables:

- `MAILERSEND_API_KEY` - API key for authentication with MailerSend (default: `undefined`).
- `MAILERSEND_DEFAULT_FROM` - Default sender email address.
- `MAILERSEND_DEFAULT_REPLY_TO` - Default reply-to email address.

To obtain your API key, follow the instructions in the [MailerSend documentation](https://www.mailersend.com/docs).

## License

This repository is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the scripts as long as you include the original license text.
