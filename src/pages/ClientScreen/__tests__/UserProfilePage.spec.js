import React from "react";
import {create, act} from "react-test-renderer";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";

import UserProfilePage from "../UserProfilePage";
import Context from "../../../ContextComponent";

const mockStore = configMockStore();

describe("Test of <UserProfilePage />", ()=>{
    const store = mockStore({
        ordersReducer:{
            currentOrder: {}
        },
        ordersReducer: {
            userOrders: [{
                id: 1,
                name: "Name",
                email: "test@test.com",
                size: "middle",
                town: "Town",
                date: "2021-01-01",
                time: "13:00",
                masterId: 5,
                endTime: "15:00"
            }]
        },
        userProfileReducer: {
            editUserDataIsLoad: false
        }
    });
    const mockContextValue = {
        openErrorWindowWithMsg: jest.fn(),
        openWarningTooltip: jest.fn(),
        warningTooltipMsg: "Warning"
    }
    const Component = ({path}) => (
        <MemoryRouter initialEntries={[path]}>
            <Context.Provider value = {mockContextValue}>
                <Provider store = {store}>
                    <UserProfilePage />
                </Provider>
            </Context.Provider>
        </MemoryRouter>
    );
    beforeEach(()=>global.fetch = jest.fn(()=>Promise.resolve({json: jest.fn(()=>Promise.resolve())})))
    it("When path is '/client/userProfile/userOrders' and user logged (field 'token' in localStorage is true)", async ()=>{
        global.localStorage.__proto__.getItem = ()=>true;
        let component
        await act(async ()=>{
            component = await create(
                <Component path = {"/client/userProfile/userSettings"}/>
            );
        })
        expect(component.toJSON()).toMatchSnapshot();
    });
    
    it("When path is '/client/userProfile/userSettings' and user logged (field 'token' in localStorage is true)", ()=>{
        global.localStorage.__proto__.getItem = ()=>JSON.stringify({
            email: "test@mail.com",
            name: "Name"
        });
        
        const component = create(<Component path={'/client/userProfile/userSettings'}/>);
        expect(component.toJSON()).toMatchSnapshot();
    })
    
    it("When path doesn't logged (field 'token' in localStorage is false)", ()=>{
        global.localStorage.__proto__.getItem = ()=>false;
        const component = create(<Component path={"/client/userProfile"}/>);
        expect(component.toJSON()).toMatchSnapshot();
    });
});