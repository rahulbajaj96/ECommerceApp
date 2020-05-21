import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import { spinnerReducer } from "./SpinnerReducers";
import { customerReducer } from "./CustomerReducer";
import { categoriesReducer } from "./CategoriesReducer";
import { subcategoriesReducer } from "./SubCategoriesReducer";

const AllReducers = combineReducers({
    LoginReducer,
    spinnerReducer,
    customerReducer,
    categoriesReducer,
    subcategoriesReducer

})

export default AllReducers;
