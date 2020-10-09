import React from "react";
import {create} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from 'redux-mock-store';

import ShowFullInfo from "../ShowFullInfo";

const mockStore = configMockStore();

it("Test of <ShowFullInfo />", ()=>{
    const store = mockStore({})
    const mockProps = {
        itemObj: {
            someField: "Some Value"
        }
    }
    const component = create(
        <Provider store = {store}>
            <ShowFullInfo {...mockProps}/>
        </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
});