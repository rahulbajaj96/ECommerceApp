import { PRODUCTS_SIZES_SUCCESS, PRODUCTS_SIZES_FAILURE } from "../constants/ReduxConstants";

const initialState = {
    sizes_available: [],
    sizes_api_response: ''
}

export const product_size_reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case PRODUCTS_SIZES_SUCCESS: return {
            ...state,
            sizes_api_response: actions.payload,
            sizes_available: actions.payload.data
        };
        case PRODUCTS_SIZES_FAILURE: return {
            ...state,
            sizes_api_response: actions.payload
        };
        default: return state;
    }
}