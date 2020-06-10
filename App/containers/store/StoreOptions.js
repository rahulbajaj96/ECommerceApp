import React from 'react'
import { Text, View, TouchableOpacity, Image, Alert, Dimensions } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import Style from '../../utils/Style'
import Images from '../../utils/Image'
import { MoreItems } from '../../components/MoreComponents'
import { useNavigation } from '@react-navigation/native';
import { remove_from_AsyncStorage } from '../../Services/StorageService'
// import { ColorWheel } from 'react-native-color-wheel';
function StoreOptions(props) {
    const navigation = useNavigation();

    // function performLogout() {
    //     Alert.alert(
    //         '',
    //         'Are you sure want to Logout?',
    //         [
    //             {
    //                 text: 'Yes', onPress: () => {
    //                     remove_from_AsyncStorage('@Auth_Token');
    //                     remove_from_AsyncStorage('@login_auth_response');
    //                     navigation.navigate('Login');
    //                 }, style: 'cancel'
    //             },
    //             {
    //                 text: 'No', onPress: () =>

    //                     console.log('Cancel Pressed')

    //             },
    //         ],
    //         { cancelable: false }
    //     )
    // }
    return (
        // <AppComponent>
        //     <Toolbar title={'More'} />
        <View style={Style.CommonStyles.fullFlex}>

            <View style={{ flex: 0.8, backgroundColor: 'yellow', alignItems: 'center', justifyContent: 'center', }}>

                {/* <ColorWheel
                    initialColor="#000"
                    style={{ height: 200, width: 200, alignItems: 'center', justifyContent: 'center', }}
                    thumbSize={20}
                    onColorChange={color => console.log('color code',color)}
                    onColorChangeComplete={color => console.log('final color code',color)}
                /> */}
            </View>

            {/* <TouchableOpacity style={Style.More.logoutButton} onPress={() => performLogout()}>
                    <Text style={Style.More.logoutText}>Logout</Text>
                    <Image source={Images.logout} style={Style.More.logoutImage} />
                </TouchableOpacity> */}

        </View>
        // </AppComponent>
    )
}
export default StoreOptions;