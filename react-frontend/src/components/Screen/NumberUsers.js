import React from 'react';
import { View, Text, StyleSheet, ScrollView, screenWidth } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from "axios";

export default class NumerUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

  makeGetRequestToBackEnd() {
    axios.get("http://localhost:3000/userData/")
      .then(response => {
        this.setState({
          data: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.makeGetRequestToBackEnd()
  }

  formattingResponseForGraph() {
    if (this.state.data && this.state.data.length != 0) {

      obj = this.state.data;
      const data = {
        labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }]
      };

      obj.forEach(element => {
        for (let index = 1; index <= 12; index++) {
          subStr = element.date.substring(3, 5);
          if (index == subStr) {
            data.datasets.forEach((elementData) => {
              elementData.data[index - 1] = elementData.data[index - 1] + 1
            });
          }
        }
      });
      return (
        <BarChart
          data={data}
          width={410} height={350}
          yAxisLabel={'n°'} chartConfig={{ color: (opacity = 50) => `rgba(134, 65, 244, ${opacity})` }}
          verticalLabelRotation={30}
        />
      )
    }


  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
        {this.formattingResponseForGraph()}
      </View>
    )
  }
}