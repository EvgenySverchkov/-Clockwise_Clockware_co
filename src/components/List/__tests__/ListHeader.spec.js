import React from "react";
import {create} from 'react-test-renderer';

import ListHeader from "../ListHeader";

it("Test of <ListHeader />", ()=>{
    const mockProps = {
        templArr: ["name", "rating"]
    }
    const component = create(<ListHeader {...mockProps}/>);
    expect(component.toJSON()).toMatchSnapshot();
});