import "@/index.css";
import { LoremIpsumPage } from "@/pages/LoremIpsumPage/LoremIpsumPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (app) {
    const loremIpsumPage = LoremIpsumPage();
    app.appendChild(loremIpsumPage);
  }
};

document.addEventListener("DOMContentLoaded", onInit);
