import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScrren from '../Screen/HomeScreen/HomeScrren';
import FavouriteScreen from '../Screen/FavouriteScreen/FavouriteScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
const Tab = createBottomTabNavigator();
export default class TabNavigation extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name='home'
        component={HomeScrren}/>
         <Tab.Screen name='favourite'
        component={FavouriteScreen}/>
         <Tab.Screen name='profile'
        component={ProfileScreen}/>
      </Tab.Navigator>
    )
  }
}
