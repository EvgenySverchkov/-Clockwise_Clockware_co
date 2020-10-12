import React from "react";
import { create } from "react-test-renderer";
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
    it("Call submit event on form when email field is invalid", ()=>{
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                email: {
                    value: "validmail.com"
                },
                password: {
                    value: "validpassword"
                }
            }
        }
        const store = mockStore({...initialState, authReducer: {clientLoginIsLoad: false}});
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        );
        let valueReturnedHandler = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(valueReturnedHandler).toBeFalsy();
    });
    it("Call submit event on form when password field is invalid", ()=>{
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const eventObject = {
            preventDefault: jest.fn(),
            target: {
                email: {
                    value: "valid@mail.com"
                },
                password: {
                    value: "123"
                }
            }
        }
        const store = mockStore({...initialState, authReducer: {clientLoginIsLoad: false}});
        const component = create(
            <Provider store={store}>
                <Context.Provider value={mockContextValue}>
                    <LoginPage {...mockProps}/>
                </Context.Provider>
            </Provider>
        );
        let valueReturnedHandler = component.root.findByType("form").props.onSubmit(eventObject);
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
        expect(valueReturnedHandler).toBeFalsy();
    });
});