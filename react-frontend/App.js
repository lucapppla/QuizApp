import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";

import QuizListScreen from "./src/components/Screen/QuizListScreen";
import UserScreen from "./src/components/Screen/UserScreen";
import {AnswerScreen} from "./src/components/Screen/AnswerScreen";
import StatsAfterAnswerScreen from "./src/components/Screen/StatsAfterAnswerScreen";

import StaticsListScreen from "./src/components/Screen/StaticsScreen";
import NumberUsers from "./src/components/Screen/NumberUsers";
import PercentCorrectAnswer from "./src/components/Screen/PercentCorrectAnswer";
import PercentCorrectAnswerForUser from "./src/components/Screen/PercentCorrectAnswerForUser";
import AverageScore from "./src/components/Screen/AverageScore";

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
      gesturesEnabled: false,
      header: null,
      headerLeft: null
    }
  },
  StatsAfterAnswerScreen: {
    screen: StatsAfterAnswerScreen,
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null
    }
  }

});

const StaticsStack = createStackNavigator({
  Statistiche: { 
    screen: StaticsListScreen,
    navigationOptions: { 
      title: 'Statistiche',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  NumberUsers: {
    screen: NumberUsers,
    navigationOptions: { 
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  PercentCorrectAnswer: {
    screen: PercentCorrectAnswer,
    navigationOptions: { 
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  PercentCorrectAnswerForUser: {
    screen: PercentCorrectAnswerForUser,
    navigationOptions: { 
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  AverageScore:{
    screen: AverageScore,
    navigationOptions: { 
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
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
      Statistiche: StaticsStack
    },
    {
      initialRouteName: "Quiz",
    }
  )
);
