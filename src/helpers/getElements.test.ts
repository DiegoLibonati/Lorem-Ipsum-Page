import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const { articleContainer, btnGenerate, input } = getElements();

  expect(articleContainer).toBeInTheDocument();
  expect(btnGenerate).toBeInTheDocument();
  expect(input).toBeInTheDocument();
});
