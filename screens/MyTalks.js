import React from 'react';
import { ScrollView, StyleSheet, View, ListView, ListItem, } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text, Content, } from 'native-base';
import { ExpoLinksView } from '@expo/samples';

import TalkCard from '../TalkCard';

import { firebaseApp } from '../firebase';

export default class MyTalks extends React.Component {
  static navigationOptions = {
    title: 'Mis charlas',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#3F51B5',
      elevation: 0,
      shadowOpacity: 0
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      currentTalkTime: 'perrito',
    };

    this.talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
    this.sitesRef = firebaseApp.database().ref().child('sites');
    this.showOrHideTalkInfo = this.props.screenProps.showOrHideTalkInfo;
    this.sites              = this.props.screenProps.sites;
    this.talks              = this.props.screenProps.talks;
    this.loggedUser         = this.props.screenProps.loggedUser;
    this.dataSourceUserTalks    = this.props.screenProps.dataSourceUserTalks;

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
  }

  componentDidMount() {
  }

  renderTimeYesOrNo(userTalk, talks, day) {
    console.log("userTalk-----------------------------------------------------", userTalk);
    let myTalk = talks.find(x => x._key === userTalk.talk);
    //console.log("MYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYTALK:::", myTalk);
    //console.log("UserTalk::::::::::::::::::::::::::::::::::::::::::::::::::", userTalk);
    if(myTalk.day == day) {
      if(myTalk.time == this.state.currentTalkTime) {
        return(
          <TalkCard talk={myTalk}
                    sites={this.props.screenProps.sites}
                    showOrHideTalkInfo={this.props.screenProps.showOrHideTalkInfo}
                    renderTime={false} />
        )
      }
      else {
        return(
          <TalkCard talk={myTalk}
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
    let talks = this.props.screenProps.talks;
    return (
      <Container>
        <View style={styles.container}>
          
          <ScrollView style={styles.container}>
            <Content>
              <Tabs>

                <Tab heading={ <TabHeading><Text>lun</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceUserTalks}
                    renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[0]) }
                    enableEmptySections={true}
                     />
                </Tab>
                <Tab heading={ <TabHeading><Text>mar</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceUserTalks}
                    renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[1]) }
                    enableEmptySections={true}
                     />
                </Tab>
                <Tab heading={ <TabHeading><Text>mie</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceUserTalks}
                    renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[2]) }
                    enableEmptySections={true}
                     />
                </Tab>
                <Tab heading={ <TabHeading><Text>jue</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceUserTalks}
                    renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[3]) }
                    enableEmptySections={true}
                     />
                </Tab>
                <Tab heading={ <TabHeading><Text>vie</Text></TabHeading> }>
                  <ListView
                    dataSource={this.props.screenProps.dataSourceUserTalks}
                    renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[4]) }
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  getStartedContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  weekDays: {
    color: '#ffffff',
  },
});
