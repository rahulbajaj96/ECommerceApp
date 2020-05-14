import React from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import AppComponent from '../../components/AppComponent'
import Toolbar from '../../components/Toolbar'
import { SearchBar } from '../../components/SearchBar'
import Style from '../../utils/Style';
import Modal from "react-native-modal";
import Images from '../../utils/Image'

class Order extends React.Component {
    constructor(props) {
        super(props);
        // this.nav = props.navigation()
    }
    state = {
        searchedValue: '', modalVisibilty: false,
        sortingOrder: 0,
        sortingArray: [{ name: 'Date', value: 0 }, { name: 'Price', value: 1 }, { name: 'Company Name', value: 2 }],
        modalEditDelete: false, modalTitle: ''
    }
    openEditDelete = (item) => {
        this.setState({ modalEditDelete: true, modalTitle: 'Order' })
    }
    renderOrderList = (item) => {
        return (
            <View style={Style.Orders.orderListItemView}>
                <TouchableOpacity style={{ flex: 0.8, paddingHorizontal: 10 }}
                    onPress={() => this.props.navigation.navigate('OrderDetail')}
                >
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Company Name</Text>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Company Name</Text>
                    <Text style={{ marginVertical: 2, fontSize: 14, color: '#000' }}>Date</Text>


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
        const { searchedValue, modalVisibilty, sortingArray, sortingOrder, modalEditDelete, modalTitle } = this.state
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
                        data={[1, 2, 3, 4, 5]}
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
export default Order;