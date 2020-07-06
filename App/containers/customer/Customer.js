import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Keyboard } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import { SearchBar } from '../../components/SearchBar'
import Style from '../../utils/Style';
import Modal from "react-native-modal";
import Images from '../../utils/Image'
import { ModalView } from '../../components/Products'
import { connect } from "react-redux";
import { getCustomerList } from '../../actions/customeractions'
import Colors from '../../utils/Colors'
import { ApiCallPost } from '../../Services/ApiServices'
import { BASE_URL, API_URL, PIC_URL } from '../../config'
import { get_Empty_Tag, getUserType } from '../../helpers/InputValidations'


class Customer extends React.Component {
    state = {
        searchedValue: '', modalVisibilty: false,
        sortingOrder: 0,
        sortingArray: [{ name: 'Date', value: 0, key: 'created_at' }, { name: 'Company Name', value: 2, key: 'company_name' }],
        modalEditDelete: false,
        currentSelectedItem: '',
        customerList: [],
        userType: ''
    }
    componentDidMount() {
        console.log('reload prop', this.props.reload)
        const { navigation } = this.props
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.setState({ searchedValue: '' })
            this.get_Customer_List();

            this.getType();
        });
    }
    async getType() {
        let userType = await getUserType();
        console.log('userType', userType);
        this.setState({ userType })
    }
    async get_Customer_List() {

        await this.props.get_customer_list();
        const { customerReducer } = this.props
        console.log('customer reducer', customerReducer)
        this.setState({ customerList: customerReducer.customer_list_response.status == 1 ? customerReducer.customer_list : [] })


    }

    renderOrderList = (item) => {
        const { prefixing_type, profile_pic, first_name, email, company_name, kvk_number, last_name } = item.item.get_customers
        // console.log('profile pic ', profile_pic);
        return (
            <View style={Style.Orders.orderListItemView}>
                <View style={[{ flex: 0.2, borderWidth: 0 }, Style.CommonStyles.centerStyle]}>
                    <Image source={profile_pic != null ? { uri: `${profile_pic}` } : Images.customer_black} style={{ height: 50, width: 50, borderRadius: 0 }} />
                </View>
                <View style={{ flex: 0.6, paddingHorizontal: 10, marginVertical: 5 }}>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Name: <Text style={{ color: Colors.theme_color }}> {prefixing_type} {first_name} {last_name}</Text></Text>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Company: <Text style={{ color: Colors.theme_color }}>{company_name}</Text></Text>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>KVK: <Text style={{ color: Colors.theme_color }}> {kvk_number}</Text></Text>
                    <Text style={{ marginVertical: 2, fontSize: 12, color: Colors.theme_color }}>{email}</Text>

                </View>
                <View style={[{ flex: 0.2, paddingVertical: 10, borderWidth: 0 }, Style.CommonStyles.centerStyle]}>
                    {/* <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}>Phone</Text> */}
                    <TouchableOpacity style={[{ flex: 0.1, borderWidth: 0 }, Style.CommonStyles.centerStyle]}
                        onPress={() => this.openEditDelete(item.item.get_customers)}
                    >
                        <Image source={Images.dots} style={{ height: 30, width: 30, }} />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    async getSortedArray(item) {
        this.setState({ sortingOrder: item.value })
        console.log('value', item.key);
        let formdata = new FormData();
        formdata.append('sort', item.key);
        console.log('formdata of sorting Customers', formdata);
        var response = await ApiCallPost(`${BASE_URL}${API_URL.Sort_Customer}`, formdata);

        if (response != false) {
            if (response.status == 1) {
                console.log('Customer Successfully Sorted wrto ' + item.key + 'and data is \n' + JSON.stringify(response.data));
                this.setState({ customerList: response.data, modalVisibilty: false });
            }
            else {

            }
        }



    }
    renderSorts = (item) => {
        const { sortingOrder, sortingArray } = this.state
        return (
            <TouchableOpacity style={[{ borderBottomWidth: item.index == (sortingArray.length - 1) ? 0 : 0.5, }, Style.Orders.SortingModal.sortsItems]} onPress={() => this.getSortedArray(item.item)}>
                <Text style={Style.Orders.SortingModal.sortItemTextColor}>{item.item.name}</Text>
                {
                    item.item.value == sortingOrder
                        ?
                        <View style={Style.Orders.SortingModal.radioButton} />
                        : null
                }

            </TouchableOpacity>
        )

    }
    onEditPressed = () => {
        const { navigation } = this.props
        const { currentSelectedItem } = this.state

        navigation.navigate('AddCustomer', { id: 2, title: 'Edit Customer', data: currentSelectedItem })
        this.setState({ modalEditDelete: false })


    }
    componentWillUnmount() {
        const { navigation } = this.props

        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    showAlert() {
        Alert.alert(
            '',
            'Are you sure you want to delete this Order?',
            [
                {
                    text: 'Yes', onPress: () => {
                        this.onDeletePressed()
                    }, style: 'cancel'
                },
                {
                    text: 'No', onPress: () =>
                        this.setState({ modalEditDelete: false })
                },
            ],
            { cancelable: false }
        )
    }
    async onDeletePressed() {
        const { currentSelectedItem } = this.state
        console.log('id to be deleted', currentSelectedItem.id)
        let formdata = new FormData();
        formdata.append('customer_id', currentSelectedItem.id);

        let response = await ApiCallPost(`${BASE_URL}${API_URL.Delete_Customer}`, formdata);
        console.log('Person Deleted', response);
        if (response != false) {
            if (response.status == 1) {
                console.log('Person Deleted', response);
                this.setState({ modalEditDelete: false })
                this.get_Customer_List();
            }
        }

    }
    openEditDelete = (item) => {
        console.log('item >>>', item)
        this.setState({ modalEditDelete: true, currentSelectedItem: item })
    }
    navigateToAddCustomer = () => {
        const { navigation } = this.props
        navigation.navigate('AddCustomer', { id: 1, title: 'Add Customer', data: {} });
    }
    async searchCustomers() {
        const { searchedValue } = this.state
        Keyboard.dismiss();
        let formdata = new FormData();
        formdata.append('search', searchedValue);
        let result = await ApiCallPost(`${BASE_URL}${API_URL.SearchCustomers}`, formdata);
        console.log('result ', JSON.stringify(result));
        if (result != false) {
            if (result.status == 1) {
                this.setState({ customerList: result.data })
            }
            else this.setState({ customerList: [] })
        }
    }
    render() {
        const { searchedValue, modalVisibilty, sortingArray, sortingOrder, modalEditDelete, currentSelectedItem, customerList, userType } = this.state
        return (
            <AppComponent>
                <Toolbar title='Customers' />
                <SearchBar
                    value={searchedValue}
                    // editable={customerList.length != 0 ? true : false}
                    onChangeText={searchedValue => this.setState({ searchedValue })}
                    onSubmitEditing={() => this.searchCustomers()}
                    onSearch={() => this.searchCustomers()}
                />
                <Modal isVisible={modalVisibilty}
                    onBackdropPress={() => this.setState({ modalVisibilty: false })}
                >
                    <View style={Style.Orders.SortingModal.Sortingview}>
                        <View style={[Style.Orders.SortingModal.SortByView, Style.CommonStyles.centerStyle]}>

                            <Text style={Style.Orders.SortingModal.SortByText}>Sort by :</Text>

                        </View>

                        <FlatList
                            data={sortingArray}
                            extraData={this.state}
                            scrollEnabled={false}
                            renderItem={item => this.renderSorts(item)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </Modal>

                <View style={{ flexDirection: 'row', flex: 0.1, alignItems: 'center', justifyContent: 'flex-end', paddingHorizontal: '2%' }}>
                    <TouchableOpacity style={[Style.CommonStyles.centerStyle, { height: 50, width: 50, marginHorizontal: 5 }]} onPress={() => this.setState({ modalVisibilty: true })}>
                        <Image style={{ height: 45, width: 45 }} source={Images.sort} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[Style.CommonStyles.centerStyle, { height: 55, width: 55, }]}
                        onPress={() => this.navigateToAddCustomer()}>
                        <Image style={{ height: 55, width: 55 }} source={Images.add_pop_up} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.8, }}>
                    {
                        customerList.length != 0 ?
                            <FlatList
                                data={customerList}
                                renderItem={item => this.renderOrderList(item)}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />

                            :
                            <View style={[Style.CommonStyles.fullFlex, Style.CommonStyles.centerStyle,]}>
                                <Text style={Style.CommonStyles.EmptyListTag}>{get_Empty_Tag('Customers')}</Text>
                            </View>
                    }

                </View>
                <ModalView
                    isVisible={modalEditDelete}
                    onBackdropPress={() => this.setState({ modalEditDelete: false })}
                    onEditPressed={() => this.onEditPressed()}
                    onDeletePressed={() => this.onDeletePressed()}
                    modalTitle={`${currentSelectedItem.first_name} ${currentSelectedItem.last_name}`}
                    usertype={userType}
                    content={null}
                />

            </AppComponent>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('Customer', state)
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        get_customer_list: () => dispatch(getCustomerList())
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Customer);