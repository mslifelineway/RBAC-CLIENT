import { create } from "react-test-renderer";
import { PrivateLayout } from "../PrivateLayout";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { BrowserRouter as Router } from "react-router-dom";

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

describe("PrivateLayout Component", () => {
  test("renders correctly with children", () => {
    const component = create(
      <Provider store={store}>
        <Router>
          <PrivateLayout>
            <div>Child Component</div>
          </PrivateLayout>
        </Router>
      </Provider>
    );
    expect(component.toJSON).toMatchSnapshot();
  });
});
