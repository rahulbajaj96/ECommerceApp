import { ApiCallGet } from "../Services/ApiServices"
import { BASE_URL, API_URL } from "../config";
import { SPINNER_ON, SPINNER_OFF, CART_LIST_SUCCESS, CART_LIST_FAILURE } from "../constants/ReduxConstants";

export const getCartList = () => {
    return async function (dispatch) {
        dispatch({ type: SPINNER_ON })
        let cartList = await ApiCallGet(`${BASE_URL}${API_URL.Cart_list}`, '');
        console.log('response CartList', cartList);
        if (cartList != false) {
            if (cartList.status == 1)
                dispatch(CartListSuccess(cartList))
            else
                dispatch(CartListFailure(cartList))

            dispatch({ type: SPINNER_OFF })

        }
    }
}
const CartListSuccess = (cartList) => {
    return {
        type: CART_LIST_SUCCESS,
        paylaod: cartList
    }
}
const CartListFailure = (cartList) => {
    return {
        type: CART_LIST_FAILURE,
        paylaod: cartList
    }
}