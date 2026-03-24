import type { Page } from "@/types/pages";

import { Paragraph } from "@/components/Paragraph/Paragraph";

import paragraphs from "@/constants/paragraphs";

import "@/pages/LoremIpsumPage/LoremIpsumPage.css";

export const LoremIpsumPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "lorem-ipsum-page";
  main.setAttribute("aria-label", "Lorem ipsum generator");

  main.innerHTML = `
    <section class="header-app" aria-label="Page header">
        <div class="header-app__content">
            <h1 class="header-app__title">TIRED OF BORING LOREM IPSUM?</h1>
        </div>
    </section>

    <section class="lorem-ipsum" aria-label="Lorem ipsum generator">
        <form class="lorem-ipsum__form" aria-label="Paragraph count form">
            <div class="lorem-ipsum__content">
                <label for="paragraphs-input" class="lorem-ipsum__label">Paragraphs:</label>
                <input type="number" id="paragraphs-input" class="lorem-ipsum__input" aria-label="Number of paragraphs" />
            </div>
            <button
                type="submit"
                aria-label="Generate lorem ipsum paragraphs"
                class="lorem-ipsum__btn-generate"
            >
                GENERATE
            </button>
        </form>

        <article class="lorem-ipsum__paragraphs" aria-label="Generated paragraphs" aria-live="polite"></article>
    </section>
  `;

  const onSubmitForm = (e: SubmitEvent): void => {
    e.preventDefault();

    const paragraphsList = main.querySelector<HTMLElement>(
      ".lorem-ipsum__paragraphs"
    )!;
    const input = main.querySelector<HTMLInputElement>(".lorem-ipsum__input")!;

    paragraphsList.replaceChildren();

    const valueGenerate = Number(input.value);

    for (let i = 0; i < valueGenerate; i++) {
      const randomValue = Math.floor(Math.random() * paragraphs.length);
      const paragraph = paragraphs[randomValue]!;

      const paragraphElement = Paragraph({
        children: paragraph,
      });

      paragraphsList.append(paragraphElement);
    }
  };

  const form = main.querySelector<HTMLFormElement>(".lorem-ipsum__form")!;

  form.addEventListener("submit", onSubmitForm);

  main.cleanup = (): void => {
    form.removeEventListener("submit", onSubmitForm);
  };

  return main;
};
