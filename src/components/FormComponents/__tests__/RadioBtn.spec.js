import React from 'react';
import {create} from "react-test-renderer";

import RadioBtn from "../RadioBtn";

it("<RadioBtn /> test which is used in forms", ()=>{
    const mockProps = {
        id: "1", 
        value: "Value", 
        name: "Name", 
        chngHandler: jest.fn()
    }
    const component = create(<RadioBtn {...mockProps}>
        <div>Some element</div>
    </RadioBtn>)
    expect(component.toJSON()).toMatchSnapshot();
});