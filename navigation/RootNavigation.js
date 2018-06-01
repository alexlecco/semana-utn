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
  }

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    let showOrHideTalkInfo  = this.props.showOrHideTalkInfo;
    let loggedUser          = this.props.loggedUser;
    let sites               = this.props.sites;
    let talks               = this.props.talks;
    let userTalks           = this.props.userTalks;
    let dataSourceTalksMon     = this.props.dataSourceTalksMon;
    let dataSourceTalksTue     = this.props.dataSourceTalksTue;
    let dataSourceTalksWed     = this.props.dataSourceTalksWed;
    let dataSourceTalksThu     = this.props.dataSourceTalksThu;
    let dataSourceTalksFri     = this.props.dataSourceTalksFri;
    let dataSourceTalksSat     = this.props.dataSourceTalksSat;
    let dataSourceUserTalks = this.props.dataSourceUserTalks;

    return (
      <RootStackNavigator screenProps={{showOrHideTalkInfo: this.props.showOrHideTalkInfo,
                                        loggedUser: this.props.loggedUser,
                                        sites: this.props.sites,
                                        talks: this.props.talks,
                                        userTalks: this.props.userTalks,
                                        dataSourceTalksMon: this.props.dataSourceTalksMon,
                                        dataSourceTalksTue: this.props.dataSourceTalksTue,
                                        dataSourceTalksWed: this.props.dataSourceTalksWed,
                                        dataSourceTalksThu: this.props.dataSourceTalksThu,
                                        dataSourceTalksFri: this.props.dataSourceTalksFri,
                                        dataSourceTalksSat: this.props.dataSourceTalksSat,
                                        dataSourceUserTalks: this.props.dataSourceUserTalks, }} />
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
