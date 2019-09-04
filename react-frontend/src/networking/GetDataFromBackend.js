import React, { Component } from 'react';
import { Button, Text } from 'react-native-elements';
import { View, FlatList } from 'react-native';
import axios from 'axios';

export class GetDataListFromBackend extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quiz: []
        };
    }

    makeGetRequestToBackEnd() {
        axios.get('http://localhost:3000/list')
            .then(response => {
                this.setState({ quiz: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    returnList() {
        return this.state.quiz.map((data) => {
            return (data);
        });
    }

    componentDidMount() {
        this.makeGetRequestToBackEnd();
    }

    render() {
        return (
            <View tyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'stretch'
            }}>
                <FlatList
                    data={this.returnList()}
                    keyExtractor={(index) => index.toString()}
                    renderItem={({ item }) =>
                        <Button
                            title={item}
                            type="outline"
                            onPress={() => this.props.navigation.navigate("StartQuiz", { item: { item } })}>
                        </Button>
                    }>
                </FlatList>
            </View>
        );
    }
}

export class GetDataJsonFromBackend extends React.Component {

    constructor() {
        super()
        this.state = {
            title: null,
            question: null,
            answer: [],
            response: false
        };
    } 

    makeGetRequestToBackEnd() {
        const QuizName = this.props.item;

        axios.get('http://localhost:3000/list/jsonContent/', {
            params: {
                title: QuizName
            }
        }).then(response => {
            
            this.setState({
                title: QuizName,
            })

            return response.data.array.map( (dataMap, index) =>  {
                return this.setStateQA(dataMap, index);

            })

        }).catch(error => {
            console.log(error);
        })
    }

       
    setStateQA = (dataMap, index) => {
        console.log("data--->", dataMap)
        console.log("index--->", index)
        i = 0;

        while (i <= index) {
            if (!this.state.response) {
                console.log("STATO TRUE")
                this.setState({
                    response: true,
                    answer: [
                        dataMap.Domanda,
                        dataMap.A,
                        dataMap.B,
                        dataMap.C,
                        dataMap.D
                    ]
                })
                return <FlatList 
                    dataMap={this.state.answer}
                    keyExtractor={(index) => index.toString()}
                    renderItem={({ item }) => { item }}
                    >
                <Button
                    title={dataMap}
                    type="outline"
                    onPress={() => { this.setState({ response: true }) }}>
                </Button>
            </FlatList>
            } else if (this.state.response) {
                console.log("STATO FALSE")

                i++;
                this.setState({
                    response: false,
                    answer: [
                        dataMap.Domanda,
                        dataMap.A,
                        dataMap.B,
                        dataMap.C,
                        dataMap.D
                    ]
                })
                return <Text>ELSE</Text>
            }
        }
    }

    componentDidMount() {
        this.makeGetRequestToBackEnd();
    }

    render() {
        return (
            <View tyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'stretch',
            }}>
                <Text> TESTO getdata </Text>
                
            </View>
        );
    }
}