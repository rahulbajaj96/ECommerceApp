import { Platform, StatusBar, Dimensions } from "react-native";

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const AANHEFArray = ['Mr.', 'Mrs.', 'Miss'];
export let Email_reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const EMPTY = " cannot be empty";
export const Email_VALIDATION_MESSAGE = "Please enter a valid email";
export const Internet_Connectivity_message = "Please check your Internet Connection";

// export const ProductsArray