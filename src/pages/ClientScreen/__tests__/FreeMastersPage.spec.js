import React from "react";
import {create, act} from "react-test-renderer";
import configMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import {MemoryRouter, Route} from "react-router-dom"

import FreeMastersPage from "../FreeMastersPage";
import Context from "../../../ContextComponent";

const mockStore = configMockStore();

describe("Test of <FreeMastersPage />", ()=>{
    it("Default view", ()=>{
        const store = mockStore({
            masterReducer: {
                suitableMasters: [{id: 1, rating: 5, name: "Name"}]
            },
            ordersReducer: {
                currentOrder: {name:"Alex", email:"199816a@mail.ru"},
                orderFormIsLoad: false,
            },
            authReducer: {
                isAuth: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <MemoryRouter initialEntries={['/']}>
                        <Route path="/">
                            <FreeMastersPage {...mockProps}/>
                        </Route>
                    </MemoryRouter>
                </Context.Provider>
            </Provider>
        );
    
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("Call submit event when master was choosed and server return object with success field with true value", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: true}))}));
        const store = mockStore({
            masterReducer: {
                suitableMasters: [{id: 1, rating: 5, name: "Name"}]
            },
            ordersReducer: {
                currentOrder: {name:"Alex", email:"199816a@mail.ru", time: "15:00"},
                orderFormIsLoad: false,
            },
            authReducer: {
                isAuth: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                chooseMaster: {
                    value: 1
                }
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <MemoryRouter initialEntries={['/']}>
                        <Route path="/">
                            <FreeMastersPage {...mockProps}/>
                        </Route>
                    </MemoryRouter>
                </Context.Provider>
            </Provider>
        );
        await act(async ()=>{
            await component.root.findByType("form").props.onSubmit(eventObject)
        });
        expect(mockContextValue.openSuccessWindowWithMsg.mock.calls.length).toBe(1);
        expect(mockProps.history.push.mock.calls.length).toBe(1);
    });
    it("Call submit event when master was choosed and server return object with success field with false value", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: false}))}));
        const store = mockStore({
            masterReducer: {
                suitableMasters: [{id: 1, rating: 5, name: "Name"}]
            },
            ordersReducer: {
                currentOrder: {name:"Alex", email:"199816a@mail.ru", time: "15:00"},
                orderFormIsLoad: false,
            },
            authReducer: {
                isAuth: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                chooseMaster: {
                    value: 1
                }
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <MemoryRouter initialEntries={['/']}>
                        <Route path="/">
                            <FreeMastersPage {...mockProps}/>
                        </Route>
                    </MemoryRouter>
                </Context.Provider>
            </Provider>
        );
        await act(async ()=>{
            await component.root.findByType("form").props.onSubmit(eventObject)
        });
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
    });
});