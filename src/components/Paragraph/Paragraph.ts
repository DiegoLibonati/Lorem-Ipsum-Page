import { ParagraphProps } from "@src/entities/props";

import "@src/components/Paragraph/Paragraph.css";

export const Paragraph = ({
  children,
}: ParagraphProps): HTMLParagraphElement => {
  const p = document.createElement("p");
  p.className = "lorem-ipsum__paragraph";

  p.innerHTML = children ?? "";

  return p;
};
