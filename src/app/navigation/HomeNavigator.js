import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView,} from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Playlist from '../screens/playlist'
import Setting from '../screens/setting'
import Music from '../screens/MusicScreen';
import Search from '../screens/search';
import MySong from '../screens/mysong';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MyTabs({navigation, route}) {
  const {content} = route.params
  // console.log(route.params)
  // console.log(content)
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      /> */}
     
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
        initialParams={{content: content}}
      />
      <Tab.Screen
        name="Search"
        headerMode="none"
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MySong"
        component={MySong}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="note" color={color} size={size} />
          ),

        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function HomeNavigator({navigation, route}) {
  return (
    <View style={styles.container}>   
        <MyTabs navigation={navigation} route={route}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },

});
