import React from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  MainStackNavigator,
  RateStackNavigator,
  SupportStackNavigator,
} from './StackNavigator';

import home from '../assets/home.png';
import price from '../assets/price.png';
import support from '../assets/support.png';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: moderateScale(10),
          borderTopRightRadius: moderateScale(10),
          height: verticalScale(87),
          backgroundColor: '#8D3DAF',
        },

        tabBarLabelStyle: {
          fontSize: moderateScale(13),
          marginBottom: verticalScale(10),
          fontFamily: 'Ubuntu-Regular',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                marginTop: verticalScale(10),
              }}>
              <Image
                source={home}
                style={{
                  height: verticalScale(30),
                  width: scale(30),
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
          tabBarActiveTintColor: '#f5f542',
          tabBarInactiveTintColor: '#FFF',
        }}
      />
      <Tab.Screen
        name="Rate List"
        component={RateStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                marginTop: verticalScale(10),
              }}>
              <Image
                source={price}
                style={{
                  height: verticalScale(25),
                  width: scale(25),
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
          tabBarActiveTintColor: '#f5f542',
          tabBarInactiveTintColor: '#FFF',
        }}
      />
      <Tab.Screen
        name="Support"
        component={SupportStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                marginTop: verticalScale(10),
              }}>
              <Image
                source={support}
                style={{
                  height: verticalScale(35),
                  width: scale(35),
                  resizeMode: 'contain',
                }}
              />
            </View>
          ),
          tabBarActiveTintColor: '#f5f542',
          tabBarInactiveTintColor: '#FFF',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
