'use strict'

import React, { Component } from 'react';
import { View, StyleSheet, TextInput, } from 'react-native';
import { Container, Text, Content, Form, Textarea, Button, Input,  } from 'native-base'

import { firebaseApp } from './firebase';

export default class Feedback extends Component {
  constructor(props){
    super(props);
    this.state = {
      body: '',
    }
    this.loggedUser = this.props.loggedUser;
  }

  sendFeedback() {
    firebaseApp.database().ref().child('feedbacks').push({
      body: this.state.body,
      user: this.props.loggedUser.uid,
    }).key;

    this.setState({ body: '' });
    this.props.showOrHideFeedback();
  }

  render() {
    return(
      <Container>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 10, marginTop: 7 }}>Gracias por colaborar</Text>
          <Text>
            ¿Que te parece la app de la Semana de la Ingeniería 2018? Dejanos alguna sugerencia que se te ocurra para mejorarla.
          </Text>

          <Content padder>
            <Form>
              <TextInput multiline={true}
                         numberOfLines={4}
                         placeholder="opinión, comentarios y sugerencias"
                         value={ this.state.body }
                         onChangeText={(text) => this.setState({body: text})} />
            </Form>
          </Content>

          <View style={styles.feedbackButtonContainer}>
            <Button full primary onPress={() => this.sendFeedback()} >
              <Text>
                Enviar
              </Text>
            </Button>
          </View>
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
    paddingLeft: 10,
    paddingRight: 10,
  },
  feedbackButtonContainer: {
    margin: 25,
  },
  feedbackButtonText: {
    flex: 1,
    textAlign: 'justify',
  },
})
