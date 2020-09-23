import React from "react";

import {create} from "react-test-renderer";
import TextFieldWithLabel from "../TextFieldWithLabel";
import ContextComponent from "../../../ContextComponent";

it("<TextFieldWithLabel /> test which is used in forms", ()=>{
    const mockProps = {
        fieldName: "FieldName", 
        changeHandler: jest.fn(), 
        value: "Value"
    }
    const mockContextValue = {
        warningTooltipMsg: "Message",
        isOpenWarningTooltip: false,
        idForTooltip: 1
    }
    const component = create(
        <ContextComponent.Provider value = {mockContextValue}>
            <TextFieldWithLabel {...mockProps}/>
        </ContextComponent.Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
})