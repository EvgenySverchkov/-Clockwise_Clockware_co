import React from "react";

import {create, act} from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import EditOrderForm from "../EditOrderForm";
import ContextComponent from "../../ContextComponent";

const mockStore = configureStore();

const constantDate = new Date('2020-06-13')

Date = class extends Date {
  constructor() {
    return constantDate
  }
}

it("Test of <EditOrderForm/> with mock props", async()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>Promise.resolve()}))
    const orderId = 1;
    const store = mockStore({
        ordersReducer:{
            ordersArr: [{
                id: orderId,
                name: "Name",
                email: "email@mail.com",
                size: "small",
                town: "Town",
                date: "2021-02-10",
                time: "12:00",
                masterId: 1,
                endTime: "13:00"
            }]
        },
        townReduser: {
            towns: []
        },
        clientTownsReduser: {
            townsInOrderFormIsLoad: false
        }
    });
    const mockProps = {
        match: {
            params: {
                id: orderId
            }
        }
    }
    const mockContextValue = {
        closeWrningTooltip: jest.fn(),
        warningTooltipMsg: "Message",
        isOpenWarningTooltip: false,
        idForTooltip: 1
    }
    let component 
    await act(async()=>{
        component = await create(
            <Provider store = {store}>
                <ContextComponent.Provider value={mockContextValue}>
                    <EditOrderForm {...mockProps}/>
                </ContextComponent.Provider>
            </Provider>)
    });
    expect(component.toJSON()).toMatchSnapshot();
});