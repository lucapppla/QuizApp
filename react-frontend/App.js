import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";

import QuizListScreen from "./src/components/Screen/QuizListScreen";
import UserScreen from "./src/components/Screen/UserScreen";
import StaticsListScreen from "./src/components/Screen/StaticsScreen";
import {AnswerScreen} from "./src/components/Screen/AnswerScreen";
import StatsAfterAnswerScreen from "./src/components/Screen/StatsAfterAnswerScreen";

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
  UserScreen: { screen: UserScreen },
  AnswerScreen: {
    screen: AnswerScreen,
    navigationOptions: {
      header: null,
      headerLeft: null
    }
  },
  StatsAfterAnswerScreen: {
    screen: StatsAfterAnswerScreen,
    navigationOptions: {
      headerLeft: null
    }
  }

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
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "AnswerScreen") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible
  };
};

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
