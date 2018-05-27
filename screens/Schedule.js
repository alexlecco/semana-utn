import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  Alert,
  ListView,
  ListItem,
} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content, } from 'native-base';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import TalkCard from '../TalkCard';

import { firebaseApp } from '../firebase';

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
      currentTalkTime: 'perrito',
      homeLink: "Home",
      homeMounted: true,
      talks: [],
    };
    this.showOrHideTalkInfo = this.props.screenProps.showOrHideTalkInfo;
    this.sites              = this.props.screenProps.sites;
    this.talks              = this.props.screenProps.talks;
    this.dataSourceTalks    = this.props.screenProps.dataSourceTalks;
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.readTalks(this.props.screenProps.talks);
  }

  readTalks(talks) {
    this.setState({ talks: talks });
  }

  changeCurrentTalkTime(time) {
    this.setState({currentTalkTime: time})
  }

  renderTimeYesOrNo(talk, day) {
    if(talk.day == day) {
      if(talk.time == this.state.currentTalkTime) {
        return(
          <TalkCard talk={talk}
                    sites={this.props.screenProps.sites}
                    showOrHideTalkInfo={this.props.screenProps.showOrHideTalkInfo}
                    renderTime={false} />
        )
      }
      else {
        return(
          <TalkCard talk={talk}
                    sites={this.props.screenProps.sites}
                    showOrHideTalkInfo={this.props.screenProps.showOrHideTalkInfo}
                    renderTime={true} />
        )
      }
    }
    else {
      return(
        <View />
      )
    }
  }

  render() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] ;
    let showOrHideTalkInfo = this.props.screenProps.showOrHideTalkInfo;
    let sites = this.props.screenProps.sites;
    let talks = this.props.screenProps.talks;
    
    return (
      <Container>
        <View style={styles.container}>

          <ScrollView style={styles.container}>
            <Content>
              <Tabs>
                
                <Tab heading={ <TabHeading><Text>lun</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceTalks}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[0]) }
                    enableEmptySections={true}
                     />
                </Tab>

                <Tab heading={ <TabHeading><Text>mar</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceTalks}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[1]) }
                    enableEmptySections={true}
                     />
                </Tab>

                <Tab heading={ <TabHeading><Text>mie</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceTalks}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[2]) }
                    enableEmptySections={true}
                     />
                </Tab>

                <Tab heading={ <TabHeading><Text>jue</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceTalks}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[3]) }
                    enableEmptySections={true}
                     />
                </Tab>

                <Tab heading={ <TabHeading><Text>vie</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceTalks}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[4]) }
                    enableEmptySections={true}
                     />
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
