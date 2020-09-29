import React from "react";
import {create} from "react-test-renderer";
import configMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import {MemoryRouter, Route} from "react-router-dom"

import FreeMastersPage from "../FreeMastersPage";
import Context from "../../../ContextComponent";

const mockStore = configMockStore();

it("Test of <FreeMastersPage />", ()=>{
    const store = mockStore({
        masterReducer: {
            suitableMasters: [{id: 1, rating: 5, name: "Name"}],
            masterListIsLoad: false
        },
        // clientOrderReduser: {
        //     currentOrder: {name:"Alex", email:"199816a@mail.ru"},
        //     orderFormIsLoad: false,
        // },
        // authReducer: {
        //     isAuth: false
        // }
    });
    const mockProps = {
        history: {
            push: jest.fn()
        },
        currentOrder: {name:"Alex", email:"199816a@mail.ru"},
    }

    const mockContextValue = {
        openSuccessWindowWithMsg: jest.fn(),
        openErrorWindowWithMsg: jest.fn(),
        openWarningTooltip: jest.fn(),
        warningTooltipMsg: "Warning"
    }
    let component = create(
        <Provider store={store}>
            <Context.Provider value = {mockContextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <Route path="/">
                        <FreeMastersPage {...mockProps}/>
                    </Route>
                </MemoryRouter>
            </Context.Provider>
        </Provider>
    );

    expect(component.toJSON()).toMatchSnapshot();
});