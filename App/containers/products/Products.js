import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { SearchBar } from "../../components/SearchBar";
import { Make_A_List, ModalView } from "../../components/Products";

class Products extends Component {
    state = { searchValue: '', modalVisibility: false, currentSelectedItem: '' }

    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item)
        navigation.navigate('ProductDetail');
    }
    openModal = (item) => {
        console.log('item clicked', item)
        this.setState({ modalVisibility: true, currentSelectedItem: 'Category ' })
    }
    AddProducts = () => {
        const { navigation } = this.props
        navigation.navigate('AddProduct', { id: 1, title: 'Add Product', data: {} })
    }
    onEditPressed = () => {
        const { navigation } = this.props

        navigation.navigate('AddProduct', { id: 2, title: 'Edit Product', data: {} })
        this.setState({ modalVisibility: false })

    }
    onDeletePressed = () => {

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
                        onDeletePressed={() => console.log('onDeletePressed')}
                        modalTitle={currentSelectedItem}

                    />

                </View>

            </AppComponent>
        )
    }
}
export default Products;
//da2244