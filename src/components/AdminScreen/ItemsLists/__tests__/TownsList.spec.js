import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import mockStoreConfig from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";
   
import TownsList from "../TownsList";

const mockStore = mockStoreConfig();

describe("Test of <TownsList />", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())}));
    const store = mockStore({
        townReduser: {
            towns: [{
                id: 1,
                name: "Name"
            }]
        },
        adminModalWindows: {
            listIsLoad: false
        }
    });
    const mockProps = {
        history: {
            location: "/"
        }
    }
    it("When list is already loaded", async()=>{
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/"]}>
                        <TownsList {...mockProps}/>
                    </MemoryRouter>
                </Provider>
            );
        })
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("When list is loading", async()=>{
        const store = mockStore({townReduser:{towns: []}, adminModalWindows: {listIsLoad: true}});
        let component;
        await act(async ()=>{
            component = await create(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/"]}>
                        <TownsList {...mockProps}/>
                    </MemoryRouter>
                </Provider>
            );
        })
        expect(component.toJSON()).toMatchSnapshot();
    });
});