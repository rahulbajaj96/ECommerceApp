import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { SearchBar } from "../../components/SearchBar";
import { Make_A_List, ModalView } from "../../components/Products";
import { getProductColors } from "../../actions/product_colors_actions";
import { connect } from "react-redux";
import { getProductslist } from "../../actions/productsactions";
import { BASE_URL, API_URL } from "../../config";


class Products extends Component {
    state = { searchValue: '', modalVisibility: false, currentSelectedItem: '', productsList: [], Paramsinfo }

    componentDidMount() {
        const { navigation, route } = this.props
        console.log('data', route.params)
        this.setState({ Paramsinfo: route.params })
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
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
    }
    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item)
        navigation.navigate('ProductDetail');
    }
    openModal = (item) => {
        console.log('item clicked', item)
        this.setState({ modalVisibility: true, currentSelectedItem: item.item })
    }
    AddProducts = () => {
        const { navigation } = this.props
        navigation.navigate('AddProduct', { id: 1, title: 'Add Product', data: {} })
    }
    onEditPressed = () => {
        const { navigation } = this.props
        const { currentSelectedItem } = this.state

        navigation.navigate('AddProduct', { id: 2, title: 'Edit Product', data: currentSelectedItem })
        this.setState({ modalVisibility: false })

    }
    async onDeletePressed() {
        const { currentSelectedItem, Paramsinfo } = this.state
        console.log('id to be deleted', currentSelectedItem.id)
        let formdata = new FormData();
        formdata.append('product_id', currentSelectedItem.id);

        // let response = await ApiCallPost(`${BASE_URL}${API_URL.Delete_Products}`, formdata);
        // console.log('Products Deleted', response);
        // if (response != false) {
        //     if (response.status == 1) {
        //         console.log('Products Deleted', response);
        //         this.setState({ modalVisibility: false })
        //         this.get_products_list(Paramsinfo);
        //     }
        // }
    }

    render() {
        const { searchValue, modalVisibility, currentSelectedItem } = this.state
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
                        items={[1, 2, 3, 4, 5, 6]}
                        extraData={this.state}
                        onItemClicked={(item) => this.handleListItemCicked(item)}
                        onAddPopUp={() => this.AddProducts()}
                        crudValue={1}
                        dotsClick={(item) => this.openModal(item)}

                    />
                    <ModalView
                        isVisible={modalVisibility}
                        onBackdropPress={() => this.setState({ modalVisibility: false })}
                        onEditPressed={() => this.onEditPressed()}
                        onDeletePressed={() => this.onDeletePressed()}
                        modalTitle={currentSelectedItem.name}

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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
//da2244