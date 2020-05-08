import { Platform, StatusBar, Dimensions } from "react-native";

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const  AANHEFArray = ['MR.', 'MRS.', 'MISS'];
// export const ProductsArray