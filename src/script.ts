import { paragraphs } from "./constants/constants";

const numberOfParagraphs = document.querySelector(
  ".article-center input"
) as HTMLInputElement;
const btnGenerate = document.querySelector(
  ".article-center button"
) as HTMLButtonElement;
const articleContainer = document.querySelector(
  ".article-center-generate"
) as HTMLElement;

const fragment = new DocumentFragment();

btnGenerate.addEventListener("click", () => {
  articleContainer.textContent = "";

  const valueGenerate = Number(numberOfParagraphs.value);

  for (let i = 0; i < valueGenerate; i++) {
    const elementP = document.createElement("p");

    const randomValue = Math.floor(Math.random() * paragraphs.length);

    elementP.textContent = paragraphs[randomValue];

    fragment.append(elementP);
  }

  articleContainer.append(fragment);
});
