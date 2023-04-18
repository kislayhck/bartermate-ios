import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import BottomTabNavigator from './navigation/TabNavigator';

const MyStack = ({navigation}) => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default MyStack;
