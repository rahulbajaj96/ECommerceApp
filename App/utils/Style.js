import Colors from "./Colors";
import { STATUSBAR_HEIGHT, DEVICE_WIDTH, DEVICE_HEIGHT } from "../constants/AppConstants";

export default {
    CommonStyles: {
        fullFlex: { flex: 1 },
        centerStyle: { alignItems: 'center', justifyContent: 'center' },
        SafeAreaStyle: { height: STATUSBAR_HEIGHT, backgroundColor: Colors.theme_color },
        borderStyle: { borderWidth: 1, borderColor: Colors.black, opacity: 0.1, },
        paddingBottomStyle: { height: 30 },
        EmptyListTag: { color: Colors.theme_color, fontSize: 22,marginHorizontal:'15%',textAlign:'center' }

    },
    LoginStyles: {
        inputStyles: {
            height: 50, width: 150, color: Colors.black, fontSize: 15, marginVertical: 10,
        },
        ButtonStyle: {
            height: 50, width: '80%', backgroundColor: Colors.theme_color, marginHorizontal: '10%', marginTop: '8%', borderRadius: 25,
        },
        GradientImageStyle: { height: 100, width: 100, borderRadius: 50, backgroundColor: Colors.white, marginBottom: '15%' },
        AuthView: {
            //  width: '80%',height:DEVICE_HEIGHT*0.52, borderWidth: 0, marginHorizontal: '10%', zIndex: 1, marginTop: '-15%', backgroundColor: Colors.white, borderRadius: 10, elevation: 3, paddingHorizontal: '7%',position: 'absolute',
            flex: 0.90, borderWidth: 0, marginHorizontal: '10%', zIndex: 1, marginTop: '-15%', backgroundColor: Colors.white, borderRadius: 10, elevation: 3, paddingHorizontal: '7%',
        },
        ForgotPassView: {
            width: '80%', height: DEVICE_HEIGHT * 0.4, borderWidth: 0, marginHorizontal: '10%', zIndex: 1, marginTop: '-15%', backgroundColor: Colors.white, borderRadius: 10, elevation: 3, paddingHorizontal: '7%', position: 'absolute',
        },
        forgotInst: { fontSize: 9, color: Colors.grey, marginTop: 5 },
        AuthItemStyle: { width: '100%', height: 70, borderBottomColor: '#DEDEDE', borderWidth: 2, marginVertical: 5, },
        AuthItemLabel: { color: Colors.theme_color, marginVertical: 10, fontSize: 12, fontWeight: 'bold' },
        AuthItemTextInput: { borderColor: Colors.black, borderWidth: 0, fontSize: 14, marginLeft: -2, marginTop: -8, paddingBottom: 4, paddingLeft: 2 },
        ForgotPasswordText: { color: Colors.grey, fontSize: 12, position: 'absolute', right: '5%', bottom: '5%' }

    },
    Toolbar: {
        toolbarView: { height: 50, width: '100%', backgroundColor: Colors.theme_color, justifyContent: 'center', flexDirection: 'row' },
        SaveButtonText: { color: Colors.white, fontSize: 12 }
    },
    Products: {
        categories: {
            searchBarView: { flex: 0.15, paddingHorizontal: '5%', justifyContent: 'center' },
            searchBarItemView: { height: 50, width: '100%', borderWidth: 1, paddingHorizontal: 10, borderColor: Colors.theme_color },
            searchBarInput: { fontSize: 14, color: Colors.black, },
            searchImage: { width: 17, height: 17 },
            categoriesListView: { flex: 0.85, backgroundColor: Colors.white, paddingHorizontal: 5, borderColor: Colors.theme_color },
            AddPopUp: { position: 'absolute', height: 70, width: 70, right: '0%', bottom: '2%', borderWidth: 0 },
            addPopUpImage: { height: 65, width: 65, },
            categoryItemView: { height: 70, flexDirection: 'row', width: '100%', marginVertical: 5, borderBottomColor: '#000', borderBottomWidth: 1 },
            categoriesModal: {
                modalHeading: { marginVertical: 10, textAlign: 'center', color: Colors.theme_color, fontSize: 20, },
                modalItemView: { flex: 0.30, marginVertical: 10, borderBottomWidth: 0.5, borderBottomColor: Colors.grey, flexDirection: 'row', alignItems: 'center', marginHorizontal: '5%' },

            }
        },
        ProductDetail: {
            articleNum: { fontSize: 20, color: '#000', marginVertical: 5, fontWeight: 'bold', },
            PropertiesStyle: { color: '#000', fontSize: 12, marginVertical: 10 },
            colorsTrayStyle: { flexDirection: 'row', width: '100%', height: 60 },
            sliderStyles: { height: DEVICE_WIDTH * 0.6, width: DEVICE_WIDTH, }
        },
        AddCategory: {
            addCategoryImageStyle: { height: DEVICE_WIDTH * 0.5, width: DEVICE_WIDTH * 0.5, borderWidth: 1, borderColor: Colors.theme_color, marginVertical: 20 },
            CategoryImageText: { color: Colors.theme_color, fontSize: 16, }
        },
        AddProduct: {
            InputLabelStyle: { color: Colors.theme_color, fontSize: 14, fontWeight: 'bold' },
            inputStyle: { fontSize: 14, },
            itemStyle: { marginVertical: 5 },
            DropDown: {
                dropdownViewStyle: { flexDirection: 'row', width: '100%', height: 50, borderBottomWidth: 0.8, borderBottomColor: '#c6c6ca', marginVertical: 5 },
                dropDownStyle: { borderWidth: 0, width: '95%', height: '100%', justifyContent: 'center', },
                default_Value_text: { color: Colors.theme_color, paddingHorizontal: 5, fontSize: 14, },
                dropdownItemStyle: { width: '80%' },
                dropdown_TextStyle: { color: '#000', fontSize: 16 },
            },
            ImagePickerView: { height: 100, width: '100%', borderWidth: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', },
            CameraImage: { height: 60, width: 60 },
            GalleryImage: { height: 60, width: 60, marginHorizontal: 15 },
            ImageNumber: { borderWidth: 1, flexDirection: 'row', paddingLeft: 5, marginLeft: 10 },
            ImageModal: {
                crossSignTouch: { height: 40, width: 40 },
                crossSign: { height: 30, width: 30 },
                image_num: { color: Colors.theme_color, fontSize: 14, marginLeft: 15, marginBottom: 5 },
                defaultText: { color: Colors.theme_color, fontSize: 20, fontWeight: 'bold', }
            }
        }
    },
    Customers: {
        AddCustomer: {
            Customer_image_view_main: { height: DEVICE_WIDTH * 0.4, width: DEVICE_WIDTH * 0.9, justifyContent: 'center', alignItems: 'center', borderWidth: 0 },
            Customer_image_view: { height: DEVICE_WIDTH * 0.34, width: DEVICE_WIDTH * 0.34, borderRadius: DEVICE_WIDTH * 0.17, borderWidth: 1, },
            Customer_imageStyle: { height: '100%', width: '100%', borderRadius: DEVICE_WIDTH * 0.17, }
        },

    },
    Orders: {
        SortingModal: {
            Sortingview: { flex: 0.5, backgroundColor: Colors.white, },
            SortByView: { paddingVertical: 15, backgroundColor: Colors.theme_color, },
            SortByText: { fontSize: 20, color: Colors.white },
            sortsItems: { flex: 1, flexDirection: 'row', paddingVertical: '5%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '3%', borderBottomColor: Colors.black },
            sortItemTextColor: { color: Colors.black, fontSize: 14, },
            radioButton: { borderWidth: 1, borderColor: '#000', height: 20, width: 20, borderRadius: 10, backgroundColor: Colors.theme_color }
        },
        viewBill: { fontSize: 14, color: Colors.theme_color, },
        orderListItemView: { flex: 1, flexDirection: 'row', marginVertical: 5, borderBottomWidth: 1, borderBottomColor: Colors.black, paddingLeft: 10 }
    },
    Cart: {
        checkoutButton: { width: '60%', height: '10%', marginHorizontal: '20%', backgroundColor: Colors.theme_color, borderRadius: 20, marginVertical: '10%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: '2%' },
        checkoutText: { color: Colors.white, fontSize: 16, marginLeft: 10 },
        checkoutImage: { height: 30, width: 30 },
        ProductName: { fontSize: 16, color: Colors.theme_color, marginVertical: 2, fontWeight: 'bold' },
        ProductDetail: { fontSize: 12, color: '#000', },
        articlenumber: { fontSize: 16, color: '#000', marginVertical: 2 },
        price: { fontSize: 14, color: 'red', marginVertical: 2 }
    },
    More: {
        logoutButton: { height: 50, width: '60%', backgroundColor: Colors.theme_color, flexDirection: 'row', marginVertical: 2, marginHorizontal: '20%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderRadius: 25, marginTop: '40%' },
        logoutText: { color: Colors.white, fontSize: 16, marginLeft: 10 },
        logoutImage: { height: 20, width: 20 },
        moreItemView: { height: 50, width: '100%', flexDirection: 'row', marginVertical: 2, borderBottomColor: Colors.black, borderBottomWidth: 0.2 },
        label_View: { flex: 0.7, flexDirection: 'row', alignItems: 'center', paddingLeft: '5%' },
        label_text: { marginLeft: 10, color: '#000', fontSize: 16, }

    }
}