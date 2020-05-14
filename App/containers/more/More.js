import React from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import Style from '../../utils/Style'
import Images from '../../utils/Image'
import { MoreItems } from '../../components/MoreComponents'
import { useNavigation } from '@react-navigation/native';

function MoreOptions(props) {
    const navigation = useNavigation();

    function performLogout() {
        Alert.alert(
            '',
            'Are you sure want to Logout?',
            [
                { text: 'Yes', onPress: () => console.log('Yes Pressed'), style: 'cancel' },
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
                <MoreItems label='Privacy policy' label_image={Images.privacy_policy} onClick={() => console.log('clicked')} />
                <MoreItems label='About Us' label_image={Images.about_us} onClick={() => console.log('clicked')} />
                <MoreItems label='Cart' label_image={Images.cart} onClick={() => console.log('clicked')} />
                <MoreItems label='Manage Employee' label_image={Images.employee} onClick={() => navigation.navigate('Employee')}
                />


                <TouchableOpacity style={Style.More.logoutButton} onPress={() => performLogout()}>
                    <Text style={Style.More.logoutText}>Logout</Text>
                    <Image source={Images.logout} style={Style.More.logoutImage} />
                </TouchableOpacity>

            </View>
        </AppComponent>
    )
}
export default MoreOptions;