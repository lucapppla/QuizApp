import React from "react";
import { View, Text, FlatList, Button } from "react-native";

export default class StatsAfterAnswerScreen extends React.Component {

  showPoint(questionAnswer){
    const givenAnswer = questionAnswer.givenAnswer;
    const rightAnswer = questionAnswer.rightAnswer;

      return (
        <View>
          <Text>Risposta data -> {givenAnswer}</Text>
          <Text>Risposta corretta -> {rightAnswer}</Text>
        </View>
      )
  }

  totalPoint(answerList){
    return answerList.filter(elem => elem.givenAnswer == elem.rightAnswer).length;
  }

  render() {
    const { navigation } = this.props;
    const point = navigation.getParam('point');
    const title = navigation.getParam('title');

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
        <Text>Il tuo punteggio sul quiz {title} è : </Text>
        <FlatList
          data={point}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.showPoint(item) }
        />
        <Text>Hai indovinato {this.totalPoint(point)} risposte su {point.length} </Text>
        <Button
            title= 'Torna alla Home'
            type="outline"
            onPress={() => this.props.navigation.navigate('QuizList')}
        ></Button>
        <Button
            title= 'Vai alle Statistiche'
            type="outline"
            onPress={() => this.props.navigation.navigate('Statistiche')}
        ></Button>
      </View>
    );
  }
}
