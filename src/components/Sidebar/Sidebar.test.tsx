import { render, screen } from "@testing-library/react";

import Sidebar from "./Sidebar";

describe("<Sidebar>", () => {
  it("should render the icons", () => {
    // given and when
    render(<Sidebar />);

    // then
    expect(screen.getByLabelText("nav-barchart")).toBeInTheDocument();
    expect(screen.getByLabelText("nav-grid")).toBeInTheDocument();
    expect(screen.getByLabelText("nav-computer")).toBeInTheDocument();
    expect(screen.getByLabelText("nav-piechart")).toBeInTheDocument();
    expect(screen.getByLabelText("nav-logout")).toBeInTheDocument();
  });
});
