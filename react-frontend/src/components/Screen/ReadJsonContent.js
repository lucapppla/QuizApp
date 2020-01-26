import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Card } from 'react-native-elements';
import axios from "axios";
import Helper from "../../Helper/Helper"

//send a get request who read the content of the Json file of a specific user
export default class ReadJsonContent extends React.Component {

  constructor() {
    super();

    this.state = {
        data: []
    };
  }

  showPoint(questionAnswer, index) {
    const givenAnswer = questionAnswer.givenAnswer;
    const point = questionAnswer.point;

    let fixIndex = index + 1;

    if(point == 1) {
      return (
        <View style={styles.textStyleAnswer}>
          <Text style={styles.textAnswerTrue}>La risposta <Text style={styles.textHighlight}>{fixIndex},</Text> {givenAnswer}, è esatta</Text>
        </View>
      )
    } else if(point == 0 ) {
      return (
        <View style={styles.textStyleAnswer}>
          <Text style={styles.textAnswerFalse}>La risposta <Text style={styles.textHighlight}>{fixIndex},</Text> {givenAnswer}, è errata</Text>
        </View>
      )
    }
  }

  getData() {
    const stateData = this.state.data;

    const givenAnswer = stateData.array;
    const date = stateData.date;
    const hour = stateData.hour;
    const name = stateData.name;
    const surname = stateData.surname;
    const point = stateData.point;
    const testName = stateData.testName; 

    return (
      <View>
        <Card
            title= 
            { 
              <Text h1 style={styles.textStyleTitleCard}>
                Il punteggio del test
                <Text style={styles.textHighlight}> {testName} </Text> 
                dell'utente 
                <Text style={styles.textHighlight}> {name} {surname} </Text> 
                svolto il 
                <Text style={styles.textHighlight}> {date} </Text>  
                alle ore 
                <Text style={styles.textHighlight}> {hour} </Text> 
                è : 
              </Text> 
            }
            containerStyle={styles.containerCard}
            dividerStyle={styles.cardDivider}
        >
        <Text h1 style={styles.textHighlight}>{point}</Text>
        <ScrollView contentContainerStyle={{height: 180, marginTop: 10}}>
          <FlatList
            data={givenAnswer}
            keyExtractor={(item, index) => ""+index}
            renderItem={( {item, index} ) =>  this.showPoint(item, index) }
          />
        </ScrollView>
        </Card>
      </View>
    )
  }

  makeGetRequestToBackEnd() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    axios.get(Helper.getEndpoint("/ReadJsonContent"), {params: { item: item}}).then(response => {
      this.setState({ data: response.data.data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.makeGetRequestToBackEnd();
  }

  render() {
    return (
      <View style={styles.view}>
        {this.getData()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  containerCard: {
    backgroundColor: '#00A8E8',
    borderRadius: 10,
    height: 450,
    width: ( Dimensions.get('screen').width -10 )
  },
  cardDivider: {
    display: 'none'
  },
  button: {
    backgroundColor: '#007EA7',
    borderRadius: 10, 
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50
  },
  titleButton: {
    color: '#fff'
  },
  textStyleTitleCard: {
    fontSize: 30,
    color: '#ffff', 
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  textStylePoint: {
    fontSize: 26,
    color: '#ffff', 
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  textAnswerTrue : {
    fontSize: 20,
    color: '#ffff',
    backgroundColor: '#008000',
    textAlign: 'left'
  },
  textAnswerFalse : {
    fontSize: 20,
    color: '#ffff',
    backgroundColor: '#ff0000',
    textAlign: 'left'
  },
  textHighlight: {
    fontSize: 28,
    color: '#d4af37',
    textAlign: 'center'
  },
  textStyleAnswer: {
    marginBottom: 10
  }
});