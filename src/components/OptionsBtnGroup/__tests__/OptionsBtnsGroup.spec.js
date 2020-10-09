import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configMockStore from 'redux-mock-store';

import OptionsBtnsGroup from "../OptionsBtnsGroup";

const mockStore = configMockStore();

it("Test of <OptionsBtnsGroup />", ()=>{
    const store = mockStore({})
    const mockProps = {
        deleteMasterById: jest.fn(), 
        itemObj: {
            someField: "Some Value"
        }
    }
    const component = create(
        <MemoryRouter initialEntries={["/"]}>
            <Provider store = {store}>
                <OptionsBtnsGroup {...mockProps}/>
            </Provider> 
        </MemoryRouter>
    );
    expect(component.toJSON()).toMatchSnapshot();
});