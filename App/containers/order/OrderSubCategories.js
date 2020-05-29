import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { Make_A_List } from "../../components/Products";
import { SearchBar } from "../../components/SearchBar";
import { getSubCategoriesList } from "../../actions/subcategoriesactions";

class OrderSubCategories extends Component {
    state = { searchValue: '', subcategoryList: [], category_info: '' }

    componentDidMount() {
        const { navigation, route } = this.props
        console.log('this.props.category', route.params.category_id);
        this.setState({ category_info: route.params.category_id })
        this.get_SubCategories(route.params.category_id.id);
    }
    async get_SubCategories(id) {
      
        await this.props.getSubCategories(id);
        const { subcategoriesReducer } = this.props
        // console.log('reducer data', categoriesReducer);
        if (subcategoriesReducer.subcategory_list_response.status == 1) {
            this.setState({ subcategoryList: subcategoriesReducer.subcategory_list })
        }

    }
    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item)
        navigation.navigate('OrderProducts', { category_id: item.item.category_id, subCategory_id: item.item.id });
    }

    render() {
        const { searchValue,subcategoryList } = this.state
        const { navigation } = this.props
        return (
            <AppComponent>
                <Toolbar title={'Subcategories'} back={true} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>
                    <SearchBar
                        value={searchValue}
                        onChangeText={searchValue => this.setState({ searchValue })}

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