import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Card, Button } from 'react-native-elements';

//displays the result of the quiz just made
export default class StatsAfterAnswerScreen extends React.Component {

  showPoint(questionAnswer, index) {
    const givenAnswer = questionAnswer.givenAnswer;
    const rightAnswer = questionAnswer.rightAnswer;
    let fixIndex = index + 1;

    return (
      <View style={{marginBottom: 10}}>
        <Text style={styles.textAnswer}>Alla domanda <Text style={styles.textHighlight}>{fixIndex} </Text><Text style={styles.textAnswer}>hai risposto con : </Text><Text style={styles.textHighlight}>{givenAnswer}</Text></Text>
        <Text style={styles.textAnswer}>La risposta corretta è : <Text style={styles.textHighlight}>{rightAnswer}</Text></Text>
      </View>
    )
  }

  totalPoint(answerList) {
    return answerList.filter(elem => elem.givenAnswer == elem.rightAnswer).length;
  }

  render() {
    const { navigation } = this.props;
    const point = navigation.getParam('point');
    const title = navigation.getParam('title');

    return (
      <View style={styles.view}>
        <Card
          title={ <Text h1 style={styles.textStyleTitleCard}>Il tuo punteggio sul quiz {title} è : </Text> }
          containerStyle={styles.containerCard}
          dividerStyle={styles.cardDivider}
        >
        <ScrollView contentContainerStyle={{height: 350}}>
          <FlatList
            data={point}
            keyExtractor={(item, index) => ""+index}
            renderItem={( {item, index} ) =>  this.showPoint(item, index) }
          />
        </ScrollView>
        <Text h1 style={styles.textStylePoint}>Hai indovinato {this.totalPoint(point)} risposte su {point.length} </Text>
        </Card>
        <View style={{marginTop: 10}}>
          <Button
            title='Torna alla Home'
            titleStyle={styles.titleButton}
            type="outline"
            buttonStyle={styles.button}
            onPress={() => this.props.navigation.navigate('QuizList')}
          />
          <Button
            title= 'Vai alle Statistiche'
            titleStyle={{ color: '#00A8E8' }}
            type="clear"
            onPress={() => this.props.navigation.navigate('Statistiche')}
          />
        </View>
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
      height: 550,
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
  textAnswer : {
    fontSize: 20,
    color: '#ffff',
    textAlign: 'left'
  },
  textHighlight: {
    fontSize: 24,
    color: '#d4af37',
    textAlign: 'left'
  }
});