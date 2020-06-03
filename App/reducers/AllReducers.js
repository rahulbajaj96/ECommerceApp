import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import { spinnerReducer } from "./SpinnerReducers";
import { customerReducer } from "./CustomerReducer";
import { categoriesReducer } from "./CategoriesReducer";
import { subcategoriesReducer } from "./SubCategoriesReducer";
import { product_color_reducer } from "./ProductsColorsReducer";
import { product_size_reducer } from "./ProductSizesReducer";
import { productsReducer } from "./ProductsReducer";
import { cartReducer } from "./CartReducer";
import { orderReducer } from "./OrderReducer";
import { employeeReducer } from "./EmployeeReducer";
import { forgotPassReducer } from "./forgotPasswordReducer";

const AllReducers = combineReducers({
    LoginReducer,
    forgotPassReducer,
    spinnerReducer,
    customerReducer,
    categoriesReducer,
    subcategoriesReducer,
    product_color_reducer,
    product_size_reducer,
    productsReducer,
    cartReducer,
    orderReducer,
    employeeReducer
})

export default AllReducers;
