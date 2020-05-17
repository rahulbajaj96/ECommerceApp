import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import { spinnerReducer } from "./SpinnerReducers";
import { customerReducer } from "./CustomerReducer";

const AllReducers = combineReducers({
    LoginReducer,
    spinnerReducer,
    customerReducer

})

export default AllReducers;
