import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Header from "../Header";

const mockStore = configMockStore();


describe("Test of <Header /> on client side", ()=>{
    it("If client is unlogged", ()=>{
        const store = mockStore({
            authReducer: {
                isAuthClient: false
            }
        })
        const component = create(
            <Provider store = {store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Header />
                </MemoryRouter>
            </Provider>
    
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    
    it("If client is logged", ()=>{
        const store = mockStore({
            authReducer: {
                isAuthClient: true
            }
        })
        const component = create(
            <Provider store = {store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Header />
                </MemoryRouter>
            </Provider>
    
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});