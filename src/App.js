//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AudioProvider } from './app/context/AudioProvider';
import AppNavigator from './app/navigation/AppNavigator';

// create a component
const App = () => {
  return (
    <AudioProvider>
      <AppNavigator/>
    </AudioProvider>
  );
};

export default App;
