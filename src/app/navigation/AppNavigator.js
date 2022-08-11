import Welcomescreen from '../screens/Welcome'
import SignIn from '../screens/signin';
import SignUp from '../screens/signup';
import Setting from '../screens/setting';
import FavoriteScreen from '../screens/favorite';
import ForgotPassword from '../screens/ForgotPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import HomeNavigator from '../navigation/HomeNavigator';
import Playlist from '../screens/playlist';
import Search from '../screens/search';
import MySong from '../screens/mysong';
import Music from '../screens/MusicScreen';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

function AppNavigator() {
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
      background: 'Welcome',
  }}
      initialRouteName = "Welcome"

  >
        <Stack.Screen name="Welcome" component={Welcomescreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Setting" component={Setting}/>
        <Stack.Screen name="HomeNavigator" component={HomeNavigator}/>
        <Stack.Screen name="Playlist" component={Playlist}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="MySong" component={MySong}/>
        <Stack.Screen name="Music" component={Music}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;