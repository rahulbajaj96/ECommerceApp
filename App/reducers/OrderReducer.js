import { ORDER_LIST_SUCCESS, ORDER_LIST_FAILURE, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAILURE } from "../constants/ReduxConstants"

const initialState = {
    order_list_response: '',
    order_list: [],
    order_detail_response: ''
}
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_LIST_SUCCESS: return {
            ...state,
            order_list_response: action.payload,
            order_list: payload.data
        };
        case ORDER_LIST_FAILURE: return {
            ...state,
            order_list_response: action.payload
        };
        case ORDER_DETAIL_SUCCESS: return {
            ...state,
            order_detail_response: action.payload
        };
        case ORDER_DETAIL_FAILURE:return{
            ...state,
            order_detail_response:action.payload
        }
        default: return state
    }
}