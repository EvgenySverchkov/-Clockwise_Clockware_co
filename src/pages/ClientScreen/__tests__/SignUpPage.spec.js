import React from "react";
import {create} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import SignUpPage from "../SignUpPage";

const mockStore = configMockStore();

it("Test of <SignUpPage/>", ()=>{
    const mockContextValue = {
        openSuccessWindowWithMsg: jest.fn(),
        openErrorWindowWithMsg: jest.fn(),
        openWarningTooltip: jest.fn(),
        warningTooltipMsg: "Warning"
    }
    const store = mockStore({})
    let component = create(
        <Provider store={store}>
            <Context.Provider value = {mockContextValue}>
                <SignUpPage />
            </Context.Provider>
        </Provider>
    )
    expect(component.toJSON()).toMatchSnapshot();
});