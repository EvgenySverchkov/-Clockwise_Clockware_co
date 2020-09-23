import React from "react";

import {create} from "react-test-renderer";
import ChooseClockSizeField from "../ChooseClockSizeField";

it("<ChooseClockSizeField /> test which is used in forms", ()=>{
    const mockProps = {
        changeHandler: jest.fn()
    }
    const component = create(<ChooseClockSizeField {...mockProps}/>);
    expect(component.toJSON()).toMatchSnapshot();
})