import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Keyboard,TouchableWithoutFeedback } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import { SearchBar } from '../../components/SearchBar'
import Style from '../../utils/Style';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import Images from '../../utils/Image'
import { ModalView } from '../../components/Products'
import { getEmployeeList } from '../../actions/employessaction'
import { ApiCallPost } from '../../Services/ApiServices'
import { BASE_URL, API_URL } from '../../config'
import { get_Empty_Tag } from '../../helpers/InputValidations'
import Colors from '../../utils/Colors'

class Employee extends React.Component {
    state = {
        searchedValue: '', modalVisibilty: false,
        sortingOrder: 0,
        sortingArray: [{ name: 'Date', value: 0, key: 'created_at' }, { name: 'Company Name', value: 2, key: 'company_name' }],
        modalEditDelete: false,
        currentSelectedItem: '',
        employeeList: []
    }
    componentDidMount() {
        const { navigation } = this.props
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.setState({ searchedValue: '' })
            this.get_Employee_List();

        });
    }
    async get_Employee_List() {

        await this.props.get_employee_list();
        const { employeeReducer } = this.props
        console.log('employeeReducer', employeeReducer)
        this.setState({ employeeList: employeeReducer.employee_list_response.status == 1 ? employeeReducer.employee_list : [] })
    }
    componentWillUnmount() {
        const { navigation } = this.props

        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    renderOrderList = (item) => {
        console.log('items customer', item.item)
        const { prefixing_type, profile_pic, first_name, email, company_name, kvk_number, last_name } = item.item.get_workers
        return (
            <View style={Style.Orders.orderListItemView}>
                <View style={[{ flex: 0.2, borderWidth: 0 }, Style.CommonStyles.centerStyle]}>
                    <Image source={profile_pic != null ? { uri: `${profile_pic}` } : Images.customer_black} style={{ height: 50, width: 50, borderRadius: 0 }} />
                </View>
                <View style={{ flex: 0.6, paddingHorizontal: 10, marginVertical: 5 }}>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Name: <Text style={{ color: Colors.theme_color }}> {prefixing_type} {first_name} {last_name}</Text></Text>
                    {/* <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Company: <Text style={{ color: Colors.theme_color }}>{company_name}</Text></Text>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>KVK : <Text style={{ color: Colors.theme_color }}> {kvk_number}</Text></Text> */}
                    <Text style={{ marginVertical: 2, fontSize: 12, color: Colors.theme_color }}>{email}</Text>

                 <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}></Text>

                   {/* <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}>Email</Text>
                <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}>Address</Text> */}



                </View>
                <View style={[{ flex: 0.2, paddingVertical: 10, borderWidth: 0 }, Style.CommonStyles.centerStyle]}>
                    {/* <Text style={{ marginVertical: 5, fontSize: 14, color: '#000' }}>Phone</Text> */}
                    <TouchableOpacity style={[{ flex: 0.1, borderWidth: 0 }, Style.CommonStyles.centerStyle]}
                        onPress={() => this.openEditDelete(item.item.get_workers)}
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
    async getSortedArray(item) {
        this.setState({ sortingOrder: item.value })
        console.log('value', item.key);
        let formdata = new FormData();
        formdata.append('sort', item.key);
        console.log('formdata of sorting Customers', formdata);
        var response = await ApiCallPost(`${BASE_URL}${API_URL.SortEmployee}`, formdata);

        if (response != false) {
            if (response.status == 1) {
                console.log('Employee Successfully Sorted wrto ' + item.key + 'and data is \n' + JSON.stringify(response.data));
                this.setState({ employeeList: response.data, modalVisibilty: false });
            }
            else {

            }
        }
    }
    onEditPressed = () => {
        const { navigation } = this.props
        const { currentSelectedItem } = this.state
        navigation.navigate('AddEmployee', { id: 2, title: 'Edit Employee', data: currentSelectedItem })
        this.setState({ modalEditDelete: false })


    }
    async onDeletePressed() {
        const { currentSelectedItem } = this.state
        console.log('id to be deleted', currentSelectedItem.id)
        let formdata = new FormData();
        formdata.append('worker_id', currentSelectedItem.id);

        let response = await ApiCallPost(`${BASE_URL}${API_URL.Delete_Employee}`, formdata);
        console.log('Employee Deleted', response);
        if (response != false) {
            if (response.status == 1) {
                console.log('Person Deleted', response);
                this.setState({ modalEditDelete: false })
                this.get_Employee_List();
            }
        }

    }
    openEditDelete = (item) => {

        this.setState({ modalEditDelete: true, currentSelectedItem: item })
    }
    navigateToAddCustomer = () => {
        const { navigation } = this.props
        Keyboard.dismiss();
        navigation.navigate('AddEmployee', { id: 1, title: 'Add Employee', data: {} });
    }
    async searchEmployees() {
        const { searchedValue } = this.state
        let formdata = new FormData();
        Keyboard.dismiss();
        formdata.append('search', searchedValue);
        let result = await ApiCallPost(`${BASE_URL}${API_URL.EmployeeSearch}`, formdata);
        console.log('result ', JSON.stringify(result));
        if (result != false) {
            if (result.status == 1) {
                this.setState({ employeeList: result.data })
            }
            else this.setState({ employeeList: [] })

        }
    }
    render() {
        const { searchedValue, modalVisibilty, sortingArray, sortingOrder, modalEditDelete, currentSelectedItem, employeeList } = this.state
        const { navigation } = this.props

        return (
            <AppComponent>
                <Toolbar title='Employee' back={true} navigation={navigation} />
                <SearchBar
                    value={searchedValue}
                    onChangeText={searchedValue => this.setState({ searchedValue })}
                    onSubmitEditing={() => this.searchEmployees()}
                    onSearch={() => this.searchEmployees()}
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
                        employeeList.length != 0
                            ?
                            <FlatList
                                data={employeeList}
                                renderItem={item => this.renderOrderList(item)}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <TouchableWithoutFeedback style={[Style.CommonStyles.fullFlex, Style.CommonStyles.centerStyle,]}
                                onPress={() => Keyboard.dismiss()}>
                                <View style={[Style.CommonStyles.fullFlex, Style.CommonStyles.centerStyle,]}>
                                    <Text style={Style.CommonStyles.EmptyListTag}>{get_Empty_Tag('Employees')}</Text>
                                </View></TouchableWithoutFeedback>

                    }


                </View>
                <ModalView
                    isVisible={modalEditDelete}
                    onBackdropPress={() => this.setState({ modalEditDelete: false })}
                    onEditPressed={() => this.onEditPressed()}
                    onDeletePressed={() => this.onDeletePressed()}
                    modalTitle={`${currentSelectedItem.first_name} ${currentSelectedItem.last_name}`}
                    usertype={2}
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
        get_employee_list: () => dispatch(getEmployeeList())
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Employee);