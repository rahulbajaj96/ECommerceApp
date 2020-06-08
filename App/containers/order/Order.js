import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import { SearchBar } from '../../components/SearchBar'
import Style from '../../utils/Style';
import { connect } from "react-redux";
import Modal from "react-native-modal";
import Images from '../../utils/Image'
import { getOrderList } from '../../actions/orderaction'

class Order extends React.Component {
    constructor(props) {
        super(props);
        // this.nav = props.navigation()
    }
    state = {
        searchedValue: '',
        orders_array: [],
        modalVisibilty: false,
        sortingOrder: 0,
        sortingArray: [{ name: 'Date', value: 0 }, { name: 'Price', value: 1 }, { name: 'Company Name', value: 2 }],
        modalEditDelete: false, modalTitle: ''
    }
    componentDidMount() {
        const { navigation } = this.props
        navigation.addListener('focus', () => {
            // The screen is focused
            console.log('when screen is focused');
            // Call any action
            this.getorders();

        });
    }
    componentWillUnmount() {
        const { navigation } = this.props

        console.log('componenet gone ')
        navigation.removeListener('focus');
    }
    async getorders() {
        await this.props.get_Order_List();
        const { orderReducer } = this.props
        console.log('OrderReducers', orderReducer.order_list_response)
        if (orderReducer.order_list_response.status == 1) {
            this.setState({ orders_array: orderReducer.order_list })
        }

    }
    openEditDelete = (item) => {
        this.setState({ modalEditDelete: true, modalTitle: 'Order' })
    }
    renderOrderList = (item) => {
        const { get_customers, id, created_at, get_workers } = item.item
        return (
            <View style={Style.Orders.orderListItemView}>
                <TouchableOpacity style={{ flex: 0.8, paddingHorizontal: 10 }}
                    onPress={() => this.props.navigation.navigate('OrderDetail', { order_id: id })}
                >
                    <Text style={[Style.Orders.orderCompanyName, { fontWeight: 'bold' }]}>{get_customers.first_name}{get_customers.last_name}</Text>
                    <Text style={Style.Orders.orderCompanyName}>{get_customers.company_name}</Text>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>{created_at}</Text>
                    <Text style={[Style.Orders.orderCompanyName,{marginVertical:5}]}>Order made by :{get_workers.first_name}{get_workers.last_name}</Text>

                </TouchableOpacity>

                <View style={[{ flex: 0.2, paddingVertical: 10, borderWidth: 0 }, Style.CommonStyles.centerStyle]}>

                    <TouchableOpacity style={[{ flex: 0.1, borderWidth: 0 }, Style.CommonStyles.centerStyle]}
                        onPress={() => this.openEditDelete(item)}
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
    onDeletePressed = () => {

    }
    navigateToNewOrder = () => {
        const { navigation } = this.props
        navigation.navigate('OrderCategories')
    }
    render() {
        const { searchedValue, modalVisibilty, sortingArray, sortingOrder, modalEditDelete, modalTitle, orders_array } = this.state
        return (
            <AppComponent>
                <Toolbar title='Orders' />
                <SearchBar
                    value={searchedValue}
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
                        onPress={() => this.navigateToNewOrder()}
                    >
                        <Image style={{ height: 55, width: 55 }} source={Images.add_pop_up} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 0.8, }}>
                    <FlatList
                        data={orders_array}
                        renderItem={item => this.renderOrderList(item)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>
                <Modal isVisible={modalEditDelete}
                    onBackdropPress={() => this.setState({ modalEditDelete: false })}
                >
                    <View style={{ flex: 0.3, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 10 }}>
                        <View style={{ flex: 0.1 }} />
                        <Text style={Style.Products.categories.categoriesModal.modalHeading}>{modalTitle}</Text>

                        <TouchableOpacity style={[Style.Products.categories.categoriesModal.modalItemView, { borderWidth: 0 }]}
                            onPress={() => this.onDeletePressed()}
                        >
                            <Text style={{ fontSize: 18, color: '#000', marginRight: 5 }}>Delete</Text>
                            <Image source={Images.trash} style={{ height: 25, width: 25 }} />

                        </TouchableOpacity>

                    </View>
                </Modal>

            </AppComponent>
        )
    }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        get_Order_List: () => dispatch(getOrderList())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order);