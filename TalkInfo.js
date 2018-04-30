import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, } from 'react-native';
import { Container, Header, Left,
         Body, Icon, Title, Right,
         Content, Footer, FooterTab,
         Button, Text, Card, CardItem,
         Thumbnail,
} from 'native-base';

export default class TalkInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonText: 'Me interesa',
    }
  }

  changeButtonText() {
    this.state.buttonText === 'Me interesa' ?
      this.setState({buttonText: 'Ya no me interesa'}) :
      this.setState({buttonText: 'Me interesa'})
  }

  render() {
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.showOrHideTalkInfo(this.props.talk)}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title> { this.props.talk.day } - { this.props.talk.time } </Title>
            <Text style={{color: 'white'}}> Aula Magna </Text>
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
        <Footer>
          <FooterTab>
            <Button onPress={() => this.changeButtonText()}>
              <Text> { `${this.state.buttonText}` } </Text>
            </Button>
          </FooterTab>
        </Footer>
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
  },
});
