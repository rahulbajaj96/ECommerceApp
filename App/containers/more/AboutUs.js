import React from 'react'
import { Text, View, Image, TouchableOpacity ,ScrollView} from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import { useNavigation } from '@react-navigation/native';
import Style from '../../utils/Style';

function AboutUs() {
    const navigation = useNavigation();

    return (
        <AppComponent>
            <Toolbar title='About us' back={true} navigation={navigation} />
            <View style={{ flex: 1,  padding: '5%' }}>
                <View style={Style.More.PrivacyPolicy.viewStyle}>
                        <ScrollView style={{flex:1,paddingVertical: '5%',paddingHorizontal:10}}>

                     
                    <Text style={Style.More.PrivacyPolicy.textStyle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget maximus lacus. Phasellus finibus risus ac tincidunt interdum. Morbi elementum sed sem et volutpat. Phasellus id nulla dui. Aliquam erat volutpat. Etiam porttitor lacus eu placerat gravida. In porttitor faucibus libero ut euismod.
                        {"\n"}{"\n"}
                        Donec sit amet nulla id velit tincidunt tincidunt nec interdum dui. Ut bibendum commodo lorem sed ornare. Proin vel rutrum ex. Phasellus ac tempus nulla. Nunc vulputate porttitor ex vitae sollicitudin. Mauris eu augue nibh. Aliquam sit amet maximus lacus, sit amet ultrices ligula. Praesent nec mauris eget purus congue posuere. Fusce a lectus at metus mattis imperdiet faucibus et enim.
                        
                    </Text>
                    </ScrollView>
                </View>

            </View>
        </AppComponent>
    )
}
export default AboutUs;