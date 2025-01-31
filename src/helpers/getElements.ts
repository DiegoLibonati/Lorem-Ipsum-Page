export const getElements = () => ({
  input: document.querySelector(".lorem-ipsum__input") as HTMLInputElement,
  btnGenerate: document.querySelector(
    ".lorem-ipsum__btn-generate"
  ) as HTMLButtonElement,
  articleContainer: document.querySelector(
    ".lorem-ipsum__paragraphs"
  ) as HTMLElement,
});
