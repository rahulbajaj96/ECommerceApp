import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Style from '../utils/Style';
import Colors from '../utils/Colors';
import Images from '../utils/Image';
const TabBarImages = [
    {
        activeImage: Images.order_white,
        inactiveImage: Images.order_black
    },
    {
        activeImage: Images.customer_white,
        inactiveImage: Images.customer_black
    },
    {
        activeImage: Images.products_white,
        inactiveImage: Images.products_black
    },
    {
        activeImage: Images.more_white,
        inactiveImage: Images.more_black
    }
]
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

class TabBar extends React.Component {
    goToroutes(route, index) {
        if (index == 0) {
            this.props.navigation.navigate('Orders',{screen: 'Order'})
        }
        if (index == 1) {
            this.props.navigation.navigate('Customer',{screen: 'Customer'})
        }
        if (index == 2) {
            this.props.navigation.navigate('Products',{screen: 'Categories'})
        }
        if (index == 3) {
            this.props.navigation.navigate('More',)
        }


    }
    render() {
        const { routes, index } = this.props.state
        // console.log('this.props', this.props)
        // console.log('this.props.state', this.props.state.routes)


        return (

            <View style={{ flex: 0.1, flexDirection: 'row', borderColor: '#DAE0E5', borderTopWidth: 1, }}>
                {
                    routes.map((routes, i) =>
                        (

                            <TouchableOpacity style={[Style.CommonStyles.centerStyle, {
                                flex: 0.9,
                                borderColor: '#000', borderWidth: 0, backgroundColor: index == i ? Colors.theme_color : '#EFF1F3',
                            }]}
                                key={i}
                                onPress={() => this.goToroutes(routes, i)}
                                disabled={index == i ? true : false}
                            >

                                <Image source={index == i ? TabBarImages[i].activeImage : TabBarImages[i].inactiveImage} style={{ height: 35, width: 35, }} />
                                <Text style={{ marginTop: -5, color: index == i ? '#fff' : '#000', fontSize: 12, marginTop: 1 }}>{routes.name}</Text>
                            </TouchableOpacity>

                        ))
                }

            </View>
        )
    }
}
export default TabBar;