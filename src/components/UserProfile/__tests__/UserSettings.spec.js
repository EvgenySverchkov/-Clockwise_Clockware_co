import React from "react";
import {create, act} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom"
import configMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import Context from "../../../ContextComponent";

import UserSettings from "../UserSettings";

const mockStore = configMockStore();

describe("Test of <UserSettings />", ()=>{
    const mockContextValue = {
        openWarningTooltip: jest.fn(),
        openSuccessWindowWithMsg: jest.fn(),
        openErrorWindowWithMsg: jest.fn(),
        closeWrningTooltip: jest.fn(),
        warningTooltipMsg: "Message"
    }
    const store = mockStore({
        userProfileReducer: {
            editUserDataIsLoad:false
        }
    });
    
    beforeEach(()=>global.localStorage.__proto__.getItem = ()=>{
        return JSON.stringify({name: "name"})
    })
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    it("Default view", ()=>{
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Context.Provider value={mockContextValue}>
                    <Provider store = {store}>
                        <UserSettings />
                    </Provider>
                </Context.Provider>
            </MemoryRouter>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("When submit form with invalid name (with number in field)", async ()=>{
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            closeWrningTooltip: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const eventObj = {
            preventDefault: jest.fn(),
            target: {
                userMail: {
                    value: "validMail@mail.com"
                },
                userName: {
                    value: "InvalidName1",
                    id: "userName"
                }
            }
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Context.Provider value={mockContextValue}>
                    <Provider store = {store}>
                        <UserSettings />
                    </Provider>
                </Context.Provider>
            </MemoryRouter>
        );
        await act(async()=>{
            await component.root.findByType("form").props.onSubmit(eventObj);
        })
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
    });
    it("When submit form with invalid name (name field contains less than 3 characters)", async ()=>{
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            closeWrningTooltip: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const eventObj = {
            preventDefault: jest.fn(),
            target: {
                userMail: {
                    value: "validMail@mail.com",
                    id: "userMail"
                },
                userName: {
                    value: "iv",
                    id: "userName"
                }
            }
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Context.Provider value={mockContextValue}>
                    <Provider store = {store}>
                        <UserSettings />
                    </Provider>
                </Context.Provider>
            </MemoryRouter>
        );
        await act(async()=>{
            await component.root.findByType("form").props.onSubmit(eventObj);
        })
        expect(mockContextValue.openWarningTooltip.mock.calls.length).toBe(1);
    });
    it("When submit form with valid data", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({succes: true}))}));
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            closeWrningTooltip: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const eventObj = {
            preventDefault: jest.fn(),
            target: {
                userMail: {
                    value: "validMail@mail.com",
                    id: "userMail"
                },
                userName: {
                    value: "Valid Name",
                    id: "userName"
                }
            }
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Context.Provider value={mockContextValue}>
                    <Provider store = {store}>
                        <UserSettings />
                    </Provider>
                </Context.Provider>
            </MemoryRouter>
        );
        await act(async()=>{
            await component.root.findByType("form").props.onSubmit(eventObj);
        })
        expect(mockContextValue.openSuccessWindowWithMsg.mock.calls.length).toBe(1);
    });
    it("When submit form and fetch return false success", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve({succes: false}))}));
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            closeWrningTooltip: jest.fn(),
            warningTooltipMsg: "Message"
        }
        const eventObj = {
            preventDefault: jest.fn(),
            target: {
                userMail: {
                    value: "validMail@mail.com",
                    id: "userMail"
                },
                userName: {
                    value: "Valid Name",
                    id: "userName"
                }
            }
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Context.Provider value={mockContextValue}>
                    <Provider store = {store}>
                        <UserSettings />
                    </Provider>
                </Context.Provider>
            </MemoryRouter>
        );
        await act(async()=>{
            await component.root.findByType("form").props.onSubmit(eventObj);
        })
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
    });
    it("When submit form and fetch return error", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve("I'm error"));
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            closeWrningTooltip: jest.fn(),
            warningTooltipMsg: "Message",
            errorWindowMsg: ''
        }
        const eventObj = {
            preventDefault: jest.fn(),
            target: {
                userMail: {
                    value: "validMail@mail.com",
                    id: "userMail"
                },
                userName: {
                    value: "Valid Name",
                    id: "userName"
                }
            }
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Context.Provider value={mockContextValue}>
                    <Provider store = {store}>
                        <UserSettings />
                    </Provider>
                </Context.Provider>
            </MemoryRouter>
        );
        await act(async()=>{
            await component.root.findByType("form").props.onSubmit(eventObj);
        })
        expect(mockContextValue.openErrorWindowWithMsg.mock.calls.length).toBe(1);
    });
    it("When call onBlur event in form", async ()=>{
        global.fetch = jest.fn(()=>Promise.resolve("I'm error"));
        const mockContextValue = {
            openWarningTooltip: jest.fn(),
            openSuccessWindowWithMsg: jest.fn(),
            openErrorWindowWithMsg: jest.fn(),
            closeWrningTooltip: jest.fn(),
            warningTooltipMsg: "Message",
            errorWindowMsg: ''
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Context.Provider value={mockContextValue}>
                    <Provider store = {store}>
                        <UserSettings />
                    </Provider>
                </Context.Provider>
            </MemoryRouter>
        );
        await act(async()=>{
            await component.root.findByType("form").props.onBlur();
        })
        expect(mockContextValue.closeWrningTooltip.mock.calls.length).toBe(1);
    });
});