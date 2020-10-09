import React from "react";
import {create} from "react-test-renderer";

import NavBtn from "../NavBtn";

it("Test of <NavBtn /> on admin side", ()=>{
    const mockProps = {
        title: "Title"
    }
    const component = create(
        <NavBtn {...mockProps}>
            <button>Some text1</button>
            <button>Some text2</button>
        </NavBtn>);
    expect(component.toJSON()).toMatchSnapshot();
});