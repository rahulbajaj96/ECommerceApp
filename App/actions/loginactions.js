import { ApiCallPost } from "../Services/ApiServices";
import { Platform } from "react-native";
import { LOGIN_SUCCESS, LOGIN_FAILURE, SPINNER_ON, SPINNER_OFF } from "../constants/ReduxConstants";
import { BASE_URL } from "../config";

export const loginaction = (email, password) => {
    return async function (dispatch) {
        let formData = new FormData();
        formData.append('email', 'worker@yopmail.com');
        formData.append('password', 'DoW9p98P');
        formData.append('device_token', '12');
        formData.append('device_type', Platform.OS == 'ios' ? 1 : 2);
        console.log('formdata of Login Api ', JSON.stringify(formData));
        console.log('Base Url ', BASE_URL)
        dispatch({ type: SPINNER_ON })
        var response = await ApiCallPost(BASE_URL + 'login', formData);
        console.log('api call ', response);
        if (response != false) {
            if (response.status == 0) {
                //api missing params
                dispatch(UnSucessful_login(response));
                dispatch({ type: SPINNER_OFF })

                // Toast.show(response.message);
            }
            else if (response.status == 1) {
                //api hit successfully
                dispatch(Successful_login(response));
                dispatch({ type: SPINNER_OFF })

               

            }
        }
    }
}
export const Successful_login = (response) => {
    return {
        type: LOGIN_SUCCESS,
        payload: response
    }
}
export const UnSucessful_login = (response) => {
    return {
        type: LOGIN_FAILURE,
        payload: response
    }
}
