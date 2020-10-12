import React from "react";
import {create} from "react-test-renderer";

import CustomTooltip from "../CustomTooltip";

it("Test of <CustomTooltip />", ()=>{
    const id="ID";
    const mockProps = {
        children: (
            <input name="mockInput" id={id}/>
        ),
        title: "Message for tooltip",
        fieldId: id,
        tooltipIsOpen: false,
    }
    const component = create(<CustomTooltip {...mockProps}/>);
    expect(component.toJSON()).toMatchSnapshot();
});