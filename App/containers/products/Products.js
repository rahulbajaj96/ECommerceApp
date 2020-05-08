import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Style from "../../utils/Style";
import AppComponent from "../../components/AppComponent";
import Toolbar from "../../components/Toolbar";
import { SearchBar } from "../../components/SearchBar";
import { Make_A_List } from "../../components/Products";

class Products extends Component {
    state = { searchValue: '' }

    handleListItemCicked = (item) => {
        const { navigation } = this.props

        console.log('item clicked', item)
        navigation.navigate('ProductDetail');
    }

    render() {
        const { searchValue } = this.state
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
                        onAddPopUp={() => console.log('AddpopUpClicked')}

                    />

                </View>

            </AppComponent>
        )
    }
}
export default Products;
//da2244