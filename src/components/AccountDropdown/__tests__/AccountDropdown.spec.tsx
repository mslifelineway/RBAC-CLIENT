import { act, create } from "react-test-renderer";
import { AccountDropdown } from "../";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "../../../redux/reducers";
import {
  IAdministrator,
  setLoginTestData,
} from "../../../redux/reducers/auth.slice";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return {
    ...original,
    createPortal: (node: JSX.Element) => node,
  };
});

const mockStore = configureStore({
  reducer: {
    authReducer: reducers.authReducer,
  },
});

describe("AccountDropdown Component", () => {
  it("renders correctly with default props", () => {
    const component = create(
      <Provider store={mockStore}>
        <AccountDropdown />
      </Provider>
    );
    expect(component.toJSON).toMatchSnapshot();
  });
  it("renders roles of current user in account dropdown ", () => {
    const initialState: IAdministrator = {
      _id: "661ab9f1c3993d0eb721e911",
      email: "admin@gmail.com",
      firstName: "test",
      lastName: "me",
      phoneNumber: "7015720216",
      roles: ["ADMINISTRATOR"],
      permissions: [],
    };
    act(() => {
      mockStore.dispatch(setLoginTestData(initialState));
    });

    const component = create(
      <Provider store={mockStore}>
        <AccountDropdown />
      </Provider>
    );
    const rolesElement = component.root.findByProps({ "data-testid": "roles" });

    expect(component.toJSON()).toMatchSnapshot();
    expect(rolesElement.props.children).toEqual(
      `(${initialState.roles.toString()})`
    );
  });
});
