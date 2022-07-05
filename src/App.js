import Welcomescreen from './app/screens/Welcome'
import SignIn from './app/screens/signin';
import SignUp from './app/screens/signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
      headerShown: false,
      background: 'transparent',
  }}
      initialRouteName = "Welcome"
  >
        <Stack.Screen name="Welcome" component={Welcomescreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;