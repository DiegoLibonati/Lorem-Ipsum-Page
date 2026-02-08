import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { LoremIpsumPage } from "@/pages/LoremIpsumPage/LoremIpsumPage";

import paragraphs from "@/constants/paragraphs";

import { mockParagraphs } from "@tests/__mocks__/paragraphs.mock";

jest.doMock("@/constants/paragraphs", () => ({
  default: mockParagraphs,
}));

const renderPage = (): Page => {
  const container = LoremIpsumPage();
  document.body.appendChild(container);
  return container;
};

describe("LoremIpsumPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("General Tests", () => {
    it("should render the main component structure", () => {
      renderPage();

      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("lorem-ipsum-page");
    });

    it("should render header section", () => {
      const container = renderPage();

      const header = container.querySelector<HTMLElement>(".header-app");
      const title = screen.getByText("TIRED OF BORING LOREM IPSUM?");

      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });

    it("should render lorem ipsum section", () => {
      const container = renderPage();

      const section = container.querySelector<HTMLElement>(".lorem-ipsum");
      const form =
        container.querySelector<HTMLFormElement>(".lorem-ipsum__form");
      const paragraphsContainer = container.querySelector<HTMLElement>(
        ".lorem-ipsum__paragraphs"
      );

      expect(section).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(paragraphsContainer).toBeInTheDocument();
    });

    it("should render h1 for title", () => {
      renderPage();

      const title = screen.getByRole("heading", {
        name: /tired of boring lorem ipsum/i,
        level: 1,
      });
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H1");
    });
  });

  describe("Form Elements Tests", () => {
    it("should render form with all elements", () => {
      const container = renderPage();

      const form =
        container.querySelector<HTMLFormElement>(".lorem-ipsum__form");
      const label = screen.getByText("Paragraphs:");
      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      expect(form).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it("should have input with correct type", () => {
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      expect(input).toHaveAttribute("type", "number");
      expect(input).toHaveClass("lorem-ipsum__input");
    });

    it("should have submit button with correct attributes", () => {
      renderPage();

      const button = screen.getByRole("button", { name: /generate/i });
      expect(button).toHaveClass("lorem-ipsum__btn-generate");
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveTextContent("GENERATE");
    });

    it("should render label element", () => {
      const container = renderPage();

      const label = container.querySelector<HTMLParagraphElement>(
        ".lorem-ipsum__label"
      );
      expect(label).toBeInTheDocument();
      expect(label?.tagName).toBe("P");
      expect(label).toHaveTextContent("Paragraphs:");
    });

    it("should render article for paragraphs container", () => {
      const container = renderPage();

      const article = container.querySelector<HTMLElement>(
        ".lorem-ipsum__paragraphs"
      );
      expect(article).toBeInTheDocument();
      expect(article?.tagName).toBe("ARTICLE");
    });
  });

  describe("Form Submission Tests", () => {
    it("should generate paragraphs when form is submitted", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "3");
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(generatedParagraphs).toHaveLength(3);
    });

    it("should generate correct number of paragraphs based on input", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "5");
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(generatedParagraphs).toHaveLength(5);
    });

    it("should generate single paragraph when input is 1", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(generatedParagraphs).toHaveLength(1);
    });

    it("should not generate paragraphs when input is 0", async () => {
      const user = userEvent.setup();
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "0");
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(generatedParagraphs).toHaveLength(0);
    });
  });

  describe("Paragraphs Generation Tests", () => {
    it("should append paragraphs to paragraphs container", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "2");
      await user.click(button);

      const paragraphsContainer = container.querySelector<HTMLElement>(
        ".lorem-ipsum__paragraphs"
      );
      const paragraphsInContainer =
        paragraphsContainer?.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(paragraphsInContainer).toHaveLength(2);
    });

    it("should generate random paragraphs from paragraphs array", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      const paragraph = container.querySelector<HTMLParagraphElement>(
        ".lorem-ipsum__paragraph"
      );

      expect(paragraph).toHaveTextContent(paragraphs[0]!);
    });

    it("should use Math.random to select paragraphs", async () => {
      const user = userEvent.setup();
      const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "3");
      await user.click(button);

      expect(randomSpy).toHaveBeenCalled();
    });

    it("should create Paragraph components", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "2");
      await user.click(button);

      const paragraphElements =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      paragraphElements.forEach((p) => {
        expect(p).toBeInstanceOf(HTMLParagraphElement);
      });
    });
  });

  describe("Replace Children Tests", () => {
    it("should clear previous paragraphs before generating new ones", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "3");
      await user.click(button);

      let generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );
      expect(generatedParagraphs).toHaveLength(3);

      await user.clear(input!);
      await user.type(input!, "2");
      await user.click(button);

      generatedParagraphs = container.querySelectorAll<HTMLParagraphElement>(
        ".lorem-ipsum__paragraph"
      );
      expect(generatedParagraphs).toHaveLength(2);
    });

    it("should use replaceChildren to clear container", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });
      const paragraphsContainer = container.querySelector<HTMLElement>(
        ".lorem-ipsum__paragraphs"
      );

      const replaceChildrenSpy = jest.spyOn(
        paragraphsContainer!,
        "replaceChildren"
      );

      await user.clear(input!);
      await user.type(input!, "2");
      await user.click(button);

      expect(replaceChildrenSpy).toHaveBeenCalled();
    });

    it("should not accumulate paragraphs from multiple submissions", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );
      expect(generatedParagraphs).toHaveLength(1);
    });
  });

  describe("Input Conversion Tests", () => {
    it("should convert input value to number", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "4");
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(generatedParagraphs).toHaveLength(4);
    });

    it("should handle string number conversion", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      input!.value = "3";
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(generatedParagraphs).toHaveLength(3);
    });
  });

  describe("Random Selection Tests", () => {
    it("should select different paragraphs with different random values", async () => {
      const user = userEvent.setup();
      const randomValues = [0, 0.5, 0.99];
      let callIndex = 0;

      jest.spyOn(Math, "random").mockImplementation(() => {
        const value = randomValues[callIndex % randomValues.length];
        callIndex++;
        return value!;
      });

      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "3");
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(generatedParagraphs).toHaveLength(3);
      expect(generatedParagraphs[0]).toHaveTextContent(paragraphs[0]!);
      expect(generatedParagraphs[1]).toHaveTextContent(
        paragraphs[Math.floor(0.5 * paragraphs.length)]!
      );
      expect(generatedParagraphs[2]).toHaveTextContent(
        paragraphs[Math.floor(0.99 * paragraphs.length)]!
      );
    });

    it("should use Math.floor for random index calculation", async () => {
      const user = userEvent.setup();
      const floorSpy = jest.spyOn(Math, "floor");
      jest.spyOn(Math, "random").mockReturnValue(0.7);

      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "2");
      await user.click(button);

      expect(floorSpy).toHaveBeenCalled();
    });
  });

  describe("Form Behavior Tests", () => {
    it("should prevent default form submission", async () => {
      const user = userEvent.setup();
      const container = renderPage();

      const form =
        container.querySelector<HTMLFormElement>(".lorem-ipsum__form");
      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );

      const submitSpy = jest.fn((e: Event) => {
        e.preventDefault();
      });
      form!.addEventListener("submit", submitSpy);

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(screen.getByRole("button", { name: /generate/i }));

      await waitFor(() => {
        expect(submitSpy).toHaveBeenCalled();
      });
    });

    it("should have form element with correct class", () => {
      const container = renderPage();

      const form =
        container.querySelector<HTMLFormElement>(".lorem-ipsum__form");
      expect(form).toBeInstanceOf(HTMLFormElement);
      expect(form?.tagName).toBe("FORM");
    });
  });

  describe("DOM Structure Tests", () => {
    it("should have correct section structure", () => {
      const container = renderPage();

      const headerSection = container.querySelector<HTMLElement>(".header-app");
      const loremSection = container.querySelector<HTMLElement>(".lorem-ipsum");

      expect(headerSection?.tagName).toBe("SECTION");
      expect(loremSection?.tagName).toBe("SECTION");
    });

    it("should nest form inside lorem ipsum section", () => {
      const container = renderPage();

      const loremSection = container.querySelector<HTMLElement>(".lorem-ipsum");
      const form =
        loremSection?.querySelector<HTMLFormElement>(".lorem-ipsum__form");

      expect(form).toBeInTheDocument();
    });

    it("should nest paragraphs container inside lorem ipsum section", () => {
      const container = renderPage();

      const loremSection = container.querySelector<HTMLElement>(".lorem-ipsum");
      const paragraphsContainer = loremSection?.querySelector<HTMLElement>(
        ".lorem-ipsum__paragraphs"
      );

      expect(paragraphsContainer).toBeInTheDocument();
    });
  });

  describe("Multiple Generations Tests", () => {
    it("should handle multiple consecutive generations", async () => {
      const user = userEvent.setup();
      jest.spyOn(Math, "random").mockReturnValue(0);
      const container = renderPage();

      const input = container.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.clear(input!);
      await user.type(input!, "2");
      await user.click(button);

      await user.clear(input!);
      await user.type(input!, "3");
      await user.click(button);

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      const generatedParagraphs =
        container.querySelectorAll<HTMLParagraphElement>(
          ".lorem-ipsum__paragraph"
        );

      expect(generatedParagraphs).toHaveLength(1);
    });
  });
});
