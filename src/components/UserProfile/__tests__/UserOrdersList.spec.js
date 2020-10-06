import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import UserOrdersList from "../UserOrdersList";

const mockStore = configMockStore();

it("Test of <UserOrdersList/>", async()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    const store = mockStore({
        ordersReducer:{
            userOrders: [{
                id: 1,
                name: "Name",
                email: "admin@example.com",
                size: "middle",
                town: "Uzhorod",
                date: "2021-01-01",
                time: "13:00",
                masterId: 5,
                endTime: "15:00"
            }],
            userOrdersListIsLoad: false
        }
    });
    const mockPromise = {
        history: {}
    }
    let component
    await act(async ()=>{
        component = await create(
            <Provider store = {store}>
                <UserOrdersList {...mockPromise}/>
            </Provider>
        )
    })
    expect(component.toJSON()).toMatchSnapshot();
});