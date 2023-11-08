import { getTeg } from "./getTeg";

export function getMessageContent({
  string,
}: {
  string: string;
}): { teg: string; data: string }[] {
  const res: { teg: string; data: string }[] = [];
  const arrey = string.split("\n").map((str) => str.split(" "));

  arrey.forEach((arr) => {
    let obj = { teg: getTeg({ word: arr[0] }), data: arr[0] };

    arr.forEach((word, i) => {
      if (i) {
        const teg = getTeg({ word });
        if (teg === "p" && obj.teg === "p") {
          obj.data += " " + word;
        } else {
          res.push({ ...obj });
          obj = { teg, data: word };
        }
      }
    });
    res.push({ ...obj });
  });
  return res;
}
