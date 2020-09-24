import React from "react";
import {create} from "react-test-renderer";

import EmptyList from "../EmptyList";

it("Test of <EmptyList/> for <FreeMasterList/>", ()=>{
    let component = create(
        <EmptyList>
            <div>Mock element</div>
        </EmptyList>
    );
    expect(component.toJSON()).toMatchSnapshot();
});