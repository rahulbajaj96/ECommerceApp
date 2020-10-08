import React from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import { useNavigation } from '@react-navigation/native';
import Style from '../../utils/Style';

function PrivacyPolicy() {
    const navigation = useNavigation();

    return (
        <AppComponent>
            <Toolbar title='Privacy Policy' back={true} navigation={navigation} />
            <View style={{ flex: 1, padding: '5%' }}>
                <View style={Style.More.PrivacyPolicy.viewStyle}>
                    <ScrollView style={{ flex: 1, paddingVertical: '5%', paddingHorizontal: 10 }}>


                        <Text style={Style.More.PrivacyPolicy.textStyle}>
                            At fiveriverscrown, accessible from https://apps.fiveriverscrown.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by fiveriverscrown and how we use it.
                        {"\n"}{"\n"}
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                        {"\n"}{"\n"}
                            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in fiveriverscrown. This policy is not applicable to any information collected offline or via channels other than this website.
                            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                       If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
                       When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number
                    </Text>
                    </ScrollView>
                </View>

            </View>
        </AppComponent>
    )
}
export default PrivacyPolicy;