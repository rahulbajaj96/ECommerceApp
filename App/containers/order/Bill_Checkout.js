import React from 'react'
import { Text, View, TouchableOpacity, Image, Alert, Linking } from 'react-native'
import Modal from "react-native-modal";
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import Style from '../../utils/Style';
import { connect } from "react-redux";
import Images from '../../utils/Image';
import { DropDown } from '../../components/Products';
import { getCustomerList } from '../../actions/customeractions';
import { getCustomerParamsFromName } from '../../helpers/GetCustomerValues';
import { ApiCallPost } from '../../Services/ApiServices';
import { BASE_URL, API_URL } from '../../config';
import Toast from 'react-native-simple-toast';

class Bill_Checkout extends React.Component {
    state = {
        bill_print_enabled: false,
        customer_array: [],
        selected_customer: '',
        viewChange: false


    }
    componentDidMount() {
        const { route } = this.props
        console.log('checkoutarray', JSON.stringify(route.params.checkoutArray))
        console.log('price', route.params.total_price)
        this.getCustomers();
    }
    async getCustomers() {
        await this.props.get_customer_list();
        const { customerReducer } = this.props
        const { customer_array } = this.state
        console.log('customer reducer', customerReducer)
        if (customerReducer.customer_list_response.status == 1) {
            let customers = customerReducer.customer_list;
            for (let i = 0; i < customers.length; i++) {
                customer_array.push(customers[i].get_customers.company_name)
            }
            this.setState({ customer_array });
        }
    }

    checkBill() {
        if (this.state.selected_customer == '') {
            Toast.show('Please select a customer');
            return;
        }
        Alert.alert(
            '',
            'Do you want to print Invoice of this Order',
            [
                { text: 'Yes', onPress: () => this.printRealInvoice(true) },
                {
                    text: 'No', onPress: () => this.printRealInvoice(false)
                },
            ],
            { cancelable: false }
        )
    }
    async printRealInvoice(value) {
        const { route, customerReducer, navigation } = this.props
        const { selected_customer } = this.state
        let selected_customer_params = await getCustomerParamsFromName(customerReducer.customer_list, selected_customer);
        console.log('checkoutarray', JSON.stringify(route.params.checkoutArray))
        let formdata = new FormData();
        formdata.append('carts', JSON.stringify(route.params.checkoutArray));
        formdata.append('customer_id', selected_customer_params.customer_id);
        formdata.append('company_bill_status', value ? 1 : 0);
        console.log('formData of Print bill and place order', formdata);
        var order_response = await ApiCallPost(`${BASE_URL}${API_URL.Create_order}`, formdata);
        console.log('response', order_response);
        if (order_response != false) {
            if (order_response.status == 1) {

                Linking.openURL(order_response.data)
                setTimeout(() => {
                    this.setState({ viewChange: true })
                }, 500);

                Toast.show('Order Created');
                // navigation.navigate('Order');
            }
        }


    }
    render() {
        const { bill_print_enabled, customer_array, selected_customer, viewChange } = this.state
        const { navigation, route } = this.props
        return (
            <AppComponent>
                <Toolbar title={'Checkout'} back={!viewChange} navigation={navigation} />
                <View style={[Style.CommonStyles.fullFlex, { margin: 10 }]}>
                    <View style={Style.CheckOut.checkoutView}>
                        <Text style={{ fontSize: 22, color: '#000', }}>Your Order Contains : </Text>
                        <Text style={{ fontSize: 18, color: '#000', marginVertical: 2 }}>Total Items : {route.params.checkoutArray.length}</Text>
                        <Text style={{ fontSize: 18, color: '#000', }}>Total Price : ${route.params.total_price}</Text>
                        {
                            viewChange ?
                                <Text style={{ fontSize: 18, color: '#000', }}>Customer Name : {selected_customer}</Text>
                                : null
                        }
                    </View>
                    {
                        viewChange ?
                            <View style={[{ flex: 0.7, }, Style.CommonStyles.centerStyle]}>
                                <Text style={{ fontSize: 20 }}>Your Order was Successfully Placed .</Text>
                                <TouchableOpacity style={[{ marginVertical: 10, height: 120, width: 120 }, Style.CommonStyles.centerStyle]}
                                onPress={() => navigation.navigate('Order')}
                                >
                                    <Image source={Images.home} style={{ height: 100, width: 100, }} />
                                </TouchableOpacity>

                            </View>
                            :
                            <View style={{ flex: 0.7 }}>
                                <DropDown
                                    options={customer_array}
                                    defaultValue='Select a Customer'
                                    onSelect={(index, value) => this.setState({ selected_customer: value })}
                                />
                                <TouchableOpacity style={[Style.CheckOut.checkoutButton]} onPress={() => this.checkBill()}>
                                    <Text style={Style.Cart.checkoutText}>Place Order</Text>
                                    <Image style={Style.Cart.checkoutImage} source={Images.right_white_arrow} />
                                </TouchableOpacity>
                            </View>
                    }






                </View>
            </AppComponent>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('Customer', state)
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        get_customer_list: () => dispatch(getCustomerList())
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Bill_Checkout);