export const getElements = () => ({
  input: document.querySelector(".lorem-ipsum__header-content-input") as HTMLInputElement,
  btnGenerate: document.querySelector(
    ".lorem-ipsum__header-btn-generate"
  ) as HTMLButtonElement,
  articleContainer: document.querySelector(
    ".lorem-ipsum__paragraphs"
  ) as HTMLElement,
});
