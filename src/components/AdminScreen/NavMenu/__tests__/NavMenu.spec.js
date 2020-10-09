import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom"
import { Provider } from "react-redux";
import consigMockStore from "redux-mock-store";

import NavMenu from "../NavMenu";

const mockStore = consigMockStore();

it("Test of <NavMenu /> on admin side", ()=>{
    const store = mockStore();
    const component = create(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
                <NavMenu />
            </MemoryRouter>
        </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
});