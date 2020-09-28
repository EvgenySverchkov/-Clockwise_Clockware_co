import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import AddMasterPage from "../AddMasterPage";

const mockStore = configMockStore();

describe("Test of <AddMasterPage />", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    const initialStore = {
        masterReducer: {
            newMasterFormIsLoad: false
        },
        townReduser: {
            towns: [{id:1, name: "Name1"}, {id:2, name: "Name2"}]
        },
    };
    const mockContextValue = {
        openErrorWindowWithMsg: jest.fn(),
        openWarningTooltip: jest.fn(),
        warningTooltipMsg: "Message"
    };
    it("Default view", async()=>{
        const store = mockStore(initialStore);
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <AddMasterPage />
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
                        <AddMasterPage />
                    </Context.Provider>
                </Provider>
            );
        });
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("The view after click on submit button and waiting response from server", async()=>{
        const store = mockStore({...initialStore, masterReducer: {newMasterFormIsLoad: true}});
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <AddMasterPage />
                    </Context.Provider>
                </Provider>
            );
        });
        expect(component.toJSON()).toMatchSnapshot();
    });
});
