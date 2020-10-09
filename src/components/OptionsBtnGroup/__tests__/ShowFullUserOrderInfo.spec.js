import React from "react";
import {create} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from 'redux-mock-store';

import ShowFullUserOrderInfo from "../ShowFullUserOrderInfo";

const mockStore = configMockStore();

it("Test of <ShowFullUserOrderInfo />", ()=>{
    const store = mockStore({})
    const mockProps = {
        itemObj: {
            someField: "Some Value"
        }
    }
    const component = create(
        <Provider store = {store}>
            <ShowFullUserOrderInfo {...mockProps}/>
        </Provider>
    );
    expect(component.toJSON()).toMatchSnapshot();
});