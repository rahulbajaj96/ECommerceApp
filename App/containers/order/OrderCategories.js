import { Text, View, FlatList, Image, TouchableOpacity ,Keyboard} from "react-native";
import React, { Component } from "react";

import { Item, Input } from 'native-base';
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import Images from "../../utils/Image";
import { connect } from "react-redux";
import { Make_A_List } from "../../components/Products";
import { SearchBar } from "../../components/SearchBar";
import { getCategoriesList } from "../../actions/categoriesactions";
import { ApiCallPost } from "../../Services/ApiServices";
import { BASE_URL, API_URL } from "../../config";

class OrderCategories extends Component {
    state = { searchValue: '', categoryList: [] }
    componentDidMount() {

        const { navigation } = this.props
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.setState({ searchValue: '' })
            this.get_Categories();

        });
    }
    componentWillUnmount() {
        const { navigation } = this.props

        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item)
        navigation.navigate('OrderSubCategories', { category_id: item.item })
    }
    async get_Categories() {
        await this.props.getCategories();
        const { categoriesReducer } = this.props
        // console.log('reducer data', categoriesReducer);
        if (categoriesReducer.category_list_response.status == 1) {
            this.setState({ categoryList: categoriesReducer.category_list })
        }
        else
        {
            this.setState({ categoryList:[] })
        }
    }
    async searchCategories() {
        const { searchValue } = this.state
        let formdata = new FormData();
        Keyboard.dismiss();
        formdata.append('search', searchValue);
        let result = await ApiCallPost(`${BASE_URL}${API_URL.SearchCategory}`, formdata);
        console.log('result ', JSON.stringify(result));
        if (result != false) {
            if (result.status == 1) {
                this.setState({ categoryList: result.data })
            }
            else this.setState({ categoryList: [] })
        }
    }
    render() {
        const { searchValue, categoryList } = this.state
        const { navigation } = this.props

        return (
            <AppComponent>
                <Toolbar title={'Categories'} back={true} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>

                    <SearchBar
                        value={searchValue}
                        onChangeText={searchValue => this.setState({ searchValue })}
                        onSubmitEditing={() => this.searchCategories()}
                        onSearch={() => this.searchCategories()}
                    />

                    <Make_A_List
                        items={categoryList}
                        extraData={this.state}
                        onItemClicked={(item) => this.handleListItemCicked(item)}
                        addPopUp={false}
                        onAddPopUp={() => console.log('AddpopUpClicked')}
                        api={true}
                        tag='Categories'

                    />
                    {/* <View style={Style.Products.categories.categoriesListView}>
                        <FlatList
                            data={[1, 2, 3, 4, 5, 6]}
                            style={{ marginTop: 5 }}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={item => this.renderProducts(item)}
                            extraData={this.state}
                        />

                        <TouchableOpacity style={Style.Products.categories.AddPopUp}>
                            <Image source={Images.add_pop_up} style={Style.Products.categories.addPopUpImage} />
                        </TouchableOpacity>
                    </View> */}

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
        getCategories: () => dispatch(getCategoriesList())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderCategories);
//da2244