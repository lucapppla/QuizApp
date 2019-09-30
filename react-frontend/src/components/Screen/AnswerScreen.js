import React, { Component } from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, ListItem, StyleSheet } from "react-native";
import axios from "axios";
import CountDown from "react-native-countdown-component";

export class AnswerScreen extends React.Component {

    makeGetRequestToBackEnd() {
        const { navigation } = this.props;
        const QuizName = navigation.getParam('item');

        axios.get("http://localhost:3000/list/jsonContent/", {
            params: {
                title: QuizName
            }
        })
        .then(response => {
            const lenghtQuestions = response.data.array.length;
            this.setState({
                title: QuizName,
                dataResult: response.data.array,
                lenghtQuestions: lenghtQuestions
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    saveJsonToBackEnd(){
        const { navigation } = this.props;
        const QuizName = navigation.getParam('item');
        const name = navigation.getParam('name');
        const surname = navigation.getParam('surname');

        axios.post("http://localhost:3000/createJson/", {
            params:{
                "name": name,
                "surname": surname,
                "testName": QuizName,
                "array": this.state.givenAnswerArray,
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    constructor() {
        super();
        this.state = {
            dataResult: [],
            title: null,
            indexQuestion: 0,
            lenghtQuestions: 0,
            givenAnswerArray: [],
            showCounter: true
        };
    }

    componentDidMount() {
        this.makeGetRequestToBackEnd()
    }

    showAnswer(){
        if(this.state.lenghtQuestions > 0){
            const actualQuestion = this.state.dataResult[this.state.indexQuestion];
            return (
            <View>
                <Text>{actualQuestion.Domanda}</Text>
                <Button title={actualQuestion.A} onPress={() => this.giveAnswer('A')}></Button>
                <Button title={actualQuestion.B} onPress={() => this.giveAnswer('B')}></Button>
                <Button title={actualQuestion.C} onPress={() => this.giveAnswer('C')}></Button>
                <Button title={actualQuestion.D} onPress={() => this.giveAnswer('D')}></Button>
            </View>
            )
        }
    }

    giveAnswer(answ){
        
        var givenAnswArray = this.state.givenAnswerArray;
        var indexQuestion = this.state.indexQuestion;
        const actualQuestion = this.state.dataResult[this.state.indexQuestion];
        const answerGivenPoint = {givenAnswer: answ, rightAnswer: actualQuestion.Esatta};
        givenAnswArray.push(answerGivenPoint);
        
        if(indexQuestion == this.state.lenghtQuestions - 1){
            this.props.navigation.navigate("StatsAfterAnswerScreen", {title: this.state.title, point: givenAnswArray}),
            this.saveJsonToBackEnd();
        }else{
            indexQuestion = indexQuestion + 1;
        }

        this.setState({
            givenAnswerArray: givenAnswArray,
            indexQuestion: indexQuestion
        })
        
    }
    
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
                <View >
                    <View style={this.state.showCounter ? styles.visibleCountDown : styles.hideCountDown}>
                        <CountDown
                            until={2}
                            timeToShow={["S"]}
                            timeLabels={""}
                            onFinish={() => this.setState({showCounter : false})}
                            size={100}
                            digitStyle={{ backgroundColor: "" }}
                        />
                    </View>
                </View>
                <View style={this.state.showCounter ?  styles.hideCountDown : styles.visibleCountDown }>
                    {this.showAnswer()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    visibleCountDown: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    hideCountDown: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        display: "none"
    },
    visibleBack: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    hideBack: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        display: "none"
    }
});