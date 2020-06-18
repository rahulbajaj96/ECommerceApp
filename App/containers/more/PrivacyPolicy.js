import React from 'react'
import { Text, View, Image, TouchableOpacity ,ScrollView} from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import { useNavigation } from '@react-navigation/native';
import Style from '../../utils/Style';

function PrivacyPolicy() {
    const navigation = useNavigation();

    return (
        <AppComponent>
            <Toolbar title='Privacy Policy' back={true} navigation={navigation} />
            <View style={{ flex: 1,  padding: '5%' }}>
                <View style={Style.More.PrivacyPolicy.viewStyle}>
                        <ScrollView style={{flex:1,paddingVertical: '5%',paddingHorizontal:10}}>

                     
                    <Text style={Style.More.PrivacyPolicy.textStyle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget maximus lacus. Phasellus finibus risus ac tincidunt interdum. Morbi elementum sed sem et volutpat. Phasellus id nulla dui. Aliquam erat volutpat. Etiam porttitor lacus eu placerat gravida. In porttitor faucibus libero ut euismod.
                        {"\n"}{"\n"}
                        Donec sit amet nulla id velit tincidunt tincidunt nec interdum dui. Ut bibendum commodo lorem sed ornare. Proin vel rutrum ex. Phasellus ac tempus nulla. Nunc vulputate porttitor ex vitae sollicitudin. Mauris eu augue nibh. Aliquam sit amet maximus lacus, sit amet ultrices ligula. Praesent nec mauris eget purus congue posuere. Fusce a lectus at metus mattis imperdiet faucibus et enim.
                        {"\n"}{"\n"}
                        Morbi in nisi sagittis, malesuada urna rhoncus, rutrum eros. Curabitur eu ultrices dolor. Cras non purus feugiat, venenatis tellus vitae, malesuada nisi. Donec odio dolor, pretium sed ultricies ut, ullamcorper et nisi. Praesent mi sapien, rutrum in vulputate eu, iaculis a sapien. Vivamus commodo quam a eros efficitur aliquam. Morbi tincidunt a ante a molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    </Text>
                    </ScrollView>
                </View>

            </View>
        </AppComponent>
    )
}
export default PrivacyPolicy;