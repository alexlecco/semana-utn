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
      dataSourceTalks: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataSourceUserTalks: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      sites: [],
      talks: [],
      userTalks: [],
      logged: false,
      loggedUser: {},
    };
    showOrHideTalkInfo = this.showOrHideTalkInfo.bind(this);
    logoutWithFacebook = this.logoutWithFacebook.bind(this);
    this.usersRef = firebaseApp.database().ref().child('mobileUsers');
    this.sitesRef = firebaseApp.database().ref().child('sites');
    this.talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
    this.userTalksRef = firebaseApp.database().ref().child('userTalks').orderByChild('user').equalTo('ocKH7VNdM1SnO1QBERdxXUhj3vn1');

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
    this.listenForUserTalks(this.userTalksRef);
    this.listenForUsers(this.usersRef);
    //console.log("=============");
    //console.log("Data was read");
    //console.log("=============");
  }

  listenForSites(sitesRef) {
    sitesRef.on('value', (snap) => {
      // get children as an array
      var sites = [];
      snap.forEach((child) => {
        sites.push({
          name: child.val().name,
          id: child.val().id,
          color: child.val().color,
          _key: child.key,
        });
      });

      this.setState({
        sites: sites,
      });
    });
  }

  listenForTalks(talksRef) {
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
          site: child.val().site,
          _key: child.key,
        });
      });

      this.setState({
        dataSourceTalks: this.state.dataSourceTalks.cloneWithRows(talks),
        talks: talks,
      });
    });
  }

  listenForUserTalks(userTalksRef) {
    userTalksRef.on('value', (snap) => {
      // get children as an array
      var userTalks = [];
      snap.forEach((child) => {
        userTalks.push({
          user: child.val().user,
          talk: child.val().talk,
          _key: child.key,
        });
      });

      this.setState({
        dataSourceUserTalks: this.state.dataSourceUserTalks.cloneWithRows(userTalks),
        userTalks: userTalks,
      });
    });
  }

  listenForUsers(usersRef) {
    usersRef.on('value', (snap) => {
      // get children as an array
      var users = [];
      snap.forEach((child) => {
        users.push({
          name: child.val().name,
          userId: child.val().userId,
          _key: child.key,
        });
      });

      this.setState({ users: users });
    });
  }

  showOrHideTalkInfo(talk) {
    if(!this.state.talkInfoVisible) {
      this.setState({talkInfoVisible: !this.state.talkInfoVisible,
                     talk: {
                     title: talk.title,
                     description: talk.description,
                     time: talk.time,
                     day: talk.day,
                     site: talk.site,
                     id: talk._key,
                    }
      });
    }
    else {
      this.setState({talkInfoVisible: !this.state.talkInfoVisible,
                     talk: {
                     title: '',
                     description: '',
                     time: '',
                     day: '',
                     site: '',
                     id: talk._key,
                    }
      });
    }
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
     firebaseApp.database().ref('mobileUsers').push({
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
                        userTalks={this.state.userTalks}
                        talkInfoVisible={this.state.talkInfoVisible}
                        showOrHideTalkInfo={this.showOrHideTalkInfo.bind(this)}
                        sites={this.state.sites}
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
                              dataSourceTalks={this.state.dataSourceTalks}
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
