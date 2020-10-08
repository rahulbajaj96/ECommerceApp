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

export const SaveToken = async (token, user_type) => {
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


export const SavePassword = async (email, password) => {
    console.log(email, ' ' + password);
    await get_From_AsyncStorage('@Save_Password_Array').then(data => {
        if (data == null) {
            console.log('we need to create a na array ');
            let password_array = [];
            password_array.push({
                email, password
            });
            save_To_AsyncStorage('@Save_Password_Array', JSON.stringify(password_array));
        }
        else {
            console.log('we already have a password array ');
            let password_array = JSON.parse(data);
            password_array.push({
                email, password
            });
            save_To_AsyncStorage('@Save_Password_Array', JSON.stringify(password_array));
        }
    }
    )

}

export const checkToRemovePassword = async (email, password) => {
    console.log(email, ' ' + password);
    await get_From_AsyncStorage('@Save_Password_Array').then(data => {
        if (data != null) {
            console.log('we already have a password array ');
            let password_array = JSON.parse(data);
            for (let i = 0; i < password_array.length; i++) {
                if (password_array[i].email == email) {
                    password_array.splice(i, 1);
                    break
                }
            }
            save_To_AsyncStorage('@Save_Password_Array', JSON.stringify(password_array));
        }
    }
    )

}