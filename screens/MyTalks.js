import React from 'react';
import { ScrollView, StyleSheet, View, } from 'react-native';
import { Container, Header, Left, Right, Button, Text, Icon, Body, Title, Footer, FooterTab, } from 'native-base';
import { ExpoLinksView } from '@expo/samples';

export default class MyTalks extends React.Component {
  static navigationOptions = {
    title: 'Mis charlas',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header>
          <Body>
            <FooterTab>
              <Button>
                <Text style={styles.weekDays}>lun</Text>
              </Button>
              <Button>
                <Text style={styles.weekDays}>mar</Text>
              </Button>
              <Button active>
                <Text style={styles.weekDays}>mie</Text>
              </Button>
              <Button>
                <Text style={styles.weekDays}>jue</Text>
              </Button>
              <Button>
                <Text style={styles.weekDays}>vie</Text>
              </Button>
            </FooterTab>
          </Body>
        </Header>

        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}> [My Talks Content] </Text>
        </View>

      </ScrollView>
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
