import { screen } from "@testing-library/dom";

import type { ParagraphComponent } from "@/types/components";

import { Paragraph } from "@/components/Paragraph/Paragraph";

import type { ParagraphProps } from "@/types/props";

const renderComponent = (props: ParagraphProps): ParagraphComponent => {
  const container = Paragraph(props);
  document.body.appendChild(container);
  return container;
};

describe("Paragraph", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests", () => {
    it("should render the component structure", () => {
      const container = renderComponent({
        children: "Test paragraph content",
      });

      expect(container).toBeInstanceOf(HTMLParagraphElement);
      expect(container).toHaveClass("lorem-ipsum__paragraph");
    });

    it("should return HTMLParagraphElement", () => {
      const container = renderComponent({
        children: "Test content",
      });

      expect(container.tagName).toBe("P");
    });

    it("should have correct CSS class", () => {
      const container = renderComponent({
        children: "Test content",
      });

      expect(container).toHaveClass("lorem-ipsum__paragraph");
    });
  });

  describe("Children Content Tests", () => {
    it("should display the correct text content", () => {
      const container = renderComponent({
        children: "This is a test paragraph",
      });

      expect(container.innerHTML).toBe("This is a test paragraph");
      expect(container).toHaveTextContent("This is a test paragraph");
    });

    it("should render children prop content", () => {
      const content = "Lorem ipsum dolor sit amet";

      renderComponent({
        children: content,
      });

      const paragraph = screen.getByText(content);
      expect(paragraph).toBeInTheDocument();
    });

    it("should handle long text content", () => {
      const longText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

      const container = renderComponent({
        children: longText,
      });

      expect(container).toHaveTextContent(longText);
    });

    it("should handle multiline text", () => {
      const multilineText = "Line 1\nLine 2\nLine 3";

      const container = renderComponent({
        children: multilineText,
      });

      expect(container).toHaveTextContent("Line 1 Line 2 Line 3");
      expect(container.textContent).toBe("Line 1\nLine 2\nLine 3");
    });
  });

  describe("HTML Content Tests", () => {
    it("should render HTML content using innerHTML", () => {
      const container = renderComponent({
        children: "<strong>Bold text</strong>",
      });

      expect(container.innerHTML).toBe("<strong>Bold text</strong>");
      expect(
        container.querySelector<HTMLElement>("strong")
      ).toBeInTheDocument();
    });

    it("should handle mixed HTML and text content", () => {
      const container = renderComponent({
        children: "This is <em>emphasized</em> text",
      });

      expect(container.innerHTML).toBe("This is <em>emphasized</em> text");
      expect(container.querySelector<HTMLElement>("em")).toBeInTheDocument();
    });

    it("should handle multiple HTML tags", () => {
      const container = renderComponent({
        children: "<strong>Bold</strong> and <em>italic</em> text",
      });

      expect(
        container.querySelector<HTMLElement>("strong")
      ).toBeInTheDocument();
      expect(container.querySelector<HTMLElement>("em")).toBeInTheDocument();
    });

    it("should handle nested HTML tags", () => {
      const container = renderComponent({
        children: "<span><strong>Nested</strong> content</span>",
      });

      expect(
        container.querySelector<HTMLSpanElement>("span")
      ).toBeInTheDocument();
      expect(
        container.querySelector<HTMLElement>("strong")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases Tests", () => {
    it("should handle empty string", () => {
      const container = renderComponent({
        children: "",
      });

      expect(container.innerHTML).toBe("");
      expect(container).toHaveTextContent("");
    });

    it("should handle undefined children", () => {
      const container = renderComponent({
        children: undefined!,
      });

      expect(container.innerHTML).toBe("");
      expect(container).toHaveTextContent("");
    });

    it("should handle whitespace-only content", () => {
      const container = renderComponent({
        children: "   ",
      });

      expect(container.innerHTML).toBe("   ");
      expect(container.textContent).toBe("   ");
    });

    it("should handle special characters", () => {
      const container = renderComponent({
        children: 'Special chars: &, <, >, "',
      });

      expect(container.textContent).toContain("Special chars:");
      expect(container).toHaveTextContent('Special chars: &, <, >, "');
    });
  });

  describe("Multiple Paragraphs Tests", () => {
    it("should render multiple paragraphs independently", () => {
      renderComponent({
        children: "First paragraph",
      });

      renderComponent({
        children: "Second paragraph",
      });

      const paragraph1 = screen.getByText("First paragraph");
      const paragraph2 = screen.getByText("Second paragraph");
      const allParagraphs = document.querySelectorAll<HTMLParagraphElement>(
        ".lorem-ipsum__paragraph"
      );

      expect(paragraph1).toBeInTheDocument();
      expect(paragraph2).toBeInTheDocument();
      expect(allParagraphs).toHaveLength(2);
    });

    it("should maintain separate content for each paragraph", () => {
      const p1 = renderComponent({
        children: "Content A",
      });

      const p2 = renderComponent({
        children: "Content B",
      });

      expect(p1).toHaveTextContent("Content A");
      expect(p2).toHaveTextContent("Content B");
    });

    it("should handle different content types across paragraphs", () => {
      const p1 = renderComponent({
        children: "Plain text",
      });

      const p2 = renderComponent({
        children: "<strong>HTML content</strong>",
      });

      expect(p1.innerHTML).toBe("Plain text");
      expect(p2.innerHTML).toBe("<strong>HTML content</strong>");
    });
  });

  describe("Content Formatting Tests", () => {
    it("should preserve text formatting", () => {
      const container = renderComponent({
        children: "Text with    multiple    spaces",
      });

      expect(container.innerHTML).toBe("Text with    multiple    spaces");
    });

    it("should handle line breaks", () => {
      const container = renderComponent({
        children: "Line 1<br>Line 2",
      });

      expect(container.innerHTML).toBe("Line 1<br>Line 2");
      expect(container.querySelector<HTMLBRElement>("br")).toBeInTheDocument();
    });

    it("should handle tab characters", () => {
      const container = renderComponent({
        children: "Text\twith\ttabs",
      });

      expect(container.textContent).toContain("Text");
      expect(container.textContent).toContain("with");
      expect(container.textContent).toContain("tabs");
    });
  });

  describe("Props Integration Tests", () => {
    it("should use children from props", () => {
      const content = "Props content";

      const container = renderComponent({
        children: content,
      });

      expect(container.innerHTML).toBe(content);
    });

    it("should handle dynamic content", () => {
      const dynamicContent = `Generated at ${Date.now()}`;

      const container = renderComponent({
        children: dynamicContent,
      });

      expect(container).toHaveTextContent(dynamicContent);
    });

    it("should handle children with special HTML entities", () => {
      const container = renderComponent({
        children: "&copy; 2024 &amp; &lt;Company&gt;",
      });

      expect(container.innerHTML).toBe("© 2024 &amp; &lt;Company&gt;");
    });
  });

  describe("innerHTML vs textContent Tests", () => {
    it("should set innerHTML, not textContent", () => {
      const container = renderComponent({
        children: "<span>Test</span>",
      });

      expect(container.innerHTML).toBe("<span>Test</span>");
      expect(
        container.querySelector<HTMLSpanElement>("span")
      ).toBeInTheDocument();
    });

    it("should allow HTML tags to be rendered", () => {
      const container = renderComponent({
        children: "<a href='#'>Link</a>",
      });

      const link = container.querySelector<HTMLAnchorElement>("a");
      expect(link).toBeInTheDocument();
      expect(link?.href).toContain("#");
    });

    it("should differentiate between plain text and HTML", () => {
      const plainP = renderComponent({
        children: "Plain text",
      });

      document.body.innerHTML = "";

      const htmlP = renderComponent({
        children: "<b>HTML text</b>",
      });

      expect(plainP.querySelector<HTMLElement>("b")).not.toBeInTheDocument();
      expect(htmlP.querySelector<HTMLElement>("b")).toBeInTheDocument();
    });
  });
});
