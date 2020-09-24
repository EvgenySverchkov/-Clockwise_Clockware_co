import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter, Route} from "react-router-dom";

import FreeMastersForm from "../FreeMastersForm";

it("Test of <FreeMastersForm /> with mock props", ()=>{
    const mockProps = {
        submitHandler: jest.fn(),
        isLoad: false,
        suitableMasters: [{id: 1, rating: 5, name: "Name"}],
        backTo: "/",
        isMakeOrder: false,
    }
    let component= create(
        <MemoryRouter initialEntries={["/"]}>
            <Route path="/">
                <FreeMastersForm {...mockProps}/>
            </Route>
        </MemoryRouter>
    )
    expect(component.toJSON()).toMatchSnapshot();
});