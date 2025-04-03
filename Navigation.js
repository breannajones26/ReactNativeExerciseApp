// src/Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'; // Import the Home screen
import ExerciseTimer from './ExerciseTimer'; // Import the Exercise Timer screen

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ExerciseTimer" component={ExerciseTimer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navi