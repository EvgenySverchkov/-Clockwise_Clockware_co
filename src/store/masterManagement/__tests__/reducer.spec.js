import reducer from "../reducers";
import {initialStateMasters} from "../initialState";
import * as actions from "../actions";

describe("Test of 'master_reducer' reducer", ()=>{
    let payload = "PAYLOAD";
    let initialState = {...initialStateMasters}
    it("handle default", ()=>{
        const expectedState = initialState;
        expect(reducer(initialState, {})).toEqual(expectedState);
    });
    it("handle INIT_MASTERS (return the state in which the field 'masters' is assigned a value of payload", ()=>{
        const expectedState = {
            ...initialState,
            masters: payload
        };
        expect(reducer(initialState, actions.initMasters(payload))).toEqual(expectedState);
    });
    it("handle ADD_NEW_MASTER (return state where sorted masters array by id)", ()=>{
        initialState = {
            ...initialState,
            masters: [{id: 2, name: "Name2", rating: 2}, {id: 1, name: "Name1", rating: 5}]
        }
        const expectedState = {
            ...initialState,
            masters: initialState.masters.sort((a, b) => a.id - b.id)
        }; 
        expect(reducer(initialState, actions.addNewMaster(initialState.masters))).toEqual(expectedState);
    });
    it("handle UPDATE_MASTER (return state where masters array with updated master object)", ()=>{
        initialState = {
            ...initialState, 
            masters: [
                {id: 2, name: "Name2", rating: 5}, 
                {id: 1, name: "Name1", rating: 5}
            ]
        };
        const updatedMaster = {...initialState.masters[0], name: "updatedMaster"};

        const expectedState = {
            ...initialState,
            masters: [updatedMaster, {id: 1, name: "Name1", rating: 5}]
        };
        expect(reducer(initialState, actions.updateMasterInState(updatedMaster))).toEqual(expectedState);
    });
    it("handle DELETE_MASTER (return state where in 'masters' array no deleted master)", ()=>{
        initialState = {
            ...initialState,
            masters: [
                {id: 2, name: "Name2", rating: 5}, 
                {id: 1, name: "Name1", rating: 5}
            ]
        }
        const expectedState = {
            ...initialState,
            masters: [
                {id: 2, name: "Name2", rating: 5}
            ]
        };
        const masterID = 1;
        expect(reducer(initialState, actions.deleteMasterFromState(masterID))).toEqual(expectedState);
    });
    it("handle ADD_SUITABLE_MASTERS (return satate where in 'suitableMasters' array assign payload)", ()=>{
        payload = [{id:1, name: "name", rating: 5}];
        const expectedState = {
            ...initialState,
            suitableMasters: payload
        };
        expect(reducer(initialState, actions.addSuitableMasters(payload))).toEqual(expectedState);
    });
    it("handle CHANGE_ADD_NEW_MASTER_FORM_IS_LOAD (return the state in which the field 'newMasterFormIsLoad' is assigned a value of payload", ()=>{
        const expectedState = {
            ...initialState,
            newMasterFormIsLoad: payload
        };
        expect(reducer(initialState, actions.changeAddNewMasterFormIsLoad(payload))).toEqual(expectedState);
    });
    it("handle MSTER_LIST_IS_LOAD (return the state in which the field 'masterListIsLoad' is assigned a value of payload", ()=>{
        const expectedState = {
            ...initialState,
            masterListIsLoad: payload
        };
        expect(reducer(initialState, actions.changeMasterListIsLoad(payload))).toEqual(expectedState);
    });
});
