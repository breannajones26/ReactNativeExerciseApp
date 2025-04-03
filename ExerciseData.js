// Exercise data that will be passed between screens
export const exerciseList = [
    {
      id: '1',
      name: 'Push-ups',
      type: 'repetition',
      suggestedExercise: '2', // ID of suggested next exercise
    },
    {
      id: '2',
      name: 'Sit-ups',
      type: 'repetition',
      suggestedExercise: '3',
    },
    {
      id: '3',
      name: 'Squats',
      type: 'repetition',
      suggestedExercise: '4',
    },
    {
      id: '4',
      name: 'Plank',
      type: 'duration',
      suggestedExercise: '5',
    },
    {
      id: '5',
      name: 'Jumping Jacks',
      type: 'duration',
      suggestedExercise: '1',
    },
  ];
  
  // Helper function to find exercise by ID
  export const findExerciseById = (exercises, id) => {
    return exercises.find(exercise => exercise.id === id);
  };