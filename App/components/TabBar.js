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
class TabBar extends React.Component {
    render() {
        const { routes, index } = this.props.state
        // console.log('this.props', this.props)
        // console.log('this.props.state', this.props.state.routes)


        return (

            <View style={{ flex: 0.1,  flexDirection: 'row',borderColor: '#DAE0E5',borderTopWidth:1 }}>
                {
                    routes.map((routes, i) =>
                        (

                            <TouchableOpacity style={[Style.CommonStyles.centerStyle, {
                                flex: 0.9,
                                borderColor: '#000', borderWidth: 0, backgroundColor: index == i ? Colors.theme_color : '#EFF1F3',
                            }]}
                                key={i}
                                onPress={() => {
                                    this.props.navigation.navigate(routes.name)

                                }}
                                disabled={index == i ? true : false}
                            >

                                <Image source={index == i ? TabBarImages[i].activeImage : TabBarImages[i].inactiveImage} style={{ height: 35, width: 35, }} />
                                <Text style={{ marginTop: -5, color: index == i ? '#fff' : '#000', fontSize: 10 ,marginTop:1}}>{routes.name}</Text>
                            </TouchableOpacity>

                        ))
                }

            </View>
        )
    }
}
export default TabBar;