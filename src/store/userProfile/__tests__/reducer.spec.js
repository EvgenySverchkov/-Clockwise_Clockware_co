import reducer from "../redusers";
import {initialUserProfileReducer} from "../initialState";
import * as actions from "../actions";

describe("Tests of 'userProfileReducer' reducer", ()=>{
    let initialState = {...initialUserProfileReducer}
    it("handle default", ()=>{
        const expectedValue = initialState;
        expect(reducer(initialState, {})).toEqual(expectedValue)
    });
    it("handle CHANGE_EDIT_USER_DATA_IS_LOAD", ()=>{
        const payload = true;
        const expectedValue = {
            ...initialState,
            editUserDataIsLoad: payload
        };
        expect(reducer(initialState, actions.changeEditUserDataIsLoad(payload))).toEqual(expectedValue)
    });
});