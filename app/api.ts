export async function doFetch({
  url,
  options = {
    method:"GET",
    headers: undefined,
  },
}: {
  url: string;
  options?: RequestInit;
}) {
  url = process.env.NEXT_PUBLIC_BASE_URL + url;
  if (options.headers instanceof Headers) {
    options.headers.append(
      "Authorization",
      `Bearer ${process.env.AUTH_TOKEN ?? ""}`
    );
  } else {
    options.headers = new Headers({
      Authorization: `Bearer ${process.env.AUTH_TOKEN ?? ""}`,
    });
  }
  const hasContentTypeHeader = options.headers.has("Content-Type");
  if (!hasContentTypeHeader) {
    options.headers.append("Content-Type", "application/json");
  }
  options.credentials = "include";
  const res = await fetch(url, options);
  return res;
}
