import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import AddNewTownPage from "../AddNewTownPage";

const mockStore = configMockStore();

describe("Test of <AddNewTownPage />", ()=>{
    it("Default view", async()=>{
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
        const initialStore = {
            townReduser: {
                newTownFormIsLoad: true
            }
        }
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Message"
        }
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
    it("When call event onSubmit and town name start with lowercase letter", async()=>{
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
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "name"
                }
            }
        }
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
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("When call event onSubmit and town name contains number", async()=>{
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
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Name1"
                }
            }
        }
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
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("When call event onSubmit and name of town length less than 3 characters", async()=>{
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
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Na"
                }
            }
        }
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
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("When call event onSubmit and name of town contains punctuation symbol", async()=>{
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
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Name."
                }
            }
        }
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
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("When call event onSubmit and towns name is valid, and the server returns an object whose field is a success, with a true field value", async()=>{
        global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: true}))}));
        const initialStore = {
            townReduser: {
                newTownFormIsLoad: false
            }
        }
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            openSuccessWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Name"
                },
                reset: jest.fn()
            }
        }
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
        await act(async ()=>{
            await component.root.findByType("form").props.onSubmit(eventObject);
        });
        expect(mockContextValue.openSuccessWindowWithMsg.mock.calls.length).toBe(1);
        expect(eventObject.target.reset.mock.calls.length).toBe(1);
    });
    it("When call event onSubmit and towns name is valid, but the server returns an object whose field is a success, with a false field value", async()=>{
        global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: false}))}));
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
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                town: {
                    value: "Name"
                }
            }
        }
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
        await act(async ()=>{
            await component.root.findByType("form").props.onSubmit(eventObject);
        })
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
    });
    it("When call event onBlur", async()=>{
        global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({success: false}))}));
        const initialStore = {
            townReduser: {
                newTownFormIsLoad: false
            }
        }
        const mockContextValue = {
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            closeWrningTooltip: jest.fn(),
            warningTooltipMsg: "Message"
        }
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
        await act(async ()=>{
            await component.root.findByType("form").props.onBlur();
        })
        expect(mockContextValue.closeWrningTooltip.mock.calls.length).toBe(1);
    });
});
