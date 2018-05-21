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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      dataSource2: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      sites: [],
    };
    this.talksRef = firebaseApp.database().ref().child('talks').orderByChild('time');
    //cambiar por loggedUser.uid
    this.userTalksRef = firebaseApp.database().ref().child('userTalks').orderByChild('user').equalTo('ocKH7VNdM1SnO1QBERdxXUhj3vn1');
    this.sitesRef = firebaseApp.database().ref().child('sites');
    this.showOrHideTalkInfo = this.props.screenProps.showOrHideTalkInfo;
    this.updateSites        = this.props.screenProps.updateSites;

    console.disableYellowBox = true;
    console.warn('YellowBox is disabled.');
  }

  componentDidMount() {
    this.listenForUserTalks(this.userTalksRef);
    this.listenForTalks(this.talksRef);
    this.listenForSites(this.sitesRef);
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
        dataSource2: this.state.dataSource2.cloneWithRows(userTalks),
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
        dataSource: this.state.dataSource.cloneWithRows(talks),
      });
    });
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

      this.props.screenProps.updateSites(sites);
    });
  }

  renderTimeYesOrNo(talk, day) {
    if(talk.day == day) {
      if(talk.time == this.state.currentTalkTime) {
        return(
          <TalkCard talk={talk}
                    sites={this.state.sites}
                    showOrHideTalkInfo={this.props.screenProps.showOrHideTalkInfo}
                    renderTime={false} />
        )
      }
      else {
        return(
          <TalkCard talk={talk}
                    sites={this.state.sites}
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
    return (
      <Container>
        <View style={styles.container}>
          
          <ScrollView style={styles.container}>
            <Content>
              <Tabs>

                <Tab heading={ <TabHeading><Text>lun</Text></TabHeading> }>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[0]) }
                    enableEmptySections={true}
                     />
                </Tab>
                <Tab heading={ <TabHeading><Text>mar</Text></TabHeading> }>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[1]) }
                    enableEmptySections={true}
                     />
                </Tab>
                <Tab heading={ <TabHeading><Text>mie</Text></TabHeading> }>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[2]) }
                    enableEmptySections={true}
                     />
                </Tab>
                <Tab heading={ <TabHeading><Text>jue</Text></TabHeading> }>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(talk) => this.renderTimeYesOrNo(talk, days[3]) }
                    enableEmptySections={true}
                     />
                </Tab>
                <Tab heading={ <TabHeading><Text>vie</Text></TabHeading> }>
                  <ListView
                    dataSource={this.state.dataSource}
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
