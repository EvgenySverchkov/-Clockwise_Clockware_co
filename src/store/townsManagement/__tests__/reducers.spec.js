import reducer from "../reducers";
import {initialStateTowns} from "../initialState";
import * as actions from "../actions";

describe("Tests of 'town_reduser' reducer", ()=>{
    let initialState = {...initialStateTowns}
    it("handle default", ()=>{
        const expectedValue = initialState;
        expect(reducer(initialState, {})).toEqual(expectedValue);
    });
    it("handle INIT_NEW_TOWNS", ()=>{
        const payload = [{id:1, name: "Name"}]
        const expectedValue = {
            ...initialState,
            towns: payload
        };
        expect(reducer(initialState, actions.townsInit(payload))).toEqual(expectedValue);
    });
    it("handle UPDATE_TOWN (return state where towns array with updated town object)", ()=>{
        initialState = {
            ...initialState, 
            towns: [
                {id: 2, name: "Name2"}, 
                {id: 1, name: "Name1"}
            ]
        };
        const updatedTown = {...initialState.towns[0], name: "updatedTown"};

        const expectedState = {
            ...initialState,
            towns: [updatedTown, {id: 1, name: "Name1"}]
        };
        expect(reducer(initialState, actions.updateTownInState(updatedTown))).toEqual(expectedState);
    });
    it("handle ADD_NEW_TOWN (return state where sorted towns array by id)", ()=>{
        initialState = {
            ...initialState,
            towns: [{id: 2, name: "Name2"}, {id: 1, name: "Name1"}]
        }
        const addedTown = {id: 3, name: "Name3"}
        const expectedState = {
            ...initialState,
            towns: [...initialState.towns, addedTown].sort((a, b) => a.id - b.id)
        };
        
        expect(reducer(initialState, actions.addNewTown(addedTown))).toEqual(expectedState);
    });
    it("handle DELETE_TOWN (return state where in 'towns' array no deleted town)", ()=>{
        initialState = {
            ...initialState,
            towns: [
                {id: 2, name: "Name2"}, 
                {id: 1, name: "Name1"}
            ]
        }
        const expectedState = {
            ...initialState,
            towns: [
                {id: 2, name: "Name2"}
            ]
        };
        const townID = 1;
        expect(reducer(initialState, actions.deleteTownFromState(townID))).toEqual(expectedState);
    });
    it("handle CHANGE_ADD_NEW_TOWN_FORM_IS_LOAD", ()=>{
        const payload = true;
        const expectedValue = {
            ...initialState,
            newTownFormIsLoad: payload
        };
        expect(reducer(initialState, actions.changeAddMewTownFormIsLoad(payload))).toEqual(expectedValue);
    });
    it("handle ADD_TOWNS_TO_STATE", ()=>{
        const payload = [{id: 2, name: "Name2"}, {id: 1, name: "Name1"}]
        const expectedValue = {
            ...initialState,
            townsArr: payload
        };
        expect(reducer(initialState, actions.addTownsToState(payload))).toEqual(expectedValue);
    });
    it("handle CHANGE_TOWNS_FROM_ORDER_FORM_IS_LOAD", ()=>{
        const payload = true;
        const expectedValue = {
            ...initialState,
            townsInOrderFormIsLoad: payload
        };
        expect(reducer(initialState, actions.changeTownsFromOrderFormIsLoad(payload))).toEqual(expectedValue);
    });
});