import React from 'react';
import { ScrollView, StyleSheet, View, } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import { ExpoLinksView } from '@expo/samples';

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

  render() {
    return (
      <ScrollView style={styles.container}>

        <Tabs>
          <Tab heading={ <TabHeading><Text>lun</Text></TabHeading> }>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}> [lunes content] </Text>
            </View>
          </Tab>
          <Tab heading={ <TabHeading><Text>mar</Text></TabHeading> }>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}> [martes content] </Text>
            </View>
          </Tab>
          <Tab heading={ <TabHeading><Text>mie</Text></TabHeading> }>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}> [miercoles content] </Text>
            </View>
          </Tab>
          <Tab heading={ <TabHeading><Text>jue</Text></TabHeading> }>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}> [jueves content] </Text>
            </View>
          </Tab>
          <Tab heading={ <TabHeading><Text>vie</Text></TabHeading> }>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}> [viernes content] </Text>
            </View>
          </Tab>
        </Tabs>

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
