import { Email_reg, EMPTY, EMPTY_TAG } from "../constants/AppConstants";
import { save_To_AsyncStorage, get_From_AsyncStorage } from "../Services/StorageService";
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

export const SaveToken = (token, user_type) => {
    save_To_AsyncStorage('@Auth_Token', token);
    save_To_AsyncStorage('@Auth_User_type', user_type);
    Login_Auth_Token = token;
}

export const get_Empty_Tag = (name) => {
    return `No ${name} ${EMPTY_TAG} ${name}`;
}
export async function getUserType() {
    let userType = 0;
    await get_From_AsyncStorage('@Auth_User_type').then(user_type => {
        console.log('userType', user_type);
        userType = user_type
    });
    return userType;
}