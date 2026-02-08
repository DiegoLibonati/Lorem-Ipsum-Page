import type { ParagraphProps } from "@/types/props";
import type { ParagraphComponent } from "@/types/components";

import "@/components/Paragraph/Paragraph.css";

export const Paragraph = ({ children }: ParagraphProps): ParagraphComponent => {
  const p = document.createElement("p");
  p.className = "lorem-ipsum__paragraph";

  p.innerHTML = children ?? "";

  return p;
};
