import type { ParagraphProps } from "@/types/props";

import "@/components/Paragraph/Paragraph.css";

export const Paragraph = ({
  children,
}: ParagraphProps): HTMLParagraphElement => {
  const p = document.createElement("p");
  p.className = "lorem-ipsum__paragraph";

  p.innerHTML = children ?? "";

  return p;
};
