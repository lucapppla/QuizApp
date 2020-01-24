import React from "react";
import { Card, Button, Icon } from 'react-native-elements';
import { FlatList, ScrollView, StyleSheet, Dimensions } from "react-native";
import axios from "axios";

//show the user list to show the test carried out
export default class UserList extends React.Component {
    constructor() {
        super();

        this.state = {
            quiz: []
        };
    }

    makeGetRequestToBackEnd() {
        const { navigation } = this.props;
        const item = navigation.getParam('item');
        const replace = String(item).replace('.json', '');

        axios.get("http://localhost:3000/UserList", {params : { item: replace}}).then(response => {
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
        const numColumns = 2;

        return (
            <ScrollView style={styles.scrollView}>
                <FlatList
                    data={this.returnList()}
                    keyExtractor={index => index.toString()}
                    numColumns= {numColumns}
                    renderItem={({ item }) => 
                    (
                        <Card
                            title={String(item).replace(RegExp(/(_\d).*$/), '')}
                            titleStyle={ styles.quizTitleCardStyle }
                            containerStyle={styles.card}
                            dividerStyle={styles.cardDivider}
                        >
                        <Button
                            title="Esito Test"
                            icon={<Icon class="material-icons" name='play-arrow' color='#ffffff' />}
                            buttonStyle={styles.button}
                            onPress={() => this.props.navigation.navigate( 'ReadJsonContent', { item: item })}
                        />
                        </Card>
                    )}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        alignContent: 'center'
    },
    card:{
        margin: 4,
        backgroundColor: '#00A8E8',
        borderRadius: 10,
        width: ( Dimensions.get('screen').width/2 - 8 ), 
        height: 150
    },
    quizTitleCardStyle: {
        color: '#ffff'
    },
    cardDivider:{
        display: "none"
    },
    button:{
        backgroundColor: '#007EA7',
        borderRadius: 10, 
        marginTop: 30
    }
});