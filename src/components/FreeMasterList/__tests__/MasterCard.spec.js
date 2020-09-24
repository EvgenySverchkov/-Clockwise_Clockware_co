import React from "react";
import {create} from "react-test-renderer";

import MasterCard from "../MasterCard";

it("Test of <MasterCard /> for <FreeMasterList/>", ()=>{
    const mockProps = {
        id: 1, 
        name: "Name", 
        rating: 5
    }
    const component = create(<MasterCard {...mockProps}/>);

    expect(component.toJSON()).toMatchSnapshot();
});