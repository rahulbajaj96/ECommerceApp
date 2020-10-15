import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { SearchBar } from "../../components/SearchBar";
import { Make_A_List } from "../../components/Products";
import { connect } from "react-redux";
import { getProductslist } from "../../actions/productsactions";
import { ApiCallPost } from "../../Services/ApiServices";
import { BASE_URL, API_URL } from "../../config";

class OrderProducts extends Component {
    state = { searchValue: '', productsList: [], Paramsinfo: '' }
    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item)
        navigation.navigate('OrderProductDetail', { product_id: item.item.id });
    }
    componentDidMount() {
        const { navigation, route } = this.props
        console.log('data', route.params)
        this.setState({ Paramsinfo: route.params })
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.setState({ searchValue: '' })
            this.get_products_list(route.params);

        });

    }
    componentWillUnmount() {
        const { navigation } = this.props

        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    async get_products_list(params) {
        await this.props.getProducts(params.category_id, params.subCategory_id);
        const { productsReducer } = this.props
        if (productsReducer.products_api_response.status == 1) {
            this.setState({ productsList: productsReducer.products_List })
        }
        else {
            this.setState({ productsList: [] })
        }
    }
    async searchProducts() {
        const { searchValue, Paramsinfo } = this.state
        let formdata = new FormData();
        formdata.append('search', searchValue);
        formdata.append('category_id', Paramsinfo.category_id);
        formdata.append('subcategory_id', Paramsinfo.subCategory_id);

        let result = await ApiCallPost(`${BASE_URL}${API_URL.Search_product}`, formdata);
        console.log('result ', JSON.stringify(result));
        if (result != false) {
            if (result.status == 1) {
                this.setState({ productsList: result.data })
            }
            else this.setState({ productsList: [] })

        }
    }

    render() {
        const { searchValue, productsList } = this.state
        const { navigation } = this.props

        return (
            <AppComponent>
                <Toolbar title={'Products'} back={true} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>

                    <SearchBar
                        value={searchValue}
                        onChangeText={searchValue => this.setState({ searchValue })}
                        onSubmitEditing={() => this.searchProducts()}
                        onSearch={() => this.searchProducts()}
                    />
                    <Make_A_List
                        items={productsList}
                        extraData={this.state}
                        onItemClicked={(item) => this.handleListItemCicked(item)}
                        onAddPopUp={() => console.log('AddpopUpClicked')}
                        addPopUp={false}
                        api={true}
                        tag='Products'


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
        getProducts: (category_id, SubCategory_id) => dispatch(getProductslist(category_id, SubCategory_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderProducts);
//da2244