import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import AddNewOrderPage from "../AddNewOrderPage";

const mockStore = configMockStore();

const constantDate = new Date('2020-06-13')

Date = class extends Date {
  constructor() {
    return constantDate
  }
}

describe("Test of <AddNewOrderPage />", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    const initialStore = {
        ordersReducer: {
            currentOrder: {},
            adminOrderFormIsLoad: false,
        },
        townReduser: {
            towns: [{id: 1, name: "Name"}]
        }
    };
    
    const mockContextValue = {
        openErrorWindowWithMsg: jest.fn(),
        openWarningTooltip: jest.fn(),
        warningTooltipMsg: "Message"
    };
    const mockProps = {
        history: {
            push: jest.fn()
        }
    };
    it("Default view", async()=>{
        const store = mockStore(initialStore);
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <AddNewOrderPage {...mockProps}/>
                    </Context.Provider>
                </Provider>
            );
        });
        expect(component.toJSON()).toMatchSnapshot();
    });
    
    it("The view after click on submit button and waiting response from server", async()=>{
        const store = mockStore({...initialStore, ordersReducer: {adminOrderFormIsLoad: true}});
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <AddNewOrderPage {...mockProps}/>
                    </Context.Provider>
                </Provider>
            );
        });
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("The view when towns array is empty", async()=>{
        const store = mockStore({...initialStore, townReduser: {towns: []}});
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <AddNewOrderPage {...mockProps}/>
                    </Context.Provider>
                </Provider>
            );
        });
        expect(component.toJSON()).toMatchSnapshot();
    });
});