import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Item, Input, Label } from 'native-base';
import Style from "../../utils/Style";
import Images from "../../utils/Image";


class Login extends Component {
    state = {

        email: '',
        password: '',
        loginStatus: false
    }

    checkLoginConditions() {
        const { email, password, loginStatus } = this.state

        console.log(email);
        console.log(password);
        this.props.navigation.navigate('Screen');
    }

    render() {

        const { email, password } = this.state
        return (
            <View style={Style.CommonStyles.fullFlex}>

                <LinearGradient colors={['#2e1786', '#5453C7']} style={[{ flex: 0.5, }, Style.CommonStyles.centerStyle]} start={{ x: 1, y: 0.1 }} end={{ x: 1, y: 1 }}>
                    <View style={[Style.LoginStyles.GradientImageStyle, Style.CommonStyles.centerStyle]}>
                        <Image style={{ height: 50, width: 50 }} source={Images.appIcon} />

                    </View>

                </LinearGradient>
                <View style={{ flex: 0.5, backgroundColor: '#fff' }}>

                    <View style={Style.LoginStyles.AuthView}>

                        <Text style={{ fontSize: 20, color: '#000', textAlign: 'center', marginTop: 10 }}>Login</Text>
                        <Item stackedLabel style={Style.LoginStyles.AuthItemStyle}>
                            <Label style={Style.LoginStyles.AuthItemLabel}>EMAIL</Label>
                            <Input
                                value={email}
                                style={Style.LoginStyles.AuthItemTextInput}
                                underlineColorAndroid='transparent'
                                placeholder={'Enter your email'}
                                onChangeText={email => this.setState({ email })} />
                        </Item>
                        <Item stackedLabel style={Style.LoginStyles.AuthItemStyle}>
                            <Label style={Style.LoginStyles.AuthItemLabel}>PASSWORD</Label>
                            <Input
                                value={password}
                                style={Style.LoginStyles.AuthItemTextInput}
                                underlineColorAndroid='transparent'
                                placeholder={'Enter your password'}
                                onChangeText={password => this.setState({ password })} />
                        </Item>
                        <TouchableOpacity style={[Style.LoginStyles.ButtonStyle, Style.CommonStyles.centerStyle]} onPress={() => this.checkLoginConditions()} >
                            <Text style={{ color: '#000', fontSize: 14, color: '#fff' }}>Login</Text>
                        </TouchableOpacity>

                        <Text style={Style.LoginStyles.ForgotPasswordText}>FORGOT PASSWORD?</Text>


                    </View>

                </View>

            </View>
        )
    }
}
export default Login;