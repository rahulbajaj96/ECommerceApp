import React, { useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppComponent from '../../components/AppComponent';
import Toolbar from '../../components/Toolbar';
import { useNavigation } from '@react-navigation/native';
import { Textarea } from 'native-base';
import Style from '../../utils/Style';
import Colors from '../../utils/Colors';
import ImagePicker from 'react-native-image-picker';
import Images from '../../utils/Image';

function AddCategory(props) {
    const [Category_name, setCategory_name] = useState("")
    const navigation = useNavigation();
    const [category_image, setcategory_image] = useState('')
    const [image_picked, setimage_picked] = useState(false)
    const [title, settitle] = useState('')
    const [placeholder, setplaceholder] = useState('')
    const [CategoryDescription, setCategoryDescription] = useState('');
    const [SubCategoryEnabled, setSubCategoryEnabled] = useState(false)
    const [parentName, setparentName] = useState('')

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
        if (id == 0 || id == 2) {
            setplaceholder('Category')
            if (id == 2) {
                setCategoryData(data);
            }
        }
        else if (id == 1 || id == 3) {
            setplaceholder('Subcategory')
            setparentName('Clothes');
            setSubCategoryEnabled(true);
            if (id == 3)
                setSubcategoryData(data)

        }


    }
    function setCategoryData(data) {

        setcategory_image('https://via.placeholder.com/600/66b7d2');
        setimage_picked(true)
        setCategory_name('Clothes')
        setCategoryDescription('My Clothes are lit');



    }
    function setSubcategoryData(data) {

        setcategory_image('https://via.placeholder.com/600/66b7d2');
        setimage_picked(true)
        setCategory_name('Jeans')
        setCategoryDescription('My Clothes are lit');
        setparentName('Clothes');
        setSubCategoryEnabled(true);



    }
    function openImage() {
        console.log('open image Picker')
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
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
                console.log('uri', response.uri)
                const source = { uri: response.uri };
                setcategory_image(response.uri);
                setimage_picked(true)

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };


            }
        });

    }
    return (
        <AppComponent>
            <Toolbar title={title} back={true} navigation={navigation} right={1} />
            <View style={[Style.CommonStyles.fullFlex,]}>
                <ScrollView style={{ paddingHorizontal: '5%' }}>


                    <View style={[Style.Products.AddCategory.addCategoryImageStyle,]}>
                        {
                            image_picked
                                ?
                                <Image style={{ flex: 1 }} source={{ uri: category_image }} />
                                :
                                <View style={[Style.CommonStyles.fullFlex, Style.CommonStyles.centerStyle]}>
                                    <Text style={[Style.Products.AddCategory.CategoryImageText, { fontSize: 30 }]} onPress={() => openImage()}>+</Text>

                                    <Text style={Style.Products.AddCategory.CategoryImageText}>ADD IMAGE</Text>
                                </View>
                        }

                    </View>
                    {
                        SubCategoryEnabled
                            ?
                            <Text style={{ fontSize: 16, color: '#000', marginVertical: 10, marginLeft: 10 }}>{parentName}</Text>
                            :
                            null

                    }

                    <TextInput
                        value={Category_name}
                        onChangeText={value => setCategory_name(value)}
                        style={{ height: 50, borderWidth: 1, width: '80%', fontSize: 14, marginVertical: 20, borderColor: Colors.theme_color, paddingLeft: 10 }}
                        placeholder={placeholder + ' Name'}
                    />

                    <Textarea rowSpan={6} bordered placeholder={placeholder + ' Description'}
                        value={CategoryDescription}
                        onChangeText={CategoryDescription => setCategoryDescription(CategoryDescription)}
                        style={{ color: '#000', fontSize: 14, borderWidth: 1, borderColor: Colors.theme_color }}

                    />

                </ScrollView>
            </View>

        </AppComponent>
    )
}
export default AddCategory;
//Small text box
//LargeTextBoz,
//Phone num,Email,CheckBox,DroPDown