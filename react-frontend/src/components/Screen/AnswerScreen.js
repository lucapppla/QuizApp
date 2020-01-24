import React from "react";
import { View, StyleSheet, Dimensions} from "react-native";
import { Card, Button } from 'react-native-elements';
import axios from "axios";
import CountDown from "react-native-countdown-component";

//show the questions and the answers and send all to back-end who save in a Json file
export class AnswerScreen extends React.Component {

    saveJsonToBackEnd() {
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

    saveUserToBackEnd() {
        const { navigation } = this.props;
        const QuizName = navigation.getParam('item');
        const name = navigation.getParam('name');
        const surname = navigation.getParam('surname');

        axios.post("http://localhost:3000/createUserJson/", {
            params:{
                "QuizName": QuizName,
                "name": name,
                "surname": surname
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

    makeGetRequestToBackEnd() {
        const { navigation } = this.props;
        const QuizName = navigation.getParam('item');

        axios.get("http://localhost:3000/list/jsonContent/" , {
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
            });
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.makeGetRequestToBackEnd()
    }

    showAnswer() {
        if(this.state.lenghtQuestions > 0) {
            const actualQuestion = this.state.dataResult[this.state.indexQuestion];
            return (
            <View style={styles.view}>
                <Card
                    title={actualQuestion.Domanda}
                    titleStyle={styles.titleStyleCard}
                    containerStyle={styles.containerCard}
                    dividerStyle={styles.cardDivider}
                >
                    <Button buttonStyle={styles.button} title={actualQuestion.A} onPress={() => this.giveAnswer('A')}/>
                    <Button buttonStyle={styles.button} title={actualQuestion.B} onPress={() => this.giveAnswer('B')}/>
                    <Button buttonStyle={styles.button} title={actualQuestion.C} onPress={() => this.giveAnswer('C')}/>
                    <Button buttonStyle={styles.button} title={actualQuestion.D} onPress={() => this.giveAnswer('D')}/>
                </Card>
                <Button 
                    buttonStyle={styles.exitButton} 
                    type="clear" 
                    title="Torna alla Home" 
                    titleStyle={{ color:'#007EA7' }} 
                    onPress={() => this.props.navigation.navigate('QuizList')}
                />
            </View>
            )
        }
    }

    giveAnswer(answ) {
        
        var givenAnswArray = this.state.givenAnswerArray;
        var indexQuestion = this.state.indexQuestion;
        const actualQuestion = this.state.dataResult[this.state.indexQuestion];
        const answerGivenPoint = {givenAnswer: answ, rightAnswer: actualQuestion.Esatta};
        givenAnswArray.push(answerGivenPoint);
        
        if(indexQuestion == this.state.lenghtQuestions - 1) {
            this.props.navigation.navigate("StatsAfterAnswerScreen", {title: this.state.title, point: givenAnswArray}),
            this.saveJsonToBackEnd(),
            this.saveUserToBackEnd();
        } else {
            indexQuestion = indexQuestion + 1;
        }

        this.setState({
            givenAnswerArray: givenAnswArray,
            indexQuestion: indexQuestion
        })
        
    }
    
    render() {
        return (
            <View style={styles.view}>
                <View>
                    <View style={this.state.showCounter ? styles.visibleCountDown : styles.hideCountDown}>
                        <CountDown
                            until={5}
                            timeToShow={["S"]}
                            timeLabels={""}
                            onFinish={() => this.setState({showCounter : false})}
                            size={100}
                            digitStyle={{ backgroundColor: "" }}
                            digitTxtStyle={{color: '#00A8E8'}}
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
    view: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    titleStyleCard: {
        fontSize: 24,
        color: '#ffff', 
        alignSelf:'center',
        marginBottom: 150
    },
    cardDivider: {
        display: 'none'
    },
    containerCard: {
        backgroundColor: '#00A8E8',
        borderRadius: 10,
        height: 500,
        width:  ( Dimensions.get('screen').width - 10 ),
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        
    },
    button: {
        backgroundColor: '#007EA7',
        borderRadius: 30, 
        marginTop: 20
    },
    exitButton: {
        marginTop: 220
    },
    visibleCountDown: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    hideCountDown: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        display: 'none'
    },
    visibleBack: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});