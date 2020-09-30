import * as actions from "../actions";
import * as actionTypes from "../actionTypes";

describe("Tests of 'userProfile' actions", ()=>{
    const payload = "PAYLOAD";
    it("Test of 'changeEditUserDataIsLoad' action", ()=>{
        const expectedValue = {
            type: actionTypes.CHANGE_EDIT_USER_DATA_IS_LOAD,
            payload
        }
        expect(actions.changeEditUserDataIsLoad(payload)).toEqual(expectedValue);
    });
});