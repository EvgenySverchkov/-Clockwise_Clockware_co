import React from "react";

import {create} from "react-test-renderer";
import ChooseTownsField from "../ChooseTownField";

it("<ChooseTownsField /> test which is used in forms", ()=>{
    const mockProps = {
        changeHandler: jest.fn(), 
        isLoad: false, 
        townsArr: [{id: 1, name: "SomeTown"}, {id: 2, name: "SomeTown2"}]
    }
    const component = create(<ChooseTownsField {...mockProps}/>);
    expect(component.toJSON()).toMatchSnapshot();
})