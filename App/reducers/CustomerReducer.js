import { CUSTOMER_LIST_SUCCESS, CUSTOMER_LIST_FAILURE } from "../constants/ReduxConstants"

let initialState = {
    
    customer_list_response: '',
    customer_list: []
}
export const customerReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CUSTOMER_LIST_SUCCESS: return {
            ...state,
            customer_list_response: actions.payload,
            customer_list: actions.payload.data


        };
        case CUSTOMER_LIST_FAILURE: return {
            ...state,
            customer_list_response: actions.payload,

        };
        default: return state
    }
}   