import React from "react";
import {create} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom"

import LogOutBtn from "../LogOutBtn";

const mockStore = configMockStore()

it("Test of <LogOutBtn /> on admin side", ()=>{
    const store = mockStore({})
    const component = create(
        <Provider store = {store}>
            <MemoryRouter initialEntries={["/"]}>
                <LogOutBtn />
            </MemoryRouter>
        </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
});