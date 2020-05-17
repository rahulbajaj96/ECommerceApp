import { SPINNER_ON, SPINNER_OFF } from "../constants/ReduxConstants"

let initialState = {
    SpinnerVisibility: false
}

export const spinnerReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case SPINNER_ON: return {
            ...state,
            SpinnerVisibility: true
        };
        case SPINNER_OFF: return {
            ...state,
            SpinnerVisibility: false
        };
        default: return state;
    }
}