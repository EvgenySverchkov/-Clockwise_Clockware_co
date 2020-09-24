import React from "react";

import {create, act} from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import EditMasterForm from "../EditMasterForm";
import ContextComponent from "../../ContextComponent";

const mockStore = configureStore();

it("Test of <EditMasterForm/> with mock props", async()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>Promise.resolve()}))
    const masterId = 1;
    const store = mockStore({
        masterReducer:{
            masters: [{id: masterId, rating: 5, name: "Name"}]
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
                id: masterId
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
                    <EditMasterForm {...mockProps}/>
                </ContextComponent.Provider>
            </Provider>)
    });
    expect(component.toJSON()).toMatchSnapshot();
});