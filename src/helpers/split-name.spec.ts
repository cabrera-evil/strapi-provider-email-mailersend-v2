import { splitNameEmail } from './split-name.helper';

// Input contains both name and email in standard format 'Name <email@domain.com>'
it('should split name and email when input is in standard format', () => {
  const input = 'John Doe <john@example.com>';
  const result = splitNameEmail(input);
  expect(result).toEqual(['John Doe', 'john@example.com']);
});
