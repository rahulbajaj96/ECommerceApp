import { SafeAreaView, StatusBar, View } from 'react-native';
import React from 'react'
import Style from '../utils/Style';

export default AppComponent = (props) => {
    return (
        <View style={Style.CommonStyles.fullFlex}>
            <SafeAreaView style={Style.CommonStyles.SafeAreaStyle}>
                <StatusBar translucent barStyle='light-content' backgroundColor={'#2e1786'} />
            </SafeAreaView>
            {props.children}
        </View>
    )
}
