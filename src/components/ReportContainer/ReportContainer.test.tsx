import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import c3 from "c3";

import ReportContainer from "./ReportContainer";

describe("<ReportContainer>", () => {
  /* All relevant async API requests are mocked in src/__mocks__/server-handlers.ts using the msw library. You may also override and mock API calls independently within this test suite */

  it("should render the report container default elements and content", async () => {
    // given and when
    render(<ReportContainer />);

    // then
    await screen.findByRole("option", { name: "Beta Project 1" }); // using await and findByRole() for async requests to finish before subsequent assertions

    expect(
      screen.getByRole("option", { name: "Beta Project 2" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Beta Gateway 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Beta Gateway 2" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "No reports" })
    ).toBeInTheDocument();
  });

  it("should render the report data, and click the accordion to render granular table data of transactions, along with chart rendering call", async () => {
    // given
    const user = userEvent.setup();

    render(<ReportContainer />);

    // then
    await screen.findByRole("option", { name: "Beta Project 1" }); // wait for options to be loaded via async request before proceeding

    // when
    user.selectOptions(
      screen.getByRole("combobox", { name: "Select a project" }),
      screen.getByRole("option", { name: "Beta Project 1" })
    );

    // and when
    user.selectOptions(
      screen.getByRole("combobox", { name: "Select a gateway" }),
      screen.getByRole("option", { name: "All gateways" })
    );

    // and when
    await user.click(screen.getByRole("button", { name: "Generate report" }));

    // then
    expect(
      screen.queryByRole("heading", { name: "No reports" })
    ).not.toBeInTheDocument(); // No reports heading should not be in the document now

    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBe(2);
    expect(listItems.at(0)).toHaveTextContent("Beta Project 1"); // report data body filter label
    expect(listItems.at(1)).toHaveTextContent("All gateways"); // report data body filter label

    const accordionTitleElem = screen.getByRole("heading", {
      name: "Beta Gateway 2",
    });
    expect(accordionTitleElem).toBeInTheDocument(); // clickable accordion header title

    // and when - accordion title is clicked
    await user.click(accordionTitleElem);

    // then - verify transactions table data is rendered (within accordion content), and the c3 chart generate function is called to render the chart
    expect(screen.getByRole("row", { name: /Date/ })).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: /Transaction ID/ })
    ).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /Amount/ })).toBeInTheDocument();

    expect(screen.getByRole("row", { name: /2021-02-15/ })).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: /6149cf56039cb62733114812/ })
    ).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /72.87 USD/ })).toBeInTheDocument();

    expect(screen.getByLabelText("Total amount from table")).toHaveTextContent(
      "Total: 72.87 USD"
    );

    expect(
      screen.getByLabelText("Legend label: Beta Gateway 2")
    ).toBeInTheDocument(); // c3 chart legend label

    expect(c3.generate).toHaveBeenCalledTimes(1); // c3 chart generate function called once (to render the chart)

    expect(screen.getByText("GATEWAY TOTAL | 72.87 USD")).toBeInTheDocument(); // c3 chart container total label
  });
});
