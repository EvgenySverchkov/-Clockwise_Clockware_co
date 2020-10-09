import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";

import LinkToEditForm from "../LinkToEditForm";

describe("Test of <LinkToEditForm />", ()=>{
    const mockProps = {
        id: 1
    }
    it("View when current path is 'admin/clientsList'", ()=>{
        const component = create(
            <MemoryRouter initialEntries={["admin/clientsList"]}>
                <LinkToEditForm {...mockProps}/>
            </MemoryRouter>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("View when current path is 'admin/mastersList'", ()=>{
        const component = create(
            <MemoryRouter initialEntries={["admin/mastersList"]}>
                <LinkToEditForm {...mockProps}/>
            </MemoryRouter>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("View when current path is 'admin/townsList'", ()=>{
        const component = create(
            <MemoryRouter initialEntries={["admin/townsList"]}>
                <LinkToEditForm {...mockProps}/>
            </MemoryRouter>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("View when current path is 'admin/ordersList'", ()=>{
        const component = create(
            <MemoryRouter initialEntries={["admin/ordersList"]}>
                <LinkToEditForm {...mockProps}/>
            </MemoryRouter>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
});