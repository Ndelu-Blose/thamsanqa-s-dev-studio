/**
 * Only use GitHub open graph image URLs that point at known image hosts,
 * so we never treat arbitrary HTML pages as <img src>.
 */
export function isTrustedOgImageUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== "string") return false;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  const host = parsed.hostname.toLowerCase();
  if (host === "repository-images.githubusercontent.com") return true;
  if (host === "avatars.githubusercontent.com") return true;
  if (host === "opengraph.githubassets.com") return true;
  if (host === "user-images.githubusercontent.com") return true;
  if (host === "private-user-images.githubusercontent.com") return true;
  return false;
}
