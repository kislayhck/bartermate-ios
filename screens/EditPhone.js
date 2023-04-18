import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import confused from '../assets/confused.png';
import ellipse from '../assets/ellipse.png';

const EditPhoneScreen = ({ route, navigation }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState('');

  let tempUserId = '';

  useEffect(() => {
    const getUserId = async () => {
      console.log('heloo----');
      tempUserId = await AsyncStorage.getItem('userId');
      console.log(tempUserId);

      setUserId(tempUserId);
    };

    getUserId();
  }, []);

  const setMyUser = async () => {
    const setUser = async () => {
      await AsyncStorage.setItem('phone', `${phone}`);
      navigation.navigate('Category Screen');
    };

    await setUser();
  };

  const phoneCheck = () => {
    var num = parseInt(phone, 10);
    var tempNum = num.toString(10);
    if (phone.length == 10 && phone.length === tempNum.length) {
      return true;
    } else {
      Alert.alert('Enter Valid Phone Number');
      return false;
    }
  };

  const handlePhone = () => {
    setLoading(true);
    var data = JSON.stringify({
      userId: `${userId}`,
      phone: `${phone}`,
    });

    var config = {
      method: 'put',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/editUser',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        Alert.alert('Phone No. Successfully Changed');
        setMyUser();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <LinearGradient
        colors={['#5A2D94', '#f2748e']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          backgroundColor: '#FFF',
          margin: verticalScale(15),
          borderRadius: moderateScale(15),
          paddingBottom: verticalScale(80),
        }}>
        <Text
          style={{
            color: '#FFF',
            fontSize: moderateScale(20),
            alignSelf: 'center',
            fontFamily: 'Ubuntu-Bold',
            marginTop: verticalScale(30),
          }}>
          Reset Phone Number
        </Text>
        <Image
          source={ellipse}
          style={{
            height: verticalScale(150),
            width: scale(150),
            position: 'relative',
            alignSelf: 'center',
            resizeMode: 'contain',
            marginTop: verticalScale(50),
          }}
        />
        <Image
          source={confused}
          style={{
            height: verticalScale(80),
            width: scale(100),
            position: 'absolute',
            resizeMode: 'contain',
            marginTop: verticalScale(135),
            marginLeft: scale(113),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            height: verticalScale(30),
            padding: moderateScale(5),
            borderBottomColor: '#CAD5E2',
            borderBottomWidth: 1,
            width: scale(280),
            marginTop: verticalScale(60),
          }}>
          <Text
            style={{
              fontSize: moderateScale(12),

              marginRight: scale(10),
              marginLeft: scale(3),
              fontFamily: 'Ubuntu-Regular',
              color: '#FFF',
            }}>
            +91
          </Text>
          <TextInput
            defaultValue={`${phone}`}
            keyboardType="number-pad"
            maxLength={10}
            onChangeText={tempPhone => {
              setPhone(tempPhone);
            }}
            style={{
              fontSize: moderateScale(12),
              fontFamily: 'Ubuntu-Regular',
              width: scale(300),
              paddingBottom: verticalScale(10),
              color: '#FFF',
            }}
            placeholder="Contact Number*"
            placeholderTextColor="#FFF"></TextInput>
        </View>
        {loading == true ? (
          <ActivityIndicator
            color="#FFF"
            size={'large'}
            style={{
              marginTop: verticalScale(10),
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (phone.length && phoneCheck()) {
                handlePhone();
              } else {
                Alert.alert('Enter Valid Phone Number');
              }
            }}>
            <View
              style={{
                alignSelf: 'center',

                width: scale(280),
                height: verticalScale(45),
                marginTop: verticalScale(20),
                backgroundColor: '#000',
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
                width: scale(220),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  textAlign: 'center',
                  paddingTop: verticalScale(5),
                  fontFamily: 'Ubuntu-Regular',
                  color: '#FFF',
                }}>
                Save Phone Number
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </>
  );
};

export default EditPhoneScreen;
