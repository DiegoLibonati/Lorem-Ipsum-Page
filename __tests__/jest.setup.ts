import "@testing-library/jest-dom";

import { mockParagraphs } from "@tests/__mocks__/paragraphs.mock";

jest.mock("@/constants/paragraphs", () => ({
  __esModule: true,
  default: mockParagraphs,
}));
