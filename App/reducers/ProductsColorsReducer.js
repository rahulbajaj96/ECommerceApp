import { PRODUCTS_COLORS_SUCCESS, PRODUCTS_COLORS_FAILURE } from "../constants/ReduxConstants"

const initialState = {
    colors_available: [],
    colors_api_response: ''
}

export const product_color_reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case PRODUCTS_COLORS_SUCCESS: return {
            ...state,
            colors_api_response: actions.payload,
            colors_available: actions.payload.data
        };
        case PRODUCTS_COLORS_FAILURE: return {
            ...state,
            colors_api_response: actions.payload
        };
        default: return state;
    }
}