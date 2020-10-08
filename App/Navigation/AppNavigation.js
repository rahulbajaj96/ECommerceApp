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
import PrivacyPolicy from '../containers/more/PrivacyPolicy';
import AboutUs from '../containers/more/AboutUs';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

function AppNavigation() {

    return (
        <Provider store={store}>
             <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Login' headerMode='none'>
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Tabs' component={TabNavigator} />
                    <Stack.Screen name='AddEmployee' component={AddEmployee} />
                    <Stack.Screen name='Employee' component={Employee} />
                    <Stack.Screen name='StoreOptions' component={StoreOptions} />
                    <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
                    <Stack.Screen name='AboutUs' component={AboutUs} />


                    {/* <TabNavigator /> */}


                </Stack.Navigator>
            </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    )
}
export default AppNavigation;