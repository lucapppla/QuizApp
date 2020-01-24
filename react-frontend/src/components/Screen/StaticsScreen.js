import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

//shows the differents type of statistics you want to view
export default class StaticsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const replace = String(item).replace('.json', '');

    return (
      <ScrollView>
        <Card
          title='Numero di utenti'
          titleStyle={styles.titleStyleCard}
          containerStyle={styles.containerCard}
          dividerStyle={styles.cardDivider}
        >
          <Text style={styles.textInsideCardStyle}>
            Visualizza le statistiche del numero di utenti che hanno effettuato il test {replace}
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff'/>}
            buttonStyle={styles.button}
            title='Visualizza' 
            onPress={() => this.props.navigation.navigate('NumberUsers', {item: item})}
          />
        </Card>

        <Card
          title='Percentuale di risposte esatte'
          titleStyle={styles.titleStyleCard}
          containerStyle={styles.containerCard}
          dividerStyle={styles.cardDivider}
        >
          <Text style={styles.textInsideCardStyle}>
            Visualizza la percentuale delle risposte complessivamente esatte del test {replace}
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff'/>}
            buttonStyle={styles.button}              
            title='Visualizza' 
            onPress={() => this.props.navigation.navigate('PercentCorrectAnswer', {item: item})}
          />
        </Card>

        <Card
          title='Risposte esatte utente'
          titleStyle={styles.titleStyleCard}
          containerStyle={styles.containerCard}
          dividerStyle={styles.cardDivider}
        >
          <Text style={styles.textInsideCardStyle}>
            Visualizza le risposte esatte e la percentuale degli utenti che hanno svolto il test {replace}
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff'/>}
            buttonStyle={styles.button}              
            title='Visualizza'
            onPress={() => this.props.navigation.navigate('UserList', {item: item})}
          />
        </Card>
      </ScrollView>
    );
  }  
}

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: '#00A8E8',
    borderRadius: 10
  },
  titleStyleCard:{
    fontSize: 24,
    color: '#ffff', 
    alignSelf:'center'
  },
  textInsideCardStyle: {
    color: '#ffff',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  cardDivider:{
    backgroundColor: '#ffff'
  },
  button:{
      backgroundColor: '#007EA7',
      borderRadius: 10, 
      marginLeft: 60,
      marginRight: 60, 
      marginBottom: 0
  }
});