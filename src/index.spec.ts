import code_under_test from './index';

const mockMailerSend = {
  email: {
    send: jest.fn().mockResolvedValue({ success: true }),
  },
};

jest.mock('mailersend', () => ({
  MailerSend: jest.fn().mockImplementation(() => mockMailerSend),
  EmailParams: jest.fn().mockImplementation(() => ({
    setFrom: jest.fn().mockReturnThis(),
    setTo: jest.fn().mockReturnThis(),
    setReplyTo: jest.fn().mockReturnThis(),
    setSubject: jest.fn().mockReturnThis(),
    setText: jest.fn().mockReturnThis(),
    setHtml: jest.fn().mockReturnThis(),
    setAttachments: jest.fn().mockReturnThis(),
  })),
  Recipient: jest.fn().mockImplementation(() => ({
    setEmail: jest.fn().mockReturnThis(),
    setName: jest.fn().mockReturnThis(),
  })),
}));

describe('code snippet', () => {
  const settings = {
    defaultFrom: 'default@test.com',
    defaultReplyTo: 'reply@test.com',
    defaultFromName: 'Default Name',
  };

  let mailer: { send: any };

  beforeAll(() => {
    mailer = code_under_test.init({ apiKey: 'test-key' }, settings);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send email successfully with basic fields', async () => {
    const result = await mailer.send({
      from: 'Test Sender <sender@test.com>',
      to: 'recipient@test.com',
      subject: 'Test Subject',
      text: 'Test text content',
      html: '<p>Test HTML content</p>',
    });

    expect(mockMailerSend.email.send).toHaveBeenCalled();
    expect(result).toEqual({ success: true });
  });

  it('should use default from when from field is missing', async () => {
    await mailer.send({
      to: 'recipient@test.com',
      subject: 'Test Subject',
      text: 'Test text content',
      html: '<p>Test HTML content</p>',
    });

    expect(mockMailerSend.email.send).toHaveBeenCalled();
    const emailParams = mockMailerSend.email.send.mock.calls[0][0];
    expect(emailParams.setFrom).toHaveBeenCalledWith({
      email: settings.defaultFrom,
      name: settings.defaultFromName,
    });
  });
});
