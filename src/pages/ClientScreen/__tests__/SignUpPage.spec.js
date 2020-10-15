import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import SignUpPage from "../SignUpPage";

const mockStore = configMockStore();


describe("Test of <SignUpPage/>", ()=>{
    it("Default view", ()=>{
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const store = mockStore({})
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <SignUpPage />
                </Context.Provider>
            </Provider>
        )
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("Call submit event when one field of form is empty", ()=>{
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const store = mockStore({})
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                name: {
                    value: ""
                },
                email: {
                    value: "validMail@mail.com"
                },
                password: {
                    value: "12345678"
                }
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <SignUpPage />
                </Context.Provider>
            </Provider>
        )
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("Call submit event when name field is invalid", ()=>{
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const store = mockStore({})
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                name: {
                    value: "Invalid1234"
                },
                email: {
                    value: "validMail@mail.com"
                },
                password: {
                    value: "12345678"
                }
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <SignUpPage />
                </Context.Provider>
            </Provider>
        )
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("Call submit event when email field is invalid", ()=>{
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const store = mockStore({})
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                name: {
                    value: "ValidName"
                },
                email: {
                    value: "invalidMailmail.com"
                },
                password: {
                    value: "12345678"
                }
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <SignUpPage />
                </Context.Provider>
            </Provider>
        )
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("Call submit event when email field containt word 'admin'", ()=>{
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const store = mockStore({})
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                name: {
                    value: "ValidName"
                },
                email: {
                    value: "admin@mail.com"
                },
                password: {
                    value: "12345678"
                }
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <SignUpPage />
                </Context.Provider>
            </Provider>
        )
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("Call submit event when password field is invalid", ()=>{
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const store = mockStore({})
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                name: {
                    value: "ValidName"
                },
                email: {
                    value: "valid@mail.com"
                },
                password: {
                    value: "1"
                }
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <SignUpPage />
                </Context.Provider>
            </Provider>
        )
        const handlerReturn = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturn).toBeFalsy();
    });
    it("Call submit event when all field are valid and server return object with success fild with value true and with user data", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve({
            json: jest.fn(()=>Promise.resolve({
                success: true,
                user: {
                    name: 'Name'
                }
            }))
        }));
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const store = mockStore({})
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                name: {
                    value: "Name"
                },
                email: {
                    value: "valid@mail.com"
                },
                password: {
                    value: "1234567"
                },
                reset: jest.fn()
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <SignUpPage />
                </Context.Provider>
            </Provider>
        )
        await act(async ()=>{
            await component.root.findByType("form").props.onSubmit(eventObject);
        })
        expect(mockContextValue.openSuccessWindowWithMsg.mock.calls.length).toBe(1);
        expect(eventObject.target.reset.mock.calls.length).toBe(1)
    });
    it("Call submit event when all field are valid but server return object with success fild with value false", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve({
            json: jest.fn(()=>Promise.resolve({
                success: false
            }))
        }));
        const mockContextValue = {
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            openWarningTooltip: jest.fn(),
            warningTooltipMsg: "Warning"
        }
        const store = mockStore({})
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                name: {
                    value: "Name"
                },
                email: {
                    value: "valid@mail.com"
                },
                password: {
                    value: "1234567"
                },
                reset: jest.fn()
            }
        }
        let component = create(
            <Provider store={store}>
                <Context.Provider value = {mockContextValue}>
                    <SignUpPage />
                </Context.Provider>
            </Provider>
        )
        await act(async ()=>{
            await component.root.findByType("form").props.onSubmit(eventObject);
        })
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
    });
});