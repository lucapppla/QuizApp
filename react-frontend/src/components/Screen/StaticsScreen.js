import React from 'react';
import { View, Text, Button } from 'react-native';

export default class StaticsListScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Screen che visualizza le statistiche</Text>
          <Button
            title="Ritorna alla home"
            onPress={() => this.props.navigation.navigate('QuizList')}
          />
        </View>
      );
    }  
  }