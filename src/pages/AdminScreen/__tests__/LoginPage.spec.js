import React from "react";
import { create } from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import LoginPage from "../LoginPage";

const mockStore = configMockStore();

describe("Test of <LoginPage /> (admin side)", ()=>{
    let initialState = {
        authReducer: {
            adminLoginIsLoad: false
        }
    }
    const mockContextValue = {
        openWarningTooltip: jest.fn(),
        openErrorWindowWithMsg: jest.fn(),
        warningTooltipMsg: "Message"
    }
    const mockProps = {
        history: {
            push: jest.fn()
        }
    }
    it("When the component has a default state (no error and no load state)", ()=>{
        const store = mockStore(initialState);
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        )
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("When the component has loading state (waiting request from server)", ()=>{
        const store = mockStore({...initialState, authReducer: {adminLoginIsLoad: true}});
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        )
        expect(component.toJSON()).toMatchSnapshot();
    });
});