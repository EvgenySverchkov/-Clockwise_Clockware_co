import React from "react";
import {create, act} from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {Route, MemoryRouter} from "react-router-dom";

import LogOutBtn from "../LogOutBtn";

const mockStore = configureStore();

it("Test of <LogOutBtn />", ()=>{
    let store = mockStore({
        ordersReducer: {
            currentOrder: {
                email: "some@mail.com"
            }
        }
    });
    
    const component = create(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
                <Route path="/">
                    <LogOutBtn />
                </Route>
            </MemoryRouter>
        </Provider>
        )

    act(()=>{
        component.root.findByProps({className: "btn btn-danger"}).props.onClick();
    })
    expect(component.toJSON()).toMatchSnapshot();
});
