import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import { spinnerReducer } from "./SpinnerReducers";
import { customerReducer } from "./CustomerReducer";
import { categoriesReducer } from "./CategoriesReducer";
import { subcategoriesReducer } from "./SubCategoriesReducer";
import { product_color_reducer } from "./ProductsColorsReducer";
import { product_size_reducer } from "./ProductSizesReducer";

const AllReducers = combineReducers({
    LoginReducer,
    spinnerReducer,
    customerReducer,
    categoriesReducer,
    subcategoriesReducer,
    product_color_reducer,
    product_size_reducer
})

export default AllReducers;
