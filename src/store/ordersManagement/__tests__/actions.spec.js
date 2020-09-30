import * as actions from "../actions";
import * as actionType from "../actionTypes";

describe("Tests of 'ordersManagment' actions", ()=>{
    const payload = "PAYLOAD";
    it("Test of 'initOrders' action (return object with type and payload fields where payload field is assign value from parameter)", ()=>{
        const expectedValue = {
            type: actionType.ADD_ORDERS,
            payload: payload,
        }
        expect(actions.initOrders(payload)).toEqual(expectedValue);
    });
    it("Test of 'deleteOrderFromState' action (return object with type and payload fields where payload field is assign value from parameter)", ()=>{
        const expectedValue = {
            type: actionType.DELETE_ORDER,
            payload: payload,
        }
        expect(actions.deleteOrderFromState(payload)).toEqual(expectedValue);
    });
    it("Test of 'updateOrderInState' action (return object with type and payload fields where payload field is assign value from parameter)", ()=>{
        const expectedValue = {
            type: actionType.UPDATE_ORDER,
            payload: payload,
        }
        expect(actions.updateOrderInState(payload)).toEqual(expectedValue);
    });
    it("Test of 'addCurrentOrderToState' action (return object with type and payload fields where payload field is assign value from parameter)", ()=>{
        const expectedValue = {
            type: actionType.ADD_CURRNET_ORDER,
            payload: payload,
        }
        expect(actions.addCurrentOrderToState(payload)).toEqual(expectedValue);
    });
    it("Test of 'changeAdminOrderFormIsLoad' action (return object with type and payload fields where payload field is assign value from parameter)", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_ADMIN_ORDER_FORM_IS_LOAD,
            payload: payload,
        }
        expect(actions.changeAdminOrderFormIsLoad(payload)).toEqual(expectedValue);
    });
    it("Test of 'initUserOrders' action (return object with type and payload fields where payload field is assign value from parameter)", ()=>{
        const expectedValue = {
            type: actionType.INIT_USER_ORDERS,
            payload: payload,
        }
        expect(actions.initUserOrders(payload)).toEqual(expectedValue);
    });
    it("Test of 'changeUserOrdersListIsLoad' action (return object with type and payload fields where payload field is assign value from parameter)", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_USER_ORDERS_LIST_IS_LOAD,
            payload: payload,
        }
        expect(actions.changeUserOrdersListIsLoad(payload)).toEqual(expectedValue);
    });
    it("Test of 'changeClientOrderFormIsLoad' action (return object with type and payload fields where payload field is assign value from parameter)", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_CLIENT_ORDER_FORM_IS_LOAD,
            payload: payload,
        }
        expect(actions.changeClientOrderFormIsLoad(payload)).toEqual(expectedValue);
    });
})