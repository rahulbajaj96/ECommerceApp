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

import { EmptyValidation, Get_Message, EmailValidation } from '../../helpers/InputValidations';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay'
import { ApiCallPost } from '../../Services/ApiServices';
import { BASE_URL, API_URL } from '../../config';
import { SPINNER_ON, SPINNER_OFF } from '../../constants/ReduxConstants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function AddEmployee(props) {
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
    const [AANHEF, setAANHEF] = useState()
    const [ImageUploaded, setImageUploaded] = useState(false)
    const navigation = useNavigation();
    const [ID, setID] = useState(0)
    const [Address, setAddress] = useState('')
    const [title, settitle] = useState('')
    const [Customer_id, setCustomer_id] = useState('')
    const [photoPath, setphotoPath] = useState('')

    const dispatch = useDispatch();
    const { spinner } = useSelector(state => ({
        spinner: state.spinnerReducer.SpinnerVisibility,

    }));

    useEffect(() => {
        console.log('props', props.route.params)
        setPropData(props.route.params)
    }, []);

    function setPropData(propData) {
        settitle(propData.title)
        setID(propData.id)
        if (propData.id == 2) {
            setEditEmployeeData(propData.data)
        }

    }
    function setEditEmployeeData(propData) {
        console.log('propData', propData)
        setPostalCode(propData.postal_code);
        setfirst_name(propData.first_name)
        setlast_name(propData.last_name);
        setcompany_name(propData.company_name);
        setKVKNum(propData.kvk_number);
        setemail(propData.email)
        setphone(propData.telephone);
        setStreet(propData.street_house_no);
        setcity(propData.city);
        setAddress(propData.address)
        setAANHEF(propData.prefixing_type)
        setCustomer_id(propData.id)
        setImageUri(propData.profile_pic)
        setImageUploaded(true)
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

                setphotoPath({
                    name: 'ABC',
                    type: response.type, uri: response.uri
                })
                setImageUploaded(true);
                setImageUri(response.uri);


            }
        });
    }
    async function handleSaveCustomer() {
        if (!EmptyValidation(ImageUri)) {
            Toast.show("Please select a Customer pic");
            return;
        }
        if (!EmptyValidation(AANHEF)) {
            Toast.show(Get_Message("AANHEF"));
            return;
        }

        if (!EmptyValidation(first_name)) {
            Toast.show(Get_Message("First Name"));
            return;
        }
        if (!EmptyValidation(last_name)) {
            Toast.show(Get_Message("Last Name"));
            return;
        }
        if (!EmptyValidation(company_name)) {
            Toast.show(Get_Message("Comapany Name"));
            return;
        }
        if (!EmptyValidation(KVKNum)) {
            Toast.show(Get_Message("KVK Number"));
            return;
        }
        if (!EmptyValidation(email)) {
            Toast.show(Get_Message("Email"));
            return;
        }
        if (!EmailValidation(email)) {
            Toast.show(Email_VALIDATION_MESSAGE);
            return;
        }
        if (!EmptyValidation(phone)) {
            Toast.show(Get_Message("Phone no."));
            return;
        }
        if (!EmptyValidation(email)) {
            Toast.show(Get_Message("Email"));
            return;
        }
        if (!EmptyValidation(city)) {
            Toast.show(Get_Message("City"));
            return;
        }
        if (!EmptyValidation(PostalCode)) {
            Toast.show(Get_Message("Postal code"));
            return;
        }
        else {



            let formdata = new FormData();
            formdata.append('first_name', first_name);
            formdata.append('last_name', last_name);
            formdata.append('email', email);
            formdata.append('company_name', company_name);
            formdata.append('kvk_number', KVKNum);
            formdata.append('telephone', phone);
            formdata.append('address', Address);
            formdata.append('postal_code', PostalCode);
            formdata.append('city', city);
            formdata.append('street_house_no', Street)
            formdata.append('prefixing_type', AANHEF);
            formdata.append('profile_pic', photoPath)


            if (ID == 1) {
                console.log('handle Add Employee', `${BASE_URL}${API_URL.AddEmployee}`);
                console.log('formdata of Add Employee Api ', formdata)

                dispatch({ type: SPINNER_ON })

                var response = await ApiCallPost(`${BASE_URL}${API_URL.AddEmployee}`, formdata);
                console.log('response of Add Employee Api', JSON.stringify(response))

                dispatch({ type: SPINNER_OFF })

                if (response != false)
                    if (response.status == 1) {

                        Toast.show(response.message)
                        // navigation.popToTop()
                        navigation.navigate('Employee', { reload: true });
                        // dispatch(getCustomerList())

                    }
                    else {
                        Toast.show(response.message)
                    }
            }
            else {
                console.log('handleEdit Employee')
                formdata.append('worker_id', Customer_id);
                console.log('formdata of Edit Employee', formdata)
                dispatch({ type: SPINNER_ON })

                var responseEdit = await ApiCallPost(`${BASE_URL}${API_URL.Edit_Employee}`, formdata);
                console.log('response of Edit Employee Api', JSON.stringify(responseEdit))
                dispatch({ type: SPINNER_OFF })
                if (responseEdit != false)
                    if (responseEdit.status == 1) {

                        Toast.show(responseEdit.message)
                        // navigation.popToTop()
                        navigation.navigate('Employee', { reload: true });
                        // dispatch(getCustomerList())

                    }
                    else {
                        Toast.show(responseEdit.message)
                    }
            }
        }
    }
    return (
        <AppComponent>
            <Toolbar title={title} right={1} back={true} navigation={navigation} onSavePress={() => handleSaveCustomer()} />
            <KeyboardAwareScrollView style={[Style.CommonStyles.fullFlex, { paddingHorizontal: '5%', paddingVertical: '5%' }]}>
                <Spinner visible={spinner} />
                <View style={[Style.Customers.AddCustomer.Customer_image_view_main]}>
                    <View style={[Style.Customers.AddCustomer.Customer_image_view, Style.CommonStyles.centerStyle]}>
                        <Image source={ImageUploaded ? { uri: ImageUri } : Images.appIcon} style={Style.Customers.AddCustomer.Customer_imageStyle} />
                        <TouchableOpacity style={[{ height: 40, width: 40, position: 'absolute', right: -10, bottom: -5, borderWidth: 0, backgroundColor: '#F2F2F2' }, Style.CommonStyles.centerStyle]}
                            onPress={() => goToImagePicker()}
                        >
                            <Image style={{ height: 40, width: 40, }} source={Images.add_pop_up} />
                        </TouchableOpacity>


                    </View>
                </View>
                <DropDown
                    options={AANHEFArray}
                    defaultValue={AANHEF == '' ? 'AANHEF' : AANHEF}
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
                    maxLength={8}
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
                    label='Address'
                    value={Address}
                    onChangeText={Address => setAddress(Address)} />
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

            </KeyboardAwareScrollView>
        </AppComponent>
    )



}
export default AddEmployee;