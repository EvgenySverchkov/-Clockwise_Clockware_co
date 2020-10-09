import React from "react";
import {create} from "react-test-renderer";

import DeleteBtn from "../DeleteBtn";

describe("Test of <DeleteBtn />", ()=>{
    const mockProps = {
        deleteMasterById: jest.fn(), 
        id: 1
    }
    it("Default view", ()=>{
        const component = create(<DeleteBtn {...mockProps}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("Check call of handler", ()=>{
        const component = create(<DeleteBtn {...mockProps}/>);
        component.root.findByType("button").props.onClick()
        expect(mockProps.deleteMasterById).toHaveBeenCalledTimes(1);
    });
});