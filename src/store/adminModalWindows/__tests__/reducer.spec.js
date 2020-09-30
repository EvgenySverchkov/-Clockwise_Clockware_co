import reducer from "../reducers";
import {initialStateAdminModalWindows} from "../initialState";
import * as action from "../actions";

describe("Test of adminModalWindows reducer", ()=>{
    it("handle default", ()=>{
        const expectedValue = initialStateAdminModalWindows;
        expect(reducer(initialStateAdminModalWindows, {})).toEqual(expectedValue);
    });
    it("handle CHNG_CURR_ITEM_FOR_MODAL", ()=>{
        const payload = "payload";
        const expectedValue = {
            ...initialStateAdminModalWindows,
            currItemForModal: payload
        };
        expect(reducer(initialStateAdminModalWindows, action.chngCurrItemForModal(payload))).toEqual(expectedValue);
    });
    it("handle CHANGE_LIST_IS_LOAD", ()=>{
        const payload = "payload";
        const expectedValue = {
            ...initialStateAdminModalWindows,
            listIsLoad: payload
        };
        expect(reducer(initialStateAdminModalWindows, action.changeListIsLoad(payload))).toEqual(expectedValue);
    });
});