import * as actions from "../actions";
import * as actionType from "../actionTypes";

describe("Test of 'townsManagement' actions", ()=>{
    const payload = "PAYLOAD";
    it("Test of 'townsInit' action", ()=>{
        const expectedValue = {
            type: actionType.INIT_NEW_TOWNS,
            payload
        }
        expect(actions.townsInit(payload)).toEqual(expectedValue);
    });
    it("Test of 'addNewTown' action", ()=>{
        const expectedValue = {
            type: actionType.ADD_NEW_TOWN,
            payload
        }
        expect(actions.addNewTown(payload)).toEqual(expectedValue);
    });
    it("Test of 'deleteTownFromState' action", ()=>{
        const expectedValue = {
            type: actionType.DELETE_TOWN,
            payload
        }
        expect(actions.deleteTownFromState(payload)).toEqual(expectedValue);
    });
    it("Test of 'updateTownInState' action", ()=>{
        const expectedValue = {
            type: actionType.UPDATE_TOWN,
            payload
        }
        expect(actions.updateTownInState(payload)).toEqual(expectedValue);
    });
    it("Test of 'changeAddMewTownFormIsLoad' action", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_ADD_NEW_TOWN_FORM_IS_LOAD,
            payload
        }
        expect(actions.changeAddMewTownFormIsLoad(payload)).toEqual(expectedValue);
    });
    it("Test of 'addTownsToState' action", ()=>{
        const expectedValue = {
            type: actionType.ADD_TOWNS_TO_STATE,
            payload
        }
        expect(actions.addTownsToState(payload)).toEqual(expectedValue);
    });
    it("Test of 'changeTownsFromOrderFormIsLoad' action", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_TOWNS_FROM_ORDER_FORM_IS_LOAD,
            payload
        }
        expect(actions.changeTownsFromOrderFormIsLoad(payload)).toEqual(expectedValue);
    });
});