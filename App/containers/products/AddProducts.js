import React from 'react'
import { Text, Image, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import Style from '../../utils/Style'
import Colors from '../../utils/Colors'
import { ProductInput, DropDown } from '../../components/Products';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';
import { connect } from "react-redux";
import Images from '../../utils/Image';
import { getProductColors } from '../../actions/product_colors_actions'
import { getColorParamsFromName,getSizeParamsFromName } from '../../helpers/GetProductValues'
import { getProductSizes } from '../../actions/product_sizes_actions'
const colors = ['red', 'green', 'yellow', 'orange']
const sizes = ['Small', 'Medium', 'Large', 'X-Large']
let images_aaray = ['https://via.placeholder.com/600/66b7d2', 'https://via.placeholder.com/600/51aa97', 'https://via.placeholder.com/600/51aa97']

const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
class AddProduct extends React.Component {
    state = {
        productName: '',
        articlenum: '',
        purchasePrice: '',
        sellingPrice: '',
        multipleSelection: [{ color_selected: '', size_Selected: '', number_of_Pieces: '' },],
        images_aaray: [],
        modalVisibility: false,
        selectedImage: 'https://via.placeholder.com/600/66b7d2',
        selectedIndex: 0,
        title: '',
        Category: 'Select a Category',

        SubCategory: 'Select a SubCategory',

        colors_available: [],
        sizes_available: [],
        categories_available: [],
        subcategories_available: []

    }

    componentDidMount() {

        console.log(this.props.route.params)
        this.setPropData(this.props.route.params)
        this.get_product_color();
        this.get_product_sizes();
        

    }

    /**
     * @method get_product_color provides u the colors from api and sets to spinner
     */
    async get_product_color() {
        const { colors_available } = this.state
        await this.props.getColors();
        const { product_color_reducer } = this.props
        for (let i = 0; i < product_color_reducer.colors_available.length; i++) {
            colors_available.push(product_color_reducer.colors_available[i].color);
        }
        console.log('colors', colors_available);
        this.setState({ colors_available })
    }

    /**
     * @method get_product_sizes
     * @method getSizes() get the sizes from the API and save to @params {*} size_available
     */
    async get_product_sizes() {
        const { sizes_available } = this.state
        await this.props.getSizes();
        const { product_size_reducer } = this.props
        for (let i = 0; i < product_size_reducer.sizes_available.length; i++) {
            sizes_available.push(product_size_reducer.sizes_available[i].size);
        }
        console.log('sizes', sizes_available);
        this.setState({ sizes_available })
    }

    /**
     * @method setPropData
     * @param propData contains the data about Add or Edit Products
     */
    setPropData = (propData) => {
        if (propData.id == 2) {
            const { multipleSelection } = this.state

            for (let i = 0; i < multipleSelection.length; i++) {
                multipleSelection[i].color_selected = 'red',
                    multipleSelection[i].number_of_Pieces = '5',
                    multipleSelection[i].size_Selected = 'Large'
            }
            this.setState({
                Category: 'Clothes',
                SubCategory: 'jeans',
                title: propData.title,
                productName: 'qwerty',
                articlenum: '123456',
                purchasePrice: '500',
                sellingPrice: '1000',
                multipleSelection
            })

        }
        else {
            this.setState({

                title: propData.title,

            })
        }
    }

    /**
     * 
     * @param {*} colors_index :index of Color Array
     * @param {*} value :value of Colors Array selected
     * @param {*} main_index :index of main Array i.e multipleSelection
     * @method changePaticularColor() sets the changed color to main array
     */
    async changePaticularColor(colors_index, value, main_index) {
        const { multipleSelection } = this.state
        console.log('color', colors_index, '\n color_value', value, '\n main array index', main_index)
        const { product_color_reducer } = this.props

        let color_selected = await getColorParamsFromName(product_color_reducer.colors_available, value);
        console.log('color_id_selected', color_selected);
        multipleSelection[main_index].color_selected = color_selected.id;
        this.setState({ multipleSelection })

    }

    /**
     * 
     * @param {*} size_index :index of Size array
     * @param {*} value :value of Size Array selected
     * @param {*} main_index index of main Array i.e multipleSelection
     * @method changePaticularSize sets the selected size to main aray
     */
   async changePaticularSize(size_index, value, main_index) {
        const { multipleSelection } = this.state
        const { product_size_reducer } = this.props
        let size_selected = await getSizeParamsFromName(product_size_reducer.sizes_available, value);
        console.log('size_selected', size_selected);
        multipleSelection[main_index].size_Selected = size_selected.id;
        this.setState({ multipleSelection })

    }

    /**
     * 
     * @param {*} value :value of textInput
     * @param {*} index index of main array 
     * @method setPrice sets the input value to particular index of main array
     */
    setPrice(value, index) {
        const { multipleSelection } = this.state
        multipleSelection[index].number_of_Pieces = value;
        this.setState({ multipleSelection })
    }

    /**
     * @method addMore adds a new object into main array
     */
    addMore() {
        const { multipleSelection } = this.state
        // console.log('multiple ', multipleSelection)
        multipleSelection[multipleSelection.length] = { color_selected: '', size_Selected: '', number_of_Pieces: '' }
        this.setState({ multipleSelection })
    }
    check() {
        const { multipleSelection } = this.state
        console.log('multiple ', multipleSelection)
    }

    /**
     * @method openCamera directly opens the camera
     */
    openCamera() {
        const { images_aaray } = this.state

        ImagePicker.launchCamera(options, (response) => {
            console.log('response ', response.uri)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                images_aaray.push(response.uri);
                this.setState({ images_aaray })
            }

        });
    }

    /**
     * @method openGallery directly opens the gallery
     * and sets the image selected into image Array
     */
    openGallery() {
        const { images_aaray } = this.state
        ImagePicker.launchImageLibrary(options, (response) => {
            // Same code as in above section!
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('response Gallery', response.uri)
                images_aaray.push(response.uri);
                this.setState({ images_aaray })
            }

        });
    }
    /**
     * @param item contains the currently clicked picture 
     */

    pictureClicked = (item) => {
        this.setState({
            selectedImage: item.item,
            selectedIndex: item.index
        })
    }
    openModal() {
        console.log('images', this.state.images_aaray)
        // const { images_aaray } = this.state
        this.setState({ modalVisibility: true, selectedImage: images_aaray[0] })
    }
    renderPictures = (item) => {
        console.log('items ', item)
        const { selectedIndex } = this.state
        return (
            <TouchableOpacity style={{ height: '100%', width: 100, marginHorizontal: 2, borderBottomColor: Colors.theme_color, borderBottomWidth: item.index == selectedIndex ? 2 : 0 }} onPress={() => this.pictureClicked(item)}>
                <Image style={{ flex: 0.8, borderWidth: selectedIndex == item.index ? 2 : 0, borderColor: Colors.theme_color }} source={{ uri: item.item }} />
            </TouchableOpacity>
        )
    }
    handleSaveProduct = () => {
        const { productName, articlenum, purchasePrice, sellingPrice, Category, SubCategory, multipleSelection } = this.state



        let formData = new FormData();
        formData.append("name", productName);
        formData.append("category_id", productName);
        formData.append("subcategory_id", productName);
        formData.append("article_no", articlenum);
        formData.append("purchase_price", purchasePrice);
        formData.append("sale_price", sellingPrice);

        formData.append("variations", productName);
        console.log('formData od Add Product ', JSON.stringify(formData));
        console.log('multipleSelection',multipleSelection)
    }
    render() {
        const { productName, articlenum, purchasePrice, sellingPrice, multipleSelection, modalVisibility, selectedImage, selectedIndex, title, Category, SubCategory, colors_available,sizes_available } = this.state
        const { navigation } = this.props
        return (
            <AppComponent >
                <Toolbar title={title} right={1} back={true} navigation={navigation} onSavePress={() => this.handleSaveProduct()} />
                <ScrollView style={[Style.CommonStyles.fullFlex], { paddingHorizontal: '2%', paddingTop: '2%' }}>

                    <View style={Style.Products.AddProduct.ImagePickerView}>
                        <TouchableOpacity onPress={() => this.openCamera()}>
                            <Image style={Style.Products.AddProduct.CameraImage} source={Images.camera} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.openGallery()}>
                            <Image style={Style.Products.AddProduct.GalleryImage} source={Images.gallery} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[Style.Products.AddProduct.ImageNumber, Style.CommonStyles.centerStyle]} onPress={() => this.openModal()}>
                            <Text>{images_aaray.length}</Text>
                            <Image style={{ height: 15, width: 15, marginLeft: 2 }} source={Images.updown} />

                        </TouchableOpacity>

                    </View>
                    <Modal isVisible={modalVisibility} style={{}}
                        backdropColor='#000'
                        backdropOpacity={0.8}
                    >
                        <View style={{ flex: 0.9, backgroundColor: '#fff' }}>
                            <View style={{ flex: 0.1, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 10 }}>
                                <TouchableOpacity onPress={() => this.setState({ modalVisibility: false })}
                                    style={[Style.Products.AddProduct.ImageModal.crossSignTouch, Style.CommonStyles.centerStyle]}
                                >
                                    <Image style={Style.Products.AddProduct.ImageModal.crossSign} source={Images.cross} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.6, justifyContent: 'center', paddingHorizontal: 10 }}>

                                <Image source={{ uri: selectedImage }} style={{ flex: 0.8, }} />


                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={{ flex: 0.20, paddingBottom: 5 }}>
                                {/* {
                                    images_aaray.length != 0 ?
                                        <Text style={Style.Products.AddProduct.ImageModal.image_num}>{(selectedIndex) + 1}/{images_aaray.length}</Text>
                                        : null
                                } */}
                                <Text style={Style.Products.AddProduct.ImageModal.image_num}>{(selectedIndex) + 1}/{images_aaray.length}</Text>
                                <FlatList
                                    data={images_aaray}
                                    renderItem={item => this.renderPictures(item)}
                                    keyExtractor={(item, index) => index.toString()}
                                    extraData={this.state}
                                    horizontal={true}

                                />
                            </View>

                        </View>
                    </Modal>
                    <DropDown
                        options={[1, 2, 3, 4, 5]}
                        defaultValue={Category}
                        onSelect={(index, value) => this.setState({ Category: value })}
                    />
                    <DropDown
                        options={[1, 2, 3, 4, 5]}
                        defaultValue={SubCategory}
                        onSelect={(index, value) => this.setState({ SubCategory: value })}
                    />
                    <ProductInput
                        label='Product Name'
                        value={productName}
                        onChangeText={productName => this.setState({ productName })} />
                    <ProductInput
                        label='Article Number'
                        value={articlenum}
                        onChangeText={articlenum => this.setState({ articlenum })} />
                    <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                        <View style={{ flex: 0.5, paddingRight: '5%' }}>
                            <ProductInput
                                label='Purchase price'
                                value={purchasePrice}
                                maxLength={10}
                                keyboardType='number-pad'
                                onChangeText={purchasePrice => this.setState({ purchasePrice })} />
                        </View>
                        <View style={{ flex: 0.5, paddingRight: '5%' }}>
                            <ProductInput
                                label='Selling price'
                                value={sellingPrice}
                                maxLength={10}
                                keyboardType='number-pad'
                                onChangeText={sellingPrice => this.setState({ sellingPrice })} />
                        </View>
                    </View>

                    {
                        multipleSelection.map((particularSet, i) => (
                            <View>

                                <DropDown
                                    options={colors_available}
                                    defaultValue={particularSet.color_selected != '' ? particularSet.color_selected : 'Select a Color'}
                                    onSelect={(index, value) => this.changePaticularColor(index, value, i)}
                                />
                                <DropDown
                                    options={sizes_available}
                                    defaultValue={particularSet.size_Selected != '' ? particularSet.size_Selected : 'Select a Size'}
                                    onSelect={(index, value) => this.changePaticularSize(index, value, i)}
                                />

                                <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                                    <View style={{ flex: 0.5, paddingRight: '5%' }}>
                                        <ProductInput
                                            label='Number of Pieces'
                                            value={particularSet.number_of_Pieces}
                                            maxLength={10}
                                            keyboardType='number-pad'
                                            onChangeText={purchasePrice => this.setPrice(purchasePrice, i)} />
                                    </View>
                                    <View style={{ flex: 0.5, paddingRight: '5%' }}>

                                    </View>
                                </View>
                            </View>
                        ))
                    }
                    <View style={{ justifyContent: 'flex-end', width: '100%', paddingVertical: 5, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this.addMore()}>
                            <Image source={Images.add_pop_up} style={Style.Products.categories.addPopUpImage} />

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </AppComponent >
        )
    }


}

const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        getColors: () => dispatch(getProductColors()),
        getSizes: () => dispatch(getProductSizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
{/* <View style={{ flexDirection: 'row', width: '100%', height: 50, borderBottomWidth: 0.8, borderBottomColor: '#c6c6ca' }}>
                        <ModalDropdown options={['option 1', 'option 2', 3, 4, 5]}
                            style={{ borderWidth: 0, width: '90%', height: '100%', justifyContent: 'center', }}
                            dropdownStyle={{ width: '80%' }}
                            defaultValue='Select a Category'
                            textStyle={{ color: Colors.theme_color, paddingHorizontal: 5, fontSize: 14, }}
                            dropdownTextStyle={{ color: '#000', fontSize: 16 }}
                            onSelect={(index, value) => console.log('indexssss', index, value)}
                        />
                        <TouchableOpacity style={[{ height: '100%', width: '10%', borderWidth: 0 }, Style.CommonStyles.centerStyle]}
                        >
                            <Image source={Images.down_arrow} style={{ height: 15, width: 15 }} />

                        </TouchableOpacity>
                    </View> */}
