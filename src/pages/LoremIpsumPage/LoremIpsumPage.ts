import { Paragraph } from "@src/components/Paragraph/Paragraph";
import paragraphs from "@src/constants/paragraphs";

import "@src/pages/LoremIpsumPage/LoremIpsumPage.css";

const onSubmitForm = (e: SubmitEvent) => {
  e.preventDefault();

  const paragraphsList = document.querySelector<HTMLElement>(
    ".lorem-ipsum__paragraphs"
  );
  const input = document.querySelector<HTMLInputElement>(".lorem-ipsum__input");

  paragraphsList?.replaceChildren();

  const valueGenerate = Number(input!.value);

  for (let i = 0; i < valueGenerate; i++) {
    const randomValue = Math.floor(Math.random() * paragraphs.length);

    const paragraphElement = Paragraph({ children: paragraphs[randomValue] });

    paragraphsList?.append(paragraphElement);
  }
};

export const LoremIpsumPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "lorem-ipsum-page";

  main.innerHTML = `
    <section class="header-app">
        <div class="header-app__content">
            <h1 class="header-app__title">TIRED OF BORING LOREM IPSUM?</h1>
        </div>
    </section>

    <section class="lorem-ipsum">
        <form class="lorem-ipsum__form">
            <div class="lorem-ipsum__content">
                <p class="lorem-ipsum__label">Paragraphs:</p>
                <input type="number" class="lorem-ipsum__input" />
            </div>
            <button
                type="submit"
                aria-label="generate"
                class="lorem-ipsum__btn-generate"
            >
                GENERATE
            </button>
        </form>

        <article class="lorem-ipsum__paragraphs"></article>
    </section>
  `;

  const form = main.querySelector<HTMLFormElement>(".lorem-ipsum__form");

  form?.addEventListener("submit", onSubmitForm);

  return main;
};
