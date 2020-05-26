import { ApiCallPost } from "../Services/ApiServices";
import { BASE_URL, API_URL } from "../config";
import { SPINNER_ON, SPINNER_OFF, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAILURE, PRODUCTS_DETAIL_SUCCESS, PRODUCTS_DETAIL_FAILURE } from "../constants/ReduxConstants";

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

export const getProductDetail = (product_id) => {
    return async function (dispatch) {
        let formdata = new FormData();
        formdata.append('product_id', product_id);
        console.log('formdata of Product Detail ', formdata);
        dispatch({ type: SPINNER_ON })
        let product_detail = await ApiCallPost(`${BASE_URL}${API_URL.View_product}`, formdata);
        if (product_detail != false) {
            if (product_detail.status == 1)
                dispatch(ProductDetailSuccess(product_detail));
            else
                dispatch(ProductDetailFailure(product_detail));
        }
        dispatch({ type: SPINNER_OFF })
    }
}
const ProductDetailSuccess = (response) => {
    return {
        type: PRODUCTS_DETAIL_SUCCESS,
        payload: response
    }
}
const ProductDetailFailure = (response) => {
    return {
        type: PRODUCTS_DETAIL_FAILURE,
        payload: response
    }
}