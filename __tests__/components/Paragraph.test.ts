import type { ParagraphProps } from "@/types/props";
import type { ParagraphComponent } from "@/types/components";

import { Paragraph } from "@/components/Paragraph/Paragraph";

const renderComponent = (props: ParagraphProps): ParagraphComponent => {
  const container = Paragraph(props);
  document.body.appendChild(container);
  return container;
};

describe("Paragraph Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render paragraph with content", () => {
    renderComponent({ children: "This is a test paragraph." });

    const paragraph = document.querySelector<HTMLParagraphElement>(
      ".lorem-ipsum__paragraph"
    );
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.tagName).toBe("P");
    expect(paragraph?.innerHTML).toBe("This is a test paragraph.");
  });

  it("should render empty paragraph when no children provided", () => {
    renderComponent({ children: "" });

    const paragraph = document.querySelector<HTMLParagraphElement>(
      ".lorem-ipsum__paragraph"
    );
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.innerHTML).toBe("");
  });
});
