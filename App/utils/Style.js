import Colors from "./Colors";
import { STATUSBAR_HEIGHT, DEVICE_WIDTH } from "../constants/AppConstants";

export default {
    CommonStyles: {
        fullFlex: { flex: 1 },
        centerStyle: { alignItems: 'center', justifyContent: 'center' },
        SafeAreaStyle: { height: STATUSBAR_HEIGHT, },
        borderStyle: { borderWidth: 1, borderColor: Colors.black, opacity: 0.1, },
        paddingBottomStyle: { height: 30 }

    },
    LoginStyles: {
        inputStyles: {
            height: 50, width: 150, color: Colors.black, fontSize: 15, marginVertical: 10,
        },
        ButtonStyle: {
            height: 50, width: '80%', backgroundColor: Colors.theme_color, marginHorizontal: '10%', marginTop: '8%', borderRadius: 25,
        },
        GradientImageStyle: { height: 100, width: 100, borderRadius: 50, backgroundColor: Colors.white, marginBottom: '15%' },
        AuthView: { flex: 0.90, borderWidth: 0, marginHorizontal: '10%', zIndex: 1, marginTop: '-15%', backgroundColor: Colors.white, borderRadius: 10, elevation: 3, paddingHorizontal: '7%' },
        AuthItemStyle: { width: '100%', height: 70, borderBottomColor: '#DEDEDE', borderWidth: 2, marginVertical: 5 },
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
            categoriesListView: { flex: 0.75, backgroundColor: Colors.white, paddingHorizontal: 5, borderColor: Colors.theme_color },
            AddPopUp: { position: 'absolute', height: 70, width: 70, right: '0%', bottom: '2%', borderWidth: 0 },
            addPopUpImage: { height: 65, width: 65, },
            categoryItemView: { height: 70, flexDirection: 'row', width: '100%', marginVertical: 5, borderBottomColor: '#000', borderBottomWidth: 1 }
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
            Customer_image_view: { height: DEVICE_WIDTH * 0.34, width: DEVICE_WIDTH * 0.34, borderRadius: DEVICE_WIDTH * 0.17, borderWidth: 1, }
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
        orderListItemView: { flex: 1, flexDirection: 'row', marginVertical: 5, borderBottomWidth: 1, borderBottomColor: Colors.black, paddingLeft: 10 }
    }
}