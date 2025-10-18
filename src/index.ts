import { LoremIpsumPage } from "@src/pages/LoremIpsumPage/LoremIpsumPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const loremIpsumPage = LoremIpsumPage();
  app.appendChild(loremIpsumPage);
};

document.addEventListener("DOMContentLoaded", onInit);
