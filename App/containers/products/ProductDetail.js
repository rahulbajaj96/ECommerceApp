import React from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import Colors from '../../utils/Colors';
import Style from '../../utils/Style';
import Images from '../../utils/Image';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux'
import { getProductDetail } from '../../actions/productsactions';

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
        size_right_button_enabled: true,
        product_id: '',
        articleNum: '',
        product_name: '',
        category_name: '',
        Subcategory_name: '',
        product_images: [],
        colors_available: [],
        sizes_available: [],
        pieces_available: '',
        sale_price: '',

    }
    /**
     * @function setDefaultSizeValues sets the left and right button fo size as aenabled or disabled 
     * based on the value
     * 
     * @function setDefaultValuesColor set the left and right button on color view as enabled or disabled
     * 
     */
    componentDidMount() {
        const { route } = this.props

        this.setDefaultValuesColor();
        this.setDefaultSizeValues();
        this.get_product_detail(route.params.product_id);
    }
    setDefaultValuesColor() {
        const { color_current_Value, colors_available } = this.state
        // console.log('color value', color_current_Value);
        if (color_current_Value == 0)
            this.setState({ colors_Left_button_enabled: false })
        else
            this.setState({ colors_Left_button_enabled: true })
        if (colors_available.length <= (color_current_Value + 5))
            this.setState({ colors_Right_button_enabled: false })
        else
            this.setState({ colors_Right_button_enabled: true })
    }
    setDefaultSizeValues() {
        const { size_initialValue, sizes_available } = this.state
        if (size_initialValue == 0)
            this.setState({ size_left_button_enabled: false })
        else
            this.setState({ size_left_button_enabled: true })
        if (sizes_available.length <= (size_initialValue + 5))
            this.setState({ size_right_button_enabled: false })
        else
            this.setState({ size_right_button_enabled: true })

    }
    renderProductImage = (item) => {
        console.log('item', item)
        return (
            <View style={{ flex: 1, }} key={item.index}>
                <Image style={Style.Products.ProductDetail.sliderStyles} source={{ uri: item.item }} resizeMode='cover'/>
            </View>
        )
    }

    /**
     * @function colorSelected is used to describe the currently selected color
     * @param value contains the position of color selected
     */
    colorSelected(value) {
        this.setState({ current_selected_color: value, size_initialSelected: 0 }, () => this.setColors_Sizes());


    }
    async get_product_detail(product_id) {
        await this.props.get_ProductDetail(product_id);
        const { product_images } = this.state
        const { productsReducer } = this.props
        if (productsReducer.product_detail_api_response.status == 1) {
            // console.log('Product Detail', productsReducer.product_detail_api_response.data.colors)
            let response = productsReducer.product_detail_api_response.data
            for (let i = 0; i < response.product_image.length; i++) {
                product_images.push(response.product_image[i].image);
            }
            this.setState({
                articleNum: response.article_no, product_name: response.name, category_name: response.category_name,
                Subcategory_name: response.subcategory_name, product_images,
                colors_available: productsReducer.product_detail_api_response.data.colors,
                sale_price: response.sale_price,

            }
                , () => this.setColors_Sizes())

        }

    }

    setColors_Sizes() {
        const { colors_available, current_selected_color, pieces_available, size_initialSelected } = this.state

        console.log('collors_available', colors_available);
        this.setState({ sizes_available: colors_available.length != 0 ? colors_available[current_selected_color].sizes : [], pieces_available: colors_available.length != 0 ? colors_available[current_selected_color].sizes[size_initialSelected].quantity : [] }
            ,
        )




    }
    renderView() {
        const { color_current_Value, current_selected_color, colors_available } = this.state
        let views = []
        let loopValue = 0;
        if ((color_current_Value + 5) > colors_available.length) {
            loopValue = colors_available.length
        }
        else {
            loopValue = (color_current_Value + 5)
        }

        for (let i = color_current_Value; i < loopValue; i++) {
            views.push(
                <View style={{ flex: 0.20, margin: 5, padding: 2, borderWidth: 0,justifyContent:'center' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: colors_available[i].hash_color == null ? '' + colors_available[i].color : colors_available[i].hash_color, borderWidth: current_selected_color == i ? 2 : 0, borderColor: current_selected_color == i ? Colors.theme_color : null, }} key={i} disabled={current_selected_color == i} onPress={() => this.colorSelected(i)} />
                    <Text style={{ marginVertical: 2, color: '#000', fontSize: 12 ,textAlign:'center'}}>{colors_available[i].color}</Text>
                </View>
            )
        }
        return views;



    }
    /**
     * @function renderSizes() forms dynamically size views
     * @param size_initialValue is used to compare and display the 5 sizes in views
     */
    renderSizes() {
        let { size_initialSelected, size_initialValue, sizes_available } = this.state
        console.log('sizes available', sizes_available)
        let loopValue = 0;
        if ((size_initialValue + 5) > sizes_available.length) {
            loopValue = sizes_available.length
        }
        else {
            loopValue = size_initialValue + 5
        }
        let SizeViews = []
        for (let i = size_initialValue; i < loopValue; i++) {
            SizeViews.push(
                <TouchableOpacity key={i} style={[{ flex: 0.20, borderWidth: size_initialSelected == i ? 2 : 0, borderColor: Colors.theme_color, }, Style.CommonStyles.centerStyle]} onPress={() => this.SelectSize(i)}>
                    <Text style={{ fontSize: 12, color: '#000', }}>{sizes_available.length == 0 ? '' : sizes_available[i].size}</Text>
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
        this.setState({ size_initialSelected: value }, () => this.set_Sizes_Quantity())
    }
    set_Sizes_Quantity() {
        const { colors_available, current_selected_color, pieces_available, size_initialSelected } = this.state

        console.log('collors_available', colors_available);
        this.setState({ pieces_available: colors_available[current_selected_color].sizes[size_initialSelected].quantity }
            ,
        )
    }

    render() {
        const { navigation } = this.props
        const { color_current_Value, size_initialValue, colors_Left_button_enabled, colors_Right_button_enabled, size_left_button_enabled, size_right_button_enabled, articleNum, product_name, product_images, category_name, Subcategory_name, pieces_available, colors_available, sizes_available, sale_price } = this.state
        return (
            <AppComponent>
                <Toolbar title='Product Detail' back={true} navigation={navigation} />

                <View style={{ flex: 1, }}>

                    <ScrollView style={{ flex: 1, paddingHorizontal: 10 }} >

                        <View style={{ paddingVertical: 10, borderWidth: 0, }}>

                            <AppIntroSlider
                                data={product_images}
                                renderItem={item => this.renderProductImage(item)}
                                showNextButton={false}
                                showDoneButton={false}
                                dotStyle={{backgroundColor:'#b7b7b7',height:8,width:8,borderRadius:4}}
                            />
                        </View>
                        <Text style={Style.Products.ProductDetail.PropertiesStyle}>Category: {category_name}/{Subcategory_name}</Text>
                        <View style={Style.CommonStyles.borderStyle} />
                        <Text style={Style.Products.ProductDetail.articleNum}>Article Number : <Text style={{ color: Colors.theme_color }}>{articleNum}</Text></Text>
                        <Text style={Style.Products.ProductDetail.articleNum}>Product Name : <Text style={{ color: Colors.theme_color }}>{product_name}</Text></Text>
                        <Text style={Style.Products.ProductDetail.articleNum}>Product Price : <Text style={{ color: Colors.theme_color }}>${sale_price}</Text></Text>
                        <View style={Style.CommonStyles.borderStyle} />



                        <Text style={Style.Products.ProductDetail.PropertiesStyle}>Colors Available </Text>

                        <View style={[Style.Products.ProductDetail.colorsTrayStyle,{ marginBottom: 20,height:80 }, ]}>

                            <TouchableOpacity style={[{ flex: 0.1, opacity: colors_Left_button_enabled ? 1 : 0.2, }, Style.CommonStyles.centerStyle]}
                                disabled={!colors_Left_button_enabled}
                                onPress={() => this.changeColor(0)}
                            >
                                <Image source={Images.left_arrow} style={{ height: 20, width: 20, }} />
                            </TouchableOpacity>
                            <View style={{ flex: 0.8, flexDirection: 'row' }}>
                                {
                                    colors_available.length != 0
                                        ?
                                        this.renderView()
                                        : null
                                }

                            </View>
                            <TouchableOpacity style={[{ flex: 0.1, opacity: colors_Right_button_enabled ? 1 : 0.2, }, Style.CommonStyles.centerStyle]}
                                onPress={() => this.changeColor(1)}
                                disabled={!colors_Right_button_enabled}
                            >
                                <Image source={Images.right_aarow} style={{ height: 20, width: 20, }} />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.CommonStyles.borderStyle} />

                        <Text style={Style.Products.ProductDetail.PropertiesStyle}>Sizes Available </Text>


                        <View style={[{ marginBottom: 20 }, Style.Products.ProductDetail.colorsTrayStyle]}>
                            <TouchableOpacity style={[{ flex: 0.1, opacity: size_left_button_enabled ? 1 : 0.2, }, Style.CommonStyles.centerStyle]}
                                disabled={!size_left_button_enabled}
                                onPress={() => this.changeSize(0)}
                            >
                                <Image source={Images.left_arrow} style={{ height: 20, width: 20, }} />
                            </TouchableOpacity>
                            <View style={{ flex: 0.8, flexDirection: 'row' }}>
                                {
                                    sizes_available.length != 0
                                        ?
                                        this.renderSizes()
                                        :
                                        null
                                }

                            </View>
                            <TouchableOpacity style={[{ flex: 0.1, opacity: size_right_button_enabled ? 1 : 0.2 }, Style.CommonStyles.centerStyle]}
                                onPress={() => this.changeSize(1)}
                                disabled={!size_right_button_enabled}
                            >
                                <Image source={Images.right_aarow} style={{ height: 20, width: 20, }} />
                            </TouchableOpacity>
                        </View>
                        <View style={Style.CommonStyles.borderStyle} />

                        <Text style={[Style.Products.ProductDetail.PropertiesStyle, { fontSize: 18 }]}>Pieces Available :<Text style={{ color: Colors.theme_color }}>{pieces_available}</Text></Text>


                    </ScrollView>
                </View>

            </AppComponent>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        get_ProductDetail: (id) => dispatch(getProductDetail(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
