import { CATEGORIES_LIST_SUCCESS, CATEGORIES_LIST_FAILURE } from "../constants/ReduxConstants"

let initialState = {

    category_list_response: '',
    category_list: []
}
export const categoriesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CATEGORIES_LIST_SUCCESS: return {
            ...state,
            category_list_response: actions.payload,
            category_list: actions.payload.data


        };
        case CATEGORIES_LIST_FAILURE: return {
            ...state,
            category_list_response: actions.payload,

        };
        default: return state
    }
}   