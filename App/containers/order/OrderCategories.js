import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";

import { Item, Input } from 'native-base';
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import Images from "../../utils/Image";
import { Make_A_List } from "../../components/Products";
import { SearchBar } from "../../components/SearchBar";

class OrderCategories extends Component {
    state = { searchValue: '' }


    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item)
        navigation.navigate('OrderSubCategories')
    }

    render() {
        const { searchValue } = this.state
        const { navigation } = this.props

        return (
            <AppComponent>
                <Toolbar title={'Categories'} back={true} navigation={navigation} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>

                    <SearchBar
                        value={searchValue}
                        onChangeText={searchValue => this.setState({ searchValue })}

                    />
                  
                    <Make_A_List
                        items={[1, 2, 3, 4, 5, 6]}
                        extraData={this.state}
                        onItemClicked={(item) => this.handleListItemCicked(item)}
                        addPopUp={false}
                        onAddPopUp={() => console.log('AddpopUpClicked')}

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
export default OrderCategories;
//da2244