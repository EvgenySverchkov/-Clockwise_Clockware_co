import reducer from "../reducers";
import {initialStateOrders} from "../initialState";
import * as actions from "../actions";

describe("Tests of 'orders_reducer' reducer", ()=>{
    let initialState = {
        ...initialStateOrders
    }
    it("handle default (return initialState)", ()=>{
        const expectedValue = initialState;
        expect(reducer(initialState, {})).toEqual(expectedValue);
    });
    it("handle ADD_ORDERS", ()=>{
        const payload = [{id:1, email: "email.com"}]
        const expectedValue = {
            ...initialState,
            ordersArr: payload
        };
        expect(reducer(initialState, actions.initOrders(payload))).toEqual(expectedValue);
    });
    it("handle DELETE_ORDER (return state where in 'ordersArr' array no deleted order)", ()=>{
        initialState = {
            ...initialState,
            ordersArr: [
                {id: 2, email: "email@mail.com", name: "Name1"},
                {id: 1, email: "email@mail.com", name: "Name2"}
            ]
        }
        const expectedState = {
            ...initialState,
            ordersArr: [
                {id: 2, email: "email@mail.com", name: "Name1"}
            ]
        };
        const orderID = 1;
        expect(reducer(initialState, actions.deleteOrderFromState(orderID))).toEqual(expectedState);
    });
    it("handle UPDATE_ORDER (return state where order array with updated order object)", ()=>{
        initialState = {
            ...initialState, 
            ordersArr: [
                {id: 2, email: "email@mail.com", name: "Name1"},
                {id: 1, email: "email@mail.com", name: "Name2"}
            ]
        };
        const updatedOrder = {...initialState.ordersArr[0], name: "updatedOrder"};

        const expectedState = {
            ...initialState,
            ordersArr: [updatedOrder, {id: 1, email: "email@mail.com", name: "Name2"}]
        };
        expect(reducer(initialState, actions.updateOrderInState(updatedOrder))).toEqual(expectedState);
    });
    it("handle ADD_CURRNET_ORDER", ()=>{
        const payload = {id:1, email: "email.com"}
        const expectedValue = {
            ...initialState,
            currentOrder: payload
        };
        expect(reducer(initialState, actions.addCurrentOrderToState(payload))).toEqual(expectedValue);
    });
    it("handle CHANGE_ADMIN_ORDER_FORM_IS_LOAD", ()=>{
        const payload = true;
        const expectedValue = {
            ...initialState,
            adminOrderFormIsLoad: payload
        };
        expect(reducer(initialState, actions.changeAdminOrderFormIsLoad(payload))).toEqual(expectedValue);
    });
    it("handle INIT_USER_ORDERS", ()=>{
        const payload = [{id:1, email: "email.com"}]
        const expectedValue = {
            ...initialState,
            userOrders: payload
        };
        expect(reducer(initialState, actions.initUserOrders(payload))).toEqual(expectedValue);
    });
    it("handle CHANGE_USER_ORDERS_LIST_IS_LOAD", ()=>{
        const payload = false
        const expectedValue = {
            ...initialState,
            userOrdersListIsLoad: payload
        };
        expect(reducer(initialState, actions.changeUserOrdersListIsLoad(payload))).toEqual(expectedValue);
    });
    it("handle CHANGE_CLIENT_ORDER_FORM_IS_LOAD", ()=>{
        const payload = false
        const expectedValue = {
            ...initialState,
            orderFormIsLoad: payload
        };
        expect(reducer(initialState, actions.changeClientOrderFormIsLoad(payload))).toEqual(expectedValue);
    });
});