import React from "react";
import {create} from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configMockStore from "redux-mock-store";

import List from "../List";

const mockStore = configMockStore();

describe("Test of <List />", ()=>{
    it("View when in data array 2 items", ()=>{
        const store = mockStore({});
        const mockProps = {
            dataArr: [{
                id: 1,
                rating: 5,
                name: "Petrovich",
                towns: ""
            },{
                id: 2,
                rating: 5,
                name: "Alexeevich",
                towns: ""
            }],
            deleteAction: jest.fn(),
            mainRows: ["name", "rating"],
            getData: jest.fn(),
            history: {location: "/"},
            listIsLoad: false,
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store = {store}>
                    <List {...mockProps}/>
                </Provider>
            </MemoryRouter>
        )
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("View when data array is empty", ()=>{
        const store = mockStore({});
        const mockProps = {
            dataArr: [],
            deleteAction: jest.fn(),
            mainRows: ["name", "rating"],
            getData: jest.fn(),
            history: {location: "/"},
            listIsLoad: false,
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store = {store}>
                    <List {...mockProps}/>
                </Provider>
            </MemoryRouter>
        )
        expect(component.toJSON()).toMatchSnapshot();
    });
    it("View when data array is loading", ()=>{
        const store = mockStore({});
        const mockProps = {
            dataArr: [],
            deleteAction: jest.fn(),
            mainRows: ["name", "rating"],
            getData: jest.fn(),
            history: {location: "/"},
            listIsLoad: true,
        }
        const component = create(
            <MemoryRouter initialEntries={["/"]}>
                <Provider store = {store}>
                    <List {...mockProps}/>
                </Provider>
            </MemoryRouter>
        )
        expect(component.toJSON()).toMatchSnapshot();
    });
});