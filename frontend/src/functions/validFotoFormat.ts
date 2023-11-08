export function validFotoFormat({ str }: { str: string }): boolean {
  const tale = str.slice(-3);
  if (
    tale === "png" ||
    tale === "peg" ||
    tale === "jpg" ||
    tale === "gif" ||
    tale === "ebp"
  ) {
    return true;
  }
  return false;
}
