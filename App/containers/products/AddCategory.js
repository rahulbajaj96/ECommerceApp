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

function AddCategory() {
    const [Category_name, setCategory_name] = useState("")
    const navigation = useNavigation();
    const [category_image, setcategory_image] = useState('')
    const [image_picked, setimage_picked] = useState(false)

    openImage = () => {
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
                console.log('uri',response.uri)
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
            <Toolbar title='Add Category' back={true} navigation={navigation} right={1} />
            <View style={[Style.CommonStyles.fullFlex, { marginHorizontal: '5%' }]}>
                <ScrollView>


                    <View style={[Style.Products.AddCategory.addCategoryImageStyle, ]}>
                        {
                            image_picked
                                ?
                                <Image style={{ flex: 1 }} source={{ uri: category_image }} />
                                :
                                <View>
                                    <Text style={[Style.Products.AddCategory.CategoryImageText, { fontSize: 30 }]} onPress={() => openImage()}>+</Text>

                                    <Text style={Style.Products.AddCategory.CategoryImageText}>ADD IMAGE</Text>
                                </View>
                        }

                    </View>

                    <Text style={{ fontSize: 16, color: '#000', marginVertical: 10, marginLeft: 10 }}>CategoryName</Text>
                    <TextInput
                        value={Category_name}
                        onChangeText={value => setCategory_name(value)}
                        style={{ height: 50, borderWidth: 1, width: '80%', fontSize: 14, marginVertical: 20, borderColor: Colors.theme_color, paddingLeft: 10 }}
                        placeholder='Category Name'
                    />

                    <Textarea rowSpan={6} bordered placeholder="Category Description"
                        style={{ color: '#000', fontSize: 14, borderWidth: 1, borderColor: Colors.theme_color }}

                    />
                    <TouchableOpacity style={Style.Products.categories.AddPopUp}>
                        <Image source={Images.add_pop_up} style={Style.Products.categories.addPopUpImage} />
                    </TouchableOpacity>
                </ScrollView>
            </View>

        </AppComponent>
    )
}
export default AddCategory;
//Small text box
//LargeTextBoz,
//Phone num,Email,CheckBox,DroPDown