import { expect, test } from "@playwright/test";
import { platform } from "node:os";

const paletteModifier = platform() === "darwin" ? "Meta" : "Control";

test.describe("portfolio smoke", () => {
  test("home loads with primary nav and CV", async ({ page }) => {
    await page.goto("/");
    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNav).toBeVisible();
    await expect(primaryNav.getByRole("link", { name: "Projects", exact: true })).toBeVisible();
    await expect(primaryNav.getByRole("link", { name: "Engineering", exact: true })).toBeVisible();
    await expect(primaryNav.getByRole("link", { name: "Contact", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "CV", exact: true })).toBeVisible();
  });

  test("command palette opens with keyboard shortcut", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press(`${paletteModifier}+KeyK`);
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByPlaceholder("Jump to a section or open a link…")).toBeVisible();
  });
});
