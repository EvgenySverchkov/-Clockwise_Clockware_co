import React from "react";
import {create} from "react-test-renderer";

import Context from "../../ContextComponent";
import OrderForm from "../OrderForm";

it("Test of <OrderForm/>", ()=>{
    global.fetch = jest.fn(()=>Promise.resolve({json: ()=>Promise.resolve()}));
    const mockProps = {
        submitHandler: jest.fn(),
        changeHandler: jest.fn(),
        currentOrder: {
            name: "Name",
            email: "email@mail.com",
            size: "middle",
            town: "Town",
            date: "2021-01-01",
            time: "12:00"
        },
        isLoadOrderForm: false,
        townsArr: [{id:1, name: "Town"}],
        townsInOrderFormIsLoad: false,
    }
    const mockContextValue = {
        closeWrningTooltip: jest.fn(),
        warningTooltipMsg: "Warning"
    }
    const component = create(
        <Context.Provider value={mockContextValue}>
            <OrderForm {...mockProps}/>
        </Context.Provider>
    )
})