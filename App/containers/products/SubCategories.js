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

class SubCategories extends Component {
    state = { searchValue: '', modalVisibility: false, currentSelectedItem: '', subcategoryList: [], category_info: '' }
    componentDidMount() {
        const { navigation, route } = this.props
        console.log('this.props.category', route.params.category_id);
        this.setState({ category_info: route.params.category_id })
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.get_SubCategories(route.params.category_id.id);

        });
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

        console.log('item clicked', item)
        navigation.navigate('Productss');
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
        const { searchValue, modalVisibility, currentSelectedItem, subcategoryList } = this.state
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