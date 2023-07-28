import { render, screen } from "@testing-library/react";

import ReportNoData from "./ReportNoData";

describe("<ReportNoData>", () => {
  it("should render the no data texts and image", () => {
    // given and when
    render(<ReportNoData />);

    // then
    expect(screen.getByText("No reports")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Currently you have no data for the reports to be generated. Once you start generating traffic through the Balance application the reports will be shown."
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText("No reports image")).toBeInTheDocument();
  });
});
