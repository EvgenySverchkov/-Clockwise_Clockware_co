import React from "react";

import {create, act} from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import EditForm from "../EditForm";
import ContextComponent from "../../ContextComponent";

const mockStore = configureStore();

it("Test of <EditForm/> with mock props", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>Promise.resolve()}))
    const initialMockStore = mockStore({
        townReduser: {
            towns: [{id: 1, name: "Town"}]
        },
        clientTownsReduser: {
            townsInOrderFormIsLoad: false
        }
    })
    const mockProps = {
        id: 2, 
        handler: jest.fn(), 
        arrFromState: [
            {id: 2, name: "Petrovich", rating: "5", towns: ""}, 
            {id: 3, name: "John Doe", rating: "4", towns: ""}
        ]
    }
    const mockContextValue = {
        closeWrningTooltip: jest.fn(),
        warningTooltipMsg: "Message",
        isOpenWarningTooltip: false,
        idForTooltip: 1
    }
    const component = create(
        <Provider store={initialMockStore}>
            <ContextComponent.Provider value={mockContextValue}>
                <EditForm {...mockProps}/>
            </ContextComponent.Provider>  
        </Provider>
    )

    expect(component.toJSON()).toMatchSnapshot();
});