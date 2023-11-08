export async function addFetch(
  way: string,
  method: string,
  body: object = {}
): Promise<Response> {
  if (!method || method === "GET") {
    return await fetch(way);
  }
  return await fetch(way, {
    method,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
}
