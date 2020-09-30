import * as actions from "../actions";
import * as actionType from "../actionTypes";

describe("Tests of 'masterManagement' actions", ()=>{
    const payload = "PAYLOAD";
    it("Test of 'addNewMaster' action", ()=>{
        const expectedValue = {
            type: actionType.ADD_NEW_MASTER,
            payload: payload,
        }
        expect(actions.addNewMaster(payload)).toEqual(expectedValue);
    });
    it("Test of 'initMasters' action", ()=>{
        const expectedValue = {
            type: actionType.INIT_MASTERS,
            payload: payload,
        }
        expect(actions.initMasters(payload)).toEqual(expectedValue);
    });
    it("Test of 'deleteMasterFromState' action", ()=>{
        const expectedValue = {
            type: actionType.DELETE_MASTER,
            payload: payload,
        }
        expect(actions.deleteMasterFromState(payload)).toEqual(expectedValue);
    });
    it("Test of 'updateMasterInState' action", ()=>{
        const expectedValue = {
            type: actionType.UPDATE_MASTER,
            payload: payload,
        }
        expect(actions.updateMasterInState(payload)).toEqual(expectedValue);
    });
    it("Test of 'addSuitableMasters' action", ()=>{
        const expectedValue = {
            type: actionType.ADD_SUITABLE_MASTERS,
            payload: payload,
        }
        expect(actions.addSuitableMasters(payload)).toEqual(expectedValue);
    });
    it("Test of 'changeAddNewMasterFormIsLoad' action", ()=>{
        const expectedValue = {
            type: actionType.CHANGE_ADD_NEW_MASTER_FORM_IS_LOAD,
            payload: payload,
        }
        expect(actions.changeAddNewMasterFormIsLoad(payload)).toEqual(expectedValue);
    });
    it("Test of 'changeMasterListIsLoad' action", ()=>{
        const expectedValue = {
            type: actionType.MSTER_LIST_IS_LOAD,
            payload: payload,
        }
        expect(actions.changeMasterListIsLoad(payload)).toEqual(expectedValue);
    });
});