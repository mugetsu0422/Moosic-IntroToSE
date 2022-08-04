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
import Playlist from './app/screens/playlist';
import Search from './app/screens/search';

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
      initialRouteName = "Search"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;