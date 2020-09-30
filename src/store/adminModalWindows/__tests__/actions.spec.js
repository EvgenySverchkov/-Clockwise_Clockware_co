import * as actions from "../actions";
import * as actionType from "../actionTypes";

describe("Test of adminModalWindows actions", ()=>{
    const payload = "PAYLOAD";
    it("Test of 'chngCurrItemForModal' action", ()=>{
        const expectedAction = {
            type: actionType.CHNG_CURR_ITEM_FOR_MODAL,
            payload: payload,
        };
        expect(actions.chngCurrItemForModal(payload)).toEqual(expectedAction);
    });
    it("Test of 'changeListIsLoad' action", ()=>{
        const expectedAction = {
            type: actionType.CHANGE_LIST_IS_LOAD,
            payload: payload,
        };
        expect(actions.changeListIsLoad(payload)).toEqual(expectedAction);
    });
});