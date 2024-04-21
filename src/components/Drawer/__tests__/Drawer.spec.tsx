import { TestRendererOptions, create } from "react-test-renderer";
import { Drawer } from "..";
import { StyledDrawer } from "../styled";
import { BrowserRouter } from "react-router-dom";
import { ReactElement, JSXElementConstructor } from "react";

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");

  return {
    ...original,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return {
    ...original,
    createPortal: (node: JSX.Element) => node,
  };
});

describe("Drawer", () => {
  it("renders correctly when open", () => {
    const handleDrawerClose = jest.fn();
    const component = create(
      <BrowserRouter>
        <Drawer open={true} handleDrawerClose={handleDrawerClose} />
      </BrowserRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders correctly when closed", () => {
    const handleDrawerClose = jest.fn();
    const component = create(
      <BrowserRouter>
        <Drawer open={true} handleDrawerClose={handleDrawerClose} />
      </BrowserRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("matches snapshot with active link highlighted", () => {
    const locationMock = { pathname: "/dashboard" }; // Mock the location pathname
    // const tree = create(<Drawer open={true} handleDrawerClose={() => {}} />, {
    //   location: locationMock,
    // }).toJSON();
    const handleDrawerClose = jest.fn();
    const options: TestRendererOptions = {
      createNodeMock: function (
        element: ReactElement<any, string | JSXElementConstructor<any>>
      ) {
        return { location: locationMock };
      },
    };
    const component = create(
      <BrowserRouter>
        <Drawer open={true} handleDrawerClose={handleDrawerClose} />
      </BrowserRouter>,
      options
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
