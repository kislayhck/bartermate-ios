import React, { Component, useEffect, useMemo, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker'
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
  Button,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import calender from '../assets/calender.png';
import pickup from '../assets/pickup.png';

const PickupScreen = ({ route, navigation }) => {
  var name = route.params.name;

  var userId = route.params.userId;

  var email = route.params.email;
  var phone = route.params.phone;
  var tempLandmark = route.params.landmark;

  var loadAgain = route.params.loadAgain;

  var tempCategory = route.params.itemSelected;
  //var tempSubCategory = route.params.subCategory;
  //var tempAddress = route.params.address;

  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('Choose Pincode');
  //const [address, setAddress] = useState(`${tempAddress}`);
  const [category, setCategory] = useState(`${tempCategory}`);
  //const [subCategory, setSubCategory] = useState(`${tempSubCategory}`);

  const [isLoading, setLoading] = useState(false);

  const [addressLoading, setAddressLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [dateLabel, setDateLabel] = useState('Pick A Date');

  const [myAddresses, setMyaddresses] = useState([]);

  const [currentAddress, setCurrentAddress] = useState('Choose Pickup Address');

  const [glassPicked, setGlassPicked] = useState(false);
  const [metalPicked, setMetalPicked] = useState(false);
  const [plasticPicked, setPlasticPicked] = useState(false);
  const [paperPicked, setPaperPicked] = useState(false);
  const [electronicsPicked, setElectronicsPicked] = useState(false);
  const [boxPicked, setBoxPicked] = useState(false);

  const [allPincodes, setAllPincodes] = useState([]);
  const [open, setOpen] = useState(false)
  //const [multiSelect, setMultiselect] = useState([]);

  const checkName = () => {
    if (name == 'Guest') {
      navigation.navigate('Category Screen');
    }
  };

  checkName();

  var multiSelect = [];

  const addToList = () => {
    //let newArr = [...multiSelect];
    if (glassPicked) {
      //newArr.push('Glass');
      multiSelect.push('Glass');
    }
    if (metalPicked) {
      //newArr.push('Metal');
      multiSelect.push('Metal');
    }
    if (plasticPicked) {
      //newArr.push('Plastic');
      multiSelect.push('Plastic');
    }
    if (paperPicked) {
      //newArr.push('Paper');
      multiSelect.push('Paper');
    }
    if (electronicsPicked) {
      //newArr.push('Electronics');
      multiSelect.push('Electronics');
    }

    if (boxPicked) {
      multiSelect.push('Corrugated Box');
    }

    console.log(multiSelect);

    //setMultiselect(newArr);
  };

  //var multiSelect = [];

  // const removeFromList = element => {
  //   let newArr = [...multiSelect];
  //   var index = newArr.indexOf(element);
  //   newArr.splice(index, 1);
  //   console.log(newArr);
  //   setMultiselect(newArr);
  // };

  //console.log(loadAgain);

  const handleShowAddress = () => {
    setAddressLoading(true);
    console.log(userId);
    var data = JSON.stringify({
      userId: `${userId}`,
    });

    var config = {
      method: 'post',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/listAddAddress',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setAddressLoading(false);
        //console.log(JSON.stringify(response.data.data));
        var temp = JSON.stringify(response.data.data);
        setMyaddresses(JSON.parse(temp));
      })
      .catch(function (error) {
        console.log(error);
        console.log('address error');
        setAddressLoading(false);
        Alert.alert('Something Went Wrong');
      });
  };

  console.log(loadAgain, 'Pickup');

  const getPincode = async () => {
    const { data } = await axios.get(
      'https://talented-lamb-pleat.cyclic.app/admin/registration-api/pincode',
    );
    setAllPincodes(data.data);
    console.log(allPincodes);
  };

  useEffect(() => {
    handleShowAddress();
    getPincode();
  }, [loadAgain]);

  //handleShowAddress();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    //setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate();

    console.log(fDate);
    setDateLabel(fDate);
  };

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

  const setUser = async () => {
    await AsyncStorage.setItem('loginStatus', 'false');
    await AsyncStorage.setItem('User', 'Guest');
  };

  const handlePickeup = () => {
    addToList();
    setLoading(true);

    var data = JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
      address: `${currentAddress}`,
      landMark: `${landmark}`,
      pinCode: `${pincode}`,
      category: `${category}`,
      pickupDate: `${date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate()}`,
      subcategory: multiSelect,
    });

    var config = {
      method: 'post',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/addPickup',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        setLoading(false);
        //Alert.alert('We will send our representatives soon. Thank You');
        navigation.navigate('Redeem Screen', {
          userId: userId,
          username: `${name}`,
        });
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Sorry, Something Went Wrong');
        setLoading(false);
      });
  };

  return addressLoading == true ? (
    <>
      <ActivityIndicator
        color={'#A363A9'}
        size={'large'}
        style={{
          marginTop: verticalScale(30),
        }}
      />
    </>
  ) : (
    <>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingBottom: verticalScale(80),
          }}>
          <View>
            <Text
              style={{
                backgroundColor: '#EF6563',
                width: scale(40),
                height: verticalScale(40),
                color: '#FFF',
                fontSize: moderateScale(30),
                marginLeft: scale(30),
                fontFamily: 'Ubuntu-Bold',
                textAlign: 'center',
                textAlignVertical: 'center',
                borderRadius: moderateScale(7),
                marginTop: verticalScale(30),
              }}>
              {name.substring(0, 1)}
            </Text>
            <Text
              style={{
                color: '#5A2D94',
                marginLeft: scale(30),
                marginTop: verticalScale(10),
                fontFamily: 'Ubuntu-Regular',
              }}>
              Hello {name} !
            </Text>
            <Text
              style={{
                marginLeft: scale(30),
                marginTop: verticalScale(10),
                color: '#00000090',
                fontFamily: 'Ubuntu-Regular',
                fontSize: moderateScale(18),
              }}>
              More Productive
            </Text>
            <Text
              style={{
                marginLeft: scale(30),
                marginTop: verticalScale(5),
                color: '#00000090',
                fontFamily: 'Ubuntu-Regular',
                fontSize: moderateScale(18),
              }}>
              with Comfortable Place
            </Text>
          </View>
          <Text
            style={{
              fontSize: moderateScale(25),
              alignSelf: 'center',
              color: '#5A2D94',
              fontFamily: 'Ubuntu-Bold',
              marginTop: verticalScale(30),
              marginBottom: verticalScale(20),
            }}>
            {tempCategory} Picked!
          </Text>

          <View>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: 'Ubuntu-Regular',
                color: '#5A2D94',
                //borderWidth: 1,
                width: scale(150),
                textAlign: 'center',
                //position: 'absolute',
                //borderColor: '#000',
                backgroundColor: '#FFF',
                alignSelf: 'center',
              }}>
              Add More Categories
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'center',
              marginTop: verticalScale(10),
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: moderateScale(10),
              width: scale(300),
              flexWrap: 'wrap',
              borderWidth: 2,
              borderColor: '#5A2D94',
              justifyContent: 'space-between',
              height: verticalScale(130),
              paddingTop: verticalScale(12),
              paddingHorizontal: scale(25),
              marginBottom: verticalScale(20),
            }}>
            {tempCategory == 'Glass' ? (
              <></>
            ) : (
              <View
                style={{
                  height: verticalScale(25),
                  width: scale(100),
                  marginTop: verticalScale(5),
                  flexDirection: 'row',
                  //marginRight: scale(30),
                }}>
                <CheckBox
                  disabled={false}
                  value={glassPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setGlassPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Glass</Text>
              </View>
            )}

            {tempCategory == 'Metal' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(100),
                  //marginRight: scale(30),
                  flexDirection: 'row',
                  marginTop: verticalScale(5),
                }}>
                <CheckBox
                  disabled={false}
                  value={metalPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setMetalPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Metal</Text>
              </View>
            )}

            {tempCategory == 'Plastic' ? (
              <></>
            ) : (
              <View
                style={{
                  //borderWidth: 1,
                  //borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                  //marginRight: scale(30),
                  marginTop: verticalScale(5),
                }}>
                <CheckBox
                  disabled={false}
                  value={plasticPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setPlasticPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Plastic</Text>
              </View>
            )}

            {tempCategory == 'Paper' ? (
              <></>
            ) : (
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: '#000',
                  //marginRight: scale(30),
                  height: verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                  marginTop: verticalScale(5),
                }}>
                <CheckBox
                  disabled={false}
                  value={paperPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setPaperPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Paper</Text>
              </View>
            )}

            {tempCategory == 'Electronics' ? (
              <></>
            ) : (
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(100),
                  flexDirection: 'row',
                  //marginTop: verticalScale(20),
                  marginTop: verticalScale(5),
                }}>
                <CheckBox
                  disabled={false}
                  value={electronicsPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setElectronicsPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Electronics</Text>
              </View>
            )}

            {tempCategory == 'Corrugated Box' ? (
              <></>
            ) : (
              <View
                style={{
                  // borderWidth: 1,
                  // borderColor: '#000',
                  height: verticalScale(25),
                  width: scale(200),
                  flexDirection: 'row',
                  marginTop: verticalScale(5),
                  //marginTop: verticalScale(20),
                }}>
                <CheckBox
                  disabled={false}
                  value={boxPicked}
                  onCheckColor={'#A363A9'}
                  onValueChange={newValue => setBoxPicked(newValue)}
                />
                <Text style={styles.multiSelectText}>Corrugated box</Text>
              </View>
            )}
          </View>

          {/* {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              minimumDate={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )} */}

          <View style={styles.pickerStyle}>
            <Picker
              mode='dropdown'
              itemStyle={{ height: verticalScale(50) }}
              selectedValue={currentAddress}
              onValueChange={itemValue => {
                setCurrentAddress(itemValue);
              }}>
              <Picker.Item
                label="Scroll Pickup Address"
                value="Choose Pickup Address"
              />
              {myAddresses.map(key => (
                <Picker.Item
                  label={key.tags + ' , ' + key.address1 + ' , ' + key.address2}
                  value={key.tags + ' , ' + key.address1 + ' , ' + key.address2}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Address Screen', {
                userId: `${userId}`,
                email: `${email}`,
                phone: `${phone}`,
                landMark: `${tempLandmark}`,
                loadAgain: `${loadAgain}`,
                itemSelected: `${tempCategory}`,
                name: `${name}`,
                pincode: `${pincode}`,
              });
            }}>
            <View
              style={{
                alignSelf: 'center',
                width: scale(200),
                height: verticalScale(30),
                borderColor: '#5A2D94',
                borderWidth: 1,
                borderRadius: moderateScale(10),
                marginHorizontal: moderateScale(10),
                marginTop: verticalScale(20),
                paddingTop: verticalScale(5),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  textAlign: 'center',
                  color: '#5A2D94',
                  fontFamily: 'Ubuntu-Regular',
                  paddingTop: verticalScale(2),
                }}>
                Add New Address
              </Text>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginLeft: scale(20),
              marginRight: scale(20),
              borderRadius: moderateScale(100),
              marginHorizontal: moderateScale(10),
              marginTop: verticalScale(20),
            }}>
            <Picker
              itemStyle={{ height: verticalScale(50) }}
              mode='dropdown'
              selectedValue={pincode}
              onValueChange={itemValue => {
                setPincode(itemValue);
              }}>
              <Picker.Item label="Scroll to Choose Pincode" value="Choose Pincode" />
              {allPincodes.map(key => (
                <Picker.Item label={key} value={key} />
              ))}
            </Picker>
          </View>

          <Button title="Pick A Date" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            date={date}
            minimumDate={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
              console.log(date);
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />




          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: scale(10),
            }}>
            <TouchableOpacity
              onPress={() => {
                setShow(true);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: verticalScale(50),
                  borderRadius: moderateScale(100),
                  marginTop: verticalScale(10),
                  alignSelf: 'center',
                  //borderWidth: 1,
                  borderColor: '#000',
                  width: scale(180),
                }}>
                <Image
                  source={calender}
                  style={{
                    height: verticalScale(50),
                    width: scale(50),
                    resizeMode: 'contain',
                    marginLeft: scale(20),
                    //marginTop: verticalScale(15),
                  }}
                />

                <View
                  style={{
                    marginLeft: scale(15),
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(15),
                      textAlign: 'center',
                      color: '#5A2D94',
                      fontFamily: 'Ubuntu-Regular',
                    }}>
                    {`${dateLabel}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View> */}

          {isLoading == false ? (
            <View style={styles.pickupBtn}>
              <TouchableOpacity
                onPress={() => {
                  //addToList();
                  if (
                    currentAddress != 'Choose Pickup Address' &&
                    // dateLabel != 'Pick A Date' &&
                    pincode != 'Choose Pincode'
                  ) {
                    handlePickeup();
                  } else {
                    Alert.alert('Enter Valid Details');
                  }
                }}>
                <View
                  style={{
                    borderRadius: moderateScale(10),
                    height: verticalScale(45),
                    backgroundColor: '#000',
                    width: scale(220),
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(12),
                      alignSelf: 'center',
                      color: '#FFFFFF',
                      fontFamily: 'Ubuntu-Regular',
                      margin: moderateScale(5),
                      height: verticalScale(45),
                      paddingTop: verticalScale(12),
                      //paddingBottom: verticalScale(15),
                    }}>
                    Send Pickup Request
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <ActivityIndicator
              color="#A363A9"
              size={'large'}
              style={{
                marginTop: verticalScale(30),
              }}
            />
          )}

          <View>
            <TouchableOpacity
              onPress={() => {
                setUser();
                navigation.navigate('Category Screen');
                Alert.alert('You are logged out!');
              }}>
              <Text
                style={{
                  fontSize: moderateScale(18),
                  textAlign: 'center',
                  marginTop: verticalScale(2),
                  color: '#A363A9',
                  fontFamily: 'Ubuntu-Regular',
                  paddingBottom: verticalScale(20),
                  alignSelf: 'center',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
        </View>
      </ScrollView>
    </>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  textinput: {
    fontSize: moderateScale(20),
    height: verticalScale(45),
    borderColor: '#A363A9',
    borderRadius: moderateScale(100),
    paddingLeft: moderateScale(15),
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: verticalScale(10),
    marginLeft: scale(20),
    marginRight: scale(20),
    color: '#000000',
  },

  pickupBtn: {
    marginTop: verticalScale(20),

    marginLeft: scale(15),
    marginRight: scale(15),
    borderRadius: moderateScale(100),
    padding: moderateScale(6),
  },

  pickerStyle: {
    marginLeft: scale(20),
    height: verticalScale(45),
    //borderColor: '#A363A9',
    marginRight: scale(20),
    //marginTop:verticalScale(45),
    // borderRadius: moderateScale(100),
    //borderWidth: 1,
  },

  multiSelectText: {
    fontSize: moderateScale(13),
    padding: verticalScale(1),
    fontFamily: 'Ubuntu-Regular',
    color: '#000000',
    paddingTop: verticalScale(6),
    marginLeft: scale(10),
  },

  pckrbox: {
    //height: 40,
    //backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    borderBottomWidth: 1,
    //marginBottom: 25
    // borderBottomColor: "#48BFE3"
  },

});
