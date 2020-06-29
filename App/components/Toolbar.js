import { Text, View, Image, SafeAreaView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import Style from '../utils/Style';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../utils/Image';
/**
 * @property {right} for right portion of toolbar
 * @param {1 - Save}  
 */

const Toolbar = (props) => {
    const customisedback = () => {
        Alert.alert(
            '',
            ' Are you sure you want to discard the changes?',
            [
                { text: 'Yes', onPress: () => props.customBackAction ? props.customisedBackAction() : props.navigation.goBack(), style: 'cancel' },
                {
                    text: 'No', onPress: () => console.log('no'), style: 'cancel'
                },
            ],
            { cancelable: false }
        )
    }
    const performBack = () => {
        console.log('customisedbackFunctionality', props.customisedbackButton)
        props.customisedbackButton ? customisedback() :  props.customBackAction ? props.customisedBackAction() :props.navigation.goBack()
    }
    return (
        <LinearGradient style={Style.Toolbar.toolbarView} colors={['#2e1786', '#5453C7']} start={{ x: 0.1, y: 0.1 }} end={{ x: 1, y: 1 }}>

            <View style={{ flex: 0.2, justifyContent: 'center', paddingLeft: 8 }}>
                {
                    props.back ?
                        <TouchableOpacity style={[{ width: 30, height: 30 }, Style.CommonStyles.centerStyle]} onPress={() => performBack()}>
                            <Image source={Images.back_arrow} style={{ width: 22, height: 22, }} />
                        </TouchableOpacity>
                        :
                        null
                }

            </View>
            <View style={[{ flex: 0.6 }, Style.CommonStyles.centerStyle]}>
                <Text style={{ color: '#fff', fontSize: 20, }}>{props.title}</Text>

            </View>
            <View style={[{ flex: 0.2 }, Style.CommonStyles.centerStyle]}>
                {
                    props.right == 1
                        ?
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => props.onSavePress()} >
                            <Text style={Style.Toolbar.SaveButtonText}>SAVE</Text>
                        </TouchableOpacity>
                        :
                        null

                }
            </View>




        </LinearGradient>
    )
}
export default Toolbar;