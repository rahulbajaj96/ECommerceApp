import React from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import Colors from '../../utils/Colors';
import Style from '../../utils/Style';
import Images from '../../utils/Image';
import AppIntroSlider from 'react-native-app-intro-slider';

let color_codes = ['#3A137C', '#BBF11D', '#F1371D', '#1D3AF1', '#1DF1EB', '#1DF12D', '#F19A1D', '#E11DF1']
let sizes = ['S', "M", "L", "XL", "XXL", "XXXL"];
let images_aaray = ['https://via.placeholder.com/600/66b7d2', 'https://via.placeholder.com/600/51aa97', 'https://via.placeholder.com/600/51aa97']
class ProductDetail extends React.Component {
    state = {
        color_current_Value: 0,
        current_selected_color: 0,
        size_initialValue: 0,
        size_initialSelected: 0,
        colors_Left_button_enabled: true,
        colors_Right_button_enabled: true,
        size_left_button_enabled: true,
        size_right_button_enabled: true

    }
    /**
     * @function setDefaultSizeValues sets the left and right button fo size as aenabled or disabled 
     * based on the value
     * 
     * @function setDefaultValuesColor set the left and right button on color view as enabled or disabled
     * 
     */
    componentDidMount() {
        this.setDefaultValuesColor();
        this.setDefaultSizeValues();
    }
    setDefaultValuesColor() {
        const { color_current_Value } = this.state
        // console.log('color value', color_current_Value);
        if (color_current_Value == 0)
            this.setState({ colors_Left_button_enabled: false })
        else
            this.setState({ colors_Left_button_enabled: true })
        if (color_codes.length <= (color_current_Value + 5))
            this.setState({ colors_Right_button_enabled: false })
        else
            this.setState({ colors_Right_button_enabled: true })
    }
    setDefaultSizeValues() {
        const { size_initialValue } = this.state
        if (size_initialValue == 0)
            this.setState({ size_left_button_enabled: false })
        else
            this.setState({ size_left_button_enabled: true })
        if (sizes.length <= (size_initialValue + 5))
            this.setState({ size_right_button_enabled: false })
        else
            this.setState({ size_right_button_enabled: true })

    }
    renderProductImage = (item) => {
        console.log('item', item)
        return (
            <View style={{ flex: 1, }} key={item.index}>
                <Image style={Style.Products.ProductDetail.sliderStyles} source={{ uri: item.item }} />
            </View>
        )
    }

    /**
     * @function colorSelected is used to describe the currently selected color
     * @param value contains the position of color selected
     */
    colorSelected(value) {
        this.setState({ current_selected_color: value })

    }

    renderView() {
        const { color_current_Value, current_selected_color } = this.state
        let views = []
        let loopValue = 0;
        if ((color_current_Value + 5) > color_codes.length) {
            loopValue = color_codes.length
        }
        else {
            loopValue = (color_current_Value + 5)
        }
        for (let i = color_current_Value; i < loopValue; i++) {
            views.push(
                <TouchableOpacity style={{ flex: 0.20, backgroundColor: color_codes[i], margin: 5, borderWidth: current_selected_color == i ? 2 : 0, borderColor: current_selected_color == i ? Colors.theme_color : null, padding: 2, }} key={i} disabled={current_selected_color == i} onPress={() => this.colorSelected(i)} />
            )
        }
        return views;



    }
    /**
     * @function renderSizes() forms dynamically size views
     * @param size_initialValue is used to compare and display the 5 sizes in views
     */
    renderSizes() {
        let { size_initialSelected, size_initialValue } = this.state
        let loopValue = 0;
        if ((size_initialValue + 5) > sizes.length) {
            loopValue = sizes.length
        }
        else {
            loopValue = size_initialValue + 5
        }
        let SizeViews = []
        for (let i = size_initialValue; i < loopValue; i++) {
            SizeViews.push(
                <TouchableOpacity key={i} style={[{ flex: 0.20, borderWidth: size_initialSelected == i ? 2 : 0, borderColor: Colors.theme_color, }, Style.CommonStyles.centerStyle]} onPress={() => this.SelectSize(i)}>
                    <Text style={{ fontSize: 12, color: '#000', }}>{sizes[i]}</Text>
                </TouchableOpacity>
            )
        }
        return SizeViews;

    }
    /**
     * @method changeSize() is used for increasing and decresing the size value
     *  @param order
     * @value 0 for decreasing, 1 for increasing 
     */

    changeSize(order) {
        let { size_initialValue } = this.state
        if (order == 0) {
            if (size_initialValue == 0) {
                // this.setState({c})
            }
            this.setState({ size_initialValue: --size_initialValue }, () => this.setDefaultSizeValues())

        }

        else if (order == 1)
            this.setState({ size_initialValue: ++size_initialValue }, () => this.setDefaultSizeValues())


    }
    /**
     * @method changeSize() is used for increasing and decresing the size value
     *  @param value
     * @value 0 for decreasing, 1 for increasing 
     */
    changeColor(value) {
        let { color_current_Value } = this.state
        if (value == 0)
            this.setState({ color_current_Value: --color_current_Value }, () => this.setDefaultValuesColor())

        else
            this.setState({ color_current_Value: ++color_current_Value },
                () => this.setDefaultValuesColor()
            )


    }
    SelectSize(value) {
        this.setState({ size_initialSelected: value })
    }

