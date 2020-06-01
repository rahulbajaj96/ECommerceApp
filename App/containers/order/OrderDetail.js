import React from 'react'
import { Text, View, Image, TouchableOpacity, FlatList,Linking } from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import AppIntroSlider from 'react-native-app-intro-slider';
import Style from '../../utils/Style';
import Images from '../../utils/Image';
import { connect } from "react-redux";
let images_aaray = ['https://via.placeholder.com/600/66b7d2', 'https://via.placeholder.com/600/51aa97', 'https://via.placeholder.com/600/51aa97']
import { getOrderDetail } from '../../actions/orderaction'


class OrderDetail extends React.Component {
    state = { order_detail_array: [] ,billurl:''}
    componentDidMount() {
        const { route } = this.props
        console.log('order_id', route.params.order_id);
        this.getOrderDetails(route.params.order_id);

    }
    async getOrderDetails(id) {
        await this.props.get_Order_Details(id);
        const { orderReducer } = this.props
        console.log('response of Order Detail', orderReducer.order_detail_response);
        if (orderReducer.order_detail_response.status == 1) {
            this.setState({ order_detail_array: orderReducer.order_detail_response.data,billurl: orderReducer.order_detail_response.data[0].company_bill })
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
        const { article_no, category, color, total_amount, subcategory, size, quantity, product_name, product_images } = item.item
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


            </View>
        )
    }

    render() {
        const { navigation } = this.props
        const { order_detail_array,billurl } = this.state
        return (
            <AppComponent>
                <Toolbar title='Order Detail' back={true} navigation={navigation} />
                <View style={{ flex: 1 }}>

                    <View style={{ flex: 0.1, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 20 }}>
                        <Text style={Style.Orders.viewBill} onPress={() => Linking.openURL(billurl)}>View Bill</Text>
                    </View>
                    <FlatList
                        data={order_detail_array}
                        style={{ flex: 0.75 }}
                        renderItem={item => this.renderCartItems(item)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />




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
        get_Order_Details: (id) => dispatch(getOrderDetail(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);