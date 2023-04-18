import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import AsyncStorage from '@react-native-async-storage/async-storage';

import icon1 from '../assets/icon1.png';
import edit from '../assets/edit.png';
import axios from 'axios';
import { Alert } from 'react-native';

const MyProfileScreen = ({ route, navigation }) => {
  var name = route.params.name;
  var email = route.params.email;
  var phone = route.params.phone;
  var userId = route.params.userId;

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  const deleteAccount = () => {
    axios
      .delete(
        `https://talented-lamb-pleat.cyclic.app/admin/registration-api/user/${userId}`,
      )
      .then(async () => {
        await setUser();
        navigation.navigate('Category Screen');
        Alert.alert('Account Successfully Deleted');
      })
      .catch(err => {
        console.log('t------------------', err);
      });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <View
          style={{
            marginTop: verticalScale(30),
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: verticalScale(30),
            }}>
            <Text
              style={{
                height: verticalScale(80),
                width: scale(85),
                backgroundColor: '#A363A9',
                fontFamily: 'Ubuntu-Bold',
                color: '#FFF',
                fontSize: moderateScale(35),
                textAlign: 'center',

                paddingTop: verticalScale(18),
                marginBottom: verticalScale(20),
              }}>
              {name.substring(0, 1)}
            </Text>
            <Text
              style={{
                marginLeft: scale(30),
                fontSize: moderateScale(20),
                color: '#5A2D94',
                fontFamily: 'Ubuntu-Bold',
                marginTop: verticalScale(30),
              }}>
              {name}
            </Text>
          </View>
          <Text
            style={{
              color: '#5A2D94',
              marginBottom: verticalScale(20),
              marginTop: verticalScale(30),
              fontFamily: 'Ubuntu-Bold',
            }}>
            PERSONAL DETAILS :
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.text}>{name}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit Name Screen', {
                  userId: `${userId}`,
                });
              }}>
              <Image
                source={edit}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: scale(30),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.text}>{email}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit Email Screen', {
                  userId: `${userId}`,
                });
              }}>
              <Image
                source={edit}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: scale(30),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={styles.text}>{phone}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit Phone Screen', {
                  phone: `${phone}`,
                  userId: `${userId}`,
                });
              }}>
              <Image
                source={edit}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: scale(30),
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              height: verticalScale(40),
              width: scale(300),
              marginLeft: scale(30),
              marginRight: scale(30),
              alignSelf: 'center',
              width: scale(220),
              backgroundColor: '#000',
              marginTop: verticalScale(20),
              borderRadius: moderateScale(10),
              borderColor: '#A363A9',
              // marginLeft: scale(15),
              // marginRight: scale(15),
              // padding: moderateScale(6),
              // marginBottom: verticalScale(30),
            }}
            onPress={() => {
              navigation.navigate('Forgot Screen');
            }}>
            <View>
              <Text
                style={{
                  fontSize: moderateScale(15),
                  marginTop: verticalScale(3),
                  paddingTop: verticalScale(7),
                  color: '#FFF',
                  fontFamily: 'Ubuntu-Regular',
                  textAlign: 'center',
                  // paddingTop: verticalScale(10),
                  // paddingBottom: verticalScale(10),
                }}>
                Change Password
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: verticalScale(40),
              width: scale(300),
              marginLeft: scale(30),
              marginRight: scale(30),
              alignSelf: 'center',
              width: scale(220),
              color: "red",
              backgroundColor: 'white',
              marginTop: verticalScale(20),
              borderRadius: moderateScale(10),
              borderColor: "red",
              borderWidth: 1,
              //borderColor: '#A363A9',
              // marginLeft: scale(15),
              // marginRight: scale(15),
              // padding: moderateScale(6),
              // marginBottom: verticalScale(30),
            }}
            onPress={() => {
              Alert.alert(
                'Delete Account?',
                'Are you sure you want to delete your account permanently?',
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      deleteAccount();
                    },
                  },
                  {
                    text: 'No',
                    onPress: () => { },
                  },
                ],
              );
            }}>
            <View>
              <Text
                style={{
                  fontSize: moderateScale(15),
                  //marginTop: verticalScale(3),
                  color: "red",
                  paddingTop: verticalScale(10),
                  //color: '#FFF',
                  fontFamily: 'Ubuntu-Regular',
                  textAlign: 'center',

                  // padding: 2,

                  // paddingTop: verticalScale(10),
                  // paddingBottom: verticalScale(10),
                }}>
                Delete Account
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(10),
    color: '#000',
    paddingBottom: verticalScale(10),
    width: scale(220),
    marginTop: verticalScale(10),
    borderBottomColor: '#CAD5E2',
    borderBottomWidth: 1,
    fontFamily: 'Ubuntu-Regular',
  },
});