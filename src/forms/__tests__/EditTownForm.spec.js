import React from "react";

import {create, act} from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import EditTownForm from "../EditTownForm";
import ContextComponent from "../../ContextComponent";

const mockStore = configureStore();

it("Test of <EditTownForm/> with mock props", async()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>Promise.resolve()}))
    const townId = 1;
    const store = mockStore({
        townReduser: {
            towns: [{id: townId, name: "Name"}]
        },
        clientTownsReduser: {
            townsInOrderFormIsLoad: false
        }
    });
    const mockProps = {
        match: {
            params: {
                id: townId
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
                    <EditTownForm {...mockProps}/>
                </ContextComponent.Provider>
            </Provider>)
    });
    expect(component.toJSON()).toMatchSnapshot();
});