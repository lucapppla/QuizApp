import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Card, Button, Icon } from 'react-native-elements';

export default class StaticsListScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <Card
          title='Numero di utenti'
          containerStyle={styles.card}
          dividerStyle={styles.cardDivider}
          //possibilità di mettere image={require('../images/pic2.jpg')}
        >
          <Text style={{marginBottom: 10}}>
            Visualizza le statistiche del numero di utenti che hanno effettuato un test
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={styles.button}
            title='Visualizza' 
            onPress={() => this.props.navigation.navigate('NumberUsers')}
          />
        </Card>

        <Card
          title='Percentuale di risposte esatte'
          containerStyle={styles.card}
          dividerStyle={styles.cardDivider}
          //possibilità di mettere image={require('../images/pic2.jpg')}
        >
          <Text style={{marginBottom: 10}}>
            Visualizza la percentuale delle risposte complessivamente esatte
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={styles.button}              
            title='Visualizza' 
            onPress={() => this.props.navigation.navigate('PercentCorrectAnswer')}
          />
        </Card>

        <Card
          title='Percentuale di risposte esatte per utente'
          containerStyle={styles.card}
          dividerStyle={styles.cardDivider}
          //possibilità di mettere image={require('../images/pic2.jpg')}
        >
          <Text style={{marginBottom: 10}}>
            Visualizza la percentuale delle risposte per ogni utente che ha effettuato almeno un test
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={styles.button}              
            title='Visualizza'
            onPress={() => this.props.navigation.navigate('PercentCorrectAnswerForUser')}
          />
        </Card>

        <Card
          title='Punteggio medio utente'
          containerStyle={styles.card}
          dividerStyle={styles.cardDivider}
          //possibilità di mettere image={require('../images/pic2.jpg')}
        >
          <Text style={{marginBottom: 10}}>
            Visualizza il punteggio medio per ogni utente che ha effettuato almeno un test
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={styles.button}              
            title='Visualizza' 
            onPress={() => this.props.navigation.navigate('AverageScore')}
          />
        </Card>
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