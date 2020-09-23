import React from 'react';
import {create} from "react-test-renderer";

import FormGroup from "../FormGroup";

it("<FormGroup /> test which is used in forms", ()=>{
    const component = create(<FormGroup>
        <div>Some element</div>
    </FormGroup>)
    expect(component.toJSON()).toMatchSnapshot();
});