import React from "react";
import {create} from "react-test-renderer";

import Context from "../../ContextComponent";
import SignUpForm from "../SignUpForm";

it("Test of <SignUpForm/>", ()=>{
    const mockContextValue = {
        closeWrningTooltip: jest.fn(),
        warningTooltipMsg: "Warning"
    }
    const mockProps = {
        handler: jest.fn()
    }
    const component = create(
        <Context.Provider value={mockContextValue}>
            <SignUpForm {...mockProps}/>
        </Context.Provider>
    )
    expect(component.toJSON()).toMatchSnapshot();
});