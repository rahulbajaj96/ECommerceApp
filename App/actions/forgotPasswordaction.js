import { ApiCallPost } from "../Services/ApiServices";
import { BASE_URL, API_URL } from "../config";
import { SPINNER_ON, SPINNER_OFF, FORGOT_PASSWORD_SUCESS, FORGOT_PASSWORD_FAILURE } from "../constants/ReduxConstants";

export const forgotPassword = (email) => {
    return async function (dispatch) {
        let formdata = new FormData();
        formdata.append('email', email);
        dispatch({ type: SPINNER_ON })
        let forgotPasswordResponse = await ApiCallPost(`${BASE_URL}${API_URL.ForgotPassword}`, formdata);
        if (forgotPasswordResponse != false) {
            if (forgotPasswordResponse.status == 1)
                dispatch(ForgotPassSuccess(forgotPasswordResponse));
            else
                dispatch(ForgotPassFailure(forgotPasswordResponse));

        }
        dispatch({ type: SPINNER_OFF })
    }
}
const ForgotPassSuccess = (response) => { 
    return{
        type:FORGOT_PASSWORD_SUCESS,
        payload:response
    }
}
const ForgotPassFailure = (response) => { 
    return{
        type:FORGOT_PASSWORD_FAILURE,
        payload:response
    }
}