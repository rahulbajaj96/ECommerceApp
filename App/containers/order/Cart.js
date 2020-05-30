import React from 'react'
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
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
        const { product_name, category, subcategory, article_no, total_amount, size, color, quantity } = item.item
        return (
            <View style={{ flex: 1, marginVertical: 2, marginHorizontal: 5, borderBottomWidth: 0.2, paddingVertical: 10, paddingHorizontal: 5, flexDirection: 'row' }}>

                <View style={[{ flex: 0.30, }, Style.CommonStyles.centerStyle]}>
                    <Image style={{ height: '80%', width: '100%', }} source={{ uri: images_aaray[0] }} />
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
                    onPress={() => this.deleteItemFromCart(item)}
                >
                    <Image source={Images.delete} style={{ height: 15, width: 15 }} />
                </TouchableOpacity>



            </View>
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
    render() {
        const { navigation } = this.props
        const { cart } = this.state
        return (
            <AppComponent>
                <Toolbar title='Cart' right={1} back={true} navigation={navigation} onSavePress={() => navigation.navigate('Bill_Checkout')} />
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
                            null
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