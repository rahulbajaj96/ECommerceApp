import { ApiCallPost } from "../Services/ApiServices";
import { BASE_URL, API_URL } from "../config";
import { SPINNER_ON, SPINNER_OFF, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAILURE } from "../constants/ReduxConstants";

export const getProductslist = (category_id, subcategory_id) => {
    return async function (dispatch) {
        let formdata = new FormData();
        formdata.append('category_id', category_id);
        formdata.append('subcategory_id', subcategory_id);
        console.log('formDtaa of get products ', formdata);
        dispatch({ type: SPINNER_ON })
        var products = await ApiCallPost(`${BASE_URL}${API_URL.Product_List}`, formdata);
        if (products != false) {
            if (products.status == 1)
                dispatch(Successful_Products(products));
            else
                dispatch(Failure_ProductsList(products))
        }
        dispatch({ type: SPINNER_OFF })

    }
}
const Successful_Products = (products) => {
    return {
        type: PRODUCTS_LIST_SUCCESS,
        payload: products
    }
}
const Failure_ProductsList = (products) => {
    return {
        type: PRODUCTS_LIST_FAILURE,
        payload: products
    }
}