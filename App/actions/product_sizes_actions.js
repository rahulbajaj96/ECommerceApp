import { ApiCallGet } from "../Services/ApiServices"
import { BASE_URL, API_URL } from "../config";
import { PRODUCTS_SIZES_FAILURE, PRODUCTS_SIZES_SUCCESS } from "../constants/ReduxConstants";

export const getProductSizes = () => {
    return async function (dispatch) {
        var sizes = await ApiCallGet(`${BASE_URL}${API_URL.Product_Sizes}`, '');
        console.log('Sizes of Products available ', sizes);
        if (sizes != false) {
            if (sizes.status == 1)
                dispatch(SuccessFul_Sizes(sizes));
            else
                dispatch(Failure_Sizes(sizes));
        }
    }
}

const SuccessFul_Sizes = (sizes) => {
    return {
        type: PRODUCTS_SIZES_SUCCESS,
        payload: sizes
    }
}
const Failure_Sizes = (sizes) => {
    return {
        type: PRODUCTS_SIZES_FAILURE,
        payload: sizes
    }
}