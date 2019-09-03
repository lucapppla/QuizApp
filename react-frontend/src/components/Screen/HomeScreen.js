import React from "react";
import { View, Text } from "react-native";
import { Button, Header} from 'react-native-elements';
import { GetDataListFromBackend } from "../../../src/networking/GetDataFromBackend";

export default class QuizListScreen extends React.Component {

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
      >
        <Text>Scegli il test che vuoi fare </Text>
        <GetDataListFromBackend navigation = {this.props.navigation}/>
        <Button
          title="Vai alla pagina delle statistiche"
          onPress={() => this.props.navigation.navigate("Statics")}
        />
      </View>
    );
  }
}
