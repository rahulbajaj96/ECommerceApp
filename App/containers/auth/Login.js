import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, Animated, Easing } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Item, Input, Label } from 'native-base';
import Style from "../../utils/Style";
import Images from "../../utils/Image";


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
        forgotPasswordEmail: ''
    }
    handleAnimation(toValue) {
        Animated.timing(
            this.AnimationValue,
            {
                toValue,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: false
            },
        ).start()
    }
    componentDidMount() {
        this.spin()
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

    checkLoginConditions() {
        const { email, password, loginStatus } = this.state

        console.log(email);
        console.log(password);
        this.props.navigation.navigate('Tabs', {
            screen: 'Products'
            // , params: {
            //     screen: 'AddProduct'
            // }
        });
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

    render() {


        const { email, password, spinValue, forgotPasswordEmail } = this.state
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



        return (
            <View style={Style.CommonStyles.fullFlex}>

                <LinearGradient colors={['#2e1786', '#5453C7']} style={[{ flex: 0.5, }, Style.CommonStyles.centerStyle]} start={{ x: 1, y: 0.1 }} end={{ x: 1, y: 1 }}>
                    <View style={[Style.LoginStyles.GradientImageStyle, Style.CommonStyles.centerStyle]}>
                        <Animated.Image style={{ height: 50, width: 50, transform: [{ rotate: svalue }] }} source={Images.appIcon} />

                    </View>

                </LinearGradient>
                <View style={{
                    flex: 0.5,
                }}>



                    <Animated.View style={[Style.LoginStyles.AuthView, {
                        transform: [
                            frontAnimatedStyle,
                        ],
                        opacity: this.opacityFront,


                    }]}>

                        <Animated.Text style={{ fontSize: 20, color: '#000', textAlign: 'center', marginTop: 10 }}>Login</Animated.Text>
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


                        <Text style={Style.LoginStyles.ForgotPasswordText}

                            onPress={() => this.goToForgotPassword()}
                        >FORGOT PASSWORD?</Text>

                    </Animated.View>





                    <Animated.View style={[Style.LoginStyles.ForgotPassView, {
                        transform: [
                            backAnimatedStyle
                        ],
                        opacity: this.opacityBack,
                        backfaceVisibility: 'hidden',
                        position: 'absolute'


                    }]}>

                        <Animated.Text style={{ fontSize: 20, color: '#000', textAlign: 'center', marginTop: 10 }}>Forgot Password</Animated.Text>
                        <Text style={Style.LoginStyles.forgotInst}> * Enter a email on which new password wil be sent</Text>
                        <Item stackedLabel style={Style.LoginStyles.AuthItemStyle}>
                            <Label style={Style.LoginStyles.AuthItemLabel}>EMAIL</Label>
                            <Input
                                value={forgotPasswordEmail}
                                style={Style.LoginStyles.AuthItemTextInput}
                                underlineColorAndroid='transparent'
                                placeholder={'Enter your email'}
                                keyboardType='email-address'
                                onChangeText={forgotPasswordEmail => this.setState({ forgotPasswordEmail })} />
                        </Item>

                        <TouchableOpacity style={[Style.LoginStyles.ButtonStyle, Style.CommonStyles.centerStyle]} onPress={() => this.goToLogin()} >
                            <Text style={{ color: '#000', fontSize: 14, color: '#fff' }}>Rediscover Password</Text>
                        </TouchableOpacity>

                        <Text style={Style.LoginStyles.ForgotPasswordText}  onPress={() => this.goToLogin()} >Back to Login!</Text>

                    </Animated.View>








                </View>



            </View>
        )
    }
}
export default Login;