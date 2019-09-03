import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GetDataJsonFromBackend } from "../../../src/networking/GetDataFromBackend";
import {CountDownFunction } from "../../service/QuizHelper";

export default class TestStartScreen extends React.Component {
  
  checkCountDown(){
    if(!this.getState){
      return <GetDataJsonFromBackend item={this.item}/>
    }
  }

  render() {
    const item = this.props.navigation.state.params.entryId;
    const name = this.props.navigation.state.params.name;
    const surname = this.props.navigation.state.params.surname;
    var getState = this.props.getState;

    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
        {...this.checkCountDown()}
      >
      <CountDownFunction />    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  getData: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1
  }
});
