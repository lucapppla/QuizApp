import React from "react";
import { Card, Button, Icon } from 'react-native-elements';
import { FlatList, ScrollView, StyleSheet } from "react-native";
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
            .get("http://localhost:3000/list" )
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
            <ScrollView style={styles.scrollView}>
                <FlatList
                    data={this.returnList()}
                    keyExtractor={index => index.toString()}
                    renderItem={({ item }) => (
                        <Card
                            containerStyle={styles.card}
                            dividerStyle={styles.cardDivider}
                            title={item}
                        >
                        <Button
                            title="Vai al test"
                            icon={<Icon class="material-icons" name='play-arrow' color='#ffffff' />}
                            buttonStyle={styles.button}
                            onPress={() => this.props.navigation.navigate( 'UserScreen', { item: item })}
                        />
                        </Card>
                    )}
                ></FlatList>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
      marginBottom: 15
    },
    text: {
      fontSize: 42,
    },
    card:{
        borderRadius:10
    },
    cardDivider:{
        display: "none"
    },
    button:{
        borderRadius: 10, 
        marginLeft: 60,
        marginRight: 60, 
        marginBottom: 0
    }
});