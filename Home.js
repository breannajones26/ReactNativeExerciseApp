import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation, route }) => {
  // Get exercises from navigation params
  const { exercises } = route.params;

  // Navigate to the appropriate exercise screen based on type
  const navigateToExercise = (exercise) => {
    if (exercise.type === 'repetition') {
      navigation.navigate('RepetitionExercise', {
        id: exercise.id,
        name: exercise.name,
        exercises: exercises,
        suggestedExercise: exercise.suggestedExercise
      });
    } else if (exercise.type === 'duration') {
      navigation.navigate('DurationExercise', {
        id: exercise.id,
        name: exercise.name,
        exercises: exercises,
        suggestedExercise: exercise.suggestedExercise
      });
    }
  };

  // Render each exercise button
  const renderExerciseButton = ({ item }) => (
    <Button
      title={item.name}
      buttonStyle={styles.exerciseButton}
      containerStyle={styles.buttonContainer}
      onPress={() => navigateToExercise(item)}
      icon={{
        name: item.type === 'repetition' ? 'repeat' : 'timer',
        type: 'font-awesome',
        color: 'white',
        size: 20,
      }}
      iconRight
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.title}>Exercise Tracker</Text>
      <Text style={styles.subtitle}>Select an exercise to begin:</Text>
      
      <FlatList
        data={exercises}
        renderItem={renderExerciseButton}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    textAlign: 'center',
    marginVertical: 15,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#555',
  },
  list: {
    width: '100%',
  },
  buttonContainer: {
    marginBottom: 15,
    width: '100%',
  },
  exerciseButton: {
    backgroundColor: '#47B5FF',
    borderRadius: 8,
    paddingVertical: 12,
  },
});

export default Home;