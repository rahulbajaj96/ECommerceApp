import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import { useNavigation } from '@react-navigation/native';
import { Textarea } from 'native-base';
import Style from '../../utils/Style';
import Spinner from 'react-native-loading-spinner-overlay'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Colors from '../../utils/Colors';
import ImagePicker from 'react-native-image-picker';
import Images from '../../utils/Image';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from "react-redux";

import { EmptyValidation, Get_Message } from '../../helpers/InputValidations';
import { ApiCallPost } from '../../Services/ApiServices';
import { BASE_URL, API_URL } from '../../config';
import { SPINNER_ON, SPINNER_OFF } from '../../constants/ReduxConstants';

function AddCategory(props) {
    const [Category_name, setCategory_name] = useState('')
    const navigation = useNavigation();
    const [category_image, setcategory_image] = useState('')
    const [image_picked, setimage_picked] = useState(false)
    const [title, settitle] = useState('')
    const [placeholder, setplaceholder] = useState('')
    const [CategoryDescription, setCategoryDescription] = useState('');
    const [SubCategoryEnabled, setSubCategoryEnabled] = useState(false)
    const [parentName, setparentName] = useState('')
    const [PhotoPath, setPhotoPath] = useState('')
    const [PAGE_ID, setPAGE_ID] = useState(0)
    const [Category_ID, setCategory_ID] = useState('')
    const [Subcategory_ID, setSubcategory_ID] = useState('')
    const [discard, setdiscard] = useState(false)

    const dispatch = useDispatch();
    const { spinner } = useSelector(state => ({
        spinner: state.spinnerReducer.SpinnerVisibility,

    }));
    useEffect(() => {
        console.log('props', props.route.params)
        setPropData(props.route.params)

    }, [])

    /**
     * 
     * @param {*} propData contains the props from previous page
     * @param propData.id has multiple values
     * @value 0 - for Add Category , so @param propData.data will be null,
     * @value 1 = for Add SubCategory , so @param propData.data will contain Category Id
     */

    function setPropData(propData) {

        const { data, title, id } = propData
        settitle(title);
        setPAGE_ID(id);
        if (id == 0 || id == 2) {
            setplaceholder('Category')
            if (id == 2) {
                setCategoryData(data);
            }
        }
        else if (id == 1 || id == 3) {
            setplaceholder('Subcategory')
            if (id == 1) {
                setparentName(data.name);
                setCategory_ID(data.id)
            }

            // console.log('propData', data)

            setSubCategoryEnabled(true);
            if (id == 3)
                setSubcategoryData(data)

        }


    }
    function setCategoryData(data) {
        console.log('data', data)

        setcategory_image(data.image);
        setimage_picked(data.image != '' ? true : false)
        setCategory_name(data.name)
        setCategoryDescription(data.description);
        setCategory_ID(data.id)
        setdiscard(false)


    }
    function setSubcategoryData(data) {
        console.log('Edit Prop data', data)

        setcategory_image(data.image);
        setimage_picked(true)
        setCategory_name(data.name)
        setCategoryDescription(data.description);
        setparentName(data.category_detail.name);
        setSubCategoryEnabled(true);
        setCategory_ID(data.category_id);
        setSubcategory_ID(data.id)
        setdiscard(false)


    }
    function openImage() {
        console.log('open image Picker')
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                
            },
            quality:0.25
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('uri', response)
                const source = { uri: response.uri };
                setPhotoPath({
                    name: 'ABC',
                    type: response.type, uri: response.uri
                })
                setcategory_image(response.uri);
                setimage_picked(true)
                setdiscard(true)
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };


            }
        });

    }
    async function handleSaveCategory() {
        if (!EmptyValidation(Category_name)) {
            Toast.show(Get_Message('Name'));
            return;
        }
        // if (!EmptyValidation(CategoryDescription)) {
        //     Toast.show(Get_Message('description'));
        //     return;
        // }
        else {
            Keyboard.dismiss();
            let formdata = new FormData();
            formdata.append('name', Category_name);
            formdata.append('description', CategoryDescription);
            dispatch({ type: SPINNER_ON })
            if (PAGE_ID == 0) {
                formdata.append('image', PhotoPath);
                console.log('Add Category Api Call')
                console.log('formdata of Add Ctaegory ', formdata);

                var response = await ApiCallPost(`${BASE_URL}${API_URL.AddCategory}`, formdata);
                console.log('response Add Category', response);
                if (response != false) {
                    if (response.status == 1) {
                        setTimeout(() => {
                            Toast.show(response.message)
                        }, 500);
                        navigation.navigate('Categories');
                    }
                    else {
                        setTimeout(() => {
                            Toast.show(response.message)
                        }, 500);
                    }
                    dispatch({ type: SPINNER_OFF })

                }
            }
            else if (PAGE_ID == 2) {
                formdata.append('image', PhotoPath);
                formdata.append('category_id', Category_ID);
                console.log('Edit Category Api Call')
                console.log('formdata of Edit Ctaegory ', formdata);
                var response = await ApiCallPost(`${BASE_URL}${API_URL.Edit_category}`, formdata);
                console.log('response Edit Category', response);
                if (response != false) {
                    if (response.status == 1) {
                        setTimeout(() => {
                            Toast.show(response.message)
                        }, 500);
                        navigation.navigate('Categories');
                    }
                    else {
                        setTimeout(() => {
                            Toast.show(response.message)
                        }, 500);
                    }
                    dispatch({ type: SPINNER_OFF })

                }
            }
            else if (PAGE_ID == 1) {
                console.log('Add SubCategory Api Call')
                formdata.append('image', PhotoPath);
                formdata.append('category_id', Category_ID);
                console.log('formdata of Save SubCategory Api,', formdata)
                console.log(' props.route.params.data', props.route.params.data)
                var response = await ApiCallPost(`${BASE_URL}${API_URL.AddSubCategory}`, formdata);
                console.log('response', response)
                if (response != false) {
                    if (response.status == 1) {
                        setTimeout(() => {
                            Toast.show(response.message)
                        }, 500);
                        navigation.navigate('SubCategories', { category_id: props.route.params.data })
                    }
                    else {
                        setTimeout(() => {
                            Toast.show(response.message)
                        }, 500);
                    }
                    dispatch({ type: SPINNER_OFF })

                }

            }
            else if (PAGE_ID == 3) {
                console.log('Edit SubCategory Api Call')
                // formdata.append('image', PhotoPath);
                formdata.append('image', PhotoPath);
                formdata.append('category_id', Category_ID);
                formdata.append('subcategory_id', Subcategory_ID);
                console.log('formData of Edit SubCategory ', formdata);
                var response = await ApiCallPost(`${BASE_URL}${API_URL.Edit_SubCategory}`, formdata);
                console.log('response', response)
                if (response != false) {
                    if (response.status == 1) {
                        setTimeout(() => {
                            Toast.show(response.message)
                        }, 500);
                        navigation.navigate('SubCategories', { category_id: props.route.params.data })
                    }
                    else {
                        setTimeout(() => {
                            Toast.show(response.message)
                        }, 500);
                    }
                    dispatch({ type: SPINNER_OFF })

                }

            }

        }

    }
    const handleDiscard = () => {
        if (PAGE_ID == 0 || PAGE_ID == 1) {
            console.log('Category_name', Category_name, Category_name.length)
            console.log('CategoryDescription', CategoryDescription, CategoryDescription.length)

            if (Category_name == '' && CategoryDescription == '' && category_image == '')
                setdiscard(false)
            else
                setdiscard(true)
        }
        else
        {
            setdiscard(true)
        }
            
    }
    useEffect(() => {
        // handleDiscard()
    }, [Category_name, CategoryDescription, category_image])

    useEffect(() => {
        // setdiscard(true)
    }, [Category_name, CategoryDescription, category_image])

    const Category_names = (value) => {
        console.log(value.length)
        setCategory_name(value)
        handleDiscard();
    }
    const Category_desc = (value) => {
        setCategoryDescription(value)
        handleDiscard();
    }
    return (
        <AppComponent>
            <Toolbar title={title} back={true} navigation={navigation} right={1} onSavePress={() => handleSaveCategory()}
                customisedbackButton={discard}
            />
            <Spinner visible={spinner} />
            <View style={[Style.CommonStyles.fullFlex,]}>
                <KeyboardAwareScrollView style={{ paddingHorizontal: '5%' }}>

                    <TouchableWithoutFeedback style={[Style.CommonStyles.fullFlex,]} onPress={() => Keyboard.dismiss()}>
                    <View style={[Style.CommonStyles.fullFlex,]}>
                        {
                            image_picked
                                ?
                                <TouchableOpacity style={[Style.Products.AddCategory.addCategoryImageStyle,]} onPress={() => openImage()}>
                                    <Image style={{ flex: 1 }} source={{ uri: category_image }} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[Style.Products.AddCategory.addCategoryImageStyle,]} onPress={() => openImage()}>
                                    <View style={[Style.CommonStyles.fullFlex, Style.CommonStyles.centerStyle]}>
                                        <Text style={[Style.Products.AddCategory.CategoryImageText, { fontSize: 30 }]} >+</Text>

                                        <Text style={Style.Products.AddCategory.CategoryImageText}>ADD IMAGE</Text>
                                    </View>
                                </TouchableOpacity>
                        }


                        {
                            SubCategoryEnabled
                                ?
                                <Text style={{ fontSize: 16, color: '#000', marginVertical: 10, marginLeft: 10 }}>{parentName}</Text>
                                :
                                null

                        }

                        <TextInput
                            value={Category_name}
                            returnKeyType='done'
                            placeholderTextColor='grey'
                            onChangeText={value => Category_names(value)}
                            style={{ height: 50, borderWidth: 1, width: '80%', fontSize: 14, marginVertical: 20, borderColor: Colors.theme_color, paddingLeft: 10,color: '#000' }}
                            placeholder={placeholder + ' Name'}
                        />

                        <Textarea rowSpan={6} bordered placeholder={placeholder + ' Description'}
                            value={CategoryDescription}
                            returnKeyType='done'
                            onChangeText={CategoryDescription => Category_desc(CategoryDescription)}
                            style={{ color: '#000', fontSize: 14, borderWidth: 1, borderColor: Colors.theme_color }}
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
            </View>

        </AppComponent>
    )
}
export default AddCategory;
//Small text box
//LargeTextBoz,
//Phone num,Email,CheckBox,DroPDown