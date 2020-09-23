import React from 'react';
import {create} from "react-test-renderer";

import CheckBtn from "../CheckBtn";

it("<CheckBtn /> test which is used in forms", ()=>{
    const mockProps = {
        id: 1, 
        name: "Name", 
        changeHandler: jest.fn(), 
        nm: "Nm"
    }
    const component = create(<CheckBtn {...mockProps}/>)
    expect(component.toJSON()).toMatchSnapshot();
})