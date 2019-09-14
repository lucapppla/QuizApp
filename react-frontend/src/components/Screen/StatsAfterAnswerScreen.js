import React from "react";
import { View, Text, FlatList } from "react-native";

export default class StatsAfterAnswerScreen extends React.Component {

  total = 0;

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
    console.log("puppa pera",answerList);
    return answerList.filter(elem => elem.givenAnswer == elem.rightAnswer).length;
  }

  render() {
    const { navigation } = this.props;
    const point = navigation.getParam('point');
    const title = navigation.getParam('title');
    console.log(point)

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
        <Text>Il tuo punteggio sul quiz {title} è : </Text>
        <FlatList
          data={point}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => this.showPoint(item) }
        />
        <Text>punteggio totale-> {this.totalPoint(point)}</Text>       
      </View>
    );
  }
}
