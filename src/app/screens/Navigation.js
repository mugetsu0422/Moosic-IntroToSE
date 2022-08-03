import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView,} from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import Profile from './profile';
import Home from './home';
import Playlist from './playlist'
import Setting from './setting'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
     
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
      />
      <Tab.Screen
        name="Search"
        headerMode="none"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User Playlist"
        component={Home}
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

export default function APP() {
  return (
    <View style={styles.container}>   
      <NavigationContainer>
        <MyTabs />
        <Stack.Screen name='Playlist' component={Playlist}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Setting' component={Setting}/>
      </NavigationContainer>
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
