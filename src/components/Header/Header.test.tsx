import { screen, render } from "@testing-library/react";

import Header from "./Header";

/* All relevant async API requests are mocked in src/__mocks__/server-handlers.ts using the msw library. You may also override and mock API calls independently within this test suite */

describe("<Header>", () => {
  it("should render the header elements, including username with initials, after fetching with mocked response", async () => {
    // given and when
    render(<Header />);

    // then
    expect(screen.getByAltText("MVP logo")).toBeInTheDocument();
    expect(screen.getByAltText("Hamburger menu")).toBeInTheDocument();

    await screen.findByText("JW");
    expect(screen.getByText("John Wick")).toBeInTheDocument();
  });
});
