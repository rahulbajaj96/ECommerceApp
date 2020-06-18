import React from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import Style from '../../utils/Style';
import Images from '../../utils/Image';
import { connect } from "react-redux";
import { getCartList } from '../../actions/cartaction';
import { ApiCallPost } from '../../Services/ApiServices';
import { BASE_URL, API_URL } from '../../config';
import Toast from 'react-native-simple-toast';
let images_aaray = ['https://via.placeholder.com/600/66b7d2', 'https://via.placeholder.com/600/51aa97', 'https://via.placeholder.com/600/51aa97']


class Cart extends React.Component {
    state = { cart: [] }
    componentDidMount() {
        this.getCart();
    }
    async getCart() {
        await this.props.get_Cart_List();
        const { cartReducer } = this.props
        if (cartReducer.cart_list_response.status == 1) {
            this.setState({ cart: cartReducer.cart_list })
        }
        else if (cartReducer.cart_list_response.status == 0) {
            this.setState({ cart: [] })
        }
    }

    renderProductImage = (item) => {
        console.log('item', item)
        return (
            <View style={{ flex: 1, }} key={item.index}>
                <Image style={Style.Products.ProductDetail.sliderStyles} source={{ uri: item.item }} />
            </View>
        )
    }
    renderCartItems = (item) => {
        console.log('cart items', item.item)
        const { product_name, category, subcategory, article_no, total_amount, size, color, quantity, product_images } = item.item
        return (
            <View style={{ flex: 1, marginVertical: 2, marginHorizontal: 5, borderBottomWidth: 0.2, paddingVertical: 10, paddingHorizontal: 5, flexDirection: 'row' }}>

                <View style={[{ flex: 0.30, }, Style.CommonStyles.centerStyle]}>
                    <Image style={{ height: '80%', width: '100%', }} source={{ uri: product_images.length != 0 ? product_images[0].image : images_aaray[0] }} />
                </View>
                <View style={{ flex: 0.7, paddingHorizontal: 10 }}>
                    <Text style={Style.Cart.ProductName}>{product_name}</Text>
                    <Text style={Style.Cart.ProductDetail}>({category}/{subcategory})</Text>
                    <Text style={Style.Cart.articlenumber}>Article Number :{article_no}</Text>
                    <Text style={Style.Cart.ProductDetail}>Quantity:{quantity}</Text>
                    <Text style={Style.Cart.ProductDetail}>Color:{color}</Text>

                    <Text style={Style.Cart.ProductDetail}>Size:{size}</Text>

                    <Text style={Style.Cart.price}>Price:{total_amount}</Text>
                </View>
                <TouchableOpacity style={[{ position: 'absolute', right: 0, top: 0, height: 40, width: 40, }, Style.CommonStyles.centerStyle]}
                    onPress={() => this.showAlert(item)}
                >
                    <Image source={Images.delete} style={{ height: 15, width: 15 }} />
                </TouchableOpacity>



            </View>
        )
    }
    showAlert = (item) => {
        Alert.alert(
            '',
            `Are you sure you want to delete this ${item.item.product_name}?`,
            [
                {
                    text: 'Yes', onPress: () => {
                        this.deleteItemFromCart(item)
                    }, style: 'cancel'
                },
                {
                    text: 'No', onPress: () => { }
                },
            ],
            { cancelable: false }
        )
    }
    async deleteItemFromCart(item) {
        console.log('item to be deleted', item.item.id)
        let formdataCartItemDeleted = new FormData();
        formdataCartItemDeleted.append('cart_id', item.item.id);
        let updatedCartList = await ApiCallPost(`${BASE_URL}${API_URL.Delete_from_cart}`, formdataCartItemDeleted);
        console.log('result', updatedCartList);
        if (updatedCartList != false) {
            if (updatedCartList.status == 1) {
                Toast.show(updatedCartList.message);
                this.getCart();
            }
            else {
                Toast.show(updatedCartList.message);
            }
        }

    }
    goToCheckout() {
        const { navigation } = this.props
        const { cart } = this.state
        let checkoutArray = [];
        let finalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            checkoutArray.push({ id: cart[i].id });
            finalPrice += parseInt(cart[i].total_amount)
        }
        console.log('checkout array', JSON.stringify(checkoutArray));
        console.log('finalPrice = ' + finalPrice);
        navigation.navigate('Bill_Checkout', { checkoutArray: checkoutArray, total_price: finalPrice })
    }
    render() {
        const { navigation } = this.props
        const { cart } = this.state
        return (
            <AppComponent>
                <Toolbar title='Cart' right={cart.length != 0 ? 1 : null} back={true} navigation={navigation} onSavePress={() => this.goToCheckout()} />
                <View style={{ flex: 1 }}>
                    {
                        cart.length != 0
                            ?
                            <FlatList
                                data={cart}
                                style={{ flex: 0.75 }}
                                renderItem={item => this.renderCartItems(item)}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <View style={[{ flex: 1 ,backgroundColor:'#fff'}, Style.CommonStyles.centerStyle]}>
                                <Image style={{ height: 200, width: 200,marginBottom:15 }} source={Images.empty_cart} />
                                <Text style={Style.CommonStyles.EmptyListTag}>Your Cart is Empty. Please add some items to cart to continue.</Text>
                            </View>
                    }





                </View>
            </AppComponent>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        get_Cart_List: () => dispatch(getCartList())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);