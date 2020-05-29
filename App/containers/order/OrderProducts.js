import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { SearchBar } from "../../components/SearchBar";
import { Make_A_List } from "../../components/Products";
import { connect } from "react-redux";
import { getProductslist } from "../../actions/productsactions";

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
        this.get_products_list(route.params);

    }
    async get_products_list(params) {
        await this.props.getProducts(params.category_id, params.subCategory_id);
        const { productsReducer } = this.props
        if (productsReducer.products_api_response.status == 1) {
            this.setState({ productsList: productsReducer.products_List })
        }
    }

    render() {
        const { searchValue,productsList } = this.state
        const { navigation } = this.props

        return (
            <AppComponent>
                <Toolbar title={'Products'} back={true} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>

                    <SearchBar
                        value={searchValue}
                        onChangeText={searchValue => this.setState({ searchValue })}

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