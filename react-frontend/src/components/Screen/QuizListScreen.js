import React from "react";
import { View, Text } from "react-native";
import { Overlay } from 'react-native-elements';
import { GetDataListFromBackend } from "../../networking/GetDataListFromBackend";

export default class QuizListScreen extends React.Component {

  constructor() {
    super();

    this.state = {
      isVisible: true
    };
  }

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
      >
        <Overlay 
          height= {100}
          isVisible={this.state.isVisible} 
          onBackdropPress={() => this.setState({ isVisible: false })}
        >
          <Text>Benvenuto su Quiz-App !</Text>
        </Overlay>  

        <GetDataListFromBackend navigation={this.props.navigation}/>
      </View>
    );
  }
}
