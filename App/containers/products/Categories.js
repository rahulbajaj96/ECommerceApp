import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";

import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { SearchBar } from "../../components/SearchBar";
import { Make_A_List, ModalView } from "../../components/Products";
import { get_From_AsyncStorage } from "../../Services/StorageService";
import { Login_Auth_Token } from "../../helpers/InputValidations";
class Categories extends Component {
    state = { searchValue: '', modalVisibility: false, currentSelectedItem: '' }


    componentDidMount() {
       
        console.log('token',Login_Auth_Token)
    }


    handleListItemCicked = (item) => {
        const { navigation } = this.props

        navigation.navigate('SubCategories')
    }
    openModal = (item) => {
        console.log('item clicked', item)
        this.setState({ modalVisibility: true, currentSelectedItem: 'Category ' })
    }
    onAddPopUp = () => {
        const { navigation } = this.props

        navigation.navigate('AddCategory', { id: 0, title: 'Add Category', data: {} })
    }
    onEditPressed = () => {
        const { navigation } = this.props

        navigation.navigate('AddCategory', { id: 2, title: 'Edit Category', data: {} })
        this.setState({ modalVisibility: false })

    }
    onDeletePressed = () => {

    }
    render() {
        const { searchValue, modalVisibility, currentSelectedItem } = this.state
        return (
            <AppComponent>
                <Toolbar title={'Categories'} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>

                    <SearchBar
                        value={searchValue}
                        onChangeText={searchValue => this.setState({ searchValue })}

                    />

                    <Make_A_List
                        items={[1, 2, 3, 4, 5, 6]}
                        extraData={this.state}
                        onItemClicked={(item) => this.handleListItemCicked(item)}
                        onAddPopUp={() => this.onAddPopUp()}
                        crudValue={1}
                        dotsClick={(item) => this.openModal(item)}

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
                        onDeletePressed={() => console.log('onDeletePressed')}
                        modalTitle={currentSelectedItem}

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
export default Categories;
//da2244