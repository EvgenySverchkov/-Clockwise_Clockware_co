import React from 'react';
import {create} from "react-test-renderer";

import NumField from "../NumField";
import ContextComponent from "../../../ContextComponent";

it("<NumField /> test which is used in forms", ()=>{
    const mockProps = {
        max: 5, 
        min: 1, 
        id: "1", 
        value: 5, 
        chngHandler: jest.fn(), 
        name: "Name"
    }
    const mockContextValue = {
        warningTooltipMsg: "Message",
        isOpenWarningTooltip: false,
        idForTooltip: 1
    }
    const component = create(
        <ContextComponent.Provider value={mockContextValue}>
            <NumField {...mockProps}/>
        </ContextComponent.Provider>
    )
    expect(component.toJSON()).toMatchSnapshot();
});