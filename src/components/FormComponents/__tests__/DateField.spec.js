import React from 'react';
import {create} from "react-test-renderer";

import DateField from "../DateField";
import ContextComponent from "../../../ContextComponent";

it("<DateField /> test which is used in forms", ()=>{
    const mockProps = {
        min: "2020-09-23", 
        chngHandler: jest.fn(), 
        value: '2020-09-23', 
        name: "Name", 
        max: "2021-09-23"
    }
    const mockContextValue = {
        warningTooltipMsg: "Message",
        isOpenWarningTooltip: false,
        idForTooltip: 1
    }
    const component = create(
        <ContextComponent.Provider value={mockContextValue}>
            <DateField {...mockProps}/>
        </ContextComponent.Provider>
    )
    expect(component.toJSON()).toMatchSnapshot();
})