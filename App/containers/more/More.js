import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import Style from '../../utils/Style'
import Images from '../../utils/Image'
import { MoreItems } from '../../components/MoreComponents'
import { useNavigation } from '@react-navigation/native';
import { remove_from_AsyncStorage, get_From_AsyncStorage } from '../../Services/StorageService'
import { getUserType } from '../../helpers/InputValidations'

function MoreOptions(props) {
    const navigation = useNavigation();
    const [usertype, setusertype] = useState(0)
    useEffect(() => {
        getType();
    }, [])
    async function getType() {
        let userType = await getUserType();
        console.log('userType', userType);
        setusertype(userType);
    }
    function performLogout() {
        Alert.alert(
            '',
            'Are you sure want to Logout?',
            [
                {
                    text: 'Yes', onPress: () => {
                        remove_from_AsyncStorage('@Auth_Token');
                        remove_from_AsyncStorage('@login_auth_response');
                        navigation.navigate('Login');
                    }, style: 'cancel'
                },
                {
                    text: 'No', onPress: () =>

                        console.log('Cancel Pressed')

                },
            ],
            { cancelable: false }
        )
    }
    return (
        <AppComponent>
            <Toolbar title={'More'} />
            <View style={Style.CommonStyles.fullFlex}>
                <MoreItems label='Privacy policy' label_image={Images.privacy_policy} onClick={() => navigation.navigate('PrivacyPolicy')} />
                <MoreItems label='About Us' label_image={Images.about_us} onClick={() => navigation.navigate('AboutUs')} />
                <MoreItems label='Cart' label_image={Images.cart} onClick={() => navigation.navigate('Orders', {
                                screen: 'Cart',
                            })} />
                {
                    usertype == 2
                        ?
                        <MoreItems label='Manage Employee' label_image={Images.employee} onClick={() => navigation.navigate('Employee')}
                        />
                        :
                        null
                }



                <TouchableOpacity style={Style.More.logoutButton} onPress={() => performLogout()}>
                    <Text style={Style.More.logoutText}>Logout</Text>
                    <Image source={Images.logout} style={Style.More.logoutImage} />
                </TouchableOpacity>

            </View>
        </AppComponent>
    )
}
export default MoreOptions;