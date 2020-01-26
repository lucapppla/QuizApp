import React from "react";
import { Card, Button, Icon } from 'react-native-elements';
import { FlatList, ScrollView, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import Helper from "../Helper/Helper";

//send a get request to back-end for retrive the list of all test for showing the statistics
export class GetDataListStatistics extends React.Component {
    constructor() {
        super();

        this.state = {
            quiz: []
        };
    }

    makeGetRequestToBackEnd() {
        axios.get(Helper.getEndpoint("/list") ).then(response => {
            this.setState({ quiz: response.data });
        })
        .catch(error => {
            console.log(error);
        });
    }

    returnList() {
        return this.state.quiz.map(data => {
            const replace = String(data).replace('.json', '')
            return replace;
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
                            title={item}
                            titleStyle={ styles.quizTitleCardStyle }
                            containerStyle={styles.card}
                            dividerStyle={styles.cardDivider}
                        >
                        <Button
                            title="Vai al test"
                            icon={<Icon class="material-icons" name='play-arrow' color='#ffffff' />}
                            buttonStyle={styles.button}
                            onPress={() => this.props.navigation.navigate( 'StaticsScreen', { item: item+'.json' })}
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
        marginTop: 20
    }
});