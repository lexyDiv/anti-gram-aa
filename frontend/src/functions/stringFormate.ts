export function stringFormat({
  type,
  str,
  screen,
}: {
  type: number;
  str: string;
  screen: { width: number; height: number };
}): string {
  if (type === 1) {
    let text = str.slice(0, Math.floor(screen.width / 23));
    text.length < str.length ? (text = text + "...") : false;
    return text;
  } else if (type === 2) {
    let text = str.slice(0, Math.floor(screen.width / 40));
    text.length < str.length ? (text = text + "...") : false;

    return text;
  } else if (type === 3) {
    let text = str.slice(0, Math.floor(screen.width / 55));
    text.length < str.length ? (text = text + "...") : false;

    return text;
  }
  return "";
}
