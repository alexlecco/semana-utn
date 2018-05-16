import { Notifications } from 'expo';
import React from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  constructor(props) {
    super(props);
    console.log("props en RootNavigator::::::::", this.props)
  }

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    let showOrHideTalkInfo = this.props.showOrHideTalkInfo;
    let updateSites = this.props.updateSites;
    console.log("props en RENDEEEEEER de RootNavigator:::", this.props);
    return (
      <RootStackNavigator screenProps={{showOrHideTalkInfo: this.props.showOrHideTalkInfo,
                                       updateSites: this.props.updateSites}} />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  }
};
