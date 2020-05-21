import { SUB_CATEGORIES_LIST_SUCCESS, SUB_CATEGORIES_LIST_FAILURE } from "../constants/ReduxConstants"

let initialState = {

    subcategory_list_response: '',
    subcategory_list: []
}
export const subcategoriesReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SUB_CATEGORIES_LIST_SUCCESS: return {
            ...state,
            subcategory_list_response: actions.payload,
            subcategory_list: actions.payload.data


        };
        case SUB_CATEGORIES_LIST_FAILURE: return {
            ...state,
            subcategory_list_response: actions.payload,

        };
        default: return state
    }
}   