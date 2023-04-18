import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

import confused from '../assets/confused.png';
import ellipse from '../assets/ellipse.png';
import reset from '../assets/reset.png';
import { ScrollView } from 'react-native-gesture-handler';

const ResetPassScreen = ({ route, navigation }) => {
  var id = route.params.id;
  const [pass, setPass] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');

  const passCheck = () => {
    if (pass != confirmPass) {
      Alert.alert('Password must be same as Confirmed Password');
      return false;
    } else if (pass.length < 8) {
      Alert.alert('Password length must be greater than 7');
      return false;
    } else {
      return true;
    }
  };

  const resetPass = () => {
    var data = JSON.stringify({
      userId: `${id}`,
      password: `${pass}`,
    });

    var config = {
      method: 'put',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/updatePassword',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        Alert.alert('Password Updated Successfully');
        navigation.navigate('Category Screen');
      })
      .catch(function (error) {
        setLoading(false);
        Alert.alert('Something Went Wrong');
        navigation.navigate('Forgot Screen');
      });
  };

  return (
    <>
      <ScrollView>
        <LinearGradient
          colors={['#5A2D94', '#f2748e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            margin: verticalScale(15),
            borderRadius: moderateScale(15),
            paddingBottom: verticalScale(180),
          }}>
          <Image
            source={reset}
            style={{
              height: verticalScale(30),
              width: scale(200),
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: verticalScale(40),
            }}
          />
          <Image
            source={ellipse}
            style={{
              height: verticalScale(150),
              width: scale(150),
              position: 'relative',
              alignSelf: 'center',
              resizeMode: 'contain',
              marginTop: verticalScale(20),
            }}
          />
          <Image
            source={confused}
            style={{
              height: verticalScale(80),
              width: scale(100),
              position: 'absolute',
              resizeMode: 'contain',
              marginTop: verticalScale(125),
              marginLeft: scale(113),
            }}
          />
          <View
            style={{
              marginTop: verticalScale(20),
            }}>
            <TextInput
              style={styles.textinput}
              placeholder="Enter New Password"
              secureTextEntry={true}
              placeholderTextColor="#FFF"
              onChangeText={tempPass => {
                setPass(tempPass);
              }}></TextInput>
          </View>
          <View>
            <TextInput
              style={styles.textinput}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              placeholderTextColor="#FFF"
              onChangeText={tempPass => {
                setConfirmPass(tempPass);
              }}></TextInput>
          </View>
          {isLoading == true ? (
            <View
              style={{
                height: verticalScale(50),
                width: scale(310),
                marginTop: verticalScale(15),
                alignSelf: 'center',
              }}>
              <ActivityIndicator
                color="#FFF"
                size={'large'}
                style={{
                  alignSelf: 'center',
                }}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (passCheck()) {
                  setLoading(true);
                  resetPass();
                } else {
                  Alert.alert('Enter Valid Password');
                  setLoading(false);
                }
              }}>
              <View
                style={{
                  borderRadius: moderateScale(10),
                  height: verticalScale(45),
                  width: scale(220),
                  backgroundColor: '#000',
                  marginTop: verticalScale(15),
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    alignSelf: 'center',
                    color: '#FFFFFF',
                    margin: moderateScale(5),
                    paddingTop: verticalScale(8),
                    fontFamily: 'Ubuntu-Regular',
                  }}>
                  Save New Password
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(12),
    borderColor: '#FFF',
    borderBottomWidth: 1,
    fontFamily: 'Ubuntu-Regular',
    borderBottomColor: '#FFFFFF80',
    //borderWidth: 1,
    height: verticalScale(45),
    //borderRadius: moderateScale(100),
    marginTop: verticalScale(25),
    marginLeft: scale(20),
    paddingLeft: moderateScale(15),
    marginRight: scale(20),
    color: '#FFF',
  },
});

export default ResetPassScreen;
