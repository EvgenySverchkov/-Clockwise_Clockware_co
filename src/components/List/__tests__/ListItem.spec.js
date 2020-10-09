import React from "react";
import {create} from 'react-test-renderer';

import ListItem from "../ListItem";

it("Test of <ListHeader />", ()=>{
    const mockProps = {
        infoObj: {
            id: 1,
            rating: 5,
            name: "Petrovich",
            towns: ""
        },
        mainRows: ["name", "rating"]
    }
    const component = create(<ListItem {...mockProps}/>);
    expect(component.toJSON()).toMatchSnapshot();
});