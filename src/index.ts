import { getElements } from "@src/helpers/getElements";
import { paragraphs } from "@src/constants/constants";

const fragment = new DocumentFragment();

const handleClickGenerate = () => {
  const { articleContainer, input } = getElements();

  articleContainer.textContent = "";

  const valueGenerate = Number(input.value);

  for (let i = 0; i < valueGenerate; i++) {
    const p = document.createElement("p");
    p.setAttribute("class", "lorem-ipsum__paragraph")

    const randomValue = Math.floor(Math.random() * paragraphs.length);

    p.textContent = paragraphs[randomValue];

    fragment.append(p);
  }

  articleContainer.append(fragment);
};

const onInit = () => {
  const { btnGenerate } = getElements();

  btnGenerate.addEventListener("click", handleClickGenerate);
};

document.addEventListener("DOMContentLoaded", onInit);
