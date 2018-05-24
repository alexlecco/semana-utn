import React from 'react';
import { ScrollView, StyleSheet, View, ListView, ListItem, Dimensions, } from 'react-native';
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
      userTalksMon: [],
      userTalksTue: [],
      userTalksWed: [],
      userTalksThu: [],
      userTalksFri: [],
    };

    this.talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
    this.sitesRef = firebaseApp.database().ref().child('sites');
    this.showOrHideTalkInfo  = this.props.screenProps.showOrHideTalkInfo;
    this.sites               = this.props.screenProps.sites;
    this.talks               = this.props.screenProps.talks;
    this.userTalks           = this.props.screenProps.userTalks;
    this.loggedUser          = this.props.screenProps.loggedUser;
    this.dataSourceUserTalks = this.props.screenProps.dataSourceUserTalks;

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
  }

  componentDidMount() {
    this.readUserTalksByDay(this.props.screenProps.talks, this.props.screenProps.userTalks);
  }

  readUserTalksByDay(talks, userTalks) {
    var arrayUserTalksMon = [];
    var arrayUserTalksTue = [];
    var arrayUserTalksWed = [];
    var arrayUserTalksThu = [];
    var arrayUserTalksFri = [];
    for (var i = talks.length - 1; i >= 0; i--) {
      for (var j = userTalks.length - 1; j >= 0; j--) {
        if(talks[i]._key == userTalks[j].talk) {
          switch(talks[i].day) {
            case 'monday':
              arrayUserTalksMon.push(talks[i]);
              break;
            case 'tuesday':
              arrayUserTalksTue.push(talks[i]);
              break;
            case 'wednesday':
              arrayUserTalksWed.push(talks[i]);
              break;
            case 'thursday':
              arrayUserTalksThu.push(talks[i]);
              break;
            case 'friday':
              arrayUserTalksFri.push(talks[i]);
              break;
          }
        }
      }
      this.setState({
        userTalksMon: arrayUserTalksMon,
        userTalksTue: arrayUserTalksTue,
        userTalksWed: arrayUserTalksWed,
        userTalksThu: arrayUserTalksThu,
        userTalksFri: arrayUserTalksMon,
      });
    }
  }

  renderTimeYesOrNo(userTalk, talks, day) {
    //console.log("userTalk-----------------------------------------------------", userTalk);
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
    const message = 'Aún no tenés charlas agregadas este día';
    let talks = this.props.screenProps.talks;
    return (
      <Container>
        <View style={styles.container}>
          
          <ScrollView style={styles.container}>
            <Content>
              <Tabs>

                <Tab heading={ <TabHeading><Text>lun</Text></TabHeading> }>
                  {
                    this.state.userTalksMon.length != 0 ?
                      <ListView
                        dataSource={this.props.screenProps.dataSourceUserTalks}
                        renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[0]) }
                        enableEmptySections={true} /> :
                      <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
                  }
                </Tab>
                <Tab heading={ <TabHeading><Text>mar</Text></TabHeading> }>
                  {
                    this.state.userTalksTue.length != 0 ?
                      <ListView
                        dataSource={this.props.screenProps.dataSourceUserTalks}
                        renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[1]) }
                        enableEmptySections={true} /> :
                      <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
                  }
                </Tab>
                <Tab heading={ <TabHeading><Text>mie</Text></TabHeading> }>
                  {
                    this.state.userTalksWed.length != 0 ?
                      <ListView
                        dataSource={this.props.screenProps.dataSourceUserTalks}
                        renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[2]) }
                        enableEmptySections={true} /> :
                      <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
                  }
                </Tab>
                <Tab heading={ <TabHeading><Text>jue</Text></TabHeading> }>
                  {
                    this.state.userTalksThu.length != 0 ?
                      <ListView
                        dataSource={this.props.screenProps.dataSourceUserTalks}
                        renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[3]) }
                        enableEmptySections={true} /> :
                      <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
                  }
                </Tab>
                <Tab heading={ <TabHeading><Text>vie</Text></TabHeading> }>
                  {
                    this.state.userTalksFri.length != 0 ?
                      <ListView
                        dataSource={this.props.screenProps.dataSourceUserTalks}
                        renderRow={(userTalk) => this.renderTimeYesOrNo(userTalk, this.props.screenProps.talks, days[4]) }
                        enableEmptySections={true} /> :
                      <View style={styles.empty}><Text style={styles.emptyText}> { message } </Text></View>
                  }
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: Dimensions.get('window').width / 2,
    marginLeft: 50,
    marginRight: 50,
  },
  emptyText: {
    textAlign: 'center',
    color: '#575757',
  },
});
