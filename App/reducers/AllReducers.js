import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import { spinnerReducer } from "./SpinnerReducers";
import { customerReducer } from "./CustomerReducer";
import { categoriesReducer } from "./CategoriesReducer";

const AllReducers = combineReducers({
    LoginReducer,
    spinnerReducer,
    customerReducer,
    categoriesReducer

})

export default AllReducers;
