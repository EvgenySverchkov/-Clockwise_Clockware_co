import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";

import NavItem from "../NavItem";

it("Test of <NavItem />", ()=>{
    const mockProps = {
        title: "Title",
        link: "/"
    }
    const component = create(
        <MemoryRouter initialEntries={["/"]}>
            <NavItem {...mockProps}/>
        </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
});