import * as React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Screen from "../containers/Screens";
import Login from "../containers/auth/Login";

import { TabNavigator } from './TabNavigation';
import AddEmployee from '../containers/employees/AddEmployee';
import Employee from '../containers/employees/Employee';



const Stack = createStackNavigator();

function AppNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='OrderProductDetail' headerMode='none'>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Tabs' component={TabNavigator} />
                <Stack.Screen name='AddEmployee' component={AddEmployee} />
                <Stack.Screen name='Employee' component={Employee} />



                {/* <TabNavigator /> */}


            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation;