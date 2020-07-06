import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";

import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { SearchBar } from "../../components/SearchBar";
import { Make_A_List, ModalView } from "../../components/Products";
import { getCategoriesList } from "../../actions/categoriesactions";
import { connect } from "react-redux";
import { API_URL, BASE_URL } from "../../config";
import { ApiCallPost } from "../../Services/ApiServices";
import { getUserType } from "../../helpers/InputValidations";

class Categories extends Component {
    state = { searchValue: '', modalVisibility: false, currentSelectedItem: '', categoryList: [], userType: '' }


    componentDidMount() {

        const { navigation } = this.props
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.setState({ searchValue: '' })
            this.get_Categories();
            this.getType();
        });
    }
    async getType() {
        let userType = await getUserType();
        console.log('userType', userType);
        this.setState({userType})
    }
    async get_Categories() {
        await this.props.getCategories();
        const { categoriesReducer } = this.props
        // console.log('reducer data', categoriesReducer);
        if (categoriesReducer.category_list_response.status == 1) {
            this.setState({ categoryList: categoriesReducer.category_list })
        }
    }

    handleListItemCicked = (item) => {
        console.log('Category item clicked', item.item.id)
        const { navigation } = this.props

        navigation.navigate('SubCategories', { category_id: item.item })
    }
    openModal = (item) => {
        console.log('item clicked', item)
        this.setState({ modalVisibility: true, currentSelectedItem: item.item })
    }
    onAddPopUp = () => {
        const { navigation } = this.props
        navigation.navigate('AddCategory', { id: 0, title: 'Add Category', data: {} })
    }
    onEditPressed = () => {
        const { navigation } = this.props
        const { currentSelectedItem } = this.state
        navigation.navigate('AddCategory', { id: 2, title: 'Edit Category', data: currentSelectedItem })
        this.setState({ modalVisibility: false })

    }
    componentWillUnmount() {
        const { navigation } = this.props

        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    async onDeletePressed() {
        const { currentSelectedItem } = this.state
        console.log('id to be deleted', currentSelectedItem.id)
        let formdata = new FormData();
        formdata.append('category_id', currentSelectedItem.id);

        let response = await ApiCallPost(`${BASE_URL}${API_URL.Delete_Category}`, formdata);
        console.log('Category Deleted', response);
        if (response != false) {
            if (response.status == 1) {
                console.log('Person Deleted', response);
                this.setState({ modalVisibility: false })
                this.get_Categories();
            }
        }

    }
    async searchCategories() {
        const { searchValue } = this.state
        let formdata = new FormData();
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
        const { searchValue, modalVisibility, currentSelectedItem, categoryList,userType } = this.state
        const { spinnerReducer } = this.props
        return (
            <AppComponent>
                <Toolbar title={'Categories'} />
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
                        onAddPopUp={() => this.onAddPopUp()}
                        crudValue={1}
                        dotsClick={(item) => this.openModal(item)}
                        api={true}
                        tag='Categories'

                    />


                    {/* <Modal
                        isVisible={modalVisibility}
                        onBackdropPress={() => this.setState({ modalVisibility: false })}
                    >
                        <View style={{ flex: 0.4, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 10 }}>
                            <View style={{ flex: 0.1 }} />
                            <Text style={Style.Products.categories.categoriesModal.modalHeading}>Category Name</Text>
                            <TouchableOpacity style={Style.Products.categories.categoriesModal.modalItemView}>
                                <Text style={{ fontSize: 18, color: '#000', marginRight: 15 }}>Edit</Text>
                                <Image source={Images.edit} style={{ height: 20, width: 20 }} />

                            </TouchableOpacity>
                            <TouchableOpacity style={Style.Products.categories.categoriesModal.modalItemView}>
                                <Text style={{ fontSize: 18, color: '#000', marginRight: 5 }}>Delete</Text>
                                <Image source={Images.trash} style={{ height: 25, width: 25 }} />

                            </TouchableOpacity>

                        </View>
                    </Modal> */}
                    <ModalView
                        isVisible={modalVisibility}
                        onBackdropPress={() => this.setState({ modalVisibility: false })}
                        onEditPressed={() => this.onEditPressed()}
                        onDeletePressed={() => this.onDeletePressed()}
                        modalTitle={currentSelectedItem.name}
                        usertype={userType}
                        content='Subcategoies/Products'
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
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
//da2244