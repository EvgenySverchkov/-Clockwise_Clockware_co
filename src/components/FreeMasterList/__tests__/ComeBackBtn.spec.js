import React from "react";
import {create} from "react-test-renderer";

import {MemoryRouter, Route} from "react-router-dom";
import ComeBackBtn from "../ComeBackBtn";

it("Test of <ComeBackBtn/> for <FreeMasterList/>", ()=>{
    const mockProps = {
        backTo: "/"
    }
    let component = create(
        <MemoryRouter initialEntries={['/']}>
            <Route path="/">
                <ComeBackBtn {...mockProps}/>
            </Route>
        </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
});