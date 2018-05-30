'use strict'

import React, { Component } from 'react';
import { View, StyleSheet,  } from 'react-native';
import { Container, Text, Content, Form, Textarea, Button,  } from 'native-base'

export default class Feedback extends Component {
  constructor(props){
    super(props);
  }

  render() {
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

          <Button full primary onPress={() => this.props.showOrHideFeedback()} >
            <Text>
              Enviar
            </Text>
          </Button>
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
})
