import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";

import Context from "../../../ContextComponent";
import MainPage from "../MainPage";

const mockStore = configMockStore();

describe("Test of <MainPage /> (admin side)", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    const mockProps = {
        history: {
            push: jest.fn()
        }
    }
    const mockValueContext = {
        openErrorWindowWithMsg: jest.fn(),
        openWarningTooltip: jest.fn(),
        warningTooltipMsg: "Warning"
    }
    describe("When user doesn't logged (token in sessionStorage is false)", ()=>{
        beforeEach(()=>global.sessionStorage.__proto__.getItem = ()=>false);
        const initialStore = {
            adminModalWindows: {
                currItemForModal: {},
            },
            ordersReducer: {
                currentOrder: {},
                suitableMasters: [{id: 1, name: "Name", rating: 5}, {id: 2, name: "Name2", rating: 5}]
            },
            authReducer: {
                isAuthAdmin: false
            }
        }
        it("When path is '/admin'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value={mockValueContext}>
                        <MemoryRouter initialEntries={["/admin"]}>
                            <MainPage {...mockProps}/>
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/ordersList'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/ordersList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/mastersList'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/mastersList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/townsList'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/townsList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/addMasterForm'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/addMasterForm"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/addTownForms'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/addTownForms"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/addOrderForm'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/addOrderForm"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/editMaster/1'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["'/admin/editMaster/1"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/editTown/1'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/editTown/1"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/editOrder/1'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/editOrder/1"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/freeMasters'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/freeMasters"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            expect(component.toJSON()).toMatchSnapshot();
        });
    });
    describe("When user logged (token in sessionStorage is true)", ()=>{
        beforeEach(()=>global.sessionStorage.__proto__.getItem = ()=>true);
        const initialStore = {
            adminModalWindows: {
                currItemForModal: {},
            },
            ordersReducer: {
                currentOrder: {},
                suitableMasters: [{id: 1, name: "Name", rating: 5}, {id: 2, name: "Name2", rating: 5}]
            },
            authReducer: {
                isAuthAdmin: true
            }
        }
        it("When path is '/admin'", ()=>{
            const store = mockStore(initialStore);
            const component = create(
                <Provider store = {store}>
                    <Context.Provider value={mockValueContext}>
                        <MemoryRouter initialEntries={["/admin"]}>
                            <MainPage {...mockProps}/>
                        </MemoryRouter>
                    </Context.Provider>
                </Provider>
            );
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/ordersList' and in order list 1 item", async ()=>{
            const store = mockStore({...initialStore, ordersReducer: {ordersArr: [{
                id: 1,
                name: "Alex",
                email: "example@mail.com",
                size: "small",
                town: "Dnipro",
                date: "2021-02-10",
                time: "12:00",
                masterId: 1,
                endTime: "13:00"
            }]}});
            let component
            await act(async ()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/ordersList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/ordersList' and order list is empty", async ()=>{
            const store = mockStore({...initialStore, ordersReducer: {ordersArr: []}});
            let component
            await act(async ()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/ordersList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/mastersList' and in masters list 1 item", async ()=>{
            const store = mockStore({...initialStore, masterReducer: {masters: [{
                id: 1,
                rating: 5,
                name: "Petrovich",
                towns: "Dnipro,Uzhorod",
            }]}});
            let component
            await act(async ()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/mastersList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/mastersList' and masters list is empty", async ()=>{
            const store = mockStore({...initialStore, masterReducer: {masters: []}});
            let component;
            await act(async ()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/mastersList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/townsList' and in towns list 1 item", async ()=>{
            const store = mockStore({...initialStore, townReduser: {towns: [{
                id: 1,
                name: "Dnipro"
            }]}});
            let component
            await act(async ()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/townsList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/townsList' and towns list is empty", async ()=>{
            const store = mockStore({...initialStore, townReduser: {towns: []}});
            let component
            await act(async ()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/townsList"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/addMasterForm'", async ()=>{
            const store = mockStore({
                ...initialStore, 
                masterReducer: {newMasterFormIsLoad: false},
                townReduser: {towns: [{id:1, name: "Name1"}]}
            });
            let component
            await act(async ()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/addMasterForm"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/addTownForms'", async ()=>{
            const store = mockStore({...initialStore, townReduser: {newTownFormIsLoad: false}});
            let component
            await act(async ()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/addTownForms"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When path is '/admin/addOrderForm'", async ()=>{
            const store = mockStore({
                ...initialStore, 
                townReduser: {towns: [{id:1, name: "Name1"}]},
                ordersReducer: {adminOrderFormIsLoad: false}
            });
            let component
            await act(async()=>{
                component = await create(
                    <Provider store = {store}>
                        <Context.Provider value={mockValueContext}>
                            <MemoryRouter initialEntries={["/admin/addOrderForm"]}>
                                <MainPage {...mockProps}/>
                            </MemoryRouter>
                        </Context.Provider>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
    });
});