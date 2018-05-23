import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, } from 'react-native';
import { Container, Header, Left,
         Body, Icon, Title, Right,
         Content, Footer, FooterTab,
         Button, Text, Card, CardItem,
         Thumbnail,
} from 'native-base';

import { firebaseApp } from './firebase';

export default class TalkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: '',
      userTalkId: '',
    }
    this.loggedUser = this.props.loggedUser;
    this.sites = this.props.sites;
    this.userTalks = this.props.userTalks;
  }

  componentDidMount() {
    this.askButtonText(this.props.loggedUser, this.props.talk);
  }

  askButtonText(loggedUser, talk) {
    var text = '';
    var userTalkId = '';

    firebaseApp.database().ref().child('userTalks')
      .orderByChild('user')
      .equalTo(loggedUser.uid)
      .on('child_added', (snap) => {
        userTalk = snap.val();
        if(userTalk.talk == talk.id) {
          text = 'Ya no me interesa';
          console.log(userTalk);
        }
      });

    text == 'Ya no me interesa' ?
      this.setState({ buttonText: 'Ya no me interesa' }) :
      this.setState({ buttonText: 'Me interesa' })
  }

  addUserTalk(loggedUser, talk) {
    //console.log("talk por param::::::::::::::::::::::::::::::::::::::::::::::::::::::::", talk);
    if(this.state.buttonText === 'Ya no me interesa') {
      var userTalkRef = firebaseApp.database().ref();
      var query = userTalkRef.child('userTalks').orderByChild('_key').equalTo(talk.id);
      query.once('value', function(snap) {
        snap.ref.remove()
        //console.log("snap.ref::::::::::::::::::::::::::::::::::::::::::::::::::::::::", snap.ref);
      })
    } else {
      firebaseApp.database().ref('userTalks').push({
        user: loggedUser.uid,
        talk: talk.id,
      }).key;
    }

    this.state.buttonText === 'Ya no me interesa' ?
      this.setState({ buttonText: 'Me interesa' }) :
      this.setState({ buttonText: 'Ya no me interesa' })
  }


  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  render() {
    sites = this.props.sites;
    userTalks = this.props.userTalks;
    loggedUser = this.props.loggedUser;

    //console.log("this.props.userTalks___________________________________________", this.props.userTalks);
   
    let day = this.props.talk.day;
    let dayToShow = 'perrito';
    switch(day) {
      case 'monday':
        dayToShow = 'lunes';
        break;
      case 'tuesday':
        dayToShow = 'martes';
        break;
      case 'wednesday':
        dayToShow = 'miercoles';
        break;
      case 'thursday':
        dayToShow = 'jueves';
        break;
      case 'friday':
        dayToShow = 'viernes';
        break;
    }

    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.showOrHideTalkInfo(this.props.talk)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title> { dayToShow } - { this.props.talk.time } </Title>
            <Text style={{marginLeft: 15, color: `${this.getObjectOfArray(sites, this.props.talk.site - 1).color || 'red'}`}}>
              { this.getObjectOfArray(this.props.sites, this.props.talk.site - 1 ).name }
            </Text>
          </Body>
        </Header>
        <Content>
          <View style={styles.TalkContainer}>
            <View style={styles.TalkTitleContainer}>
              <Text style={styles.TalkTitle}> { this.props.talk.title } </Text>
            </View>
            <View style={styles.TalkBodyContainer}>
              <Text style={styles.TalkBody}> { this.props.talk.description } </Text>
            </View>
            <View style={styles.TalkOratorContainer}>
              <Text style={styles.TalkOrator}> Orador: Mark Zuckerberg </Text>
            </View>
            <Card>
              <CardItem cardBody>
                <Image source={require('./assets/images/map.png')} style={{height: 200, width: null, flex: 1}}/>
              </CardItem>
            </Card>
          </View>
        </Content>
        <Button full primary={this.state.buttonText === 'Me interesa' ? true : false}
                full primary transparent={this.state.buttonText === 'Ya no me interesa' ? true : false}
                onPress={() => this.addUserTalk(this.props.loggedUser, this.props.talk)}>
          <Text>
            { `${this.state.buttonText}` }
          </Text>
        </Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  TalkContainer: {
    flexDirection: 'column',
  },
	TalkTitleContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	TalkBodyContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
  TalkOratorContainer: {
		marginTop: 10,
		marginRight: 15,
		marginLeft: 15,
    marginTop: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
  },
  TalkMapContainer: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
  },
  TalkTitle: {
		fontSize: 20,
    color: '#3F51B5',
	},
  TalkBody: {
		fontSize: 17,
    color: '#4f4f4f',
	},
  TalkOrator: {
    fontSize: 17,
    color: '#000000',
    textAlign: 'justify',
  }
});
