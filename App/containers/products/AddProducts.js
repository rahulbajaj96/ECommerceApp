import React from 'react'
import { Text, Image, TouchableOpacity, View, TextInput, ScrollView, FlatList } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import Style from '../../utils/Style'
import Colors from '../../utils/Colors';
import Toast from 'react-native-simple-toast';
import { ProductInput, DropDown } from '../../components/Products';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-picker';
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Images from '../../utils/Image';
import { getProductColors } from '../../actions/product_colors_actions'
import { getColorParamsFromName, getSizeParamsFromName, getCategoryParamsFromName, getColorParamsFromID, getSizeParamsFromID } from '../../helpers/GetProductValues'
import { getProductSizes } from '../../actions/product_sizes_actions'
import { getSubCategoriesList_On_category } from '../../actions/subcategoriesactions'
import { ApiCallPost } from '../../Services/ApiServices'
import { BASE_URL, API_URL } from '../../config'
import { SPINNER_ON, SPINNER_OFF } from '../../constants/ReduxConstants'
import { EmptyValidation, Get_Message } from '../../helpers/InputValidations'
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
        multipleSelection: [{ product_color_id: '', size_id: '', quantity: '', product_color_name: '', size_name: '' },],
        images_aaray: [],
        modalVisibility: false,
        selectedImage: 'https://via.placeholder.com/600/66b7d2',
        selectedIndex: 0,
        title: '',
        Category: '',
        Category_id: '',
        Page_id: 0,
        product_id: '',

        SubCategory: 'Select a SubCategory',
        SubCategory_id: '',
        colors_available: [],
        sizes_available: [],
        categories_available: [],
        subcategories_available: [],
        images_path_array: [],

        size_color_modal: false,
        newSize_Color: '',
        current_size_color: 0,

        discard: false

    }

    async componentDidMount() {

        console.log('propDtaaProducts', this.props.route.params)
        this.props.loader_On();
        await this.get_product_color();
        await this.get_product_sizes();
        await this.setPropData(this.props.route.params)
        this.get_Categories_Available();




    }

    /**
     * @method get_product_color provides u the colors from api and sets to spinner
     */
    async get_product_color() {
        let { colors_available } = this.state
        await this.props.getColors();
        colors_available = []
        const { product_color_reducer } = this.props
        for (let i = 0; i < product_color_reducer.colors_available.length; i++) {
            colors_available.push(product_color_reducer.colors_available[i].color);
        }
        // console.log('colors', colors_available);
        this.setState({ colors_available })
    }

    /**
     * @method get_product_sizes
     * @method getSizes() get the sizes from the API and save to @params {*} size_available
     */
    async get_product_sizes() {
        let { sizes_available } = this.state
        await this.props.getSizes();
        sizes_available = []
        const { product_size_reducer } = this.props
        for (let i = 0; i < product_size_reducer.sizes_available.length; i++) {
            sizes_available.push(product_size_reducer.sizes_available[i].size);
        }
        // console.log('sizes', sizes_available);
        this.setState({ sizes_available })
    }
    async get_Categories_Available() {
        const { categories_available } = this.state
        const { categoriesReducer } = this.props
        for (let i = 0; i < categoriesReducer.category_list.length; i++) {
            categories_available.push(categoriesReducer.category_list[i].name)
        }
        // console.log('categories_available', categories_available);
        this.setState({ categories_available })
    }
    async get_SubCategories_Available() {
        const { subcategories_available } = this.state
        const { subcategoriesReducer } = this.props
        for (let i = 0; i < subcategoriesReducer.subcategory_list.length; i++) {
            subcategories_available.push(subcategoriesReducer.subcategory_list[i].name)
        }
        // console.log('categories_available', categories_available);
        this.setState({ subcategories_available })
    }
    async get_SubCategory(category_id) {
        let { subcategories_available } = this.state
        await this.props.getSubCategories(category_id);
        const { subcategoriesReducer } = this.props
        subcategories_available = []
        // console.log('reducer data', categoriesReducer);
        for (let i = 0; i < subcategoriesReducer.subcategory_list_based_on_category.length; i++) {
            subcategories_available.push(subcategoriesReducer.subcategory_list_based_on_category[i].name)
        }
        // console.log('subcategories_available', subcategories_available);
        this.setState({ subcategories_available })


    }
    /**
     * @method setPropData
     * @param propData contains the data about Add or Edit Products
     */
    async setPropData(propData) {
        if (propData.id == 1) {
            this.setState({ Page_id: propData.id })
            await this.get_SubCategories_Available();
        }
        if (propData.id == 2) {
            let { multipleSelection, images_aaray, images_path_array } = this.state
            const { product_color_reducer, product_size_reducer } = this.props

            // for (let i = 0; i < multipleSelection.length; i++) {
            //     multipleSelection[i].product_color_id = 'red',
            //         multipleSelection[i].quantity = '5',
            //         multipleSelection[i].size_id = 'Large'
            // }

            // let category_params = await getCategoryParamsFromID(propData.data.);
            for (let i = 0; i < propData.data.product_image.length; i++) {
                images_aaray.push(propData.data.product_image[i].image);
                images_path_array.push({
                    name: 'ABC',
                    type: 'image/jpeg', uri: propData.data.product_image[i].image
                })
            }

            multipleSelection = [];
            for (let i = 0; i < propData.data.variations.length; i++) {
                var color_params = await getColorParamsFromID(product_color_reducer.colors_available, propData.data.variations[i].product_color_id);
                var size_params = await getSizeParamsFromID(product_size_reducer.sizes_available, propData.data.variations[i].size_id);
                multipleSelection.push({
                    quantity: propData.data.variations[i].quantity,
                    product_color_id: propData.data.variations[i].product_color_id,
                    size_id: propData.data.variations[i].size_id,
                    size_name: size_params.size,
                    product_color_name: color_params.color
                })
            }

            console.log('multiple Selection Data', multipleSelection);
            console.log('propData', propData.data);

            await this.get_SubCategory(propData.data.category_id);
            this.setState({
                Category_id: propData.data.category_id,
                SubCategory_id: propData.data.subcategory_id,
                Category: propData.data.category_name,
                SubCategory: propData.data.subcategory_name,
                title: propData.title,
                productName: propData.data.name,
                articlenum: propData.data.article_no,
                purchasePrice: '' + propData.data.purchase_price,
                sellingPrice: '' + propData.data.sale_price,
                multipleSelection,
                images_aaray,
                Page_id: propData.id,
                product_id: propData.data.id
            })
            this.props.loader_Off();
        }
        else {
            this.setState({

                title: propData.title,

            })
            this.props.loader_Off();
        }

    }

    async formMultipleSelectionParticularObject() {

        var color_params = await getColorParamsFromID(product_color_reducer.colors_available, propData.data.variations[i].product_color_id);
        let size_params = await getSizeParamsFromID(product_size_reducer.sizes_available, propData.data.variations[i].size_id);
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
        multipleSelection[main_index].product_color_id = '' + color_selected.id;
        multipleSelection[main_index].product_color_name = value;

        this.setState({ multipleSelection }, () => this.handleDiscard())

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
        multipleSelection[main_index].size_id = '' + size_selected.id;
        multipleSelection[main_index].size_name = value

        this.setState({ multipleSelection }, () => this.handleDiscard())

    }

    async SelectCategory(index, value) {
        const { categoriesReducer } = this.props
        let category_selected = await getCategoryParamsFromName(categoriesReducer.category_list, value)
        this.setState({ Category_id: category_selected.id, Category: value, SubCategory_id: '', SubCategory: '' }, () => this.handleDiscard())
        setTimeout(() => {
            this.get_SubCategory(category_selected.id);
        }, 200);
    }
    async SelectSubCategory(index, value) {
        const { subcategoriesReducer } = this.props
        let subcategory_selected = await getCategoryParamsFromName(subcategoriesReducer.subcategory_list_based_on_category, value)
        this.setState({ SubCategory_id: subcategory_selected.id, SubCategory: value }, () => this.handleDiscard())
    }

    /**
     * 
     * @param {*} value :value of textInput
     * @param {*} index index of main array 
     * @method setPrice sets the input value to particular index of main array
     */
    setPrice(value, index) {
        const { multipleSelection } = this.state
        multipleSelection[index].quantity = value;
        this.setState({ multipleSelection })
    }

    /**
     * @method addMore adds a new object into main array
     */
    addMore() {
        const { multipleSelection } = this.state
        // console.log('multiple ', multipleSelection)
        multipleSelection[multipleSelection.length] = { product_color_id: '', size_id: '', quantity: '', product_color_name: '', size_name: '' }
        this.setState({ multipleSelection })
    }
    deleteMore(i) {
        const { multipleSelection } = this.state
        multipleSelection.splice(i, 1);
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
        const { images_aaray, images_path_array } = this.state

        ImagePicker.launchCamera(options, (response) => {
            console.log('response ', response.uri)
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                images_aaray.push(response.uri);
                images_path_array.push({
                    name: 'ABC',
                    type: response.type, uri: response.uri
                })
                this.setState({ images_aaray, images_path_array }, () => this.handleDiscard())
            }

        });
    }

    /**
     * @method openGallery directly opens the gallery
     * and sets the image selected into image Array
     */
    openGallery() {
        const { images_aaray, images_path_array } = this.state
        ImagePicker.launchImageLibrary(options, (response) => {
            // Same code as in above section!
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                console.log('response Gallery', response.uri)
                images_aaray.push(response.uri);
                images_path_array.push({
                    name: 'ABC',
                    type: response.type, uri: response.uri
                })
                this.setState({ images_aaray, images_path_array }, () => this.handleDiscard())
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
        // console.log('images', this.state.images_aaray)
        const { images_aaray } = this.state
        this.setState({ modalVisibility: true, selectedImage: images_aaray[0] })
    }
    deleteImage = (index) => {
        const { images_aaray, images_path_array } = this.state
        images_aaray.splice(index, 1);
        images_path_array.splice(index, 1);
        this.setState({ images_aaray, images_path_array }, () => this.setState({ selectedImage: images_aaray[0], modalVisibility: images_aaray.length == 0 ? false : true }, () => this.handleDiscard()))
    }
    renderPictures = (item) => {
        console.log('items ', item)
        const { selectedIndex } = this.state
        return (
            <View style={{ height: '100%', width: 100, marginHorizontal: 2, borderBottomColor: Colors.theme_color, borderBottomWidth: item.index == selectedIndex ? 2 : 0 }} >
                <View style={{ flex: 0.15, borderWidth: 0, alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 5 }}>
                    <TouchableOpacity onPress={() => this.deleteImage(item.index)}>
                        <Image style={{ height: 15, width: 15 }} source={Images.cross} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => this.pictureClicked(item)} style={{ flex: 0.7 }}>
                    <Image style={{ flex: 1, borderWidth: selectedIndex == item.index ? 2 : 0, borderColor: Colors.theme_color }} source={{ uri: item.item }} />
                </TouchableOpacity>

            </View>
        )
    }
    async handleSaveProduct() {
        const { productName, articlenum, purchasePrice, sellingPrice, Category_id, SubCategory_id, multipleSelection, images_path_array, Page_id, product_id } = this.state
        const { navigation } = this.props
        if (!EmptyValidation(Category_id)) {
            Toast.show('Please select a Category');
            return;
        }
        if (!EmptyValidation(SubCategory_id)) {
            Toast.show('Please select a Subcategory');
            return;
        }
        if (!EmptyValidation(productName)) {
            Toast.show(Get_Message('Product Name'));
            return;
        }
        if (!EmptyValidation(articlenum)) {
            Toast.show(Get_Message('Article Number'));
            return;
        }
        if (!EmptyValidation(purchasePrice)) {
            Toast.show(Get_Message('Purchase Price'));
            return;
        }
        if (!EmptyValidation(sellingPrice)) {
            Toast.show(Get_Message('Selling Price'));
            return;
        }
        if (images_path_array.length == 0) {
            Toast.show('Please upload at least one image ');
            return;
        }
        for (let i = 0; i < multipleSelection.length; i++) {
            if (multipleSelection[i].product_color_id == '') {
                Toast.show('Please select the required Color');
                return;
            }
            if (multipleSelection[i].size_id == '') {
                Toast.show('Please select the required Size');
                return;
            }
            if (multipleSelection[i].quantity == 0) {
                Toast.show('Please Enter the valid Quantity');
                return;
            }
        }
        this.props.loader_On();
        let variationsarray = []
        for (let i = 0; i < multipleSelection.length; i++) {
            variationsarray.push({
                product_color_id: multipleSelection[i].product_color_id,
                size_id: multipleSelection[i].size_id,
                quantity: multipleSelection[i].quantity
            })
        }
        let formData = new FormData();
        formData.append("name", productName);
        formData.append("category_id", Category_id);
        formData.append("subcategory_id", SubCategory_id);
        formData.append("article_no", articlenum);
        formData.append("purchase_price", purchasePrice);
        formData.append("sale_price", sellingPrice);
        formData.append("variations", JSON.stringify(variationsarray));
        for (let i = 0; i < images_path_array.length; i++) {
            formData.append(`images[${i}]`, images_path_array[i]);
        }
        if (Page_id == 1) {
            console.log('formData od Add Product ', JSON.stringify(formData));

            var response = await ApiCallPost(`${BASE_URL}${API_URL.AddProduct}`, formData);
            console.log('response Add Category', response);
            if (response != false) {
                if (response.status == 1) {
                    setTimeout(() => {
                        Toast.show(response.message)
                    }, 500);
                    this.props.loader_Off();
                    navigation.navigate('Productss', { category_id: Category_id, subCategory_id: SubCategory_id });
                }
                else {
                    this.props.loader_Off();
                    setTimeout(() => {
                        Toast.show(response.message)
                    }, 500);
                }

            }
        }
        else if (Page_id == 2) {
            formData.append('product_id', product_id);
            console.log('formData od Edit Product ', JSON.stringify(formData));

            var EditResponse = await ApiCallPost(`${BASE_URL}${API_URL.Edit_Products}`, formData);
            console.log('response Edit Category', EditResponse);
            if (EditResponse != false) {
                if (EditResponse.status == 1) {
                    setTimeout(() => {
                        Toast.show(EditResponse.message)
                    }, 500);
                    this.props.loader_Off();
                    // navigation.popToTop()
                    navigation.navigate('Productss', { category_id: Category_id, subCategory_id: SubCategory_id });
                }
                else {
                    setTimeout(() => {
                        Toast.show(EditResponse.message)
                    }, 500);
                    this.props.loader_Off();
                }

            }
        }



    }
    AddSize_color = (id) => {
        const { newSize_Color } = this.state
        if (id == 1)
            this.AddColor(newSize_Color);
        else
            this.AddSize(newSize_Color);

    }
    async AddColor(color) {
        let formData = new FormData();
        formData.append('color', color);
        let responseAddColor = await ApiCallPost(`${BASE_URL}${API_URL.AddColor}`, formData);
        console.log('responseof Add Color', responseAddColor);
        if (responseAddColor != false) {
            if (responseAddColor.status == 1) {
                this.setState({ size_color_modal: false, newSize_Color: '' })
                this.get_product_color();
            }
            else
                setTimeout(() => {
                    Toast.show(responseAddColor.message)
                }, 500);
        }
    }
    async AddSize(size) {
        let formData = new FormData();
        formData.append('size', size);
        let responseAddSize = await ApiCallPost(`${BASE_URL}${API_URL.AddSize}`, formData);
        console.log('response of AddSize', responseAddSize);
        if (responseAddSize != false) {
            if (responseAddSize.status == 1) {
                this.setState({ size_color_modal: false, newSize_Color: '' })
                this.get_product_sizes();
            }
            setTimeout(() => {
                Toast.show(responseAddSize.message)
            }, 500);
        }
    }
    handleDiscard() {
        const { productName, articlenum, purchasePrice, sellingPrice, multipleSelection, modalVisibility, selectedImage, selectedIndex, title, Category, SubCategory, colors_available, sizes_available, categories_available, subcategories_available, images_aaray, size_color_modal, newSize_Color, current_size_color, discard } = this.state
        /**
         * 
         * */
        if (productName == '' && articlenum == '' && sellingPrice == '' && purchasePrice == '' && Category == '' && SubCategory == 'Select a SubCategory' && images_aaray.length == 0 && multipleSelection[0].product_color_name == '' && multipleSelection[0].size_name == '' && multipleSelection[0].quantity == '' && multipleSelection.length == 1) {
            console.log('simple back')
            this.setState({ discard: false })
        }
        else {
            this.setState({ discard: true })
        }
    }
    render() {
        const { productName, articlenum, purchasePrice, sellingPrice, multipleSelection, modalVisibility, selectedImage, selectedIndex, title, Category, SubCategory, colors_available, sizes_available, categories_available, subcategories_available, images_aaray, size_color_modal, newSize_Color, current_size_color, discard, SubCategory_id } = this.state
        const { navigation } = this.props
        console.log('SubCategory', SubCategory)

        return (
            <AppComponent >
                <Toolbar title={title} right={1} back={true} navigation={navigation} onSavePress={() => this.handleSaveProduct()}
                    customisedbackButton={discard}
                />
                <KeyboardAwareScrollView style={[Style.CommonStyles.fullFlex], { paddingHorizontal: '2%', paddingTop: '2%' }}>

                    <View style={Style.Products.AddProduct.ImagePickerView}>
                        <TouchableOpacity onPress={() => this.openCamera()}>
                            <Image style={Style.Products.AddProduct.CameraImage} source={Images.camera} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.openGallery()}>
                            <Image style={Style.Products.AddProduct.GalleryImage} source={Images.gallery} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[Style.Products.AddProduct.ImageNumber, Style.CommonStyles.centerStyle]} onPress={() => this.openModal()} disabled={images_aaray.length == 0 ? true : false}>
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
                            <View style={{ flex: 0.55, justifyContent: 'center', paddingHorizontal: 10 }}>

                                <Image source={{ uri: selectedImage }} style={{ flex: 0.8, }} />


                            </View>
                            <View style={{ flex: 0.08 }} />
                            <View style={{ flex: 0.27, paddingBottom: 5 }}>
                                {
                                    images_aaray.length != 0 ?
                                        <Text style={Style.Products.AddProduct.ImageModal.image_num}>{(selectedIndex) + 1}/{images_aaray.length}</Text>
                                        : null
                                }
                                {/* <Text style={Style.Products.AddProduct.ImageModal.image_num}>{(selectedIndex) + 1}/{images_aaray.length}</Text> */}
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
                        options={categories_available}
                        defaultValue={Category != '' ? Category : 'Select any Category'}
                        onSelect={(index, value) => this.SelectCategory(index, value)}
                    />
                    <DropDown
                        options={subcategories_available}
                        defaultValue={SubCategory != '' ? SubCategory : 'Select any SubCategory'}
                        onSelect={(index, value) => this.SelectSubCategory(index, value)}
                    />
                    <ProductInput
                        label='Product Name'
                        value={productName}
                        onChangeText={productName => this.setState({ productName }, () => this.handleDiscard())} />
                    <ProductInput
                        label='Article Number'
                        value={articlenum}
                        maxLength={8}
                        keyboardType='numeric'
                        onChangeText={articlenum => this.setState({ articlenum }, () => this.handleDiscard())} />
                    <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                        <View style={{ flex: 0.5, paddingRight: '5%' }}>
                            <ProductInput
                                label='Purchase price'
                                value={purchasePrice}
                                maxLength={10}
                                keyboardType='number-pad'
                                onChangeText={purchasePrice => this.setState({ purchasePrice }, () => this.handleDiscard())} />
                        </View>
                        <View style={{ flex: 0.5, paddingRight: '5%' }}>
                            <ProductInput
                                label='Selling price'
                                value={sellingPrice}
                                maxLength={10}
                                keyboardType='number-pad'
                                onChangeText={sellingPrice => this.setState({ sellingPrice }, () => this.handleDiscard())} />
                        </View>
                    </View>
                    <View style={{ height: 60, flexDirection: 'row', marginHorizontal: '5%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                        <TouchableOpacity style={[{ height: 50, width: '40%', borderRadius: 25, backgroundColor: Colors.theme_color }, Style.CommonStyles.centerStyle]} onPress={() => this.setState({ size_color_modal: true, current_size_color: 1, newSize_Color: '' })}>
                            <Text style={{ fontSize: 14, color: Colors.white }}>Add Color</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[{ height: 50, width: '40%', borderRadius: 25, backgroundColor: Colors.theme_color }, Style.CommonStyles.centerStyle]} onPress={() => this.setState({ size_color_modal: true, current_size_color: 2, newSize_Color: '' })}>
                            <Text style={{ fontSize: 14, color: Colors.white }}>Add Size</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        multipleSelection.map((particularSet, i) => (
                            <View>
                                {
                                    i != 0
                                        ?


                                        <View style={{ justifyContent: 'flex-end', width: '100%', paddingVertical: 5, alignItems: 'flex-end' }}>
                                            <TouchableOpacity
                                                onPress={() => this.deleteMore(i)} >
                                                <Image source={Images.cancel} style={Style.Products.categories.addPopUpImage} />

                                            </TouchableOpacity>
                                        </View>
                                        : null

                                }
                                <DropDown
                                    options={colors_available}
                                    defaultValue={particularSet.product_color_name != '' ? particularSet.product_color_name : 'Select a Color'}
                                    onSelect={(index, value) => this.changePaticularColor(index, value, i)}
                                />
                                <DropDown
                                    options={sizes_available}
                                    defaultValue={particularSet.size_name != '' ? particularSet.size_name : 'Select a Size'}
                                    onSelect={(index, value) => this.changePaticularSize(index, value, i)}
                                />

                                <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                                    <View style={{ flex: 0.5, paddingRight: '5%' }}>
                                        <ProductInput
                                            label='Number of Pieces'
                                            value={particularSet.quantity}
                                            maxLength={6}
                                            keyboardType='number-pad'
                                            onChangeText={purchasePrice => this.setPrice(purchasePrice, i)} />
                                    </View>
                                    <View style={{ flex: 0.5, paddingRight: '5%' }}>

                                    </View>
                                </View>
                            </View>
                        ))
                    }
                    <Modal isVisible={size_color_modal} style={{}}
                        backdropColor='#000'
                        backdropOpacity={0.8}
                    >
                        <View style={{ height: 280, width: '100%', backgroundColor: '#fff', borderRadius: 5 }}>
                            <View style={{ flex: 0.1, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 10, marginTop: 10 }}>
                                <TouchableOpacity onPress={() => this.setState({ size_color_modal: false })}
                                    style={[Style.Products.AddProduct.ImageModal.crossSignTouch, Style.CommonStyles.centerStyle]}
                                >
                                    <Image style={{ height: 20, width: 20 }} source={Images.cross} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.8, borderWidth: 0, paddingHorizontal: '5%', paddingTop: 10 }}>
                                <Text style={{ fontSize: 24, color: Colors.theme_color, marginVertical: '4%', marginHorizontal: 10 }}>Add the {current_size_color == 1 ? 'color' : 'size'} you want to add </Text>
                                <TextInput
                                    style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: '#000', marginVertical: '2%', paddingBottom: 5, marginHorizontal: 10, }}
                                    placeholder={'Name'}
                                    value={newSize_Color}
                                    returnKeyType='done'
                                    onChangeText={newSize_Color => this.setState({ newSize_Color })}

                                />
                                <TouchableOpacity style={[{ width: '50%', marginHorizontal: '25%', borderRadius: 25, height: 50, backgroundColor: Colors.theme_color, marginTop: '8%' }, Style.CommonStyles.centerStyle]} onPress={() => this.AddSize_color(current_size_color)}>
                                    <Text style={{ fontSize: 15, color: Colors.white, }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.08 }} />


                        </View>
                    </Modal>
                    <View style={{ justifyContent: 'flex-end', width: '100%', paddingVertical: 5, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => this.addMore()} >
                            <Image source={Images.add_pop_up} style={Style.Products.categories.addPopUpImage} />

                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
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
        getSizes: () => dispatch(getProductSizes()),
        getSubCategories: (id) => dispatch(getSubCategoriesList_On_category(id)),
        loader_On: () => dispatch({ type: SPINNER_ON }),
        loader_Off: () => dispatch({ type: SPINNER_OFF })

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
