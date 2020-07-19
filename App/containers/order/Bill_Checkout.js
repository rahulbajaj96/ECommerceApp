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
import { SPINNER_ON, SPINNER_OFF } from '../../constants/ReduxConstants';

class Bill_Checkout extends React.Component {
    state = {
        bill_print_enabled: false,
        customer_array: [],
        selected_customer: 'Select a Customer',
        viewChange: false


    }
    componentDidMount() {
        const { route } = this.props
        const { navigation } = this.props
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.getCustomers();

        });
        console.log('checkoutarray', JSON.stringify(route.params.checkoutArray))
        console.log('price', route.params.total_price)

    }
    componentWillUnmount() {
        const { navigation } = this.props

        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    async getCustomers() {
        await this.props.get_customer_list();
        const { customerReducer } = this.props
        let { customer_array } = this.state
        customer_array= []
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
        if (this.state.selected_customer == 'Select a Customer') {
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
        this.props.loader_On();

        formdata.append('carts', JSON.stringify(route.params.checkoutArray));
        formdata.append('customer_id', selected_customer_params.customer_id);
        formdata.append('company_bill_status', value ? 1 : 0);
        console.log('formData of Print bill and place order', formdata);
        var order_response = await ApiCallPost(`${BASE_URL}${API_URL.Create_order}`, formdata);
        console.log('response', order_response);
        if (order_response != false) {
            if (order_response.status == 1) {
                setTimeout(() => {
                    Toast.show('Order Created');
                }, 500);
                this.props.loader_Off();

                Linking.openURL(order_response.data)
                setTimeout(() => {

                    this.setState({ viewChange: true })
                }, 500);


                // navigation.navigate('Order');
            }
        }


    }
    goToAddCustomer() {
        const { navigation } = this.props
        //  {
        //     screen: 'Products'
        //     // , params: {
        //     //     screen: 'AddProduct'
        //     // }
        navigation.navigate('Customer', { screen: 'AddCustomer', params: { id: 1, title: 'Add Customer', data: { back: 2 } } })
    }
    render() {
        const { bill_print_enabled, customer_array, selected_customer, viewChange, } = this.state
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
                                <Text style={{ fontSize: 18, color: '#000', }}>Company Name : {selected_customer}</Text>
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
                                <View style={{ justifyContent: 'flex-end', width: '100%', paddingVertical: 5, alignItems: 'flex-end', marginVertical: 5 }}>
                                    <Text style={{ color: '#000', fontSize: 12 }}>Tap on + plus button To Add Customer</Text>
                                    <TouchableOpacity
                                        onPress={() => this.goToAddCustomer()} >
                                        <Image source={Images.add_pop_up} style={Style.Products.categories.addPopUpImage} />

                                    </TouchableOpacity>
                                </View>
                                <DropDown
                                    options={customer_array}
                                    defaultValue={selected_customer}
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
        get_customer_list: () => dispatch(getCustomerList()),
        loader_On: () => dispatch({ type: SPINNER_ON }),
        loader_Off: () => dispatch({ type: SPINNER_OFF })
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Bill_Checkout);