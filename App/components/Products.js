import { Item, Input, Label } from 'native-base';
import React from 'react'
import Style from '../utils/Style';
import Colors from '../utils/Colors';
import Images from '../utils/Image';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from "react-native-modal";

import { Text, Image, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native'
import { get_Empty_Tag } from '../helpers/InputValidations';

export const ProductInput = (props) => {
    return (
        <Item stackedLabel style={Style.Products.AddProduct.itemStyle}>
            <Label style={Style.Products.AddProduct.InputLabelStyle}>{props.label}</Label>
            <Input
                style={Style.Products.AddProduct.inputStyle}
                underlineColorAndroid='transparent'
                returnKeyType='done'
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
        // console.log('items', items);
        var data = props.api ? items.item : ''

        return (
            <TouchableOpacity style={Style.Products.categories.categoryItemView}
                onPress={() => props.onItemClicked(items)}
            >
                <View style={[{ flex: 0.2, }, Style.CommonStyles.centerStyle]}>
                    {
                        props.api
                            ?
                            props.tag == 'Products'
                                ?
                                <Image source={data.product_image.length != 0 ? { uri: data.product_image[0].image } : Images.appIcon} style={{ height: 50, width: 50, }} />
                                :
                                <Image source={data.image != '' ? { uri: data.image } : Images.appIcon} style={{ height: 50, width: 50, }} />

                            :
                            <Image source={Images.appIcon} style={{ height: 50, width: 50, }} />

                    }

                </View>
                <View style={{ flex: 0.7, justifyContent: 'center' }}>
                    {
                        props.api
                            ?
                            <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>{data.name}</Text>
                            :
                            <Text style={{ fontSize: 16, color: '#000', marginLeft: 5 }}>Product Name </Text>

                    }

                </View>
                {
                    props.crudValue == 1
                        ?
                        <TouchableOpacity style={[{ flex: 0.1, }, Style.CommonStyles.centerStyle]}
                            onPress={() => props.dotsClick(items)}
                        >
                            <Image source={Images.dots} style={{ height: 30, width: 30, }} />
                        </TouchableOpacity>
                        :
                        <View style={[{ flex: 0.1, }, Style.CommonStyles.centerStyle]}>
                            <Image source={Images.right_aarow} style={{ height: 15, width: 15, }} />
                        </View>

                }


            </TouchableOpacity>
        )

    }

    return (
        <View style={Style.Products.categories.categoriesListView}>
            {
                props.items.length == 0
                    ?
                    <View style={[Style.CommonStyles.fullFlex, Style.CommonStyles.centerStyle,]}>
                        <Text style={Style.CommonStyles.EmptyListTag}>{props.addPopUp == false ? `No ${props.tag} found` : get_Empty_Tag(props.tag)}</Text>
                    </View>
                    :


                    <FlatList
                        data={props.items}
                        style={{ marginTop: 5 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={item => renderProducts(item)}
                        {...props}
                    />
            }
            {
                props.addPopUp == false
                    ?
                    null
                    :
                    <TouchableOpacity style={Style.Products.categories.AddPopUp} onPress={() => props.onAddPopUp()}>
                        <Image source={Images.add_pop_up} style={Style.Products.categories.addPopUpImage} />
                    </TouchableOpacity>
            }


        </View>
    )
}


export const ModalView = (props) => {
    return (
        <Modal
            // isVisible={modalVisibility}
            {...props}
        // onBackdropPress={() => this.setState({ modalVisibility: false })}
        >
            <View style={{ flex: 0.4, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 10 }}>
                <View style={{ flex: 0.1 }} />
                <Text style={Style.Products.categories.categoriesModal.modalHeading}>{props.modalTitle}</Text>
                <TouchableOpacity style={Style.Products.categories.categoriesModal.modalItemView}
                    onPress={() => props.onEditPressed()}
                >
                    <Text style={{ fontSize: 18, color: '#000', marginRight: 15 }}>Edit</Text>
                    <Image source={Images.edit} style={{ height: 20, width: 20 }} />

                </TouchableOpacity>
                <TouchableOpacity style={Style.Products.categories.categoriesModal.modalItemView}
                    onPress={() => props.onDeletePressed()}
                >
                    <Text style={{ fontSize: 18, color: '#000', marginRight: 5 }}>Delete</Text>
                    <Image source={Images.trash} style={{ height: 25, width: 25 }} />

                </TouchableOpacity>

            </View>
        </Modal>
    )
}