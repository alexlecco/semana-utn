import React from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content, } from 'native-base';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, Button, Alert, ListView, ListItem, } from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import TalkCard from '../TalkCard';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBkFWsGygllForJ1r4u9x3IcosoqBVCxq0",
  authDomain: "semana-utn-c9f91.firebaseapp.com",
  databaseURL: "https://semana-utn-c9f91.firebaseio.com",
  projectId: "semana-utn-c9f91",
  storageBucket: "semana-utn-c9f91.appspot.com",
  messagingSenderId: "385895562914"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Schedule extends React.Component {
  static navigationOptions = {
    title: 'Cronograma',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#3F51B5',
      elevation: 0,
      shadowOpacity: 0
    },
    headerTitleStyle: {
      fontSize: 18,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.talksRef = this.getRef().child('talks').orderByChild('time');
    let showOrHideTalkInfo = this.props.screenProps;

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.talksRef);
  }

  listenForItems(talksRef) {
    talksRef.on('value', (snap) => {

      // get children as an array
      var talks = [];

      snap.forEach((child) => {
        talks.push({

          day: child.val().day,
          id: child.val().id,
          time: child.val().time,
          title: child.val().title,
          description: child.val().description,
          _key: child.key,

        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(talks)
      });

    });
  }

  _renderItem(item) {
    if (item.day == 'tuesday') {
      return (
        <TalkCard talkTime={item.time} talkTitle={item.title}  />
      );
    }
    else{
      return(
        <View></View>
      );
    }
  }

  render() {
    const day1 = 'monday';
    const day2 = 'tuesday';
    const day3 = 'wednesday';
    const day4 = 'thursday';
    const day5 = 'friday';
    let showOrHideTalkInfo = this.props.screenProps;
    return (
      <Container>
        <View style={styles.container}>

          <ScrollView style={styles.container}>
            <Content>
              <Tabs>
                <Tab heading={ <TabHeading><Text>lun</Text></TabHeading> }>
                  <ListView 
                    dataSource={this.state.dataSource}
                    renderRow={(item) => 
                                  item.day == day1 ?
                                    <TalkCard talk={item}
                                              showOrHideTalkInfo={this.props.screenProps} /> :
                                    <View></View>} />
                </Tab>
                <Tab heading={ <TabHeading><Text>mar</Text></TabHeading> }>
                  <ListView dataSource={this.state.dataSource} renderRow={(item) => item.day == day2 ? <TalkCard talk={item} showOrHideTalkInfo={this.props.screenProps} /> : <View></View>} />
                </Tab>
                <Tab heading={ <TabHeading><Text>mie</Text></TabHeading> }>
                  <ListView dataSource={this.state.dataSource} renderRow={(item) => item.day == day3 ? <TalkCard talk={item} showOrHideTalkInfo={this.props.screenProps} /> : <View></View>} />
                </Tab>
                <Tab heading={ <TabHeading><Text>jue</Text></TabHeading> }>
                  <ListView dataSource={this.state.dataSource} renderRow={(item) => item.day == day4 ? <TalkCard talk={item} showOrHideTalkInfo={this.props.screenProps} /> : <View></View>} />
                </Tab>
                <Tab heading={ <TabHeading><Text>vie</Text></TabHeading> }>
                  <ListView dataSource={this.state.dataSource} renderRow={(item) => item.day == day5 ? <TalkCard talk={item} showOrHideTalkInfo={this.props.screenProps} /> : <View></View>} />
                </Tab>
              </Tabs>
            </Content>
          </ScrollView>

        </View>
      </Container>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  weekDays: {
    color: '#ffffff',
  },
});
