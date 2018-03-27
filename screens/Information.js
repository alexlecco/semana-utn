import React from 'react';
import { ScrollView, StyleSheet, View, } from 'react-native';
import { Text } from 'native-base';
import { ExpoConfigView } from '@expo/samples';

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

  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}> [Information Content] </Text>
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
});
