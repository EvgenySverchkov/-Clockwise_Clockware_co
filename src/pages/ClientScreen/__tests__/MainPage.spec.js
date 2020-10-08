import React from "react";
import {create, act} from "react-test-renderer";
import configMockStore from "redux-mock-store";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import MainPage from "../MainPage";
import Context from "../../../ContextComponent";

const mockStore = configMockStore();

const constantDate = new Date('2020-06-13')

Date = class extends Date {
  constructor() {
    return constantDate
  }
}

describe("Test of <MainPage/> (client side)", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    const mockContextValue = {
        openErrorWindowWithMsg: jest.fn(),
        openWarningTooltip: jest.fn(),
        warningTooltipMsg: "Warning"
    }
    describe("When user doesn't logged", ()=>{
        beforeEach(()=>global.localStorage.__proto__.getItem = ()=>false);
        const currItemForModal =  {
            id: 1,
            name: "Name",
            email: "email@test.com",
            size: "large",
            town: "Town",
            date: "2021-01-01",
            time: "11:00",
            masterId: 1,
            endTime: "14:00"
        }
        it("When path is '/client'", async()=>{
            let component;
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                ordersReducer: {
                    currentOrder: {},
                    orderFormIsLoad: false
                },
                townReduser: {
                    townsArr: [{id:1, name:"Town1"}, {id:2, name:"Town2"}],
                    townsInOrderFormIsLoad: false
                },
                authReducer: {
                    isAuthClient: false
                }
            })
            await act(async ()=>{
                component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
                );
            });
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/client/masters' and when a few suitable masters", ()=>{
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                ordersReducer: {
                    currentOrder: {email: "email@mail.com", name: "Name"},
                    orderFormIsLoad: false
                },
                authReducer: {
                    isAuthClient: false
                },
                masterReducer: {
                    suitableMasters: [{id: 1, name: "Name", rating: 5}, {id: 2, name: "Name2", rating: 5}]
                }
            })
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client/masters"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/client/login'", ()=>{
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                authReducer: {
                    isAuthClient: false
                }
            })
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client/login"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/client/userProfile'", ()=>{
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                authReducer: {
                    isAuthClient: false
                },
                ordersReducer: {
                    currentOrder: "emal@mail.com"
                }
            })
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client/userProfile"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/client/registration'", ()=>{
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                authReducer: {
                    isAuthClient: false
                }
            })
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client/registration"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
    });
    describe("When user logged", ()=>{
        beforeEach(()=>global.localStorage.__proto__.getItem = ()=>true);
        const currItemForModal =  {
            id: 1,
            name: "Name",
            email: "email@test.com",
            size: "large",
            town: "Town",
            date: "2021-01-01",
            time: "11:00",
            masterId: 1,
            endTime: "14:00"
        }
        it("When path is '/client'", async()=>{
            let component;
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                ordersReducer: {
                    currentOrder: {email: "email@test.com"},
                    orderFormIsLoad: false
                },
                townReduser: {
                    townsArr: [{id:1, name:"Town1"}, {id:2, name:"Town2"}],
                    townsInOrderFormIsLoad: false
                },
                authReducer: {
                    isAuthClient: true
                }
            })
            await act(async ()=>{
                component = await create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
                );
            });
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/client/masters' and when a few suitable masters", ()=>{
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                ordersReducer: {
                    currentOrder: {email: "email@mail.com", name: "Name"},
                    orderFormIsLoad: false
                },
                authReducer: {
                    isAuthClient: true
                },
                masterReducer: {
                    suitableMasters: [{id: 1, name: "Name", rating: 5}, {id: 2, name: "Name2", rating: 5}]
                }
            })
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client/masters"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/client/login'", ()=>{
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                authReducer: {
                    isAuthClient: true
                }
            })
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client/login"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/client/userProfile'", ()=>{
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                authReducer: {
                    isAuthClient: true
                },
                ordersReducer: {
                    currentOrder: {email: "email@test.com"}
                }
            })
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client/userProfile"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/client/registration'", ()=>{
            const store = mockStore({
                adminModalWindows: {
                    currItemForModal: currItemForModal
                },
                authReducer: {
                    isAuthClient: true
                }
            })
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value = {mockContextValue}>
                        <MemoryRouter initialEntries={["/client/registration"]}>
                            <MainPage />
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
    });
});