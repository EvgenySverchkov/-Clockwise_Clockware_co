import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import AddNewTownPage from "../AddNewTownPage";

const mockStore = configMockStore();

describe("Test of <AddNewTownPage />", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    const initialStore = {
        townReduser: {
            newTownFormIsLoad: false
        }
    }
    const mockContextValue = {
        openErrorWindowWithMsg: jest.fn(),
        openWarningTooltip: jest.fn(),
        warningTooltipMsg: "Message"
    }

    it("Default view", async()=>{
        const store = mockStore(initialStore);
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <AddNewTownPage />
                    </Context.Provider>
                </Provider>
            );
        });
        expect(component.toJSON()).toMatchSnapshot();
    });

    it("The view after click on submit button and waiting response from server", async()=>{
        const store = mockStore({...initialStore, townReduser:{newTownFormIsLoad: true}});
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <AddNewTownPage />
                    </Context.Provider>
                </Provider>
            );
        });
        expect(component.toJSON()).toMatchSnapshot();
    });
});
