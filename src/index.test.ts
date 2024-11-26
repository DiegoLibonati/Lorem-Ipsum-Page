import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import fs from "fs";
import path from "path";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

beforeEach(() => {
  jest.resetModules();
  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];

  document.body.innerHTML = body;
  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the title of the APP, the input to enter the number of paragraphs to generate and the generate button.", () => {
  const titleApp = screen.getByRole("heading", {
    name: /TIRED OF BORING LOREM IPSUM?/i,
  });
  const input = document.querySelector("input");
  const button = screen.getByRole("button", { name: /generate/i });

  expect(titleApp).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute("type", "number");
  expect(button).toBeInTheDocument();
});

test("It must render all the paragraphs depending on the number of elements to render entered when you click generate.", async () => {
  const input = document.querySelector("input");
  const button = screen.getByRole("button", { name: /generate/i });
  const articles = screen.getAllByRole("article");

  const articleContainer = articles.find((article) =>
    article.classList.contains("article-center-generate")
  );

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(articleContainer).toBeInTheDocument();
  expect(articleContainer?.children).toHaveLength(0);

  await user.click(input!);
  await user.keyboard("20");

  await user.click(button);

  expect(articleContainer?.children).toHaveLength(20);
});
