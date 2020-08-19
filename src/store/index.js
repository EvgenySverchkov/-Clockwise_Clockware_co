import {createStore} from "redux";
import reducers from "./allReducers";
import { initialState } from "./initialState";

export default createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());