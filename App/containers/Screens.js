import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Toolbar from "../components/Toolbar";
import AppComponent from "../components/AppComponent";
import Images from "../utils/Image";
import Style from "../utils/Style";
import Colors from "../utils/Colors";
import { Item, Input } from 'native-base';

export default class Screen extends Component {
    state = { searchValue: '' }

    renderProducts = (items) => {
        const { navigation } = this.props

        return (
            <TouchableOpacity style={Style.Products.categories.categoryItemView}
                onPress={() => navigation.navigate('SubCategories')}
            >
                <View style={[{ flex: 0.2, }, Style.CommonStyles.centerStyle]}>
                    <Image source={Images.appIcon} style={{ height: 50, width: 50, }} />

                </View>
                <View style={{ flex: 0.7, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Category Name </Text>

                </View>
                <View style={[{ flex: 0.1, }, Style.CommonStyles.centerStyle]}>
                    <Image source={Images.right_aarow} style={{ height: 20, width: 20, }} />
                </View>
            </TouchableOpacity>
        )

    }

    render() {
        const { searchValue } = this.state
        return (
            <AppComponent>
                <Toolbar title={'Categories'} />
                <View style={{ flex: 1, backgroundColor: '#fff', }}>

                    <View style={[Style.Products.categories.searchBarView, { borderWidth: 0, }]}>
                        <Item rounded style={Style.Products.categories.searchBarItemView}>
                            <Input
                                placeholder='Search'
                                value={searchValue}
                                returnKeyType='done'
                                onChangeText={searchValue => this.setState({ searchValue })}
                                style={Style.Products.categories.searchBarInput}
                            />
                            <Image source={Images.search} style={Style.Products.categories.searchImage} />
                        </Item>
                    </View>

                    <View style={Style.Products.categories.categoriesListView}>
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
                    </View>
                    <View style={{ flex: 0.1, backgroundColor: '#EFF1F3', flexDirection: 'row', marginTop: 5, borderColor: '#DAE0E5' }}>
                        <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', borderWidth: 0 }}>
                            <Image source={Images.order_black} style={{ height: 35, width: 35, }} />
                            <Text style={{ marginTop: -5, color: '#000', fontSize: 10 }}>Order</Text>
                        </View>
                        <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', borderWidth: 0 }}>
                            <Image source={Images.customer_black} style={{ height: 35, width: 35, }} />
                            <Text style={{ marginTop: -5, color: '#000', fontSize: 10 }}>Customer</Text>

                        </View>
                        <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', borderWidth: 0, backgroundColor: Colors.theme_color }}>
                            <Image source={Images.products_white} style={{ height: 35, width: 35, }} />
                            <Text style={{ marginTop: -5, color: '#fff', fontSize: 10 }}>Products</Text>

                        </View>
                        <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center', borderWidth: 0 }}>
                            <Image source={Images.more_black} style={{ height: 35, width: 35, }} />
                            <Text style={{ marginTop: -5, color: '#000', fontSize: 10 }}>More</Text>

                        </View>
                    </View>
                </View>

            </AppComponent>
        )
    }
}
//da2244