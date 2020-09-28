import React from "react";
import { create } from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import LoginPage from "../LoginPage";

const mockStore = configMockStore();

describe("Test of <LoginPage />", ()=>{
    global.fetch = Promise.resolve(jest.fn(()=>Promise.resolve({json: jest.fn()})));
    let store = mockStore({
        authReducer: {
            clientLoginIsLoad: false
        }
    });
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