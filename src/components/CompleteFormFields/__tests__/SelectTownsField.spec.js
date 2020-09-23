import React from "react";

import {create} from "react-test-renderer";
import SelectTownsField from "../SelectTownsField";

it("<SelectTownsField /> test which is used in forms", ()=>{
    const mockProps = {
        changeHandler: jest.fn(),
        townsArr: [{id: 1, name: "SomeTown"}, {id: 2, name: "SomeTown2"}]
    }
    const component = create(<SelectTownsField {...mockProps}/>);
    expect(component.toJSON()).toMatchSnapshot();
})