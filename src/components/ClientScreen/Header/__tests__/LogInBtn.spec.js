import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";

import LogInBtn from "../LogInBtn";

it("Test of <LogInBtn />", ()=>{
    const component = create(
        <MemoryRouter initialEntries={["/"]}>
            <LogInBtn />
        </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
});