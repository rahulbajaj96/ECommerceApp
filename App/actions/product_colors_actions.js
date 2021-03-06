import { ApiCallGet } from "../Services/ApiServices"
import { BASE_URL, API_URL } from "../config";
import { PRODUCTS_COLORS_SUCCESS, PRODUCTS_COLORS_FAILURE, SPINNER_ON, SPINNER_OFF } from "../constants/ReduxConstants";

export const getProductColors = () => {
    return async function (dispatch) {
        var colors = await ApiCallGet(`${BASE_URL}${API_URL.Product_Colors}`, '');
        // console.log('colors of Products available ', colors);
        dispatch({type:SPINNER_ON})
        if (colors != false) {
            if (colors.status == 1)
                dispatch(SuccessFul_Colors(colors));
            else
                dispatch(Failure_colors(colors));
        }
        dispatch({type:SPINNER_OFF})
    }
}

const SuccessFul_Colors = (colors) => {
    return {
        type: PRODUCTS_COLORS_SUCCESS,
        payload: colors
    }
}
const Failure_colors = (colors) => {
    return {
        type: PRODUCTS_COLORS_FAILURE,
        payload: colors
    }
}