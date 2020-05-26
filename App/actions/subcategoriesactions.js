import { ApiCallGet, ApiCallPost } from "../Services/ApiServices"
import { BASE_URL, API_URL } from "../config";
import { SPINNER_ON, SPINNER_OFF, SUB_CATEGORIES_LIST_SUCCESS, SUB_CATEGORIES_LIST_FAILURE, SUB_CATEGORIES_LIST_BASED_ON_CATEGORY_SUCCESS, SUB_CATEGORIES_LIST_BASED_ON_CATEGORY_FAILURE } from "../constants/ReduxConstants";

export const getSubCategoriesList = (id) => {
    return async function (dispatch) {
        let formdata = new FormData();
        formdata.append('category_id', id);
        console.log('formdata of SubCategoryList', formdata)
        dispatch({ type: SPINNER_ON })

        var response = await ApiCallPost(`${BASE_URL}${API_URL.SubCategory_List}`, formdata);
        console.log('Categorieslist', response);
        if (response != false) {
            dispatch({ type: SPINNER_OFF })
            if (response.status == 1) {
                dispatch(SubCategoriesList_Success(response));
            }
            else {
                dispatch(SubCategoriesList_Failure(response));
            }
        }
    }
}
export const getSubCategoriesList_On_category = (id) => {
    return async function (dispatch) {
        let formdata = new FormData();
        formdata.append('category_id', id);
        console.log('formdata of SubCategoryList', formdata)
        dispatch({ type: SPINNER_ON })

        var response = await ApiCallPost(`${BASE_URL}${API_URL.SubCategory_List}`, formdata);
        // console.log('Categorieslist', response);
        if (response != false) {
            dispatch({ type: SPINNER_OFF })
            if (response.status == 1) {
                dispatch(SubCategoriesList_Based_category_Success(response));
            }
            else {
                dispatch(SubCategoriesList_Based_category_Failure(response));
            }
        }
    }
}
const SubCategoriesList_Success = (response) => {
    return {
        type: SUB_CATEGORIES_LIST_SUCCESS,
        payload: response
    }
}
const SubCategoriesList_Failure = (response) => {
    return {
        type: SUB_CATEGORIES_LIST_FAILURE,
        payload: response
    }
}
const SubCategoriesList_Based_category_Success = (response) => {
    return {
        type: SUB_CATEGORIES_LIST_BASED_ON_CATEGORY_SUCCESS,
        payload: response
    }
}
const SubCategoriesList_Based_category_Failure = (response) => {
    return {
        type: SUB_CATEGORIES_LIST_BASED_ON_CATEGORY_FAILURE,
        payload: response
    }
}