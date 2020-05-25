import { SUB_CATEGORIES_LIST_SUCCESS, SUB_CATEGORIES_LIST_FAILURE, SUB_CATEGORIES_LIST_BASED_ON_CATEGORY_SUCCESS, SUB_CATEGORIES_LIST_BASED_ON_CATEGORY_FAILURE } from "../constants/ReduxConstants"

let initialState = {

    subcategory_list_response: '',
    subcategory_list: [],
    subcategory_list_based_on_category: []
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
        case SUB_CATEGORIES_LIST_BASED_ON_CATEGORY_SUCCESS: return {
            ...state,
            subcategory_list_based_on_category: actions.payload.data
        };
        case SUB_CATEGORIES_LIST_BASED_ON_CATEGORY_FAILURE: return {
            ...state,
            subcategory_list_based_on_category: []
        };
        default: return state
    }
}   