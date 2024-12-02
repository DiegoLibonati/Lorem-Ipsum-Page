export const getElements = () => ({
  input: document.querySelector(".article-center input") as HTMLInputElement,
  btnGenerate: document.querySelector(
    ".article-center button"
  ) as HTMLButtonElement,
  articleContainer: document.querySelector(
    ".article-center-generate"
  ) as HTMLElement,
});
