import React from 'react';
import {create} from "react-test-renderer";

import TextField from "../TextField";
import ContextComponent from "../../../ContextComponent";

it("<TextField /> test which is used in forms", ()=>{
    const mockProps = {
        id: "1", 
        name: "Name", 
        chngHandler: jest.fn(), 
        value: "Value"
    }
    const mockContextValue = {
        warningTooltipMsg: "Message",
        isOpenWarningTooltip: false,
        idForTooltip: 1
    }
    const component = create(
        <ContextComponent.Provider value={mockContextValue}>
            <TextField {...mockProps}/>
        </ContextComponent.Provider>
    )
    expect(component.toJSON()).toMatchSnapshot();
});