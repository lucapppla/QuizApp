import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountDownFunction } from "../../service/QuizHelper";

export default class TestStartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  render() {
    const item = this.props.navigation.state.params.item;
    const name = this.props.navigation.state.params.name;
    const surname = this.props.navigation.state.params.surname;

    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
      >
        <CountDownFunction
          item={this.props.navigation.state.params.item}
          name={this.props.navigation.state.params.name}
          surname={this.props.navigation.state.params.surname}
        />
      </View>
    );
  }
}
