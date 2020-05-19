import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
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
import { BASE_URL, API_URL } from '../../config'


class Customer extends React.Component {
    state = {
        searchedValue: '', modalVisibilty: false,
        sortingOrder: 0,
        sortingArray: [{ name: 'Date', value: 0 }, { name: 'Price', value: 1 }, { name: 'Company Name', value: 2 }],
        modalEditDelete: false,
        currentSelectedItem: '',
        customerList: []
    }
    componentDidMount() {
        console.log('reload prop', this.props.reload)
        const { navigation } = this.props
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.get_Customer_List();

        });
        // this.get_Customer_List();

    }
    async get_Customer_List() {

        await this.props.get_customer_list();
        const { customerReducer } = this.props
        console.log('customer reducer', customerReducer)
        this.setState({ customerList: customerReducer.customer_list_response.status == 1 ? customerReducer.customer_list : [] })


    }

    renderOrderList = (item) => {
        const { prefixing_type, profile_pic, first_name, email, company_name, kvk_number, last_name } = item.item.customer_id
        return (
            <View style={Style.Orders.orderListItemView}>
                <View style={[{ flex: 0.2, borderWidth: 0 }, Style.CommonStyles.centerStyle]}>
                    <Image source={profile_pic != null ? { uri: profile_pic } : Images.customer_black} style={{ height: 50, width: 50, borderRadius: 0 }} resizeMode='contain' />
                </View>
                <View style={{ flex: 0.6, paddingHorizontal: 10, marginVertical: 5 }}>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Name: <Text style={{ color: Colors.theme_color }}> {prefixing_type} {first_name} {last_name}</Text></Text>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Company: <Text style={{ color: Colors.theme_color }}>{company_name}</Text></Text>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>KVK : <Text style={{ color: Colors.theme_color }}> {kvk_number}</Text></Text>
                    <Text style={{ marginVertical: 2, fontSize: 12, color: Colors.theme_color }}>{email}</Text>

                    {/* <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}>Company Name</Text>

                    <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}>Email</Text>
                    <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}>Address</Text> */}



                </View>
                <View style={[{ flex: 0.2, paddingVertical: 10, borderWidth: 0 }, Style.CommonStyles.centerStyle]}>
                    {/* <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}>Phone</Text> */}
                    <TouchableOpacity style={[{ flex: 0.1, borderWidth: 0 }, Style.CommonStyles.centerStyle]}
                        onPress={() => this.openEditDelete(item.item.customer_id)}
                    >
                        <Image source={Images.dots} style={{ height: 30, width: 30, }} />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
    renderSorts = (item) => {
        const { sortingOrder, sortingArray } = this.state
        return (
            <TouchableOpacity style={[{ borderBottomWidth: item.index == (sortingArray.length - 1) ? 0 : 0.5, }, Style.Orders.SortingModal.sortsItems]} onPress={() => this.setState({ sortingOrder: item.item.value })}>
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
        this.setState({ modalEditDelete: true, currentSelectedItem: item })
    }
    navigateToAddCustomer = () => {
        const { navigation } = this.props
        navigation.navigate('AddCustomer', { id: 1, title: 'Add Customer', data: {} });
    }
    render() {
        const { searchedValue, modalVisibilty, sortingArray, sortingOrder, modalEditDelete, currentSelectedItem, customerList } = this.state
        return (
            <AppComponent>
                <Toolbar title='Customers' />
                <SearchBar
                    value={searchedValue}
                    editable={customerList.length != 0 ? true : false}
                    onChangeText={searchedValue => this.setState({ searchedValue })}
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
                            null
                    }

                </View>
                <ModalView
                    isVisible={modalEditDelete}
                    onBackdropPress={() => this.setState({ modalEditDelete: false })}
                    onEditPressed={() => this.onEditPressed()}
                    onDeletePressed={() => this.onDeletePressed()}
                    modalTitle={`${currentSelectedItem.first_name} ${currentSelectedItem.last_name}`}

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