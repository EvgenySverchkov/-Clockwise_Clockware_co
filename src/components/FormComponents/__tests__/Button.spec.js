import React from 'react';
import {create} from "react-test-renderer";

import Button from "../Button";

it("<Button /> test which is used in forms", ()=>{
    const mockProps = {
        loading: false, 
        value: "Click"
    }
    const component = create(<Button {...mockProps}/>)
    expect(component.toJSON()).toMatchSnapshot();
});