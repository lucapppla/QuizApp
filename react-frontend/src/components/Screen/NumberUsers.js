import React from 'react';
import { View, Dimensions } from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from "axios";

export default class NumerUsers extends React.Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Settimana' },
        { key: 'second', title: 'Mese' },
        { key: 'third', title: 'Anno' },
      ],
      data: [],
    };
  }

  makeGetRequestToBackEnd() {
    axios.get("http://localhost:3000/userData/").then(response => {
      this.setState({
        data: response.data.data
      });
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.makeGetRequestToBackEnd()
  }

  getDay() {
    if (this.state.data && this.state.data.length != 0) {
      
      const obj = this.state.data;

      const dataDay = {
        labels: ["1-7", "8-14", "15-21", "22-31"],
        datasets: [{
          data: [0, 0, 0, 0]
        }],
      };

      obj.forEach(element => {
        for (let index = 1; index <= 31; index++) {
          subStr = element.date.substring(0, 2);
        }
        if (subStr <= 7) {
          dataDay.datasets.forEach((elementData) => {
            elementData.data[0] = elementData.data[0] + 1
          });
        } else if (subStr >= 8 && subStr <= 14) {
          dataDay.datasets.forEach((elementData) => {
            elementData.data[1] = elementData.data[1] + 1
          });
        }
        else if (subStr >= 15 && subStr <= 21) {
          dataDay.datasets.forEach((elementData) => {
            elementData.data[2] = elementData.data[2] + 1
          });
        }
        else if (subStr >= 22 && subStr <= 31) {
          dataDay.datasets.forEach((elementData) => {
            elementData.data[3] = elementData.data[3] + 1
          });
        }
      });

      return this.rendereGraph(dataDay);
    }
  }

  getMonth() {
    if (this.state.data && this.state.data.length != 0) {

      const obj = this.state.data;

      const dataMonth = {
        labels: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
      };

      obj.forEach(element => {
        for (let index = 1; index <= 12; index++) {
          subStr = element.date.substring(3, 5);
          if (index == subStr) {
            dataMonth.datasets.forEach((elementData) => {
              elementData.data[index - 1] = elementData.data[index - 1] + 1
            });
          }
        }
      });

      return this.rendereGraph(dataMonth);
    }
  }

  getYear() {
    if (this.state.data && this.state.data.length != 0) {

      const obj = this.state.data;

      const dataYear = {
        labels: [2019, 2020, 2021, 2022],
        datasets: [{
          data: [0, 0, 0, 0]
        }],
      };

      obj.forEach(element => {
        for (let index = 0; index < 4; index++) {
          subStr = element.date.substring(6, 10);
          yearData = dataYear.labels[index]
          if (yearData == subStr) {
            dataYear.datasets.forEach((elementData) => {
              elementData.data[index] = elementData.data[index] + 1
            });
          }
        }
      });

      return this.rendereGraph(dataYear);
    }
  }

  rendereGraph(data) {
    const width = (Dimensions.get("window").width);
    const height = 720;

    return (
      <LineChart
        data={data}
        width={width}
        height={height}
        yAxisLabel={'n° '}
        chartConfig={{ 
          decimalPlaces: 0, 
          backgroundColor: '#0091EA',
          backgroundGradientFrom: '#0091EA',
          backgroundGradientTo: '#0091EA',
          color: (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
      />
    )
  }
  
  render() {
    const FirstRoute = () => (
      <View>{this.getDay()}</View>
    );
    
    const SecondRoute = () => (
      <View>{this.getMonth()}</View>
    );
    const ThirdRoute = () => (
      <View>{this.getYear()}</View>
    );
    
    console.log("State", this.state)
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
        })}
        swipeEnabled={true}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    )
  }
}