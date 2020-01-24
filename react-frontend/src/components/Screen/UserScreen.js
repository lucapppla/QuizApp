import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";

//display the card who permit to insert and sending the input to the component who elaborate this data
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
            alert("Nome o Cognome mancante");
            return false;
        } else if (surname == "") {
            alert("Nome o Cognome mancante");
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
            <View style={styles.view}>
                <Card 
                    title='Inserisci il tuo nome prima di cominciare'
                    titleStyle={ styles.titleStyleCard }
                    containerStyle={styles.containerCard}
                    dividerStyle={styles.cardDivider}
                >
                    <Input
                        placeholder='Nome'
                        onChangeText={(name) => this.setState({ name })}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                    />
                    <Input
                        placeholder='Cognome'
                        onChangeText={(surname) => this.setState({ surname })}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                    />
                    <Button
                        buttonStyle={styles.button}
                        title="Start"
                        onPress={() => {this.startQuiz(item)} }
                    />
                </Card>
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
    },
    inputContainer: {
        borderColor: '#fff'
    },
    input: {
        color:'#fff'
    },
    titleStyleCard: {
        fontSize: 24,
        color: '#ffff', 
        alignSelf:'center'
    },
    cardDivider: {
        backgroundColor: '#ffff'
    },
    button: {
        backgroundColor: '#007EA7',
        borderRadius: 10, 
        marginTop: 20
    }
});