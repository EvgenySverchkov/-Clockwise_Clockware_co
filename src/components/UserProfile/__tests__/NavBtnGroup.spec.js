import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import NavBtnGroup from "../NavBtnGroup";

const mockStore = configMockStore();

it("Test of <NavBtnGroup />", ()=>{
    const store = mockStore({
        ordersReducer: {
            currentOrder: {}
        }
    })
    const component = create(
        <MemoryRouter initialEntries={["/"]}>
            <Provider store = {store}>
                <NavBtnGroup/>
            </Provider>
        </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
});