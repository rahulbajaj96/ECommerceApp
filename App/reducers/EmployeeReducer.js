import { EMPLOYEE_LIST_FAILURE, EMPLOYEE_LIST_SUCCESS } from "../constants/ReduxConstants"

let initialState = {

    employee_list_response: '',
    employee_list: []
}
export const employeeReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case EMPLOYEE_LIST_SUCCESS: return {
            ...state,
            employee_list_response: actions.payload,
            employee_list: actions.payload.data


        };
        case EMPLOYEE_LIST_FAILURE: return {
            ...state,
            employee_list_response: actions.payload,

        };
        default: return state
    }
}   