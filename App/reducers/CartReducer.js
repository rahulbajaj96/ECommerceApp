import { CART_LIST_SUCCESS, CART_LIST_FAILURE } from "../constants/ReduxConstants"

const initialState = {
    cart_list_response: '',
    cart_list: []
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_LIST_SUCCESS: return {
            ...state,
            cart_list_response: action.paylaod,
            cart_list: action.paylaod.data
        };
        case CART_LIST_FAILURE: return {
            ...state,
            cart_list_response: action.paylaod
        };
        default: return state;
    }
}