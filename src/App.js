import Welcomescreen from './app/screens/Welcome'
import SignIn from './app/screens/signin';
import SignUp from './app/screens/signup';
import FavoriteScreen from './app/screens/favorite';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';

const Stack = createNativeStackNavigator();

function App() {
  // const AdminUser = {
  //   username: "admin",
  //   password: "admin123",
  // }

  // const [user, setUser] = useState({name: "", email:""});
  // const [error, setError] = useState("");

  // const Login = details => {
  //   console.log(details);
  // }

  // const Logout = () => {
  //   console.log("Logout");
  // }



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
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;