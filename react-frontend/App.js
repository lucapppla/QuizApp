import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation"; // Version can be specified in package.json

import QuizListScreen from "./src/components/Screen/HomeScreen";
import StartQuiz from "./src/components/Screen/UserScreen";
import StaticsListScreen from "./src/components/Screen/StaticsScreen";
import TestStart from "./src/components/Screen/TestStart";

const HomeStack = createStackNavigator({
  QuizList: { 
    screen: QuizListScreen,
    navigationOptions: { 
      title: 'Quiz',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  StartQuiz: { screen: StartQuiz },
  TestStart: { screen : TestStart },

});

const StaticsStack = createStackNavigator({
  Statics: { 
    screen: StaticsListScreen,
    navigationOptions: { 
      title: 'Statics',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  StartQuiz: { screen: StartQuiz }
});

export default createAppContainer(
  createBottomTabNavigator(
    {
      Quiz: HomeStack,
      Statics: StaticsStack
    },
    {
      initialRouteName: "Quiz",
    }
  ),
);
