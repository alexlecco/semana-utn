import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, ScrollView, } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Icon,
  Title,
  Right,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Card,
  CardItem,
  Thumbnail,
} from 'native-base';

import { firebaseApp } from './firebase';

export default class TalkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: '',
      backTo: '',
    }
    this.loggedUser = this.props.loggedUser;
    this.sites = this.props.sites;
    this.speakers = this.props.speakers;
    this.userTalks = this.props.userTalks;
    this.backTo = this.props.backTo;
  }

  componentWillMount() {
    this.setBackTo();
  }

  componentDidMount() {
    this.askButtonText(this.props.loggedUser, this.props.talk);
  }

  askButtonText(loggedUser, talk) {
    var text = 'Me interesa';

    firebaseApp.database().ref().child('userTalks')
      .orderByChild('user')
      .equalTo(loggedUser.uid)
      .on('child_added', (snap) => {
        userTalk = snap.val();
        if(userTalk.talk == talk.id) {
          text = 'Ya no me interesa';
        }
      });

    text == 'Ya no me interesa' ?
      this.setState({ buttonText: 'Ya no me interesa' }) :
      this.setState({ buttonText: 'Me interesa' })
  }

  setBackTo() {
    //this.setState({ backTo: this.props.backTo });
    console.log("VolVER A:::::::::::::::::::::::::::::::::::::::::::::::::::::::::", this.props.backTo);
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  addOrRemoveUserTalk(loggedUser, talk) {
    var text = 'Me interesa';

    if(this.state.buttonText == 'Ya no me interesa') {
      var databaseRef = firebaseApp.database().ref().child('userTalks')
        .orderByChild('user')
        .equalTo(loggedUser.uid)
        .once('value', (snap) => {
          
          var userTalks = [];
          snap.forEach((child) => {
            userTalks.push({
              user: child.val().user,
              talk: child.val().talk,
              _key: child.key,
            })
          });

          for(var i = userTalks.length; i >= 0 ; i-- ) {
            if( this.getObjectOfArray(userTalks, i).talk == talk.id) {
              userTalk = userTalks[i];
            }
          }

          if(userTalk.talk == talk.id) {
            text = 'Me interesa';
            keyToRemove = ''
            console.log("DESTRUIMO");
            snap.forEach((child) => {
              if(child.child('talk').val() == userTalk.talk) {
                keyToRemove = child.key
              }
            });
          }

          snap.ref.child(keyToRemove).remove();
        })
    } else {
      text = 'Ya no me interesa';
      console.log("CREAMO");
      firebaseApp.database().ref().child('userTalks').push({
        user: loggedUser.uid,
        talk: talk.id,
      }).key;
    }

    text == 'Me interesa' ?
      this.setState({ buttonText: 'Me interesa' }) :
      this.setState({ buttonText: 'Ya no me interesa' })
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  getSpeakerPhoto(photo) {
    return `https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/speakers%2F${photo}.png?alt=media`
  }

  getMapPhoto(photo) {
    return photo != undefined ?
      `https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/maps%2F${photo}.png?alt=media` :
      "https://firebasestorage.googleapis.com/v0/b/semana-utn-c9f91.appspot.com/o/maps%2Fno-map.png?alt=media"
  }

  render() {
    sites = this.props.sites;
    speakers = this.props.speakers;
    userTalks = this.props.userTalks;
    loggedUser = this.props.loggedUser;
    talk = this.props.talk;
    speaker = this.getObjectOfArray(speakers, this.props.talk.speaker - 1);
    site = this.getObjectOfArray(sites, this.props.talk.site - 1);

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
            <View style={styles.speakerContainer}>
              <View style={styles.TalkSpeakerContainer}>
                <Text style={styles.TalkSpeaker}>
                {
                  this.props.talk.speaker ?
                    `Disertante: ${speaker.name}` : ""
                }
                </Text>
              </View>
              <View>
                {
                  speaker.photo ?
                    <Image source={{uri: this.getSpeakerPhoto(speaker.photo)}}
                           style={{height: 200, width: null, flex: 1}}
                           style={styles.infoImage} /> : <Text />
                }
              </View>
              <View style={styles.TalkSpeakerBioContainer}>
                <Text style={styles.TalkSpeakerBio}>
                  {
                    speaker.bio ?
                      speaker.bio : ""
                  }
                </Text>
              </View>
            </View>
          </View>
          <View>
            {
              site.photo ?
              <View>
                <View><Text>Ubicación: </Text></View>
                <Card>
                  <CardItem cardBody>
                    <Image source={{uri: this.getMapPhoto(site.photo)}} style={{height: 200, width: null, flex: 1}} />  
                  </CardItem>
                </Card>
              </View> : <Text />
            }
          </View>
        </Content>
        <Button full primary={this.state.buttonText == 'Me interesa' ? true : false}
                full primary transparent={this.state.buttonText == 'Ya no me interesa' ? true : false}
                onPress={() => this.addOrRemoveUserTalk(this.props.loggedUser, this.props.talk)} >
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
  TalkSpeakerContainer: {
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
  TalkSpeaker: {
    fontSize: 17,
    color: '#000000',
    textAlign: 'justify',
  },
  TalkSpeakerBio: {
    fontSize: 17,
    color: '#727272',
    textAlign: 'justify',
    fontStyle: 'italic',
  },
  TalkSpeakerBioContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  infoImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  speakerContainer: {
    justifyContent:'center',
    alignItems:'center',
    margin: 10,
  },
});
