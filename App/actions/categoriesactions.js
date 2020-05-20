import { ApiCallGet } from "../Services/ApiServices"
import { BASE_URL, API_URL } from "../config";
import { SPINNER_ON, CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAILURE, SPINNER_OFF } from "../constants/ReduxConstants";

export const getCategoriesList = () => {
    return async function (dispatch) {
        dispatch({ type: SPINNER_ON })
        var response = await ApiCallGet(`${BASE_URL}${API_URL.Categories_List}`, '');
        // console.log('Categorieslist', response);
        if (response != false) {
            dispatch({ type: SPINNER_OFF })
            if (response.status == 1) {
                dispatch(CategoriesList_Success(response));
            }
            else {
                dispatch(CategoriesList_Failure(response));
            }
        }
    }
}
const CategoriesList_Success = (response) => {
    return {
        type: CATEGORIES_LIST_SUCCESS,
        payload: response
    }
}
const CategoriesList_Failure = (response) => {
    return {
        type: CATEGORIES_LIST_FAILURE,
        payload: response
    }
}