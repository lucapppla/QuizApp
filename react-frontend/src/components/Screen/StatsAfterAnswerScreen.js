import React from "react";
import { View, Text } from "react-native";

export default class StatsAfterAnswerScreen extends React.Component {

  render() {
    const { navigation } = this.props;
    const point = navigation.getParam('point');

    console.log(point)
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
      >
      <Text>STATS AFTER REQUEST</Text>
      </View>
    );
  }
}
