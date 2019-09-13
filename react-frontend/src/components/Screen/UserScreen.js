import React from "react";
import { View, Text, Button } from "react-native";
import { Input } from "react-native-elements";

export default class UserScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            surname: "",
        }
    }

    validateInput = () => {
        const { name, surname } = this.state;
        if (name == "") {
            alert("Insert Your name");
            return false;
        } else if (surname == "") {
            alert("Insert Your surname");
            return false;
        } else {
            return true;
        }
    }

    startQuiz = (item) => {

        if (this.validateInput()) {
            return this.props.navigation.navigate("AnswerScreen", {
                item: item,
                name: this.state.name,
                surname: this.state.surname
            })
        }
    }

    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Inizia quiz</Text>
                <Text>Inserisci il tuo nome prima di cominciare</Text>
                <Input
                    placeholder='Nome'
                    onChangeText={(name) => this.setState({ name })}
                    shake={true}
                />
                <Input
                    placeholder='Cognome'
                    onChangeText={(surname) => this.setState({ surname })}
                    shake={true}
                />
                <Button
                    title="Start"
                    onPress={() => {this.startQuiz(item)} }
                />
            </View>
        );
    }
}
