import { screen } from "@testing-library/dom";

import { Paragraph } from "@src/components/Paragraph/Paragraph";

import { ParagraphProps } from "@src/entities/props";

type RenderComponent = {
  container: HTMLParagraphElement;
  props: ParagraphProps;
};

const renderComponent = (props: ParagraphProps): RenderComponent => {
  const container = Paragraph(props);
  document.body.appendChild(container);
  return { container: container, props: props };
};

describe("Paragraph.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: ParagraphProps = {
        children: "Test paragraph content",
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLParagraphElement);
      expect(container.className).toBe("lorem-ipsum__paragraph");
    });

    test("It should return HTMLParagraphElement", () => {
      const props: ParagraphProps = {
        children: "Test content",
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("P");
    });

    test("It should have correct CSS class", () => {
      const props: ParagraphProps = {
        children: "Test content",
      };

      const { container } = renderComponent(props);

      expect(container).toHaveClass("lorem-ipsum__paragraph");
    });
  });

  describe("Children Content Tests.", () => {
    test("It should display the correct text content", () => {
      const props: ParagraphProps = {
        children: "This is a test paragraph",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("This is a test paragraph");
      expect(container.textContent).toBe("This is a test paragraph");
    });

    test("It should render children prop content", () => {
      const content = "Lorem ipsum dolor sit amet";
      const props: ParagraphProps = {
        children: content,
      };

      renderComponent(props);

      const paragraph = screen.getByText(content);

      expect(paragraph).toBeInTheDocument();
    });

    test("It should handle long text content", () => {
      const longText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
      const props: ParagraphProps = {
        children: longText,
      };

      const { container } = renderComponent(props);

      expect(container.textContent).toBe(longText);
    });

    test("It should handle multiline text", () => {
      const multilineText = "Line 1\nLine 2\nLine 3";
      const props: ParagraphProps = {
        children: multilineText,
      };

      const { container } = renderComponent(props);

      expect(container.textContent).toBe(multilineText);
    });
  });

  describe("HTML Content Tests.", () => {
    test("It should render HTML content using innerHTML", () => {
      const props: ParagraphProps = {
        children: "<strong>Bold text</strong>",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("<strong>Bold text</strong>");
      expect(container.querySelector("strong")).toBeInTheDocument();
    });

    test("It should handle mixed HTML and text content", () => {
      const props: ParagraphProps = {
        children: "This is <em>emphasized</em> text",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("This is <em>emphasized</em> text");
      expect(container.querySelector("em")).toBeInTheDocument();
    });

    test("It should handle multiple HTML tags", () => {
      const props: ParagraphProps = {
        children: "<strong>Bold</strong> and <em>italic</em> text",
      };

      const { container } = renderComponent(props);

      expect(container.querySelector("strong")).toBeInTheDocument();
      expect(container.querySelector("em")).toBeInTheDocument();
    });

    test("It should handle nested HTML tags", () => {
      const props: ParagraphProps = {
        children: "<span><strong>Nested</strong> content</span>",
      };

      const { container } = renderComponent(props);

      expect(container.querySelector("span")).toBeInTheDocument();
      expect(container.querySelector("strong")).toBeInTheDocument();
    });
  });

  describe("Edge Cases Tests.", () => {
    test("It should handle empty string", () => {
      const props: ParagraphProps = {
        children: "",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("");
      expect(container.textContent).toBe("");
    });

    test("It should handle undefined children", () => {
      const props: ParagraphProps = {
        children: undefined,
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("");
      expect(container.textContent).toBe("");
    });

    test("It should handle null-like value with nullish coalescing", () => {
      const props: ParagraphProps = {
        children: undefined,
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("");
    });

    test("It should handle whitespace-only content", () => {
      const props: ParagraphProps = {
        children: "   ",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("   ");
      expect(container.textContent).toBe("   ");
    });

    test("It should handle special characters", () => {
      const props: ParagraphProps = {
        children: 'Special chars: &, <, >, "',
      };

      const { container } = renderComponent(props);

      expect(container.textContent).toContain("Special chars:");
    });
  });

  describe("Multiple Paragraphs Tests.", () => {
    test("It should render multiple paragraphs independently", () => {
      const props1: ParagraphProps = {
        children: "First paragraph",
      };

      const props2: ParagraphProps = {
        children: "Second paragraph",
      };

      renderComponent(props1);
      renderComponent(props2);

      const paragraph1 = screen.getByText("First paragraph");
      const paragraph2 = screen.getByText("Second paragraph");
      const allParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(paragraph1).toBeInTheDocument();
      expect(paragraph2).toBeInTheDocument();
      expect(allParagraphs.length).toBe(2);
    });

    test("It should maintain separate content for each paragraph", () => {
      const props1: ParagraphProps = {
        children: "Content A",
      };

      const props2: ParagraphProps = {
        children: "Content B",
      };

      const { container: p1 } = renderComponent(props1);
      const { container: p2 } = renderComponent(props2);

      expect(p1.textContent).toBe("Content A");
      expect(p2.textContent).toBe("Content B");
    });

    test("It should handle different content types across paragraphs", () => {
      const props1: ParagraphProps = {
        children: "Plain text",
      };

      const props2: ParagraphProps = {
        children: "<strong>HTML content</strong>",
      };

      const { container: p1 } = renderComponent(props1);
      const { container: p2 } = renderComponent(props2);

      expect(p1.innerHTML).toBe("Plain text");
      expect(p2.innerHTML).toBe("<strong>HTML content</strong>");
    });
  });

  describe("Content Formatting Tests.", () => {
    test("It should preserve text formatting", () => {
      const props: ParagraphProps = {
        children: "Text with    multiple    spaces",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("Text with    multiple    spaces");
    });

    test("It should handle line breaks", () => {
      const props: ParagraphProps = {
        children: "Line 1<br>Line 2",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("Line 1<br>Line 2");
      expect(container.querySelector("br")).toBeInTheDocument();
    });

    test("It should handle tab characters", () => {
      const props: ParagraphProps = {
        children: "Text\twith\ttabs",
      };

      const { container } = renderComponent(props);

      expect(container.textContent).toContain("Text");
      expect(container.textContent).toContain("with");
      expect(container.textContent).toContain("tabs");
    });
  });

  describe("Props Integration Tests.", () => {
    test("It should use children from props", () => {
      const props: ParagraphProps = {
        children: "Props content",
      };

      const { props: componentProps, container } = renderComponent(props);

      expect(container.innerHTML).toBe(componentProps.children);
    });

    test("It should handle dynamic content", () => {
      const dynamicContent = `Generated at ${Date.now()}`;
      const props: ParagraphProps = {
        children: dynamicContent,
      };

      const { container } = renderComponent(props);

      expect(container.textContent).toBe(dynamicContent);
    });

    test("It should handle children with special HTML entities", () => {
      const props: ParagraphProps = {
        children: "&copy; 2024 &amp; &lt;Company&gt;",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("© 2024 &amp; &lt;Company&gt;");
    });
  });

  describe("innerHTML vs textContent Tests.", () => {
    test("It should set innerHTML, not textContent", () => {
      const props: ParagraphProps = {
        children: "<span>Test</span>",
      };

      const { container } = renderComponent(props);

      expect(container.innerHTML).toBe("<span>Test</span>");
      expect(container.querySelector("span")).toBeInTheDocument();
    });

    test("It should allow HTML tags to be rendered", () => {
      const props: ParagraphProps = {
        children: "<a href='#'>Link</a>",
      };

      const { container } = renderComponent(props);

      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link?.href).toContain("#");
    });

    test("It should differentiate between plain text and HTML", () => {
      const plainProps: ParagraphProps = {
        children: "Plain text",
      };

      const htmlProps: ParagraphProps = {
        children: "<b>HTML text</b>",
      };

      const { container: plainP } = renderComponent(plainProps);
      document.body.innerHTML = "";
      const { container: htmlP } = renderComponent(htmlProps);

      expect(plainP.querySelector("b")).toBeNull();
      expect(htmlP.querySelector("b")).toBeInTheDocument();
    });
  });
});
