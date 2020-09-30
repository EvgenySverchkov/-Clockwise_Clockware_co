import reducer from "../reducers";
import {initialStateAuth} from "../initialState";
import * as actions from "../actions";

describe("Test of 'authReducer' reducer", ()=>{
    const payload = "PAYLOAD";
    it("handle default", ()=>{
        const expectValue = initialStateAuth;
        expect(reducer(initialStateAuth, {})).toEqual(expectValue);
    });
    it("handle TOOGLE_AUTH_ADMIN", ()=>{
        const expectValue = {
            ...initialStateAuth,
            isAuthAdmin: payload
        };
        expect(reducer(initialStateAuth, actions.toogleAuthAdmin(payload))).toEqual(expectValue);
    });
    it("handle TOOGLE_AUTH_CLIENT", ()=>{
        const expectValue = {
            ...initialStateAuth,
            isAuthClient: payload
        };
        expect(reducer(initialStateAuth, actions.toogleAuthClient(payload))).toEqual(expectValue);
    });
    it("handle CHANGE_ADMIN_LOGIN_IS_LOAD", ()=>{
        const expectValue = {
            ...initialStateAuth,
            adminLoginIsLoad: payload
        };
        expect(reducer(initialStateAuth, actions.changeAdminLoginIsLoad(payload))).toEqual(expectValue);
    });
    it("handle CHANGE_CLIENT_LOGIN_IS_LOAD", ()=>{
        const expectValue = {
            ...initialStateAuth,
            clientLoginIsLoad: payload
        };
        expect(reducer(initialStateAuth, actions.changeClientLoginIsLoad(payload))).toEqual(expectValue);
    });
    it("handle CHANGE_SIGNUP_IS_LOAD", ()=>{
        const expectValue = {
            ...initialStateAuth,
            signUpIsLoad: payload
        };
        expect(reducer(initialStateAuth, actions.changeSignUpIsLoad(payload))).toEqual(expectValue);
    });
});