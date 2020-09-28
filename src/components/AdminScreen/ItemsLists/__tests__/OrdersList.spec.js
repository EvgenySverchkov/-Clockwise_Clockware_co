import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import mockStoreConfig from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";
   
import OrdersList from "../OrdersList";

const mockStore = mockStoreConfig();

describe("Test of <OrdersList />", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    const store = mockStore({
        ordersReducer: {
            ordersArr: [{
                id: 1,
                name: "Name",
                email: "example@mail.com",
                size: "small",
                town: "Town",
                date: "2021-02-10",
                time: "12:00",
                masterId: 1,
                endTime: "13:00"
            }]
        },
        adminModalWindows: {
            listIsLoad: false
        }
    });
    const mockProps = {
        history: {
            location: "/"
        }
    };

    it("When list is already loaded", async()=>{
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/"]}>
                        <OrdersList {...mockProps}/>
                    </MemoryRouter>
                </Provider>
            );
        })
        expect(component.toJSON()).toMatchSnapshot();
    });
    
    it("When list is loading", async()=>{
        const store = mockStore({ordersReducer:{ordersArr: []}, adminModalWindows: {listIsLoad: true}});
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/"]}>
                        <OrdersList {...mockProps}/>
                    </MemoryRouter>
                </Provider>
            );
        })
        expect(component.toJSON()).toMatchSnapshot();
    });
});