import React from 'react';
import {Text, View, Image} from 'react-native';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import query from '../assets/query.png';

const SupportScreen = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#EF6563',
        }}>
        <View
          style={{
            backgroundColor: '#EF6563',
            height: verticalScale(400),
            marginHorizontal: scale(20),
            borderRadius: moderateScale(10),
            marginTop: verticalScale(60),
          }}>
          <Image
            source={query}
            style={{
              height: verticalScale(250),
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: verticalScale(50),
            }}
          />
        </View>
      </View>
    </>
  );
};

export default SupportScreen;
