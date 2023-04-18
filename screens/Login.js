import React, { useState } from 'react';
import axios from 'axios';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LinearGradient from 'react-native-linear-gradient';

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  var name = '';
  var address = '';
  var phone = '';
  var landmark = '';
  var pincode = '';
  var email2 = '';

  //var location = route.params.location;
  var profile = route.params.profile;
  var userId = route.params.userId;

  const itemSelected = route.params.itemSelected;
  const subCategory = route.params.subCategory;

  //const [email2, setemail2] = useState('');

  const [isLoading, setLoading] = useState(false);

  const setMyUser = async () => {
    const setUser = async () => {
      await AsyncStorage.setItem('loginStatus', 'true');
      await AsyncStorage.setItem('User', `${name}`);
      await AsyncStorage.setItem('email', `${email2}`);
      await AsyncStorage.setItem('address', `${address}`);
      await AsyncStorage.setItem('phone', `${phone}`);
      await AsyncStorage.setItem('landmark', `${landmark}`);
      await AsyncStorage.setItem('pincode', `${pincode}`);
      await AsyncStorage.setItem('userId', `${userId}`);

      console.log(userId);
    };

    await setUser();
    console.log(name);
    console.log(email2);
    console.log(phone);
  };

  const phoneCheck = phone => {
    var num = parseInt(phone, 10);
    var tempNum = num.toString(10);
    if (phone.length == 10 && phone.length === tempNum.length) {
      return true;
    } else {
      return false;
    }
  };

  const getCredentials = () => {
    if (email && password) {
      setLoading(true);

      var type = 'email';
      if (phoneCheck(email) == true) {
        type = 'number';
      }
      var data = JSON.stringify({
        email: `${email.toLowerCase()}`,
        password: `${password}`,
        type: `${type}`,
      });

      var config = {
        method: 'post',
        url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setLoading(false);
          const userData = response.data;
          name = userData.data.userDetails.name;
          phone = userData.data.userDetails.phone;
          email2 = userData.data.userDetails.email;
          address = userData.data.userDetails.address;
          landmark = userData.data.userDetails.landMark;
          pincode = userData.data.userDetails.pinCode;
          userId = userData.data.userDetails._id;

          setMyUser();

          if (profile == 'true') {
            navigation.navigate('Profile Screen', {
              username: `${name}`,
              phone: `${phone}`,
              email: email2,
              userId: `${userId}`,
            });
          } else {
            //var tempUsername = await AsyncStorage.getItem('User');
            navigation.navigate('Pickup Screen', {
              name: `${name}`,
              email: email2,
              phone: `${phone}`,
              address: `${address}`,
              landmark: `${landmark}`,
              pincode: `${pincode}`,
              itemSelected: `${itemSelected}`,
              subCategory: `${subCategory}`,
              userId: `${userId}`,
              loadAgain: `${false}`,
            });
          }
        })
        .catch(function (error) {
          setLoading(false);
          Alert.alert('Login Failed');
          console.log(error);
        });
    } else {
      Alert.alert('Enter Valid Credentials');
    }
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: '#FFFFFF',
        }}>
        <LinearGradient
          colors={['#5A2D94', '#f2748e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            margin: verticalScale(15),
            borderRadius: moderateScale(15),
          }}>
          <Text
            style={{
              fontSize: moderateScale(30),
              textAlign: 'left',
              fontFamily: 'Ubuntu-Bold',
              alignSelf: 'center',
              marginTop: verticalScale(40),
              color: '#FFF',
            }}>
            Login
          </Text>
          <Text
            style={{
              fontSize: moderateScale(15),
              textAlign: 'center',
              alignSelf: 'center',
              width: scale(250),
              fontFamily: 'Ubuntu-Regular',
              marginHorizontal: scale(10),
              marginTop: verticalScale(30),
              marginBottom: verticalScale(30),
              color: '#FFF',
            }}>
            Please enter your email & phone number to Login
          </Text>
          <TextInput
            onChangeText={tempEmail => {
              setEmail(tempEmail);
            }}
            style={styles.textinput}
            placeholder="Email or phone number"
            placeholderTextColor="#FFF"></TextInput>

          <TextInput
            style={styles.textinput}
            placeholder="Password"
            placeholderTextColor="#FFFF"
            secureTextEntry={true}
            onChangeText={tempPassword => {
              setPassword(tempPassword);
            }}></TextInput>

          <View
            style={{
              alignSelf: 'flex-end',
              marginRight: scale(25),
              marginTop: verticalScale(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Forgot Screen');
              }}>
              <Text
                style={{
                  fontSize: moderateScale(12),
                  color: '#FFF',
                  fontFamily: 'Ubuntu-Regular',
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading == false ? (
            <View style={styles.loginBtn}>
              <TouchableOpacity
                onPress={() => {
                  getCredentials();
                }}>
                <View
                  style={{
                    height: verticalScale(68),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(18),
                      alignSelf: 'center',
                      paddingTop: verticalScale(16),
                      color: '#FFFFFF',
                      margin: moderateScale(5),
                      fontFamily: 'Ubuntu-Regular',
                      //paddingBottom: verticalScale(10),
                    }}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator
              color="#FFF"
              size={'large'}
              style={{
                marginTop: verticalScale(30),
              }}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              marginTop: verticalScale(30),
              marginBottom: verticalScale(30),
              marginLeft: scale(70),
            }}>
            <Text
              style={{
                fontSize: moderateScale(15),
                alignSelf: 'center',
                marginTop: verticalScale(10),
                fontFamily: 'Ubuntu-Regular',
                color: '#FFF',
              }}>
              Don't have account?
            </Text>

            <View
              style={{
                //padding: moderateScale(8)
                width: scale(100),
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register Screen', {
                    itemSelected: `${itemSelected}`,
                    subCategory: `${subCategory}`,
                    profile: `${profile}`,
                  });
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    color: '#2827CC',
                    paddingTop: verticalScale(11),
                    marginLeft: scale(5),
                    fontFamily: 'Ubuntu-Regular',
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(12),
    borderColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF80',
    height: verticalScale(45),
    marginTop: verticalScale(15),
    marginLeft: scale(20),
    paddingLeft: moderateScale(15),
    marginRight: scale(20),
    color: '#FFF',
    fontFamily: 'Ubuntu-Regular',
  },

  loginBtn: {
    marginTop: verticalScale(25),
    backgroundColor: '#000',
    marginLeft: scale(20),
    marginRight: scale(20),
    borderRadius: moderateScale(10),
  },
});
