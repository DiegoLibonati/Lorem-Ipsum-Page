export const getElements = () => ({
  input: document.querySelector(".section__wrapper input") as HTMLInputElement,
  btnGenerate: document.querySelector(
    ".section__wrapper button"
  ) as HTMLButtonElement,
  articleContainer: document.querySelector(
    ".section__paragraphs"
  ) as HTMLElement,
});
