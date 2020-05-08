import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Screen from "../containers/Screens";
import * as React from 'react';
import Login from "../containers/auth/Login";
import Categories from "../containers/products/Categories";
import SubCategories from "../containers/products/SubCategories";
import Products from "../containers/products/Products";
import ProductDetail from "../containers/products/ProductDetail";
import AddCategory from "../containers/products/AddCategory";
import AddProduct from "../containers/products/AddProducts";
import AddCustomer from "../containers/customer/AddCustomer";
import OrderCategories from "../containers/order/OrderCategories";
import OrderProductDetail from "../containers/order/OrderProductDetail";
import Order from "../containers/order/Order";
import Cart from "../containers/order/Cart";

const Stack = createStackNavigator();

function AppNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Cart' headerMode='none'>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Screen' component={Screen} />

                {/* Products Screen */}
                <Stack.Screen name={'Categories'} component={Categories} />
                <Stack.Screen name={'SubCategories'} component={SubCategories} />
                <Stack.Screen name={'Products'} component={Products} />
                <Stack.Screen name={'ProductDetail'} component={ProductDetail} />
                <Stack.Screen name={'AddCategory'} component={AddCategory} />
                <Stack.Screen name={'AddProduct'} component={AddProduct} />

                {/* Customer Screen*/}
                <Stack.Screen name={'AddCustomer'} component={AddCustomer} />

                {/* Order Screen */}
                <Stack.Screen name={'Order'} component={Order} />
                <Stack.Screen name={'OrderCategories'} component={OrderCategories} />
                <Stack.Screen name={'OrderProductDetail'} component={OrderProductDetail} />
                <Stack.Screen name={'Cart'} component={Cart} />







            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation;