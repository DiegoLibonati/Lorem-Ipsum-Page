import { screen, waitFor } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { LoremIpsumPage } from "@src/pages/LoremIpsumPage/LoremIpsumPage";

import paragraphs from "@src/constants/paragraphs";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = LoremIpsumPage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/constants/paragraphs", () => [
  "First paragraph text",
  "Second paragraph text",
  "Third paragraph text",
  "Fourth paragraph text",
  "Fifth paragraph text",
]);

describe("LoremIpsumPage.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  describe("General Tests.", () => {
    test("It should render the main component structure", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("lorem-ipsum-page");
    });

    test("It should render header section", () => {
      renderComponent();

      const header = document.querySelector(".header-app");
      const title = screen.getByText("TIRED OF BORING LOREM IPSUM?");

      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });

    test("It should render lorem ipsum section", () => {
      renderComponent();

      const section = document.querySelector(".lorem-ipsum");
      const form = document.querySelector(".lorem-ipsum__form");
      const paragraphsContainer = document.querySelector(
        ".lorem-ipsum__paragraphs"
      );

      expect(section).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(paragraphsContainer).toBeInTheDocument();
    });

    test("It should render h1 for title", () => {
      renderComponent();

      const title = document.querySelector(
        ".header-app__title"
      ) as HTMLHeadingElement;

      expect(title).toBeInstanceOf(HTMLHeadingElement);
      expect(title.tagName).toBe("H1");
    });
  });

  describe("Form Elements Tests.", () => {
    test("It should render form with all elements", () => {
      renderComponent();

      const form = document.querySelector(".lorem-ipsum__form");
      const label = screen.getByText("Paragraphs:");
      const input = document.querySelector(".lorem-ipsum__input");
      const button = screen.getByRole("button", { name: /generate/i });

      expect(form).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test("It should have input with correct type", () => {
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );

      expect(input?.type).toBe("number");
      expect(input).toHaveClass("lorem-ipsum__input");
    });

    test("It should have submit button with correct attributes", () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /generate/i });

      expect(button).toHaveClass("lorem-ipsum__btn-generate");
      expect(button.getAttribute("type")).toBe("submit");
      expect(button.textContent?.trim()).toBe("GENERATE");
    });

    test("It should render label element", () => {
      renderComponent();

      const label = document.querySelector(".lorem-ipsum__label");

      expect(label).toBeInTheDocument();
      expect(label?.tagName).toBe("P");
      expect(label?.textContent).toBe("Paragraphs:");
    });

    test("It should render article for paragraphs container", () => {
      renderComponent();

      const article = document.querySelector(".lorem-ipsum__paragraphs");

      expect(article).toBeInTheDocument();
      expect(article?.tagName).toBe("ARTICLE");
    });
  });

  describe("Form Submission Tests.", () => {
    test("It should generate paragraphs when form is submitted", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "3");
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(generatedParagraphs.length).toBe(3);
    });

    test("It should generate correct number of paragraphs based on input", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "5");
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(generatedParagraphs.length).toBe(5);
    });

    test("It should generate single paragraph when input is 1", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "1");
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(generatedParagraphs.length).toBe(1);
    });

    test("It should not generate paragraphs when input is 0", async () => {
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "0");
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(generatedParagraphs.length).toBe(0);
    });
  });

  describe("Paragraphs Generation Tests.", () => {
    test("It should append paragraphs to paragraphs container", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "2");
      await user.click(button);

      const container = document.querySelector(".lorem-ipsum__paragraphs");
      const paragraphsInContainer = container?.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(paragraphsInContainer?.length).toBe(2);
    });

    test("It should generate random paragraphs from paragraphs array", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "1");
      await user.click(button);

      const paragraph = document.querySelector(".lorem-ipsum__paragraph");

      expect(paragraph?.textContent).toBe(paragraphs[0]);
    });

    test("It should use Math.random to select paragraphs", async () => {
      const randomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "3");
      await user.click(button);

      expect(randomSpy).toHaveBeenCalled();
    });

    test("It should create Paragraph components", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "2");
      await user.click(button);

      const paragraphElements = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      paragraphElements.forEach((p) => {
        expect(p).toBeInstanceOf(HTMLParagraphElement);
      });
    });
  });

  describe("Replace Children Tests.", () => {
    test("It should clear previous paragraphs before generating new ones", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "3");
      await user.click(button);

      let generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );
      expect(generatedParagraphs.length).toBe(3);

      await user.clear(input!);
      await user.type(input!, "2");
      await user.click(button);

      generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );
      expect(generatedParagraphs.length).toBe(2);
    });

    test("It should use replaceChildren to clear container", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });
      const container = document.querySelector<HTMLElement>(
        ".lorem-ipsum__paragraphs"
      );

      const replaceChildrenSpy = jest.spyOn(container!, "replaceChildren");

      await user.type(input!, "2");
      await user.click(button);

      expect(replaceChildrenSpy).toHaveBeenCalled();
    });

    test("It should not accumulate paragraphs from multiple submissions", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "1");
      await user.click(button);

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );
      expect(generatedParagraphs.length).toBe(1);
    });
  });

  describe("Input Conversion Tests.", () => {
    test("It should convert input value to number", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "4");
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(generatedParagraphs.length).toBe(4);
    });

    test("It should handle string number conversion", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      input!.value = "3";
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(generatedParagraphs.length).toBe(3);
    });
  });

  describe("Random Selection Tests.", () => {
    test("It should select different paragraphs with different random values", async () => {
      const randomValues = [0, 0.5, 0.99];
      let callIndex = 0;

      jest.spyOn(Math, "random").mockImplementation(() => {
        const value = randomValues[callIndex % randomValues.length];
        callIndex++;
        return value;
      });

      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "3");
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(generatedParagraphs.length).toBe(3);
      expect(generatedParagraphs[0].textContent).toBe(paragraphs[0]);
      expect(generatedParagraphs[1].textContent).toBe(
        paragraphs[Math.floor(0.5 * paragraphs.length)]
      );
      expect(generatedParagraphs[2].textContent).toBe(
        paragraphs[Math.floor(0.99 * paragraphs.length)]
      );
    });

    test("It should use Math.floor for random index calculation", async () => {
      const floorSpy = jest.spyOn(Math, "floor");
      jest.spyOn(Math, "random").mockReturnValue(0.7);

      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "2");
      await user.click(button);

      expect(floorSpy).toHaveBeenCalled();
    });
  });

  describe("Form Behavior Tests.", () => {
    test("It should prevent default form submission", async () => {
      renderComponent();

      const form = document.querySelector(
        ".lorem-ipsum__form"
      ) as HTMLFormElement;
      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );

      const submitSpy = jest.fn((e) => e.preventDefault());
      form.addEventListener("submit", submitSpy);

      await user.type(input!, "1");
      await user.click(screen.getByRole("button", { name: /generate/i }));

      await waitFor(() => {
        expect(submitSpy).toHaveBeenCalled();
      });
    });

    test("It should have form element with correct class", () => {
      renderComponent();

      const form = document.querySelector(".lorem-ipsum__form");

      expect(form).toBeInstanceOf(HTMLFormElement);
      expect(form?.tagName).toBe("FORM");
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should have correct section structure", () => {
      const { container } = renderComponent();

      const headerSection = container.querySelector(".header-app");
      const loremSection = container.querySelector(".lorem-ipsum");

      expect(headerSection?.tagName).toBe("SECTION");
      expect(loremSection?.tagName).toBe("SECTION");
    });

    test("It should nest form inside lorem ipsum section", () => {
      renderComponent();

      const loremSection = document.querySelector(".lorem-ipsum");
      const form = loremSection?.querySelector(".lorem-ipsum__form");

      expect(form).toBeInTheDocument();
    });

    test("It should nest paragraphs container inside lorem ipsum section", () => {
      renderComponent();

      const loremSection = document.querySelector(".lorem-ipsum");
      const paragraphsContainer = loremSection?.querySelector(
        ".lorem-ipsum__paragraphs"
      );

      expect(paragraphsContainer).toBeInTheDocument();
    });
  });

  describe("Multiple Generations Tests.", () => {
    test("It should handle multiple consecutive generations", async () => {
      jest.spyOn(Math, "random").mockReturnValue(0);
      renderComponent();

      const input = document.querySelector<HTMLInputElement>(
        ".lorem-ipsum__input"
      );
      const button = screen.getByRole("button", { name: /generate/i });

      await user.type(input!, "2");
      await user.click(button);

      await user.clear(input!);
      await user.type(input!, "3");
      await user.click(button);

      await user.clear(input!);
      await user.type(input!, "1");
      await user.click(button);

      const generatedParagraphs = document.querySelectorAll(
        ".lorem-ipsum__paragraph"
      );

      expect(generatedParagraphs.length).toBe(1);
    });
  });
});
