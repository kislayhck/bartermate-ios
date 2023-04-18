import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import profileIcon from '../assets/profileIcon.png';
import logo from '../assets/logo2.png';
import banner from '../assets/banner.jpeg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const PriceScreen = ({ navigation }) => {
  const [pincode, setPincode] = useState('Choose Pincode');
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const [prices, setPrices] = useState([]);
  const [images, setImages] = useState([]);
  const [itemSelected, setItem] = useState('');
  const [subCategory, setSubCategory] = useState('Choose Sub-Category');

  console.log(navigation);

  var username = '';
  var email = '';
  var phone = '';
  var landmark = '';
  var pinCode = '';
  var address = '';
  var loginStatus = '';
  var userId = '';

  const [allPincodes, setAllPincodes] = useState([]);

  const [visible, setVisible] = useState(false);
  function toggle() {
    setVisible(visible => !visible);
  }

  const getUser = async () => {
    loginStatus = await AsyncStorage.getItem('loginStatus');
    username = await AsyncStorage.getItem('User');
    address = await AsyncStorage.getItem('address');
    email = await AsyncStorage.getItem('email');
    phone = await AsyncStorage.getItem('phone');
    landmark = await AsyncStorage.getItem('landmark');
    pinCode = await AsyncStorage.getItem('pincode');

    userId = await AsyncStorage.getItem('userId');

    // setUserId(tempUserId);
    // setLogin(tempLoginStatus);
    // setName(tempUsername);
    // setAddress(tempAddress);
    // setEmail(tempEmail);
    // setPhone(tempPhone);
    // setLandmark(tempLandmark);
    // setPincode(tempPincode);
  };

  const getImages = async () => {
    try {
      await axios
        .get(
          'https://talented-lamb-pleat.cyclic.app/admin/registration-api/image',
        )
        .then(res => {
          setLoading(false);
          setImages(res.data.data.image);
        });
    } catch (err) {
      //console.log(err);
      setLoading(false);
    }
  };

  const getPincode = async () => {
    const { data } = await axios.get(
      'https://talented-lamb-pleat.cyclic.app/admin/registration-api/pincode',
    );
    setAllPincodes(data.data);
    //console.log(data.data);
  };

  console.log(allPincodes);

  useEffect(() => {
    getUser();
    getImages();
    getPincode();
    //getImages();
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <>
            {Platform.OS == 'ios' ? (
              <SafeAreaView>
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
                      marginTop: verticalScale(24),
                      marginLeft: scale(20),
                      color: '#5A2D94',
                      fontFamily: 'Ubuntu-Bold',
                    }}>
                    BarterMate
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      // var tempLoginStatus = await AsyncStorage.getItem(
                      //   'loginStatus',
                      // );

                      // var tempUsername = await AsyncStorage.getItem('User');

                      if (loginStatus == 'true') {
                        navigation.navigate('Profile Screen', {
                          username: `${username}`,
                          email: `${email}`,
                          phone: `${phone}`,
                          userId: `${userId}`,
                        });
                      } else {
                        navigation.navigate('Login Screen', {
                          itemSelected: `${itemSelected}`,
                          subCategory: `${subCategory}`,
                          // location: 'Profile',
                          profile: 'true',
                        });
                      }
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
              </SafeAreaView>
            ) : (
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
                    marginTop: verticalScale(24),
                    marginLeft: scale(20),
                    color: '#5A2D94',
                    fontFamily: 'Ubuntu-Bold',
                  }}>
                  BarterMate
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    // var tempLoginStatus = await AsyncStorage.getItem(
                    //   'loginStatus',
                    // );

                    // var tempUsername = await AsyncStorage.getItem('User');

                    if (loginStatus == 'true') {
                      navigation.navigate('Profile Screen', {
                        username: `${username}`,
                        email: `${email}`,
                        phone: `${phone}`,
                        userId: `${userId}`,
                      });
                    } else {
                      navigation.navigate('Login Screen', {
                        itemSelected: `${itemSelected}`,
                        subCategory: `${subCategory}`,
                        // location: 'Profile',
                        profile: 'true',
                      });
                    }
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
            )}
          </>
        );
      },
    });
  }, [navigation]);

  const arrow = '=>';

  const handlePriceDetails = () => {
    setLoading(true);
    var data = JSON.stringify({
      pincode: `${pincode}`,
    });

    var config = {
      method: 'post',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/listAllRatebyPincode',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        setFetch(true);
        var temp = JSON.stringify(response.data.data);
        setPrices(JSON.parse(temp));
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingBottom: verticalScale(100),
          }}>
          <ScrollView
            horizontal={true}
            style={{
              height: verticalScale(280),
            }}>
            <View
              style={{
                height: verticalScale(280),
                width: scale(360),
                marginBottom: verticalScale(20),
              }}>
              <Image
                source={banner}
                style={{
                  width: scale(320),
                  height: verticalScale(260),
                  marginLeft: verticalScale(15),
                  resizeMode: 'stretch',
                  borderRadius: moderateScale(12),
                }}
              />
            </View>
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                borderRadius: moderateScale(20),
                borderWidth: 1,
                height: verticalScale(50),
                width: scale(260),
                marginTop: verticalScale(15),
                marginLeft: scale(15),
                borderColor: '#9b38d9',
              }}>
              <Picker
                style={{
                  color: '#000',
                  width: scale(180),
                  marginLeft: scale(40),

                  marginTop: verticalScale(0),
                  fontSize: moderateScale(12),
                }}
                itemStyle={
                  {
                    height: verticalScale(50),
                  }
                }
                mode="dropdown"
                selectedValue={pincode}
                onValueChange={itemValue => {
                  setPincode(itemValue);
                }}>
                <Picker.Item label="Scroll Pincode" value="Choose Pincode" />
                {allPincodes.map(item => (
                  <Picker.Item label={item} value={item} />
                ))}
              </Picker>
            </View>

            {loading == false ? (
              <TouchableOpacity
                onPress={() => {
                  if (pincode != 'Choose Pincode') {
                    handlePriceDetails();
                  }
                }}>
                <View
                  style={{
                    borderRadius: moderateScale(15),
                    marginTop: verticalScale(17),
                    marginLeft: scale(10),
                    height: verticalScale(45),
                    width: scale(50),
                    backgroundColor: '#EF6563',
                    marginBottom: verticalScale(10),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      alignSelf: 'center',
                      color: '#FFF',
                      margin: moderateScale(5),
                      paddingTop: verticalScale(8),
                      fontFamily: 'Ubuntu-Regular',
                      //paddingBottom: verticalScale(15),
                    }}>
                    GO
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator
                size={'large'}
                color="#A363A9"
                style={{
                  alignSelf: 'center',
                  marginTop: verticalScale(10),
                  marginLeft: scale(15),
                }}
              />
            )}
          </View>

          {fetch == true ? (
            <View
              style={{
                marginLeft: verticalScale(25),
                padding: moderateScale(10),
                marginTop: verticalScale(20),
              }}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontFamily: 'Ubuntu-Bold',
                      marginBottom: verticalScale(10),
                      color: '#E03B8B',
                    }}>
                    Category Name
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      marginBottom: verticalScale(30),
                      color: '#E03B8B',
                      marginLeft: verticalScale(110),
                      fontFamily: 'Ubuntu-Bold',
                    }}>
                    Price
                  </Text>
                </View>
                {prices.map(key => (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#FFF',
                      }}>
                      <Text
                        style={{
                          color: '#8D3DAF',
                          width: scale(205),
                          marginBottom: verticalScale(10),
                          fontFamily: 'Ubuntu-Regular',
                        }}>
                        {key.category}
                      </Text>
                      <Text
                        style={{
                          color: '#8D3DAF',
                          fontFamily: 'Ubuntu-Regular',
                        }}>
                        ₹ {key.value}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: verticalScale(1),
                        width: scale(280),
                        backgroundColor: '#CAD5E280',
                        marginBottom: verticalScale(10),
                      }}
                    />
                    <View
                      style={{
                        height: verticalScale(1),
                        width: scale(280),
                        backgroundColor: '#CAD5E280',
                        marginBottom: verticalScale(15),
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <>
              <View
                style={{
                  height: verticalScale(60),
                  backgroundColor: '#FFF',
                }}
              />
            </>
          )}
          <View
            style={{
              marginLeft: scale(20),
            }}>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Ubuntu-Regular',
              }}>
              + Price is showing for selected Pincode*
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Ubuntu-Regular',
              }}>
              + All prices are according to 1kg weight.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PriceScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(16),
    backgroundColor: '#FFF',
    elevation: 5,
    marginBottom: verticalScale(10),
    height: verticalScale(30),
    paddingLeft: verticalScale(5),
    paddingTop: verticalScale(5),
    width: scale(270),
    marginTop: verticalScale(5),
    fontWeight: 'bold',
    color: '#8D3DAF',
  },
});
