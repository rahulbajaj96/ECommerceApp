import * as React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import Login from "../containers/auth/Login";

import { TabNavigator } from './TabNavigation';
import AddEmployee from '../containers/employees/AddEmployee';
import Employee from '../containers/employees/Employee';
import store from '../store/Store';
import StoreOptions from '../containers/store/StoreOptions';



const Stack = createStackNavigator();

function AppNavigation() {

    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' headerMode='none'>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Tabs' component={TabNavigator} />
                <Stack.Screen name='AddEmployee' component={AddEmployee} />
                <Stack.Screen name='Employee' component={Employee} />
                <Stack.Screen name='StoreOptions' component={StoreOptions} />



                {/* <TabNavigator /> */}


            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}
export default AppNavigation;