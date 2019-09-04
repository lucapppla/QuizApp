import React from "react";
import CountDown from "react-native-countdown-component";
import { View, StyleSheet, Text } from "react-native";
import { GetDataJsonFromBackend } from "../networking/GetDataFromBackend";

export class CountDownFunction extends React.Component {
    constructor() {
        super();
        this.state = {
            show: true
        };
    }

    render() {
        const item = this.props.item;
        const name = this.props.name;
        const surname = this.props.surname;

        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
                <View style={this.state.show ? styles.visibleCountDown : styles.hideCountDown}>
                    <CountDown
                        until={2}
                        timeToShow={["S"]}
                        timeLabels={""}
                        onFinish={() => { this.setState({ show: false })}}
                        size={100}
                        digitStyle={{ backgroundColor: "" }}
                    />
                </View>
                <View style={this.state.show ? styles.hideBack : styles.visibleBack}>
                    <GetDataJsonFromBackend item= {item}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    visibleCountDown: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    hideCountDown: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        display: "none"
    },
    visibleBack: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    hideBack: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        display: "none"
    }
});
