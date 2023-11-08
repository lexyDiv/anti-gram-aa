export function regFormValid({
  password,
  nick,
}: {
  password: string;
  nick: string;
}): string {
  if (!nick.length) {
    return "nick";
  } else if (password.length < 4) {
    return "password";
  }
  return "ok";
}
