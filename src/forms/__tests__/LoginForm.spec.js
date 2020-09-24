import React from 'react';
import {create} from "react-test-renderer";

import LoginForm from "../LoginForm";
import Context from "../../ContextComponent";

it("Test of <LoginForm/>", ()=>{
    let mockProps = {
        submitHandler: jest.fn(), 
        authIsLoad: false
    }
    const mockContextValue = {
        closeWrningTooltip: jest.fn(),
        warningTooltipMsg: "Warning"
    }
    const component = create(
        <Context.Provider value = {mockContextValue}>
            <LoginForm {...mockProps}/>
        </Context.Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
});