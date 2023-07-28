import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ReportFilterBar from "./ReportFilterBar";

describe("<ReportFilterBar>", () => {
  it("should render the filter bar elements", () => {
    // given
    const projects = [
      {
        projectId: "1",
        name: "Alpha Project 1",
      },
      {
        projectId: "2",
        name: "Alpha Project 2",
      },
    ];

    const gateways = [
      {
        gatewayId: "1",
        name: "Alpha Gateway 1",
      },
      {
        gatewayId: "2",
        name: "Alpha Gateway 2",
      },
    ];

    // when
    render(
      <ReportFilterBar // @ts-expect-error - we don't care passing fully typed / structured projects object for this test
        projects={projects} // @ts-expect-error - we don't care passing fully typed / structured gateways object for this test
        gateways={gateways}
        onGenerateReport={() => {}}
      />
    );

    // then
    expect(
      screen.getByRole("combobox", { name: "Select a project" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "Select a gateway" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Alpha Project 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Alpha Project 2" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Alpha Gateway 1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Alpha Gateway 2" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("fromDate")).toBeInTheDocument();
    expect(screen.getByTestId("toDate")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Generate report" })
    ).toBeInTheDocument();
  });

  it('should call "onGenerateReport" when the "Generate report" button is clicked', () => {
    // given
    const user = userEvent.setup();

    const projects = [
      {
        projectId: "1",
        name: "Alpha Project 1",
      },
    ];

    const gateways = [
      {
        gatewayId: "1",
        name: "Alpha Gateway 1",
      },
    ];

    const onGenerateReport = jest.fn();

    // when
    render(
      <ReportFilterBar // @ts-expect-error - we don't care passing fully typed / structured projects object for this test
        projects={projects} // @ts-expect-error - we don't care passing fully typed / structured gateways object for this test
        gateways={gateways}
        onGenerateReport={onGenerateReport}
      />
    );

    user.click(screen.getByRole("button", { name: "Generate report" }));

    // then
    waitFor(() => expect(onGenerateReport).toHaveBeenCalledTimes(1));
  });
});
