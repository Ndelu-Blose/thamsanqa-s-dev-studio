import { describe, expect, it } from "vitest";
import { isTrustedOgImageUrl } from "@/server/repo-media";

describe("isTrustedOgImageUrl", () => {
  it("accepts GitHub repository-images HTTPS URLs", () => {
    expect(
      isTrustedOgImageUrl("https://repository-images.githubusercontent.com/123/4567890-abc"),
    ).toBe(true);
  });

  it("rejects non-HTTPS and unknown hosts", () => {
    expect(isTrustedOgImageUrl("http://repository-images.githubusercontent.com/x")).toBe(false);
    expect(isTrustedOgImageUrl("https://lovable.dev/preview.png")).toBe(false);
    expect(isTrustedOgImageUrl("")).toBe(false);
  });
});
