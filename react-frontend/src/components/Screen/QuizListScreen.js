import React from "react";
import { View, StyleSheet} from "react-native";
import { GetDataListFromBackend } from "../../networking/GetDataListFromBackend";

//return the component who show the list of the test
export default class QuizListScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      isVisible: true
    };
  }

  render() {
    return (
      <View style={styles.view}>
        <GetDataListFromBackend navigation={this.props.navigation}/>
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