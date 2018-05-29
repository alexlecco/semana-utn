import React from 'react';
import { ScrollView, StyleSheet, View, Image, TouchableHighlight, } from 'react-native';
import { Text, Textarea, Form, Content, Container, Button, } from 'native-base';
import { ExpoConfigView } from '@expo/samples';

import { firebaseApp } from '../firebase';

export default class Information extends React.Component {
  static navigationOptions = {
    title: 'Informacion',
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
      infos: [],
      feedbackVisible: false,
    }
    this.infosRef = firebaseApp.database().ref().child('infos');
  }

  componentDidMount() {
    this.listenForInfos(this.infosRef);
  }

  listenForInfos(infosRef) {
    infosRef.on('value', (snap) => {
      // get children as an array
      var infos = [];
      snap.forEach((child) => {
        infos.push({
          body: child.val().body,
          title: child.val().title,
          _key: child.key,
        });
      });

      this.setState({
        infos: infos,
      });
    });
  }

  getObjectOfArray(array, index) {
    return array[index] = array[index] || {};
  }

  showOrHideFeedback() {
    this.setState({feedbackVisible: !this.state.feedbackVisible});
  }

  render() {
    let infos = this.state.infos;
    let showOrHideFeedback = this.showOrHideFeedback;

    if(!this.state.feedbackVisible) {
      return(
        <ScrollView style={styles.container}>
          <View style={styles.getStartedContainer}>
            <Text style={styles.infoTitle}> { this.getObjectOfArray(infos, 0).title } </Text>
          </View>
          <View style={styles.infoImageContainer}>
            <Image
              source={require('../assets/images/decano.png')}
              style={styles.infoImage}
            />
          </View>
          <View style={styles.getStartedContainer}>
            <Text style={styles.infoBody}> { this.getObjectOfArray(infos, 0).body } </Text>
          </View>
          <View >
            <TouchableHighlight style={styles.feedbackButtonContainer} onPress={() => this.showOrHideFeedback()}>
              <Text style={styles.feedbackButton}> dejanos tu comentario sobre nuestra app </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      );
    } else {
      return(
        <Container>
          <View style={styles.container}>
            <Text> Gracias por colaborar.</Text>
            <Text>
              Contanos que te pareció la aplicación. Dejanos alguna sugerencia que se te ocurra.
            </Text>
            
            <Content padder>
              <Form>
                <Textarea rowSpan={5} bordered placeholder="opinión, comentarios y sugerencias" />
              </Form>
            </Content>

            <Button full primary onPress={() => this.showOrHideFeedback()} >
              <Text>
                Enviar
              </Text>
            </Button>
          </View>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  feedbackText: {
    fontSize: 30,
    color: '#F5FCFF',
    margin: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: '#4A7AFF',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoImageContainer: {
    justifyContent:'center',
    alignItems:'center',
    margin: 10,
  },
  infoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  infoBody: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  getStartedContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  feedbackButtonContainer: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    marginTop: 30,
    marginBottom: 20,
  },
  feedbackButton: {
    color: '#3F51B5',
  },
});
