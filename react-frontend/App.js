import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from "react-navigation";
import { Icon } from 'react-native-elements';

import QuizListScreen from "./src/components/Screen/QuizListScreen";
import UserScreen from "./src/components/Screen/UserScreen";
import { AnswerScreen } from "./src/components/Screen/AnswerScreen";
import StatsAfterAnswerScreen from "./src/components/Screen/StatsAfterAnswerScreen";

import StatisticsQuizListScreen from "./src/components/Screen/StatisticsQuizListScreen";
import StaticsScreen from "./src/components/Screen/StaticsScreen";
import UserList from "./src/components/Screen/UserList";
import ReadJsonContent from "./src/components/Screen/ReadJsonContent";
import NumberUsers from "./src/components/Screen/NumberUsers";
import PercentCorrectAnswer from "./src/components/Screen/PercentCorrectAnswer";

//home screen
const HomeStack = createStackNavigator({
  QuizList: {
    screen: QuizListScreen,
    navigationOptions: {
      title: 'Quiz',
      headerStyle: {
        backgroundColor: '#007EA7'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
  UserScreen: {
    screen: UserScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#007EA7',
      },
      headerTintColor: 'white'
    }
  },
  AnswerScreen: {
    screen: AnswerScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#007EA7',
      },
      gesturesEnabled: false,
      header: null,
      headerLeft: null
    }
  },
  StatsAfterAnswerScreen: {
    screen: StatsAfterAnswerScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#007EA7',
      },
      gesturesEnabled: false,
      headerLeft: null
    }
  }
});

//statistics screen
const StaticsStack = createStackNavigator({
  StatisticsQuizListScreen: {
    screen: StatisticsQuizListScreen,
    navigationOptions: {
      title: 'Statistiche',
      headerStyle: {
        backgroundColor: '#007EA7'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
  StaticsScreen: {
    screen: StaticsScreen,
    navigationOptions: {
      title: 'Statistiche Test',
      headerStyle: {
        backgroundColor: '#007EA7'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
  NumberUsers: {
    screen: NumberUsers,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#007EA7'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
  PercentCorrectAnswer: {
    screen: PercentCorrectAnswer,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#007EA7'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
  UserList: {
    screen: UserList,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#007EA7'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
  ReadJsonContent: {
    screen: ReadJsonContent,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#007EA7'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
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
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state;
          if (routeName === 'Quiz') {
            return (
              <Icon name='home' color={tintColor} size={40}/>
            );
          } else if (routeName === 'Statistiche') {
            return (
              <Icon name='show-chart' color={tintColor} size={40}/>
            );
          }
        },
      }),
      initialRouteName: "Quiz",
      tabBarOptions: {
        activeTintColor: '#00A8E8',
        inactiveTintColor: '#ffff',
        labelStyle: {
          fontSize: 14
        },
        style: {
          backgroundColor: '#007EA7'
        }
      }
    }
  )
);
