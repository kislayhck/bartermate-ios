import React from 'react';
import { Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import logo from '../assets/logo2.png';

import profileIcon from '../assets/profileIcon.png';

const Stack = createNativeStackNavigator();

import CategoryScreen from '../screens/Category';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import EditEmailScreen from '../screens/EditEmail';
import PickupScreen from '../screens/Pickup';
import GuestPickupScreen from '../screens/GuestPickup';
import ForgotPassScreen from '../screens/ForgotPass';
import ResetPassScreen from '../screens/ResetPass';
import ProfileScreen from '../screens/Profile';
import PriceScreen from '../screens/Price';
import PickupHistoryScreen from '../screens/PickupHistory';
import AddressScreen from '../screens/Address';
import EditNameScreen from '../screens/EditName';
import MyProfileScreen from '../screens/MyProfile';
import OrderDetailsScreen from '../screens/OrderDetails';
import EditPhoneScreen from '../screens/EditPhone';
import RedeemScreen from '../screens/redeem';
import SupportScreen from '../screens/Support';

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Category Screen"
        component={CategoryScreen}
        options={{
          title: '',
          header: () => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#FFF',
                  }}>
                  <Image
                    source={logo}
                    style={{
                      height: verticalScale(75),
                      width: scale(80),
                      //marginLeft: scale(10),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: moderateScale(25),
                      marginTop: verticalScale(19),
                      marginLeft: scale(20),
                      fontWeight: '700',
                    }}>
                    BarterMate
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Profile Screen');
                    }}>
                    <Image
                      source={profileIcon}
                      style={{
                        height: verticalScale(35),
                        width: scale(35),
                        marginTop: verticalScale(17),
                        marginLeft: scale(40),
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            );
          },
        }}
      />
      <Stack.Screen
        name="Reset Screen"
        component={ResetPassScreen}
        options={{
          title: 'Change Password',
        }}
      />
      <Stack.Screen
        name="Edit Name Screen"
        component={EditNameScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Edit Email Screen"
        component={EditEmailScreen}
        options={{
          title: 'Change Password',
        }}
      />
      <Stack.Screen
        name="Price Screen"
        component={PriceScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Forgot Screen"
        component={ForgotPassScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Order Details Screen"
        component={OrderDetailsScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Edit Phone Screen"
        component={EditPhoneScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Login Screen"
        component={LoginScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Register Screen"
        component={RegisterScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Redeem Screen"
        component={RedeemScreen}
        options={{
          title: '',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Pickup Screen"
        component={PickupScreen}
        options={{
          title: 'Provide Pickup Location',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Profile Screen"
        component={ProfileScreen}
        options={{
          title: '',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Guest Pickup Screen"
        component={GuestPickupScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Pickup History Screen"
        component={PickupHistoryScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="Address Screen"
        component={AddressScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="My Profile Screen"
        component={MyProfileScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

const RateStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Price Screen"
        component={PriceScreen}
        options={{
          header: () => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    backgroundColor: '#FFF',
                    marginTop: verticalScale(20),
                  }}>
                  <Image
                    source={logo}
                    style={{
                      height: verticalScale(75),
                      width: scale(80),
                      //marginLeft: scale(10),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: moderateScale(25),
                      marginTop: verticalScale(24),
                      marginLeft: scale(20),
                      color: '#5A2D94',
                      fontFamily: 'Ubuntu-Bold',
                    }}>
                    BarterMate
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Profile Screen');
                    }}>
                    <Image
                      source={profileIcon}
                      style={{
                        height: verticalScale(55),
                        width: scale(55),
                        resizeMode: 'contain',
                        marginTop: verticalScale(10),
                        marginLeft: scale(25),
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

const SupportStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Support Screen"
        component={SupportScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, RateStackNavigator, SupportStackNavigator };
