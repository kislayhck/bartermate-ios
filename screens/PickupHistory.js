import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const PickupHistoryScreen = ({ route, navigation }) => {
  var email = route.params.email;

  //var history = [];

  const [history, setHistory] = useState([]);
  //var history = [];

  const [loading, setLoading] = useState(true);

  const handleOrderHistory = () => {
    var data = JSON.stringify({
      email: `${email}`,
    });

    var config = {
      method: 'post',
      url: 'https://talented-lamb-pleat.cyclic.app/admin/registration-api/pickedupHistoy',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setLoading(false);
        console.log(JSON.stringify(response.data.data));
        var temp = JSON.stringify(response.data.data);
        setHistory(JSON.parse(temp).reverse());
        //history = JSON.parse(temp);
      })
      .catch(function (error) {
        setLoading(false);
        Alert.alert('Something went wrong!');
        console.log(error);
      });
  };

  //handleOrderHistory();

  useEffect(handleOrderHistory, []);

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        {history.length == 0 ? (
          <Text
            style={{
              fontSize: moderateScale(16),
              color: '#5A2D94',
              alignSelf: 'center',
              marginTop: verticalScale(40),
              fontFamily: 'Ubuntu-Bold',
            }}>
            You haven't placed any order yet.
          </Text>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              paddingBottom: verticalScale(100),
            }}>
            {loading == true ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: verticalScale(100),
                }}>
                <ActivityIndicator size={'large'} color="#A363A9" />
              </View>
            ) : (
              history.map(key => (
                <View
                  style={{
                    height: verticalScale(210),
                    width: scale(292),
                    borderBottomWidth: 1,
                    borderBottomColor: '#CAD5E2',
                    alignSelf: 'center',
                    marginTop: verticalScale(20),
                    borderRadius: moderateScale(10),
                    paddingHorizontal: moderateScale(10),
                    paddingTop: verticalScale(20),
                    marginHorizontal: scale(10),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: moderateScale(16),
                          color: '#5A2D94',
                          fontFamily: 'Ubuntu-Bold',
                          width: scale(120),
                        }}>
                        {key.category} ,
                      </Text>
                      <Text
                        style={{
                          fontSize: moderateScale(16),
                          color: '#5A2D94',
                          fontFamily: 'Ubuntu-Bold',
                          width: scale(120),
                        }}>
                        {key.subcategory}
                      </Text>
                    </View>
                    {key.isComplete == true ? (
                      <Text
                        style={{
                          marginTop: verticalScale(10),
                          fontSize: moderateScale(14),
                          color: 'green',
                          width: scale(180),
                          marginLeft: scale(15),
                          fontFamily: 'Ubuntu-Regular',
                        }}>
                        Order Status : Completed
                      </Text>
                    ) : (
                      <Text
                        style={{
                          marginTop: verticalScale(10),
                          fontSize: moderateScale(12),
                          color: 'red',
                          width: scale(180),
                          marginLeft: scale(15),
                          fontFamily: 'Ubuntu-Regular',
                        }}>
                        Order Status : Not Completed
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        marginTop: verticalScale(10),
                        fontSize: moderateScale(14),
                        color: '#000',
                        fontFamily: 'Ubuntu-Regular',
                      }}>
                      Order date : {key.createdDate.substring(0, 10)}
                    </Text>
                    <Text
                      style={{
                        marginTop: verticalScale(10),
                        fontSize: moderateScale(14),
                        color: '#000',
                        fontFamily: 'Ubuntu-Regular',
                      }}>
                      Pickup date : {key.pickupDate.substring(0, 10)}
                    </Text>
                    <Text
                      style={{
                        marginTop: verticalScale(10),
                        fontSize: moderateScale(14),
                        color: '#000',
                        fontFamily: 'Ubuntu-Regular',
                      }}>
                      Pickup Address : {key.address}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default PickupHistoryScreen;