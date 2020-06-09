import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { SearchBar } from "../../components/SearchBar";
import { Make_A_List, ModalView } from "../../components/Products";
import { getSubCategoriesList } from "../../actions/subcategoriesactions";
import { BASE_URL, API_URL } from "../../config";
import { ApiCallPost } from "../../Services/ApiServices";
import { getUserType } from "../../helpers/InputValidations";

class SubCategories extends Component {
    state = { searchValue: '', modalVisibility: false, currentSelectedItem: '', subcategoryList: [], category_info: '', userType: '' }
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
            this.getType();
        });
    }
    async getType() {
        let userType = await getUserType();
        console.log('userType', userType);
        this.setState({ userType })
    }
    async get_SubCategories(id) {
        // const {category_info} = this.state
        await this.props.getSubCategories(id);
        const { subcategoriesReducer } = this.props
        // console.log('reducer data', categoriesReducer);
        if (subcategoriesReducer.subcategory_list_response.status == 1) {
            this.setState({ subcategoryList: subcategoriesReducer.subcategory_list })
        }

    }
    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item.item.category_id, item.item.id)
        navigation.navigate('Productss', { category_id: item.item.category_id, subCategory_id: item.item.id });
    }
    onAddPopUp = () => {
        const { navigation } = this.props
        const { category_info } = this.state
        navigation.navigate('AddCategory', { id: 1, title: 'Add SubCategory', data: category_info })
    }
    openModal = (item) => {
        console.log('item clicked', item)
        this.setState({ modalVisibility: true, currentSelectedItem: item.item })
    }
    componentWillUnmount() {
        const { navigation } = this.props

        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    onEditPressed = () => {
        const { navigation } = this.props
        const { currentSelectedItem } = this.state
        navigation.navigate('AddCategory', { id: 3, title: 'Edit SubCategory', data: currentSelectedItem })
        this.setState({ modalVisibility: false })

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
    async onDeletePressed() {
        const { currentSelectedItem, category_info } = this.state
        console.log('id to be deleted', currentSelectedItem.id)
        let formdata = new FormData();
        formdata.append('subcategory_id', currentSelectedItem.id);

        let response = await ApiCallPost(`${BASE_URL}${API_URL.Delet_SubCategory}`, formdata);
        console.log('SubCategory Deleted', response);
        if (response != false) {
            if (response.status == 1) {
                console.log('Person Deleted', response);
                this.setState({ modalVisibility: false })
                this.get_SubCategories(category_info.id);
            }
        }

    }
    render() {
        const { searchValue, modalVisibility, currentSelectedItem, subcategoryList, userType } = this.state
        const { navigation } = this.props
        return (
            <AppComponent>
                <Toolbar title={'Subcategories'} back={true} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>
                    <SearchBar
                        value={searchValue}
                        onChangeText={searchValue => this.setState({ searchValue })}
                        onSubmitEditing={() => this.searchSubCategories()}
                    />
                    <Make_A_List
                        items={subcategoryList}
                        extraData={this.state}
                        onItemClicked={(item) => this.handleListItemCicked(item)}
                        onAddPopUp={() => this.onAddPopUp()}
                        crudValue={1}
                        dotsClick={(item) => this.openModal(item)}
                        api={true}
                        tag='Sub-Categories'



                    />
                    <ModalView
                        isVisible={modalVisibility}
                        onBackdropPress={() => this.setState({ modalVisibility: false })}
                        onEditPressed={() => this.onEditPressed()}
                        onDeletePressed={() => this.onDeletePressed()}
                        modalTitle={currentSelectedItem.name}
                        usertype={userType}
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
export default connect(mapStateToProps, mapDispatchToProps)(SubCategories);
//da2244