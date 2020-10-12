import React from "react";
import {create, act} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import configMockStore from "redux-mock-store";
import {Provider} from "react-redux";

import LogOutBtn from "../LogOutBtn";

const mockStore = configMockStore();

describe("Test of <LogOutBtn/>", ()=>{
    const store = mockStore({
        ordersReducer: {
            currentOrder: {}
        }
    });
    it("Default view", ()=>{
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <LogOutBtn/>
                </Provider>
            </MemoryRouter>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("When click on button", ()=>{
        const mockFn = jest.fn()
        global.localStorage.__proto__.removeItem = mockFn;
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store={store}>
                    <LogOutBtn />
                </Provider>
            </MemoryRouter>
        );
        act(()=>{
            component.root.findByProps({className: "btn btn-danger"}).props.onClick();
        });
        expect(mockFn.mock.calls.length).toBe(2);
    });
});