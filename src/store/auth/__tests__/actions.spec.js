import * as actions from "../actions";
import * as actionType from "../actionTypes";

describe("Test of toogleAuthAdmin actions", ()=>{
    const payload = "PAYLOAD";
    it("Test of 'toogleAuthAdmin' action", ()=>{
        const expectedValue = {
            type: actionType.TOOGLE_AUTH_ADMIN,
            payload: payload,
        };
        expect(actions.toogleAuthAdmin(payload)).toEqual(expectedValue)
    });
    it("Test of 'toogleAuthClient' action", ()=>{
        const expectedValue = {
            type: actionType.TOOGLE_AUTH_CLIENT,
            payload: payload,
        };
        expect(actions.toogleAuthClient(payload)).toEqual(expectedValue)
    });
    it("Test of 'changeClientLoginIsLoad' action", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_CLIENT_LOGIN_IS_LOAD,
            payload: payload,
        };
        expect(actions.changeClientLoginIsLoad(payload)).toEqual(expectedValue)
    });
    it("Test of 'changeAdminLoginIsLoad' action", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_ADMIN_LOGIN_IS_LOAD,
            payload: payload,
        };
        expect(actions.changeAdminLoginIsLoad(payload)).toEqual(expectedValue)
    });
    it("Test of 'changeSignUpIsLoad' action", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_SIGNUP_IS_LOAD,
            payload: payload,
        };
        expect(actions.changeSignUpIsLoad(payload)).toEqual(expectedValue)
    });
});