import React from 'react';
import {create} from "react-test-renderer";

import TimeField from "../TimeField";
import ContextComponent from "../../../ContextComponent";

it("<TimeField /> test which is used in forms", ()=>{
    const mockProps = {
        name: "Name", 
        max: "18:00", 
        min: "09:00", 
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
            <TimeField {...mockProps}/>
        </ContextComponent.Provider>
    )
    expect(component.toJSON()).toMatchSnapshot();
});