import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import Schedule from '../screens/Schedule';
import MyTalks from '../screens/MyTalks';
import Information from '../screens/Information';

export default TabNavigator(
  {
    Cronograma: {
      screen: Schedule,
    },
    Links: {
      screen: MyTalks,
    },
    Information: {
      screen: Information,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Cronograma':
            iconName = Platform.OS === 'ios' ?
              `ios-information-circle${focused ? '' : '-outline'}` :
              'md-calendar';
            break;
          case 'Links':
            iconName = Platform.OS === 'ios' ?
              `ios-link${focused ? '' : '-outline'}` :
              'md-heart';
            break;
          case 'Information':
            iconName = Platform.OS === 'ios' ?
              `ios-options${focused ? '' : '-outline'}` :
              'md-information-circle';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
