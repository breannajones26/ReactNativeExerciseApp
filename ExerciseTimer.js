// src/ExerciseTimer.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const ExerciseTimer = ({ route, navigation }) => {
  const { exercise, suggested } = route.params; // Get the exercise name and suggested exercise
  const [time, setTime] = useState(0); // Time in seconds
  const [isActive, setIsActive] = useState(false); // Whether the timer is active
  const [repetitions, setRepetitions] = useState(0); // Number of repetitions completed
  const [duration, setDuration] = useState(5); // Duration of each exercise (in seconds)

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartStop = () => {
    if (isActive && time >= duration) {
      setRepetitions(repetitions + 1);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTime(0);
    setRepetitions(0);
    setIsActive(false);
  };

  const handleDurationChange = (text) => {
    const newDuration = parseInt(text, 10);
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercise: {exercise}</Text>
      <Text>Duration (seconds):</Text>
      <TextInput
        style={styles.input}
        value={String(duration)}
        onChangeText={handleDurationChange}
        keyboardType="numeric"
      />
      <Text>Current Time: {time} seconds</Text>
      <Text>Repetitions Completed: {repetitions}</Text>
      <Button title={isActive ? 'Pause' : 'Start'} onPress={handleStartStop} />
      <Button title="Reset" onPress={handleReset} />
      <Button
        title="Suggested Exercise"
        onPress={() => navigation.navigate('ExerciseTimer', { exercise: suggested, suggested })}
      />
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: 100,
    textAlign: 'center',
  },
});

export default ExerciseTimer;
