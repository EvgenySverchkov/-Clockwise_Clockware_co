import React from "react";
import {create} from "react-test-renderer";

import SubmitBtn from "../SubmitBtn";

it("Test of <SubmitBtn/> for <FreeMasterList/>", ()=>{
    let mockProps = {
        loading: false
    }
    let component = create(<SubmitBtn {...mockProps}/>);

    expect(component.toJSON()).toMatchSnapshot();

    mockProps = {
        loading: true
    }
    component.update(<SubmitBtn {...mockProps}/>);

    expect(component.root.findByProps({type: "submit"}).props.value).toBe("Loading...");
});