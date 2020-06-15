import Style from "../utils/Style"
import { Image, View, TouchableOpacity, Keyboard } from "react-native";
import { Item, Input } from 'native-base';
import Images from "../utils/Image"
import React from 'react';


export const SearchBar = (props) => {
    return (
        <View style={[Style.Products.categories.searchBarView, { borderWidth: 0, }]}>
            <Item rounded style={Style.Products.categories.searchBarItemView}>
                <Input
                    placeholder='Search'
                    returnKeyType='done'
                    style={Style.Products.categories.searchBarInput}
                    {...props}

                />
                <TouchableOpacity onPress={() => { Keyboard.dismiss(), props.onSearch() }}>
                    <Image source={Images.search} style={Style.Products.categories.searchImage} />
                </TouchableOpacity>
            </Item>
        </View>
    )
}