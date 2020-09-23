import React from 'react';
import {create} from "react-test-renderer";

import Label from "../Label";

it("<Label /> test which is used in forms", ()=>{
    const mockProps = { 
        forId: "1"
    }
    const component = create(<Label {...mockProps}>
        <div>Some element</div>
    </Label>)
    expect(component.toJSON()).toMatchSnapshot();
});