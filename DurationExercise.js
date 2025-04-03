import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { findExerciseById } from '../components/ExerciseData';

const DurationExercise = ({ navigation, route }) => {
  // Get data from navigation params
  const { id, name, exercises, suggestedExercise } = route.params;
  
  // State for timer
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  
  // Timer reference
  const timerRef = useRef(null);
  
  // Find the suggested exercise details
  const nextExercise = findExerciseById(exercises, suggestedExercise);

  // Timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isActive && timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Cleanup on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]);

  // Format time to MM:SS
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Toggle timer
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Reset timer
  const resetTimer = () => {
    setIsActive(false);
    setTime(0);
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
      
      <View style={styles.timerContainer}>
        <Text h1 style={styles.timerText}>{formatTime()}</Text>
        <Text style={styles.timerLabel}>minutes:seconds</Text>
      </View>
      
      <Button
        title={isActive ? "Pause" : "Start"}
        onPress={toggleTimer}
        icon={{ 
          name: isActive ? 'pause' : 'play', 
          type: 'font-awesome'
        }}
        buttonStyle={[
          styles.timerButton,
          { backgroundColor: isActive ? '#FF9800' : '#4CAF50' }
        ]}
        titleStyle={styles.buttonText}
      />
      
      <Button
        title="Reset"
        onPress={resetTimer}
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
  timerContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  timerText: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#47B5FF',
    fontFamily: 'monospace',
  },
  timerLabel: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
  },
  timerButton: {
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

export default DurationExercise;