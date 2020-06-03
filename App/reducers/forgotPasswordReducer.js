import { FORGOT_PASSWORD_SUCESS, FORGOT_PASSWORD_FAILURE } from "../constants/ReduxConstants"

const initialState = {
    forgotPasswordResponse: ''
}

export const forgotPassReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_SUCESS: return {
            ...state,
            forgotPasswordResponse: action.payload
        };
        case FORGOT_PASSWORD_FAILURE: return {
            ...state,
            forgotPasswordResponse: action.payload
        }
        default: return state;
    }
}