import React from 'react'
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import AppIntroSlider from 'react-native-app-intro-slider';
import Style from '../../utils/Style';
import Images from '../../utils/Image';
let images_aaray = ['https://via.placeholder.com/600/66b7d2', 'https://via.placeholder.com/600/51aa97', 'https://via.placeholder.com/600/51aa97']
let color_codes = ['#3A137C', '#BBF11D', '#F1371D', '#1D3AF1', '#1DF1EB', '#1DF12D', '#F19A1D', '#E11DF1']
let sizes = ['S', "M", "L", "XL", "XXL", "XXXL"];

class Cart extends React.Component {
    state = {}
    renderProductImage = (item) => {
        console.log('item', item)
        return (
            <View style={{ flex: 1, }} key={item.index}>
                <Image style={Style.Products.ProductDetail.sliderStyles} source={{ uri: item.item }} />
            </View>
        )
    }
    renderCartItems = (item) => {
        return (
            <View style={{ flex: 1, marginVertical: 10, marginHorizontal: 5, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 16, color: '#000', marginVertical: 2 }}>Product Name</Text>
                <Text style={{ fontSize: 10, color: '#000', }}>(Category/SubCategory)</Text>
                <Text style={{ fontSize: 16, color: '#000', marginVertical: 2 }}>Article Number :123456</Text>
                <Text style={{ fontSize: 12, color: '#000', marginVertical: 2 }}>Quantity:6</Text>
                <View style={{ flexDirection: 'row',marginVertical: 10 }}>
                    <Text style={{ fontSize: 12, color: '#000',}}>Colors: </Text>
                    {
                        color_codes.map((colors, i) =>
                            (
                                <View style={{ margin: 2, height: 20, width: 20, backgroundColor: colors }} />
                            ))
                    }

                </View>
                <View style={{ flexDirection: 'row',marginVertical:10 }}>
                    <Text style={{ fontSize: 12, color: '#000', marginVertical: 2 }}>Sizes: </Text>

                    {
                        sizes.map((size, i) =>
                            (
                                <Text style={{ marginHorizontal: 3, color: '#000', fontSize: 12, }}>{size}{i == (sizes.length - 1) ? '' : ','}</Text>
                            ))
                    }
                </View>

                <Text style={{ fontSize: 12, color: '#000', marginVertical: 2, marginVertical: 10 }}>Price:600</Text>

                <AppIntroSlider
                    data={images_aaray}
                    renderItem={itemss => this.renderProductImage(itemss)}
                    showNextButton={false}
                    showDoneButton={false}
                />
                <TouchableOpacity style={[{ position: 'absolute', right: 0, top: 0, height: 40, width: 40, }, Style.CommonStyles.centerStyle]}>
                    <Image source={Images.delete} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>



            </View>
        )
    }

    render() {
        return (
            <AppComponent>
                <Toolbar title='Cart' />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={[1, 2, 3, 4, 5]}
                        renderItem={item => this.renderCartItems(item)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>
            </AppComponent>
        )
    }
}
export default Cart;