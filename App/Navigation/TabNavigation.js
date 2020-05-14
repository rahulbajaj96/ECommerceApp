import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
import OrderSubCategories from "../containers/order/OrderSubCategories";
import OrderProducts from "../containers/order/OrderProducts";
import TabBar from '../components/TabBar';
import Customer from '../containers/customer/Customer';
import MoreOptions from '../containers/more/More';
import Bill_Checkout from '../containers/order/Bill_Checkout';
import OrderDetail from '../containers/order/OrderDetail';



const OrderStack = createStackNavigator();
const OrderStackNavigator = () => {
    return (
        <OrderStack.Navigator headerMode='none'>
            <OrderStack.Screen name={'Order'} component={Order} />
            <OrderStack.Screen name={'OrderCategories'} component={OrderCategories} />
            <OrderStack.Screen name={'OrderSubCategories'} component={OrderSubCategories} />
            <OrderStack.Screen name={'OrderProducts'} component={OrderProducts} />
            <OrderStack.Screen name={'OrderProductDetail'} component={OrderProductDetail} />
            <OrderStack.Screen name={'Cart'} component={Cart} />
            <OrderStack.Screen name={'Bill_Checkout'} component={Bill_Checkout} />
            <OrderStack.Screen name={'OrderDetail'} component={OrderDetail} />



        </OrderStack.Navigator>
        // <Stack.Screen name={'Cart'} component={Cart} /> 
    )
}

const CustomerStack = createStackNavigator();
const CustomerStackNavigator = () => {
    return (
        <CustomerStack.Navigator headerMode='none'>
            <CustomerStack.Screen name={'Customer'} component={Customer} />
            <CustomerStack.Screen name={'AddCustomer'} component={AddCustomer} />
        </CustomerStack.Navigator>
    )
}

const ProductStack = createStackNavigator();
const ProductStackNavigator = () => {
    return (
        <ProductStack.Navigator headerMode='none'>
            <ProductStack.Screen name={'Categories'} component={Categories} />
            <ProductStack.Screen name={'SubCategories'} component={SubCategories} />
            <ProductStack.Screen name={'Productss'} component={Products} />
            <ProductStack.Screen name={'ProductDetail'} component={ProductDetail} />
            <ProductStack.Screen name={'AddCategory'} component={AddCategory} />
            <ProductStack.Screen name={'AddProduct'} component={AddProduct} />
        </ProductStack.Navigator>
    )
}




const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />} >
            <Tab.Screen name={'Orders'} component={OrderStackNavigator} />
            <Tab.Screen name={'Customer'} component={CustomerStackNavigator} />
            <Tab.Screen name="Products" component={ProductStackNavigator} />
            <Tab.Screen name={'More'} component={MoreOptions} />
        </Tab.Navigator >
    )
}