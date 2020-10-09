import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import mockStoreConfig from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";
   
import MastersList from "../MastersList";

const mockStore = mockStoreConfig();
describe("Test of <MastersList />", ()=>{
    const initialState = {
        masterReducer: {
            masters: [{
                id: 1,
                name: "Name",
                rating: 5
            }]
        },
        adminModalWindows: {
            listIsLoad: false
        }
    }
    const mockProps = {
        history: {
            location: "/"
        }
    }
    
    describe("", ()=>{
        beforeEach(()=>global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())})))
        it("When list is already loaded", async()=>{
            const store = mockStore(initialState);
            let component;
            await act(async ()=>{
                component = await create(
                    <Provider store={store}>
                        <MemoryRouter initialEntries={["/"]}>
                            <MastersList {...mockProps}/>
                        </MemoryRouter>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
        it("When list is loading", async()=>{
            const store = mockStore({masterReducer:{masters: []}, adminModalWindows: {listIsLoad: true}});
            let component;
            await act(async ()=>{
                component = await create(
                    <Provider store={store}>
                        <MemoryRouter initialEntries={["/"]}>
                            <MastersList {...mockProps}/>
                        </MemoryRouter>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
    });
    
    describe("", ()=>{
        beforeEach(()=>global.fetch = jest.fn(()=> Promise.reject()));
        it("When returned error from server (list is empty)", async()=>{
            const store = mockStore(initialState);
            let component;
            await act(async ()=>{
                component = await create(
                    <Provider store={store}>
                        <MemoryRouter initialEntries={["/"]}>
                            <MastersList {...mockProps}/>
                        </MemoryRouter>
                    </Provider>
                );
            })
            expect(component.toJSON()).toMatchSnapshot();
        });
    });
});