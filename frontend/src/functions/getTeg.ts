export function getTeg({ word }: { word: string }): string {
  const peace = word.slice(0, 7).toLowerCase();

  if (peace === "https:/" || peace === "http://") {
    const peaceEnd = word.slice(-3).toLowerCase();
    if (
      peaceEnd === "peg" ||
      peaceEnd === "jpg" ||
      peaceEnd === "png" ||
      peaceEnd === "oji" ||
      peaceEnd === "gif"
    ) {
      return "img";
    } else {
      return "a";
    }
  }
  return "p";
}
