import React, { Component } from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, ListItem } from "react-native";
import axios from "axios";

export class GetDataListFromBackend extends React.Component {
    constructor() {
        super();

        this.state = {
            quiz: []
        };
    }

    makeGetRequestToBackEnd() {
        axios
            .get("http://localhost:3000/list")
            .then(response => {
                this.setState({ quiz: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    returnList() {
        return this.state.quiz.map(data => {
            return data;
        });
    }

    componentDidMount() {
        this.makeGetRequestToBackEnd();
    }

    render() {
        return (
            <View
                tyle={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "stretch"
                }}
            >
                <FlatList
                    data={this.returnList()}
                    keyExtractor={index => index.toString()}
                    renderItem={({ item }) => (
                        <Button
                            title={item}
                            type="outline"
                            onPress={() => this.props.navigation.navigate( 'UserScreen', { item: item })}
                        ></Button>
                    )}
                ></FlatList>
            </View>
        );
    }
}