import Welcomescreen from './app/screens/Welcome'
import SignIn from './app/screens/signin';
import SignUp from './app/screens/signup';
import Setting from './app/screens/setting';
import FavoriteScreen from './app/screens/favorite';
import ForgotPassword from './app/screens/ForgotPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import HomeNavigator from './app/navigation/HomeNavigator';


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
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Setting" component={Setting}/>
        <Stack.Screen name="Home" component={HomeNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;