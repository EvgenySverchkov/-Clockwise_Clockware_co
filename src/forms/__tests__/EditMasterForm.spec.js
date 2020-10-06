import React from "react";

import {create, act} from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import EditMasterForm from "../EditMasterForm";
import ContextComponent from "../../ContextComponent";

const mockStore = configureStore();

describe("Test of <EditMasterForm/>", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>Promise.resolve()}));
    const masterId = 1;
    const store = mockStore({
        masterReducer:{
            masters: [{id: masterId, rating: 5, name: "Name"}]
        },
        townReduser: {
            towns: [],
            townsInOrderFormIsLoad: false
        },
        clientTownsReduser: {
            
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
        idForTooltip: 1,
        openWarningTooltip: jest.fn()
    }
    it("Default view with mock props", async()=>{
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
    describe("When called submit event", ()=>{
        let eventObject = {
            target: {
                name: {
                    value: "ValidName"
                },
                rating: {
                    value: 5
                }
            },
            preventDefault: jest.fn()
        }
        afterEach(() => {
            mockContextValue.openWarningTooltip.mockClear();
        });
        it("When all fields are valid", async()=>{
            let component 
            await act(async()=>{
                component = await create(
                    <Provider store = {store}>
                        <ContextComponent.Provider value={mockContextValue}>
                            <EditMasterForm {...mockProps}/>
                        </ContextComponent.Provider>
                    </Provider>)
            });
            component.root.findByType("form").props.onSubmit(eventObject);
            // expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        });
        it("When name field is invalid (must calls 1 time function which open warning tooltip)", async()=>{
            eventObject = {
                ...eventObject,
                target: {
                    ...eventObject.target,
                    name: {
                        value: "InvalidName1234"
                    }
                }
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
            component.root.findByType("form").props.onSubmit(eventObject);
            expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        });
        it("When ratining field is invalid (must calls 1 time function which open warning tooltip)", async()=>{
            eventObject = {
                ...eventObject,
                target: {
                    ...eventObject.target,
                    rating: {
                        value: 6
                    }
                }
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
            component.root.findByType("form").props.onSubmit(eventObject);
            expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        });
    })
});