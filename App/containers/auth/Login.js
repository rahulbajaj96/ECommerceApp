import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Easing, Platform, Keyboard } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Item, Input, Label } from 'native-base';
import Style from "../../utils/Style";
import Images from "../../utils/Image";
import Toast from 'react-native-simple-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { get_From_AsyncStorage, save_To_AsyncStorage } from "../../Services/StorageService";
import { ApiCallGet, ApiCallPost } from '../../Services/ApiServices';
import AppComponent from '../../components/AppComponent'
import { EmptyValidation, Get_Message, EmailValidation, SaveToken, SavePassword, checkToRemovePassword } from "../../helpers/InputValidations";
import { Email_VALIDATION_MESSAGE, BASE_URL } from "../../constants/AppConstants";
import { connect } from "react-redux";
import { loginaction } from "../../actions/loginactions";

import Spinner from 'react-native-loading-spinner-overlay';
import { forgotPassword } from "../../actions/forgotPasswordaction";
import Colors from "../../utils/Colors";
class Login extends Component {
    constructor() {
        super();
        this.AnimationValue = new Animated.Value(0);
        this.frontInterpolate = this.AnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
        });
        this.backInterpolate = this.AnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '360deg'],
        });
        this.opacityFront = this.AnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        })
        this.opacityBack = this.AnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })

    }
    state = {

        email: '',
        password: '',
        loginStatus: false,
        spinValue: new Animated.Value(0),
        flipped: false,
        forgotPasswordEmail: '', password_show: false,
        rememberme: false
    }
    handleAnimation(toValue) {
        Animated.timing(
            this.AnimationValue,
            {
                toValue,
                duration: 400,
                easing: Easing.linear,
                useNativeDriver: false
            },
        ).start()
    }
    componentDidMount() {
        // this.spin()


        this.getUserData();

    }
    async getUserData() {


        get_From_AsyncStorage('@login_auth_response').then(result => {
            console.log('result', result)
            if (result != null) {
                var response = JSON.parse(result);
                this.navigateFromLogin(response.user_type);
            }
        });

    }

    spin() {

        Animated.timing(
            this.state.spinValue,
            {
                toValue: 1,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: false
            }
        ).start();
    }

    navigateFromLogin(user_type) {
        console.log('user_type', user_type);
        const { navigation } = this.props
        //storeUser
        if (user_type == '2')
            // navigation.navigate('StoreOptions');
            navigation.navigate('Tabs', { screen: 'Products' });
        else if (user_type == '3')
            navigation.navigate('Tabs', { screen: 'Products' });

    }
    async checkLoginConditions() {
        const { email, password, loginStatus } = this.state
        Keyboard.dismiss()
        console.log(email);
        console.log(password);
        if (EmptyValidation(email) == false) {
            Toast.show(Get_Message('email'));
            return;
        }
        if (EmailValidation(email) == false) {
            Toast.show(Email_VALIDATION_MESSAGE);
            return;
        }
        if (EmptyValidation(password) == false) {
            Toast.show(Get_Message('password'));
            return;
        }
        else {

            await this.props.loginApi(email, password);
            const { LoginReducer } = this.props
            console.log('Login response', LoginReducer)
            if (LoginReducer.response_from_login_Api)

                if (LoginReducer.response_from_login_Api.status == 1) {
                    if (LoginReducer.response_from_login_Api.data.user_type == '1') {
                        setTimeout(() => {
                            Toast.show("Credentials donot match");
                        }, 500);
                        // this.setState({ email: '', password: '', password_show: false, rememberme: false })
                    }
                    else {

                        await this.saveDataTODevice(LoginReducer);
                        setTimeout(() => {
                            Toast.show(LoginReducer.response_from_login_Api.message);
                        }, 500);
                        this.setState({ email: '', password: '', password_show: false, rememberme: false })
                        this.navigateFromLogin(LoginReducer.response_from_login_Api.data.user_type);
                        // this.props.navigation.navigate('Tabs', {
                        //     screen: 'Products'
                        //     // , params: {
                        //     //     screen: 'AddProduct'
                        //     // }
                        // });
                    }

                }
                else {
                    setTimeout(() => {
                        Toast.show(LoginReducer.response_from_login_Api.message);
                    }, 500);
                }

        }
    }
    async saveDataTODevice(LoginReducer) {
        save_To_AsyncStorage('@login_auth_response', JSON.stringify(LoginReducer.response_from_login_Api.data));
        await SaveToken(LoginReducer.response_from_login_Api.data.token, LoginReducer.response_from_login_Api.data.user_type);
        let { rememberme, email, password } = this.state
        if (rememberme) {
            await SavePassword(email, password);
        }
        else {
            await checkToRemovePassword(email, password)
        }
    }
    async rediscoverPassword() {
        const { forgotPasswordEmail } = this.state
        if (EmptyValidation(forgotPasswordEmail) == false) {
            Toast.show(Get_Message('email'));
            return;
        }
        if (EmailValidation(forgotPasswordEmail) == false) {
            Toast.show(Email_VALIDATION_MESSAGE);
            return;
        }
        else {
            await this.props.getPassword(forgotPasswordEmail);
            const { forgotPassReducer } = this.props
            if (forgotPassReducer.forgotPasswordResponse.status == 1) {

                setTimeout(() => {
                    Toast.show(forgotPassReducer.forgotPasswordResponse.message);
                    this.goToLogin();
                }, 500);
            }
            else {
                setTimeout(() => {
                    Toast.show(forgotPassReducer.forgotPasswordResponse.message);
                }, 500);
            }
        }
    }
    goToForgotPassword = () => {
        console.log('here')
        this.setState({ flipped: true, flipvalue: 1 })
        this.handleAnimation(1)


    }
    goToLogin = () => {
        this.setState({ flipped: false, })

        this.handleAnimation(0)

    }
    checkAlreadySavedPassword = async () => {
        let { email } = this.state
        get_From_AsyncStorage('@Save_Password_Array').then(data => {
            console.log('data', data)
            let password_found = false
            if (data != null) {
                let pass_array = JSON.parse(data);
                for (let i = 0; i < pass_array.length; i++) {
                    if (pass_array[i].email.toLowerCase() == email.toLowerCase()) {
                        this.setState({ password: pass_array[i].password, rememberme: true })
                        password_found = true;
                        break;
                    }
                }

                if (password_found == false) {
                    this.setState({ password: '', rememberme: false })
                }
            }

        })
    }
    render() {


        const { email, password, spinValue, forgotPasswordEmail, flipped, password_show, rememberme } = this.state
        const svalue = spinValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            }
        )
        const textSize = spinValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [20, 32, 20]
        })



        const frontAnimatedStyle = { rotateY: this.frontInterpolate };
        const backAnimatedStyle = { rotateY: this.backInterpolate };

        console.log('Spinner', this.props.spinnerReducer)

        return (
            <AppComponent>

                <LinearGradient colors={['#2e1786', '#5453C7']} style={[{ flex: 0.5, }, Style.CommonStyles.centerStyle]} start={{ x: 1, y: 0.1 }} end={{ x: 1, y: 1 }}>
                    <View style={[Style.LoginStyles.GradientImageStyle, Style.CommonStyles.centerStyle]}>
                        <Animated.Image style={{ height: 80, width: 80, transform: [{ rotate: svalue }] }} source={Images.appIcon} resizeMode='contain' />

                    </View>

                </LinearGradient>
                <Spinner visible={this.props.spinnerReducer.SpinnerVisibility} />
                <View style={{
                    flex: 0.45,
                }}>

                    {
                        flipped == false
                            ?
                            <Animated.View style={[Style.LoginStyles.AuthView, {
                                transform: [
                                    frontAnimatedStyle,
                                ],
                                opacity: this.opacityFront,


                            }]}>
                                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: '7%', }}
                                    extraHeight={-64}
                                >
                                    <Animated.Text style={{ fontSize: 20, color: '#000', textAlign: 'center', marginTop: 10 }}>Login</Animated.Text>

                                    <Item stackedLabel style={Style.LoginStyles.AuthItemStyle}>
                                        <Label style={Style.LoginStyles.AuthItemLabel}>EMAIL</Label>
                                        <Input
                                            value={email}
                                            style={Style.LoginStyles.AuthItemTextInput}
                                            underlineColorAndroid='transparent'
                                            keyboardType='email-address'
                                            returnKeyType='done'
                                            placeholder={'Enter your email'}
                                            onChangeText={email => this.setState({ email })}
                                            onSubmitEditing={() => this.checkAlreadySavedPassword()}
                                        />
                                    </Item>
                                    <Item stackedLabel style={Style.LoginStyles.AuthItemStyle}>
                                        <Label style={Style.LoginStyles.AuthItemLabel}>PASSWORD</Label>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Input
                                                value={password}
                                                onFocus={() => this.checkAlreadySavedPassword()}
                                                style={Style.LoginStyles.AuthItemTextInput}
                                                underlineColorAndroid='transparent'
                                                secureTextEntry={password_show ? false : true}
                                                returnKeyType='done'
                                                placeholder={'Enter your password'}
                                                onChangeText={password => this.setState({ password })} />

                                            <TouchableOpacity style={[Style.CommonStyles.centerStyle, { marginBottom: 15, borderWidth: 0 }]} onPress={() => this.setState({ password_show: !password_show })}>
                                                <Image style={{ height: 25, width: 25, }} source={password_show ? Images.eye_close : Images.eye} />
                                            </TouchableOpacity>
                                        </View>
                                    </Item>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                                        <TouchableOpacity style={{ height: 15, width: 15, borderWidth: 0, }} onPress={() => this.setState({ rememberme: !rememberme })}>
                                            <Image source={rememberme ? Images.checkedBox : Images.uncheckedBox} style={{ height: rememberme ? 20 : 15, width: rememberme ? 20 : 15 }} />
                                        </TouchableOpacity>
                                        <Text style={{ color: Colors.theme_color, fontSize: 15, marginLeft: 15 }}>Remember me</Text>
                                    </View>


                                    <TouchableOpacity style={[Style.LoginStyles.ButtonStyle, Style.CommonStyles.centerStyle]} onPress={() => this.checkLoginConditions()} >
                                        <Text style={{ color: '#000', fontSize: 14, color: '#fff' }}>Login</Text>
                                    </TouchableOpacity>
                                    <Text style={Platform.OS === 'android' ? Style.LoginStyles.ForgotPasswordTextAndroid : Style.LoginStyles.ForgotPasswordText}

                                        onPress={() => this.goToForgotPassword()}
                                    >FORGOT PASSWORD?</Text>


                                </KeyboardAwareScrollView>
                            </Animated.View>

                            :

                            <Animated.View style={[Style.LoginStyles.ForgotPassView, {
                                transform: [
                                    backAnimatedStyle
                                ],
                                opacity: this.opacityBack,
                                // backfaceVisibility: 'hidden',
                                position: 'absolute'


                            }]}>
                                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: '7%', }}
                                    extraHeight={-64}
                                // scrollEnabled={false}
                                >
                                    <Animated.Text style={{ fontSize: 20, color: '#000', textAlign: 'center', marginTop: 10 }}>Forgot Password</Animated.Text>
                                    <Text style={Style.LoginStyles.forgotInst}> * Enter a email on which new password wil be sent</Text>
                                    <Item stackedLabel style={Style.LoginStyles.AuthItemStyle}>
                                        <Label style={Style.LoginStyles.AuthItemLabel}>EMAIL</Label>
                                        <Input
                                            value={forgotPasswordEmail}
                                            style={Style.LoginStyles.AuthItemTextInput}
                                            underlineColorAndroid='transparent'
                                            placeholder={'Enter your email'}
                                            returnKeyType='done'
                                            keyboardType='email-address'
                                            onChangeText={forgotPasswordEmail => this.setState({ forgotPasswordEmail })} />
                                    </Item>

                                    <TouchableOpacity style={[Style.LoginStyles.ButtonStyle, Style.CommonStyles.centerStyle]} onPress={() => this.rediscoverPassword()} >
                                        <Text style={{ color: '#000', fontSize: 14, color: '#fff' }}>Rediscover Password</Text>
                                    </TouchableOpacity>

                                    <Text style={Platform.OS === 'android' ? Style.LoginStyles.ForgotPasswordTextAndroid : Style.LoginStyles.ForgotPasswordText} onPress={() => this.goToLogin()} >Back to Login!</Text>
                                </KeyboardAwareScrollView>
                            </Animated.View>

                    }
                </View>
            </AppComponent>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('loginState', state)
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginApi: (email, password) => dispatch(loginaction(email, password)),
        getPassword: email => dispatch(forgotPassword(email))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);;