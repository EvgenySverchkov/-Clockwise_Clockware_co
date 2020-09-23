import React from 'react';
import {create} from "react-test-renderer";

import PasswordField from "../PasswordField";
import ContextComponent from "../../../ContextComponent";

it("<PasswordField /> test which is used in forms", ()=>{
    const mockProps = {
        id: "1"
    }
    const mockContextValue = {
        warningTooltipMsg: "Message",
        isOpenWarningTooltip: false,
        idForTooltip: 1
    }
    const component = create(
        <ContextComponent.Provider value={mockContextValue}>
            <PasswordField {...mockProps}/>
        </ContextComponent.Provider>
    )
    expect(component.toJSON()).toMatchSnapshot();
});