import React from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import Modal from "react-native-modal";
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import Style from '../../utils/Style';
import Images from '../../utils/Image';
import { DropDown } from '../../components/Products';

class Bill_Checkout extends React.Component {
    state = {
        bill_print_enabled: false
    }
    checkBill() {
        Alert.alert(
            '',
            'Do you want to print Invoice of this Order',
            [
                { text: 'Yes', onPress: () => this.setState({ bill_print_enabled: true }), style: 'cancel' },
                {
                    text: 'No', onPress: () =>

                        console.log('Cancel Pressed')

                },
            ],
            { cancelable: false }
        )
    }
    render() {
        const { bill_print_enabled } = this.state
        const {navigation} = this.props
        return (
            <AppComponent>
                <Toolbar title={'Checkout'} back={true} navigation={navigation}/>
                <View style={[Style.CommonStyles.fullFlex, { margin: 10 }]}>
                    <Text>Your Order Contains : </Text>
                    <Text style={{ fontSize: 18, color: '#000', marginVertical: 5 }}>Total Items : 10</Text>
                    <Text style={{ fontSize: 18, color: '#000', }}>Total Price : $10000</Text>

                    <DropDown
                        options={[1, 2, 3, 4, 5]}
                        defaultValue='Select a Customer'
                        onSelect={(index, value) => console.log('indexssss', index, value)}
                    />
                    <TouchableOpacity style={[Style.Cart.checkoutButton]} onPress={() => this.checkBill()}>
                        <Text style={Style.Cart.checkoutText}>Place Order</Text>
                        <Image style={Style.Cart.checkoutImage} source={Images.right_white_arrow} />
                    </TouchableOpacity>



                </View>
            </AppComponent>
        )
    }
}
export default Bill_Checkout;