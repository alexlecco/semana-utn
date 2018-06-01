import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, ListView, ListItem, YellowBox, } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import { Container, Header, Left, Right, Button,Text, Icon, Body, Title, Footer, FooterTab, } from 'native-base';

import TalkInfo from './TalkInfo';

import { firebaseApp } from './firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      talkInfoVisible: false,
      talk: {
        title: '',
        description: '',
        time: '',
        day: '',
        site: '',
        id: '',
      },
      dataSourceTalksMon: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
      dataSourceTalksTue: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
      dataSourceTalksWed: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
      dataSourceTalksThu: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
      dataSourceTalksFri: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
      dataSourceTalksSat: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
      dataSourceUserTalks: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      sites: [],
      talks: [],
      speakers: [],
      userTalks: [],
      logged: false,
      loggedUser: {},
      backTo: '',
    };
    showOrHideTalkInfo = this.showOrHideTalkInfo.bind(this);
    logoutWithFacebook = this.logoutWithFacebook.bind(this);
    this.usersRef = firebaseApp.database().ref().child('mobileUsers');
    this.sitesRef = firebaseApp.database().ref().child('sites');
    this.talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
    this.userTalksRef = firebaseApp.database().ref().child('userTalks');
    this.speakersRef = firebaseApp.database().ref().child('speakers');

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
    YellowBox.ignoreWarnings(['Warning: ...']);
    console.ignoredYellowBox = ['Setting a timer'];
  }

  async componentWillMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user != null) {
        this.setState({
          logged: true,
          loggedUser: user,
        })
        this.addUser(user);
        this.listenForUserTalks(this.userTalksRef.orderByChild('user').equalTo(user.uid));
      }
    });

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  componentDidMount() {
    this.listenForSites(this.sitesRef);
    this.listenForTalks(this.talksRef);
    this.listenForUsers(this.usersRef);
    this.listenForSpeakers(this.speakersRef);
    console.log("Los datos fueron leidos");
  }

  listenForSites(sitesRef) {
    sitesRef.on('value', (snap) => {
      var sites = [];
      snap.forEach((child) => {
        sites.push({
          name: child.val().name,
          id: child.val().id,
          color: child.val().color,
          photo: child.val().photo,
          _key: child.key,
        });
      });

      this.setState({
        sites: sites,
      });
    });
  }

  listenForSpeakers(speakersRef) {
    speakersRef.on('value', (snap) => {
      var speakers = [];
      snap.forEach((child) => {
        speakers.push({
          name: child.val().name,
          bio: child.val().bio,
          photo: child.val().photo,
          degree: child.val().degree,
          id: child.val().id,
          _key: child.key,
        });
      });

      this.setState({
        speakers: speakers,
      });
    });
  }

  listenForTalks(talksRef) {
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    var talksMon = [];
    var talksTue = [];
    var talksWed = [];
    var talksThu = [];
    var talksFri = [];
    var talksSat = [];
    var talks = [];

    talksRef.on('value', (snap) => {
      snap.forEach((child) => {
        switch(child.val().day){
          case 'monday':
            talksMon.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            talks.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            break;
          case 'tuesday':
            talksTue.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            talks.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            break;
          case 'wednesday':
            talksWed.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            talks.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            break;
          case 'thursday':
            talksThu.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            talks.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            break;
          case 'friday':
            talksFri.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            talks.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            break;
          case 'saturday':
            talksSat.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            talks.push({
              day: child.val().day,
              id: child.val().id,
              time: child.val().time,
              title: child.val().title,
              description: child.val().description,
              site: child.val().site,
              speaker: child.val().speaker,
              _key: child.key,
            });
            break;
        }
      });

      console.log("talksMon///////////////////////////////////", talksMon);
      console.log("talksTue(((((((((((((((((())))))))))))))))))", talksTue);
      console.log("talksWed=====================================", talksWed);
      console.log("talksThu???????????????????????????????????????", talksThu);
      console.log("talksFri¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿", talksFri);
      console.log("talksSatÇçççççÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇÇ", talksSat);
      console.log("talks*************************************************", talks);

      this.setState({
        dataSourceTalksMon: this.state.dataSourceTalksMon.cloneWithRows(talksMon),
        dataSourceTalksTue: this.state.dataSourceTalksTue.cloneWithRows(talksTue),
        dataSourceTalksWed: this.state.dataSourceTalksWed.cloneWithRows(talksWed),
        dataSourceTalksThu: this.state.dataSourceTalksThu.cloneWithRows(talksThu),
        dataSourceTalksFri: this.state.dataSourceTalksFri.cloneWithRows(talksFri),
        dataSourceTalksSat: this.state.dataSourceTalksSat.cloneWithRows(talksSat),
        talks: talks,
      });
    });
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  listenForUserTalks(userTalksRef) {
    userTalksRef.on('value', (snap) => {
      var userTalks = [];
      snap.forEach((child) => {
        userTalks.push({
          user: child.val().user,
          talk: child.val().talk,
          _key: child.key,
        });
      });

      var userTalksSorted = userTalks;

      var talksSorted = [];
      this.state.talks.forEach((talk) => {
        for(var i = userTalksSorted.length; i > 0; i--) {
          if(talk._key == this.getObjectOfArray(userTalksSorted, i - 1).talk) {
            talksSorted.push({
              _key: talk._key,
            })
          }
        }
      });

      userTalksSorted = [];
      talksSorted.forEach((talk) => {
        userTalksSorted.push({
          user: this.state.loggedUser.uid,
          talk: talk._key,
        });
      });

      this.setState({
        dataSourceUserTalks: this.state.dataSourceUserTalks.cloneWithRows(userTalksSorted),
        userTalks: userTalksSorted,
      });
    });
  }

  listenForUsers(usersRef) {
    usersRef.on('value', (snap) => {
      var users = [];
      snap.forEach((child) => {
        users.push({
          name: child.val().name,
          userId: child.val().userId,
          _key: child.val().userId,
        });
      });

      this.setState({ users: users });
    });
  }

  showOrHideTalkInfo(talk, backTo) {
    if(!this.state.talkInfoVisible) {
      this.setState({talkInfoVisible: !this.state.talkInfoVisible,
                     backTo: backTo,
                     talk: {
                     title: talk.title,
                     description: talk.description,
                     time: talk.time,
                     day: talk.day,
                     site: talk.site,
                     speaker: talk.speaker,
                     id: talk._key,
                    }
      });
    }
    else {
      this.setState({talkInfoVisible: !this.state.talkInfoVisible,
                     backTo: backTo,
                     talk: {
                     title: '',
                     description: '',
                     time: '',
                     day: '',
                     site: '',
                     speaker: '',
                     id: talk._key,
                    }
      });
    }
  }

  sortUserTalks(userTalksSorted) {
    this.setState({
      dataSourceUserTalks: this.state.dataSourceUserTalks.cloneWithRows(userTalksSorted),
      userTalks: userTalksSorted,
    });
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1709694409111214',
      { permissions: ['public_profile'] })

    if(type === 'success') {
      const credential = firebaseApp.auth.FacebookAuthProvider.credential(token)
      firebaseApp.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      });
      console.log("Sign-in successful");
    }
  }


  async logoutWithFacebook() {
    this.setState({ logged: false, loggedUser: {} });
    firebaseApp.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out successful");
    }, function(error) {
      // An error happened.
    });
  }

  addUser(loggedUser) {
      var ref =  firebaseApp.database().ref();
      var userRef = ref.child('mobileUsers');
      userRef.child(loggedUser.uid).set({
        name: loggedUser.displayName,
        userId: loggedUser.uid,
    }).key;
  }

  render() {
    let showOrHideTalkInfo = this.showOrHideTalkInfo;

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    if(this.state.logged) {
      if(this.state.talkInfoVisible) {
        return(
          <Container>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}

              <TalkInfo talk={this.state.talk}
                        talks={this.state.talks}
                        userTalks={this.state.userTalks}
                        backTo={this.state.backTo}
                        talkInfoVisible={this.state.talkInfoVisible}
                        showOrHideTalkInfo={this.showOrHideTalkInfo.bind(this)}
                        sortUserTalks={this.sortUserTalks.bind(this)}
                        dataSourceUserTalks={this.state.dataSourceUserTalks}
                        sites={this.state.sites}
                        speakers={this.state.speakers}
                        loggedUser={this.state.loggedUser} />

            </View>
          </Container>
        );
      }

      if(!this.state.talkInfoVisible) {
        return (
          <Container>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}

              <RootNavigation talkInfoVisible={this.state.talkInfoVisible}
                              showOrHideTalkInfo={this.showOrHideTalkInfo.bind(this)}
                              loggedUser={this.state.loggedUser}
                              sites={this.state.sites}
                              talks={this.state.talks}
                              userTalks={this.state.userTalks}
                              dataSourceTalksMon={this.state.dataSourceTalksMon}
                              dataSourceTalksTue={this.state.dataSourceTalksTue}
                              dataSourceTalksWed={this.state.dataSourceTalksWed}
                              dataSourceTalksThu={this.state.dataSourceTalksThu}
                              dataSourceTalksFri={this.state.dataSourceTalksFri}
                              dataSourceTalksSat={this.state.dataSourceTalksSat}
                              dataSourceUserTalks={this.state.dataSourceUserTalks} />
              <View>
                {
                false &&
                <Button full onPress={ () => this.logoutWithFacebook(this) }>
                  <Text> Salir { this.state.loggedUser.displayName } </Text>
                </Button>
                }
              </View>

            </View>
          </Container>
        );
      }
    } else {
      return(
          <Container>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}

              <ImageBackground
                source={require('./assets/images/loginScreen.png')}
                style={{width: '100%', height: '100%'}}>
                  <View style={styles.loginContainer}>
                    {
                      !this.state.logged ?
                        <Button rounded block onPress={ () => this.loginWithFacebook() }>
                          <Text> Ingresa con facebook </Text>
                        </Button> :
                        <View />
                    }
                  </View>
              </ImageBackground>

            </View>
          </Container>
        );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include  SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: '#3F51B5',
  },
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
});
