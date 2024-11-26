import { paragraphs } from "./constants/constants";
import { articleContainer, btnGenerate, input } from "./constants/elements";

const fragment = new DocumentFragment();

const handleClickGenerate = () => {
  articleContainer.textContent = "";

  const valueGenerate = Number(input.value);

  for (let i = 0; i < valueGenerate; i++) {
    const p = document.createElement("p");

    const randomValue = Math.floor(Math.random() * paragraphs.length);

    p.textContent = paragraphs[randomValue];

    fragment.append(p);
  }

  articleContainer.append(fragment);
};

const onInit = () => {
  btnGenerate.addEventListener("click", handleClickGenerate);
};

document.addEventListener("DOMContentLoaded", onInit);
