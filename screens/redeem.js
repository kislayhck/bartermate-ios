import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  BackHandler,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import offer from '../assets/offers.png';
import awesome from '../assets/awesome.png';
import awesomeFont from '../assets/awesomeFont.png';
import track from '../assets/track.png';
import { ScrollView } from 'react-native-gesture-handler';
import service from '../assets/service.png';

const RedeemScreen = ({ route, navigation }) => {
  var userId = route.params.userId;

  var username = route.params.username;

  console.log(username);

  var symbol = '<';

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Category Screen');
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  const [isRedeemAc, setRedeemAC] = useState(false);
  const handleRedeem = () => {
    var data = JSON.stringify({
      userId: `${userId}`,
      serviceName: 'AC wala',
      isService: true,
    });

    var config = {
      method: 'post',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/Service',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRedeemAC(true);
        //isRedeemAc = true;
        Alert.alert('You have successfully redeemed this service');
      })
      .catch(function (error) {
        Alert.alert('You have already redeemed this service');
        console.log(error);
      });
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
            paddingBottom: verticalScale(120),
          }}>
          <Image
            source={awesome}
            style={{
              height: verticalScale(130),
              width: scale(140),
              alignSelf: 'center',
            }}
          />
          <Image
            source={awesomeFont}
            style={{
              height: verticalScale(20),
              width: scale(180),
              alignSelf: 'center',
              marginTop: verticalScale(20),
            }}
          />
          <Text
            style={{
              fontFamily: 'Ubuntu-Regular',
              fontSize: moderateScale(18),
              color: '#00000080',
              alignSelf: 'center',
              textAlign: 'center',
              marginHorizontal: scale(30),
              marginTop: verticalScale(30),
            }}>
            Your pickup has been scheduled. Our associate will attend to you!!
          </Text>
          {username == 'Guest' ? (
            <></>
          ) : (
            <Text
              style={{
                alignSelf: 'center',
                fontSize: moderateScale(17),
                color: '#00000080',
                marginTop: verticalScale(20),
                textAlign: 'center',
                marginHorizontal: scale(30),
                fontFamily: 'Ubuntu-Regular',
                fontSize: moderateScale(18),
              }}>
              You can check your booking in the order history under your profile
              section.
            </Text>
          )}
          {/* {username == 'Guest' ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                var tempEmail = await AsyncStorage.getItem('email');
                navigation.navigate('Pickup History Screen', {
                  email: `${tempEmail}`,
                });
              }}>
              <Image
                source={track}
                style={{
                  height: verticalScale(50),
                  width: scale(90),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginTop: verticalScale(30),
                }}
              />
            </TouchableOpacity>
          )} */}
          {/* <Text
            style={{
              alignSelf: 'center',
              fontSize: moderateScale(20),
              color: '#000000',
              fontFamily: 'Ubuntu-Bold',
              marginTop: verticalScale(12),
            }}>
            Available Offers
          </Text> */}
          {/* <TouchableOpacity
            onPress={() => {
              if (isRedeemAc == false) {
                if (username == 'Guest') {
                  Alert.alert(
                    'You need to be registered to avail this service',
                  );
                } else {
                  handleRedeem();
                }
              } else {
                Alert.alert('You Have Already Redeemed this service.');
              }
            }}>
            <LinearGradient
              colors={['#5A2D94', '#f2748e']}
              style={{
                height: verticalScale(100),
                width: scale(315),
                alignSelf: 'center',
                elevation: 5,
                marginTop: verticalScale(20),
                borderRadius: moderateScale(10),
              }}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <Image
                source={service}
                style={{
                  resizeMode: 'contain',
                  height: verticalScale(100),
                  width: scale(280),
                  alignSelf: 'center',
                }}
              />
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Category Screen');
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              paddingBottom: verticalScale(130),
              width: '100%',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: moderateScale(18),
                color: '#A363A9',
              }}>
              {symbol} Back to Homescreen
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default RedeemScreen;
