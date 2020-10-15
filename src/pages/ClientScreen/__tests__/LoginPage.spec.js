import React from "react";
import { create, act } from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import Context from "../../../ContextComponent";
import LoginPage from "../LoginPage";

const mockStore = configMockStore();

describe("Test of <LoginPage /> (client side)", ()=>{
    let initialState = {
        authReducer: {
            clientLoginIsLoad: false
        }
    }
    const mockProps = {
        history: {
            push: jest.fn()
        }
    }
    it("When the component has a default state (no error and no load state)", ()=>{
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const store = mockStore(initialState);
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        )
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("When the component has loading state (waiting request from server)", ()=>{
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const store = mockStore({...initialState, authReducer: {clientLoginIsLoad: true}});
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        )
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("Call submit event when email field is invalid", ()=>{
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                email: {
                    value: "lolmail.com"
                },
                password:{
                    value: "12345678"
                }
            }
        }
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const store = mockStore({...initialState});
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        );
        const handlerReturnValue = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturnValue).toBeFalsy();
    });
    it("Call submit event when password field is invalid", ()=>{
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                email: {
                    value: "lol@mail.com"
                },
                password:{
                    value: "12"
                }
            }
        }
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const store = mockStore({...initialState});
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        );
        const handlerReturnValue = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(handlerReturnValue).toBeFalsy();
    });
    it("Call submit event when all fields are valid and server return object with token, user data and success with value true", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve({
            json: jest.fn(()=>Promise.resolve({
                success: true,
                token: "i'm token",
                user: "user"
            }))
        }));
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                email: {
                    value: "lol@mail.com"
                },
                password:{
                    value: "12345678"
                }
            }
        }
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const store = mockStore({...initialState});
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        );
        await act(async ()=>{
            await component.root.findByType("form").props.onSubmit(eventObject);
        })
        expect(localStorage.getItem("token")).toBe("i'm token");
        expect(JSON.parse(localStorage.getItem("user"))).toBe("user")
        expect(mockProps.history.push.mock.calls.length).toBe(1);
    });
    it("Call submit event when all fields are valid but server return object with success field with value false", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve({
            json: jest.fn(()=>Promise.resolve({
                success: false
            }))
        }));
        const mockProps = {
            history: {
                push: jest.fn()
            }
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                email: {
                    value: "lol@mail.com"
                },
                password:{
                    value: "12345678"
                }
            }
        }
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const store = mockStore({...initialState});
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        );
        await act(async ()=>{
            await component.root.findByType("form").props.onSubmit(eventObject);
        })
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
    });
});