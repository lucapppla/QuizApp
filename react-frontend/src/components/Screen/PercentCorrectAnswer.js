import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import AnimateNumber from 'react-native-animate-number'
import axios from "axios";
import Helper from "../../Helper/Helper"

//show a card with a specific percentage right answers 
export default class PercentCorrectAnswer extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      item: ""
    };
  }

  makeGetRequestToBackEnd() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const replace = item.replace('.json', '');

    axios.get(Helper.getEndpoint("/GetFinishQuizData"), { params : { item : replace }}).then( response => {
      this.setState( { data : response.data, item : replace });
    }).catch(error => {
      console.log(error);
    });
  }

  showPerc() {
    const percent = this.state.data.totalPointPerc;
    return percent;
  }

  showTestNumber() {
    const totalTest = this.state.data.totalTest;
    return totalTest;
  }

  componentDidMount() {
    this.makeGetRequestToBackEnd();
  }

  render() {
    return (
      <View style={styles.view}>
        <Card
          containerStyle={styles.containerCard}
          dividerStyle={styles.cardDivider}
        >
          <Text style={styles.text}>
          La percentuale di risposte esatte, su un totale di 
          <Text style={styles.textHighlight}> {this.showTestNumber()} </Text>
          test della tipologia
          <Text style={styles.textHighlight}> {this.state.item} </Text>
          effettuati, è del :</Text>
          <AnimateNumber style={styles.AnimateNumber} value={this.showPerc()} timing="easeOut" countBy={1} formatter={(val) => {
            return parseFloat(val).toFixed(2) + ' %';
          }}/>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
  },
  AnimateNumber: {
    fontSize: 50,
    color: '#ffff', 
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 30,
    color: '#ffff',
    textAlign: 'center'
  },
  containerCard: {
    backgroundColor: '#00A8E8',
    borderRadius: 10,
    height: 300,
    width: ( Dimensions.get('screen').width -10 )
  },
  cardDivider: {
    display: 'none'
  },
  textHighlight: {
    fontSize: 30,
    color: '#d4af37',
    textAlign: 'left'
  }
});