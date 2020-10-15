import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { Make_A_List } from "../../components/Products";
import { SearchBar } from "../../components/SearchBar";
import { getSubCategoriesList } from "../../actions/subcategoriesactions";
import { ApiCallPost } from "../../Services/ApiServices";
import { BASE_URL, API_URL } from "../../config";

class OrderSubCategories extends Component {
    state = { searchValue: '', subcategoryList: [], category_info: '' }
    componentDidMount() {
        const { navigation, route } = this.props
        console.log('this.props.category', route.params.category_id);
        this.setState({ category_info: route.params.category_id })
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.setState({ searchValue: '' })
            this.get_SubCategories(route.params.category_id.id);

        });
    }
    componentWillUnmount() {
        const { navigation } = this.props
        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    async get_SubCategories(id) {

        await this.props.getSubCategories(id);
        const { subcategoriesReducer } = this.props
        // console.log('reducer data', categoriesReducer);
        if (subcategoriesReducer.subcategory_list_response.status == 1) {
            this.setState({ subcategoryList: subcategoriesReducer.subcategory_list })
        }
        else
        {
            this.setState({ subcategoryList:[] })
        }

    }
    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item)
        navigation.navigate('OrderProducts', { category_id: item.item.category_id, subCategory_id: item.item.id });
    }
    async searchSubCategories() {
        const { searchValue, category_info } = this.state
        let formdata = new FormData();
        formdata.append('search', searchValue);
        formdata.append('category_id', category_info.id);
        let result = await ApiCallPost(`${BASE_URL}${API_URL.Search_SubCategory}`, formdata);
        console.log('result ', JSON.stringify(result));
        if (result != false) {
            if (result.status == 1) {
                this.setState({ subcategoryList: result.data })
            }
            else this.setState({ subcategoryList: [] })

        }
    }
    render() {
        const { searchValue, subcategoryList } = this.state
        const { navigation } = this.props
        return (
            <AppComponent>
                <Toolbar title={'Subcategories'} back={true} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>
                    <SearchBar
                        value={searchValue}
                        onChangeText={searchValue => this.setState({ searchValue })}
                        onSubmitEditing={() => this.searchSubCategories()}
                        onSearch={() => this.searchSubCategories()}
                    />
                    <Make_A_List
                        items={subcategoryList}
                        extraData={this.state}
                        onItemClicked={(item) => this.handleListItemCicked(item)}
                        onAddPopUp={() => console.log('AddpopUpClicked')}
                        addPopUp={false}
                        api={true}
                        tag='Sub-Categories'

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
        getSubCategories: (id) => dispatch(getSubCategoriesList(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderSubCategories);
//da2244