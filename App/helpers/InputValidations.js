import { Email_reg, EMPTY } from "../constants/AppConstants";
import { save_To_AsyncStorage } from "../Services/StorageService";
export var Login_Auth_Token = '';

export const EmailValidation = (email) => {
    if (Email_reg.test(email) == false) {
        return false;
    }
    else {
        return true;
    }
}

export const EmptyValidation = (param) => {
    if (param == "") {
        return false;
    }
    else {
        return true;
    }
}

export const Get_Message = (parameter) => {
    return parameter + EMPTY;
}

export const SaveToken = (token) => {
    save_To_AsyncStorage('@Auth_Token', token);
    Login_Auth_Token = token;
}
