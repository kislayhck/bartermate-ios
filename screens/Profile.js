import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  ScrollView,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.png';
import icon3 from '../assets/icon3.png';
import icon4 from '../assets/icon4.png';

const ProfileScreen = ({route, navigation}) => {
  var username = route.params.username;

  var userId = route.params.userId;
  var email = route.params.email;
  var phone = route.params.phone;
  var landmark = '';

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  // useEffect(async () => {
  //   const getUser = async () => {
  //     name = await AsyncStorage.getItem('User');
  //     email = await AsyncStorage.getItem('email');
  //     phone = await AsyncStorage.getItem('phone');
  //     userId = await AsyncStorage.getItem('userId');
  //     landmark = await AsyncStorage.getItem('landmark');
  //   };

  //   await getUser();
  //   console.log(name);
  //   console.log(email);
  //   console.log(phone);
  //   console.log('Called');
  // });

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

  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   navigation.navigate('Category Screen');
  // });

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          paddingBottom: verticalScale(380),
        }}>
        <Text
          style={{
            fontSize: moderateScale(20),
            marginLeft: scale(35),
            marginTop: verticalScale(15),
            color: '#5A2D94',
            fontFamily: 'Ubuntu-Bold',
          }}>
          Hey! {username}
        </Text>
        <View
          style={{
            marginLeft: scale(30.17),
            marginTop: verticalScale(25),
            marginRight: scale(40),
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log(username);
              console.log(email);
              console.log(phone);
              console.log(userId);
              navigation.navigate('My Profile Screen', {
                name: `${username}`,
                email: `${email}`,
                phone: `${phone}`,
                userId: `${userId}`,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#E7E7E7',
                marginLeft: scale(5),
                height: verticalScale(53.1),
              }}>
              <Image
                source={icon1}
                style={{
                  height: verticalScale(35),
                  width: scale(35),
                  marginTop: verticalScale(5),
                  marginRight: scale(4),
                }}
              />
              <Text style={styles.options}>My Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Address Screen', {
                userId: `${userId}`,
                email: `${email}`,
                phone: `${phone}`,
                landMark: `${landmark}`,
                pickupScreen: `${false}`,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#E7E7E7',
                height: verticalScale(53.1),
              }}>
              <Image
                source={icon2}
                style={{
                  height: verticalScale(35),
                  width: scale(45),
                  marginTop: verticalScale(5),
                }}
              />
              <Text style={styles.options}>My Addresses</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              var tempEmail = await AsyncStorage.getItem('email');
              navigation.navigate('Pickup History Screen', {
                email: `${tempEmail}`,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: '#E7E7E7',
                height: verticalScale(53.1),
              }}>
              <Image
                source={icon3}
                style={{
                  height: verticalScale(35),
                  width: scale(40),
                  marginTop: verticalScale(5),
                  marginRight: scale(5),
                }}
              />
              <Text style={styles.options}>Pickup History</Text>
            </View>
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
          onPress={async () => {
            await setUser();
            navigation.navigate('Category Screen');
            Alert.alert('You are logged out!');
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
              LogOut
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  options: {
    height: verticalScale(20),
    fontSize: moderateScale(12),
    marginLeft: scale(16.17),
    marginBottom: verticalScale(30),
    marginTop: verticalScale(16),
    fontFamily: 'Ubuntu-Regular',
    color: '#000',
  },
});
