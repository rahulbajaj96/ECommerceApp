import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import Style from '../../utils/Style';
import { useNavigation } from '@react-navigation/native';
import { ProductInput, DropDown } from '../../components/Products'
import Images from '../../utils/Image';
import ImagePicker from 'react-native-image-picker';
import { AANHEFArray } from '../../constants/AppConstants'

function AddCustomer(props) {
    const [first_name, setfirst_name] = useState('')
    const [last_name, setlast_name] = useState('')
    const [company_name, setcompany_name] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [KVKNum, setKVKNum] = useState('')
    const [city, setcity] = useState('')
    const [PostalCode, setPostalCode] = useState('')
    const [Street, setStreet] = useState('')
    const [ImageUri, setImageUri] = useState('')
    const [AANHEF, setAANHEF] = useState('AANHEF')
    const [ImageUploaded, setImageUploaded] = useState(false)
    const navigation = useNavigation();

    const [title, settitle] = useState('')



    useEffect(() => {
        console.log('props', props.route.params)
        setPropData(props.route.params)
    }, []);

    function setPropData(propData) {
        settitle(propData.title)
        if (propData.id == 2) {
            setEditCustomerData(propData)
        }

    }
    function setEditCustomerData() {
        setPostalCode('01');
        setfirst_name('Rahul')
        setlast_name('Bajaj');
        setcompany_name('Work from Home');
        setKVKNum('12346789');
        setemail('qwerty@iop.com')
        setphone('98745563210');
        setStreet('ABC def #90');
        setcity('Patiala');
        setAANHEF('Mrs.')
    }
    function goToImagePicker() {

        console.log('open image Picker')
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.uri);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                setImageUploaded(true);
                setImageUri(response.uri);

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };


            }
        });



    }

    return (
        <AppComponent>
            <Toolbar title={title} right={1} back={true} navigation={navigation} />
            <ScrollView style={[Style.CommonStyles.fullFlex, { paddingHorizontal: '5%', paddingVertical: '5%' }]}>

                <View style={[Style.Customers.AddCustomer.Customer_image_view_main]}>
                    <View style={[Style.Customers.AddCustomer.Customer_image_view, Style.CommonStyles.centerStyle]}>
                        <Image source={ImageUploaded ? { uri: ImageUri } : Images.appIcon} style={{ flex: 1 }} resizeMode='contain' />
                        <TouchableOpacity style={[{ height: 40, width: 40, position: 'absolute', right: -10, bottom: -5, borderWidth: 0 }, Style.CommonStyles.centerStyle]}
                            onPress={() => goToImagePicker()}
                        >
                            <Image style={{ height: 35, width: 35, }} source={Images.add_pop_up} />
                        </TouchableOpacity>


                    </View>
                </View>
                <DropDown
                    options={AANHEFArray}
                    defaultValue={AANHEF}
                    onSelect={(index, value) => setAANHEF(value)}
                />
                {/* <ProductInput
                    label='AANHEF'
                    value={AANHEF}
                    onChangeText={AANHEF => setAANHEF(AANHEF)} /> */}
                <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                    <View style={{ flex: 0.5, paddingRight: '5%' }}>
                        <ProductInput
                            label='First name'
                            value={first_name}
                            onChangeText={first_name => setfirst_name(first_name)} />
                    </View>
                    <View style={{ flex: 0.5, paddingRight: '5%' }}>
                        <ProductInput
                            label='Last name'
                            value={last_name}
                            onChangeText={last_name => setlast_name(last_name)} />
                    </View>
                </View>

                <ProductInput
                    label='Company name'
                    value={company_name}
                    onChangeText={company_name => setcompany_name(company_name)} />

                <ProductInput
                    label='KVK number'
                    value={KVKNum}
                    onChangeText={KVKNum => setKVKNum(KVKNum)} />

                <ProductInput
                    label='Email'
                    value={email}
                    keyboardType='email-address'
                    onChangeText={email => setemail(email)} />

                <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                    <View style={{ flex: 0.5, paddingRight: '5%' }}>
                        <ProductInput
                            label='Phone number'
                            value={phone}
                            maxLength={10}
                            keyboardType='number-pad'
                            onChangeText={phone => setphone(phone)} />
                    </View>
                    <View style={{ flex: 0.5, paddingRight: '5%' }}>
                        {/* <ProductInput
                            label='Last name'
                            value={last_name}
                            onChangeText={last_name => setlast_name(last_name)} /> */}
                    </View>
                </View>

                <Text style={{ color: '#000', fontSize: 16, marginTop: 20, fontWeight: 'bold', }}>Address</Text>
                <ProductInput
                    label='Street and HouseNo.'
                    value={Street}
                    onChangeText={street => setStreet(street)} />
                <View style={{ flexDirection: 'row', flex: 1, marginVertical: 10 }}>
                    <View style={{ flex: 0.5, paddingRight: '5%' }}>
                        <ProductInput
                            label='City'
                            value={city}
                            onChangeText={city => setcity(city)} />
                    </View>
                    <View style={{ flex: 0.5, paddingRight: '5%' }}>
                        <ProductInput
                            label='Postal Code'
                            value={PostalCode}
                            keyboardType='number-pad'
                            onChangeText={PostalCode => setPostalCode(PostalCode)} />
                    </View>
                </View>
                <View style={{ height: 50 }} />

            </ScrollView>
        </AppComponent>
    )



}
export default AddCustomer;