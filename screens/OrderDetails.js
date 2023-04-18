import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';

const OrderDetailsScreen = ({route}) => {
  var orderStatus = route.params.orderStatus;
  if (orderStatus == 'false') {
    orderStatus = 'Not Completed';
  } else {
    orderStatus = 'Completed';
  }
  var pickupAddress = route.params.pickupAddress;
  var pincode = route.params.pincode;
  var pickupTime = route.params.pickupTime;

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <LinearGradient
          colors={['#A363A9', '#FAB06D']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            alignSelf: 'center',
            width: scale(300),
            marginTop: verticalScale(30),
            backgroundColor: '#FFF',
            elevation: 5,
            padding: moderateScale(10),
            borderRadius: moderateScale(20),
          }}>
          <Text style={styles.text}>Order Status : {orderStatus}</Text>
          <Text style={styles.text}>Pickup Address : {pickupAddress}</Text>
          {/* <Text style={styles.text}>Pickup Time 24 hrs : {pickupTime}</Text> */}
          <Text style={styles.text}>Pincode : {pincode}</Text>
        </LinearGradient>
      </View>
    </>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(18),
    marginBottom: verticalScale(10),
    fontWeight: 'bold',
    color: '#FFf',
  },
});
