import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, } from 'react-native';
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
      },
      sites: [],
      logged: false,
      loggedUser: {},
    };
    showOrHideTalkInfo = this.showOrHideTalkInfo.bind(this);
    updateSites = this.updateSites.bind(this);
    logoutWithFacebook = this.logoutWithFacebook.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if(user != null) {
        this.setState({
          logged: true,
          loggedUser: user,
        })
        //console.log(user)
        
        this.addUser(user);
      }
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
                     }
      });
    }
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  updateSites(sites) {
    this.setState({sites: sites});
  }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1709694409111214',
      { permissions: ['public_profile'] })

    if(type === 'success') {
      const credential = firebaseApp.auth.FacebookAuthProvider.credential(token)
      firebaseApp.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      });
      this.
      console.log("Sign-in successful");
    }
  }

  addUser(loggedUser) {
     firebaseApp.database().ref('users').push({
      name: loggedUser.displayName,
      userId: loggedUser.uid,
    }).key;
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

  render() {
    let showOrHideTalkInfo = this.showOrHideTalkInfo;
    let updateSites = this.updateSites;
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
                        talkInfoVisible={this.state.talkInfoVisible}
                        showOrHideTalkInfo={this.showOrHideTalkInfo.bind(this)}
                        sites={this.state.sites} />

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
                              updateSites={this.updateSites.bind(this)} />
              <View>
                {
                true &&  
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
