import { Item, Input, Label } from 'native-base';
import React from 'react'
import Style from '../utils/Style';
import Colors from '../utils/Colors';
import Images from '../utils/Image';
import ModalDropdown from 'react-native-modal-dropdown';
import { Text, Image, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native'

export const ProductInput = (props) => {
    return (
        <Item floatingLabel style={Style.Products.AddProduct.itemStyle}>
            <Label style={Style.Products.AddProduct.InputLabelStyle}>{props.label}</Label>
            <Input
                style={Style.Products.AddProduct.inputStyle}
                underlineColorAndroid='transparent'
                {...props}
            />
        </Item>
    )
}

export const DropDown = (props) => {
    return (
        <View style={Style.Products.AddProduct.DropDown.dropdownViewStyle}>
            <ModalDropdown
                style={Style.Products.AddProduct.DropDown.dropDownStyle}
                dropdownStyle={Style.Products.AddProduct.DropDown.dropdownItemStyle}
                textStyle={Style.Products.AddProduct.DropDown.default_Value_text}
                dropdownTextStyle={Style.Products.AddProduct.DropDown.dropdown_TextStyle}
                {...props}
            />
            {/* <TouchableOpacity style={[{ height: '100%', width: '10%', borderWidth: 0 }, Style.CommonStyles.centerStyle]} onPress={() => props.onPress()}
            >
                <Image source={Images.down_arrow} style={{ height: 15, width: 15 }} />

            </TouchableOpacity> */}
        </View>
    )
}


export const Make_A_List = (props) => {

    function renderProducts(items) {
        // const { navigation } = this.props

        return (
            <TouchableOpacity style={Style.Products.categories.categoryItemView}
                onPress={() => props.onItemClicked(items)}
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

    return (
        <View style={Style.Products.categories.categoriesListView}>
            <FlatList
                data={props.items}
                style={{ marginTop: 5 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => renderProducts(item)}
                {...props}
            />

            <TouchableOpacity style={Style.Products.categories.AddPopUp} onPress={() => props.onAddPopUp()}>
                <Image source={Images.add_pop_up} style={Style.Products.categories.addPopUpImage} />
            </TouchableOpacity>
        </View>
    )
}