    render() {
        const { navigation } = this.props
        const { color_current_Value, size_initialValue, colors_Left_button_enabled, colors_Right_button_enabled, size_left_button_enabled, size_right_button_enabled } = this.state
        return (
            <AppComponent>
                <Toolbar title='Product Detail' />

                <View style={{ flex: 1, }}>

                    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }} >

                        <View style={{ paddingVertical: 10, borderWidth: 0, }}>
                            {/* <FlatList
                                data={[1, 2, 3, 4]}
                                extraData={this.state}
                                keyExtractor={(index, item) => index.toString()}
                                horizontal={true}
                                renderItem={item => this.renderProductImage(item)}
                            /> */}
                            <AppIntroSlider
                                data={images_aaray}
                                renderItem={item => this.renderProductImage(item)}
                                showNextButton={false}
                                showDoneButton={false}
                            />
                        </View>
                        <Text style={Style.Products.ProductDetail.PropertiesStyle}>Category: Clothes/Jeans</Text>
                        <View style={Style.CommonStyles.borderStyle}/>
                        <Text style={Style.Products.ProductDetail.articleNum}>Article Number : <Text style={{ color: Colors.theme_color }}>1234567</Text></Text>
                        <Text style={Style.Products.ProductDetail.articleNum}>Product Name : <Text style={{ color: Colors.theme_color }}>Top1</Text></Text>
                        <View style={Style.CommonStyles.borderStyle}/>



                        <Text style={Style.Products.ProductDetail.PropertiesStyle}>Colors Available </Text>

                        <View style={[{ marginBottom: 20 }, Style.Products.ProductDetail.colorsTrayStyle]}>

                            <TouchableOpacity style={[{ flex: 0.1, opacity: colors_Left_button_enabled ? 1 : 0.2, }, Style.CommonStyles.centerStyle]}
                                disabled={!colors_Left_button_enabled}
                                onPress={() => this.changeColor(0)}
                            >
                                <Image source={Images.left_arrow} style={{ height: 20, width: 20, }} />
                            </TouchableOpacity>
                            <View style={{ flex: 0.8, flexDirection: 'row' }}>

                                {this.renderView()}
                            </View>
                            <TouchableOpacity style={[{ flex: 0.1, opacity: colors_Right_button_enabled ? 1 : 0.2, }, Style.CommonStyles.centerStyle]}
                                onPress={() => this.changeColor(1)}
                                disabled={!colors_Right_button_enabled}
                            >
                                <Image source={Images.right_aarow} style={{ height: 20, width: 20, }} />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.CommonStyles.borderStyle}/>

                        <Text style={Style.Products.ProductDetail.PropertiesStyle}>Sizes Available </Text>


                        <View style={[{ marginBottom: 20 }, Style.Products.ProductDetail.colorsTrayStyle]}>
                            <TouchableOpacity style={[{ flex: 0.1, opacity: size_left_button_enabled ? 1 : 0.2, }, Style.CommonStyles.centerStyle]}
                                disabled={!size_left_button_enabled}
                                onPress={() => this.changeSize(0)}
                            >
                                <Image source={Images.left_arrow} style={{ height: 20, width: 20, }} />
                            </TouchableOpacity>
                            <View style={{ flex: 0.8, flexDirection: 'row' }}>
                                {this.renderSizes()}
                            </View>
                            <TouchableOpacity style={[{ flex: 0.1, opacity: size_right_button_enabled ? 1 : 0.2 }, Style.CommonStyles.centerStyle]}
                                onPress={() => this.changeSize(1)}
                                disabled={!size_right_button_enabled}
                            >
                                <Image source={Images.right_aarow} style={{ height: 20, width: 20, }} />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.CommonStyles.borderStyle}/>

                        <Text style={[Style.Products.ProductDetail.PropertiesStyle,{fontSize:18}]}>Pieces Available :<Text style={{ color: Colors.theme_color }}>1234567</Text></Text>


                    </ScrollView>
                </View>

            </AppComponent>
        )
    }
}
export default ProductDetail;

// const json = {
//     articlenumber: 123456,
//     category_id: 1,
//     category_name: 'clothes',
//     Subcategory_id: 2,
//     Subcategory_name: 'tops',
//     Product_id: 101,
//     product_name: 'tops1',
//     totalPieces:45,
//     colors: [
//         {
//             color: 'red',
//             images: [
//                 {
//                     url: '',
//                 }, {
//                     url: ''
//                 }
//             ],
//             sizes_available: [S, M, L, XL, XXL],
//             piesces_available: [{
//                 size: S,
//                 pieces: 10
//             },
//             {
//                 size: M,
//                 pieces: 10
//             },
//             {
//                 size: L,
//                 pieces: 10
//             }]
//         },
//         {
//             color: 'blue',
//             images: [
//                 {
//                     url: '',
//                 }, {
//                     url: ''
//                 }
//             ],
//             sizes_available: [S, M, L, XL, XXL],
//             piesces_available: [{
//                 size: S,
//                 pieces: 10
//             },
//             {
//                 size: M,
//                 pieces: 10
//             },
//             {
//                 size: L,
//                 pieces: 10
//             }]
//         }
//     ]
// }