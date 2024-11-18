export function splitNameEmail(from?: string) {
  //If no email bracket present, return as is
  if (!from?.includes('<')) return ['', from];
  //Split into name and email
  let [name, email] = from.split('<');
  //Trim and fix up
  name = name.trim();
  email = email.replace('>', '').trim();
  //Return as array
  return [name, email];
}
