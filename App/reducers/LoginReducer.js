import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/ReduxConstants";

let initialState = {
    email: '',
    password: '',
    forgotPassword_Email: '',
    response_from_login_Api: '',
}

export default loginReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                response_from_login_Api: actions.payload,
               
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                response_from_login_Api: actions.payload,
            };

        default: return state;
    }
}   