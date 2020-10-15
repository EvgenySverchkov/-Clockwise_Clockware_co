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
                suitableMasters: [{id: 1, rating: 5, name: "Name"}],
                masterListIsLoad: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            },
            currentOrder: {name:"Alex", email:"199816a@mail.ru"},
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
    it("If no master has been selected", ()=>{
        const store = mockStore({
            masterReducer: {
                suitableMasters: [{id: 1, rating: 5, name: "Name"}],
                masterListIsLoad: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            },
            currentOrder: {name:"Alex", email:"199816a@mail.ru"},
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
                    checked: false
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
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("If a master was selected, and a small clock size was selected and the server returns an object whose field is a success, with a true field value", async()=>{
        global.fetch = jest.fn(()=>Promise.resolve({
            json: jest.fn(()=>Promise.resolve({
                success: true
            }))
        }));
        const store = mockStore({
            masterReducer: {
                suitableMasters: [{id: 1, rating: 5, name: "Name"}],
                masterListIsLoad: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            },
            currentOrder: {name:"Alex", email:"199816a@mail.ru", size: "small", time: "14:00"},
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
                    length: true,
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
            await component.root.findByType("form").props.onSubmit(eventObject);
        });
        expect(mockProps.history.push.mock.calls.length).toBe(1);
        expect(mockContextValue.openSuccessWindowWithMsg.mock.calls.length).toBe(1);
    });
    it("If a master was selected, and a middle clock size was selected and the server returns an object whose field is a success, with a true field value", async()=>{
        global.fetch = jest.fn(()=>Promise.resolve({
            json: jest.fn(()=>Promise.resolve({
                success: true
            }))
        }));
        const store = mockStore({
            masterReducer: {
                suitableMasters: [{id: 1, rating: 5, name: "Name"}],
                masterListIsLoad: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            },
            currentOrder: {name:"Alex", email:"199816a@mail.ru", size: "middle", time: "14:00"},
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
                    length: true,
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
            await component.root.findByType("form").props.onSubmit(eventObject);
        });
        expect(mockProps.history.push.mock.calls.length).toBe(1);
        expect(mockContextValue.openSuccessWindowWithMsg.mock.calls.length).toBe(1);
    });
    it("If a master was selected, and a large clock size was selected and the server returns an object whose field is a success, with a true field value", async()=>{
        global.fetch = jest.fn(()=>Promise.resolve({
            json: jest.fn(()=>Promise.resolve({
                success: true
            }))
        }));
        const store = mockStore({
            masterReducer: {
                suitableMasters: [{id: 1, rating: 5, name: "Name"}],
                masterListIsLoad: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            },
            currentOrder: {name:"Alex", email:"199816a@mail.ru", size: "large", time: "14:00"},
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
                    length: true,
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
            await component.root.findByType("form").props.onSubmit(eventObject);
        });
        expect(mockProps.history.push.mock.calls.length).toBe(1);
        expect(mockContextValue.openSuccessWindowWithMsg.mock.calls.length).toBe(1);
    });
    it("If a master was selected, and a large clock size was selected and the server returns an object whose field is a success, with a false field value", async()=>{
        global.fetch = jest.fn(()=>Promise.resolve({
            json: jest.fn(()=>Promise.resolve({
                success: false
            }))
        }));
        const store = mockStore({
            masterReducer: {
                suitableMasters: [{id: 1, rating: 5, name: "Name"}],
                masterListIsLoad: false
            }
        });
        const mockProps = {
            history: {
                push: jest.fn()
            },
            currentOrder: {name:"Alex", email:"199816a@mail.ru", size: "large", time: "14:00"},
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
                    length: true,
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
            await component.root.findByType("form").props.onSubmit(eventObject);
        });
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
    });
});