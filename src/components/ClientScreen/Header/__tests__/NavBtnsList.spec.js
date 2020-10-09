import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import NavBtnsList from "../NavBtnsList";

const mockStore = configMockStore();

describe("Test of <NavBtnsList />", ()=>{
    it("If user is unlogged", ()=>{
        const store = mockStore({
            authReducer:{
                isAuthClient: false
            }
        });
        const component = create(
            <Provider store={store}>
                <MemoryRouter>
                    <NavBtnsList />
                </MemoryRouter>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("If user is logged", ()=>{
        const store = mockStore({
            authReducer:{
                isAuthClient: true
            }
        });
        const component = create(
            <Provider store={store}>
                <MemoryRouter>
                    <NavBtnsList />
                </MemoryRouter>
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});