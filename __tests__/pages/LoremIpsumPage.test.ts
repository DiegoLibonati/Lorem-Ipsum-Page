import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { LoremIpsumPage } from "@/pages/LoremIpsumPage/LoremIpsumPage";

const renderPage = (): Page => {
  const container = LoremIpsumPage();
  document.body.appendChild(container);
  return container;
};

describe("LoremIpsumPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".lorem-ipsum-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render page title", () => {
    renderPage();

    const title = screen.getByRole("heading", {
      name: "TIRED OF BORING LOREM IPSUM?",
    });
    expect(title).toBeInTheDocument();
  });

  it("should render form with input and button", () => {
    renderPage();

    const input = document.querySelector<HTMLInputElement>(
      ".lorem-ipsum__input"
    );
    const button = screen.getByRole("button", { name: "generate" });

    expect(input).toBeInTheDocument();
    expect(input?.type).toBe("number");
    expect(button).toBeInTheDocument();
    expect((button as HTMLButtonElement).type).toBe("submit");
  });

  it("should generate paragraphs when form is submitted", async () => {
    const user = userEvent.setup();
    renderPage();

    const input = document.querySelector<HTMLInputElement>(
      ".lorem-ipsum__input"
    );
    const button = screen.getByRole("button", { name: "generate" });

    if (input) await user.type(input, "3");
    await user.click(button);

    const paragraphs = document.querySelectorAll<HTMLParagraphElement>(
      ".lorem-ipsum__paragraph"
    );
    expect(paragraphs).toHaveLength(3);
  });

  it("should clear previous paragraphs when generating new ones", async () => {
    const user = userEvent.setup();
    renderPage();

    const input = document.querySelector<HTMLInputElement>(
      ".lorem-ipsum__input"
    );
    const button = screen.getByRole("button", { name: "generate" });

    if (input) await user.type(input, "2");
    await user.click(button);

    let paragraphs = document.querySelectorAll<HTMLParagraphElement>(
      ".lorem-ipsum__paragraph"
    );
    expect(paragraphs).toHaveLength(2);

    if (input) {
      await user.clear(input);
      await user.type(input, "4");
    }
    await user.click(button);

    paragraphs = document.querySelectorAll<HTMLParagraphElement>(
      ".lorem-ipsum__paragraph"
    );
    expect(paragraphs).toHaveLength(4);
  });

  it("should generate no paragraphs when input is 0", async () => {
    const user = userEvent.setup();
    renderPage();

    const input = document.querySelector<HTMLInputElement>(
      ".lorem-ipsum__input"
    );
    const button = screen.getByRole("button", { name: "generate" });

    if (input) await user.type(input, "0");
    await user.click(button);

    const paragraphs = document.querySelectorAll<HTMLParagraphElement>(
      ".lorem-ipsum__paragraph"
    );
    expect(paragraphs).toHaveLength(0);
  });

  it("should cleanup event listener on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
