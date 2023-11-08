export function logFormValid({
  nick,
  password,
}: {
  nick: string;
  password: string;
}): string {
  if (!nick) {
    return "nick";
  } else if (password.length < 4) {
    return "password";
  }
  return "ok";
}
