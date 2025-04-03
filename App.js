import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import Home from './screens/Home';
import RepetitionExercise from './screens/RepetitionExercise';
import DurationExercise from './screens/DurationExercise';

// Import exercise data
import { exerciseList } from './components/ExerciseData';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            initialParams={{ exercises: exerciseList }}
            options={{ title: 'Exercise Tracker' }}
          />
          <Stack.Screen 
            name="RepetitionExercise"
            component={RepetitionExercise}
            options={({ route }) => ({ title: route.params.name })}
          />
          <Stack.Screen 
            name="DurationExercise"
            component={DurationExercise}
            options={({ route }) => ({ title: route.params.name })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
