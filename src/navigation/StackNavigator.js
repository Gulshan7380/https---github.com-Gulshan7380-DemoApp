import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AddNewProduct from '../screens/AddNewProduct';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          statusBarStyle: 'dark',
          headerShown: false,
          animation: 'slide_from_right',
          statusBarColor:'#5AB1F6'
        }}
        initialRouteName="LoginScreen">
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
        <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
        <Stack.Screen name={'AddNewProduct'} component={AddNewProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
