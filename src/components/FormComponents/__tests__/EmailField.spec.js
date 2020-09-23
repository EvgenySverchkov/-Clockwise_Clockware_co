import React from 'react';
import {create} from "react-test-renderer";

import EmailField from "../EmailField";
import ContextComponent from "../../../ContextComponent";

it("<EmailField /> test which is used in forms", ()=>{
    const mockProps = {
        id: "1",
        chngHandler: jest.fn(), 
        value: "some@mail.com", 
    }
    const mockContextValue = {
        warningTooltipMsg: "Message",
        isOpenWarningTooltip: false,
        idForTooltip: 1
    }
    const component = create(
        <ContextComponent.Provider value={mockContextValue}>
            <EmailField {...mockProps}/>
        </ContextComponent.Provider>
    )
    expect(component.toJSON()).toMatchSnapshot();
});