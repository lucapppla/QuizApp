import React from "react";
import { View, StyleSheet } from "react-native";
import { GetDataListStatistics } from "../../networking/GetDataListStatistics";

export default class StatisticsQuizListScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      isVisible: true
    };
  }

  render() {
    return (
      <View style={styles.view}>
        <GetDataListStatistics navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "stretch" 
  }
});
