import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import PlanetDetails from './screens/PlanetDetails';

export default function App() {
 
    return (
      <AppContainer />
    );
 
}

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PlanetDetails: {
    screen: PlanetDetails,
  },
},
{
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppStackNavigator);