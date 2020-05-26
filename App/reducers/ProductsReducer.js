import { PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAILURE, PRODUCTS_DETAIL_FAILURE, PRODUCTS_DETAIL_SUCCESS } from "../constants/ReduxConstants"

const initialState = {
    products_List: [],
    products_api_response: '',
    product_detail_api_response: '',

}
export const productsReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case PRODUCTS_LIST_SUCCESS: return {
            ...state,
            products_api_response: actions.payload,
            products_List: actions.payload.data
        };
        case PRODUCTS_LIST_FAILURE: return {
            ...state,
            products_api_response: actions.payload
        };
        case PRODUCTS_DETAIL_FAILURE: return {
            ...state,
            product_detail_api_response: actions.payload
        };
        case PRODUCTS_DETAIL_SUCCESS: return {
            ...state,
            product_detail_api_response: actions.payload
        }
        default: return state;
    }
}