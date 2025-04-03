import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { findExerciseById } from '../components/ExerciseData';

const RepetitionExercise = ({ navigation, route }) => {
  // Get data from navigation params
  const { id, name, exercises, suggestedExercise } = route.params;
  
  // Initialize count state
  const [count, setCount] = useState(0);

  // Find the suggested exercise details
  const nextExercise = findExerciseById(exercises, suggestedExercise);

  // Increase repetition count
  const increaseCount = () => {
    setCount(count + 1);
  };

  // Reset count to zero
  const resetCount = () => {
    setCount(0);
  };

  // Navigate to suggested exercise
  const navigateToSuggested = () => {
    if (nextExercise.type === 'repetition') {
      navigation.navigate('RepetitionExercise', {
        id: nextExercise.id,
        name: nextExercise.name,
        exercises: exercises,
        suggestedExercise: nextExercise.suggestedExercise
      });
    } else {
      navigation.navigate('DurationExercise', {
        id: nextExercise.id,
        name: nextExercise.name,
        exercises: exercises,
        suggestedExercise: nextExercise.suggestedExercise
      });
    }
  };

  // Go back to home screen
  const goHome = () => {
    navigation.navigate('Home', { exercises: exercises });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.exerciseName}>{name}</Text>
      
      <View style={styles.countContainer}>
        <Text h1 style={styles.countText}>{count}</Text>
        <Text style={styles.repsText}>repetitions</Text>
      </View>
      
      <Button
        title="Add Rep"
        onPress={increaseCount}
        icon={{ name: 'plus', type: 'font-awesome' }}
        buttonStyle={styles.addButton}
        titleStyle={styles.buttonText}
      />
      
      <Button
        title="Reset"
        onPress={resetCount}
        icon={{ name: 'refresh', type: 'font-awesome' }}
        buttonStyle={styles.resetButton}
        titleStyle={styles.buttonText}
      />
      
      <View style={styles.navButtonsContainer}>
        <Button
          title={`Try ${nextExercise.name}`}
          onPress={navigateToSuggested}
          icon={{ name: 'arrow-right', type: 'font-awesome' }}
          iconRight
          buttonStyle={styles.suggestedButton}
          containerStyle={styles.navButtonContainer}
        />
        
        <Button
          title="Home"
          onPress={goHome}
          icon={{ name: 'home', type: 'font-awesome' }}
          buttonStyle={styles.homeButton}
          containerStyle={styles.navButtonContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  exerciseName: {
    marginVertical: 20,
    textAlign: 'center',
  },
  countContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  countText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#47B5FF',
  },
  repsText: {
    fontSize: 18,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    width: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
  },
  navButtonContainer: {
    width: '48%',
  },
  suggestedButton: {
    backgroundColor: '#6200EE',
    borderRadius: 8,
  },
  homeButton: {
    backgroundColor: '#555',
    borderRadius: 8,
  },
});

export default RepetitionExercise;