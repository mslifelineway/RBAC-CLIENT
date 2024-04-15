import { create } from "react-test-renderer";
import { AccountDropdown } from "../";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return {
    ...original,
    createPortal: (node: JSX.Element) => node,
  };
});

describe("AccountDropdown Component", () => {
  it("renders correctly with default props", () => {
    const component = create(
      <Provider store={store}>
        <AccountDropdown />
      </Provider>
    );
    expect(component.toJSON).toMatchSnapshot();
  });
});
