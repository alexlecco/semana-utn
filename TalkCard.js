'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Alert, } from 'react-native';

export default class TalkCard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    let showOrHideTalkInfo = this.props.showOrHideTalkInfo;
		return(
			<TouchableWithoutFeedback onPress={() => this.props.showOrHideTalkInfo(this.props.talk)} >
				<View style={styles.TalkCardContainer}>
					<View style={styles.TalkTimeContainer}>
						<Text style={styles.TalkText}> {this.props.talk.time} </Text>
					</View>
					<View style={styles.TalkTextContainer}>
						<Text style={styles.TalkText}> {this.props.talk.title} </Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
  TalkCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
	TalkTimeContainer: {
		margin: 10,
  },
	TalkTextContainer: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 10,
		marginTop: 10,
		marginBottom: 10,
		marginRight: 10,
		flexWrap: 'wrap',
		flexDirection: 'row',
		width: Dimensions.get('window').width - 82,
	},
	TalkText: {
		fontSize: 17,
    color: '#4f4f4f',
	},
});
