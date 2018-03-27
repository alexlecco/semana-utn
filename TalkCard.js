'use strict'

import React, { Component } from 'react'
import { View, Text, StyleSheet, } from 'react-native'

export default class TalkCard extends Component {
	render() {
		return(
			<View style={styles.TalkCardContainer}>

				<Text style={styles.TalkCardText}> Soy un TalkCard </Text>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
  TalkCardContainer: {
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
  },
  TalkCardText: {
    fontSize: 17,
    color: '#6F6F6F',
    textAlign: 'center',
  },
});