import {  StatusBar, View, } from 'react-native';
import React from 'react'
import Style from '../utils/Style';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default AppComponent = (props) => {
    return (

        <SafeAreaView style={Style.CommonStyles.SafeAreaStyle}>
            <StatusBar translucent barStyle='light-content' backgroundColor={'#2e1786'} />
            <View style={Style.CommonStyles.fullFlex}>
                {props.children}
            </View>
        </SafeAreaView>
    )
}
