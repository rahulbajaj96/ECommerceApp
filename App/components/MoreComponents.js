import React from 'react'
import { Text, Image, TouchableOpacity, View } from 'react-native'
import Images from '../utils/Image'
import Style from '../utils/Style'

export const MoreItems = (props) => {
    return(
        <TouchableOpacity style={Style.More.moreItemView}
        onPress={() => props.onClick()}
        >
        <View style={Style.More.label_View}>
            <Image source={props.label_image} style={{ height: 30, width: 30, }} />
            <Text style={Style.More.label_text}>{props.label}</Text>
        </View>
        <View style={[{ flex: 0.3}, Style.CommonStyles.centerStyle]}>
            <Image source={Images.right_aarow} style={{ height: 15, width: 15, }} />
        </View>
    </TouchableOpacity>
    )
}