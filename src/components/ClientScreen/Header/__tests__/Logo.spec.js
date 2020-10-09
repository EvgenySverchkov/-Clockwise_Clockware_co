import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";

import Logo from "../Logo";

it("Test of <Logo /> on client side", ()=>{
    const component = create(
        <MemoryRouter initialEntries={["/"]}>
            <Logo>
                I'm LOGO
            </Logo>
        </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
});