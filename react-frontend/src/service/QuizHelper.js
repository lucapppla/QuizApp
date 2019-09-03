import React from "react";
import CountDown from "react-native-countdown-component";
import { View, StyleSheet } from "react-native";

export class CountDownFunction extends React.Component {
    constructor() {
        super();
        this.state = {
            show: true
        };
    }

    getState = () => {
        return this.state.show;
    }

    render() {
        return (
            <View
                style={this.state.show ? styles.visibleCountDown : styles.hideCountDown}
            >
                <CountDown
                    until={5}
                    timeToShow={["S"]}
                    timeLabels={""}
                    onFinish={() => {this.setState({ show: false }), getState = () => this.getState()}}
                    size={100}
                    digitStyle={{ backgroundColor: "" }}
                />
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
    }
});
