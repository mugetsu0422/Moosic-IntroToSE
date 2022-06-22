{/*import * as React from 'react';
import { Text, View, StyleSheet, Image, } from 'react-native';
import Constants from 'expo-constants';


// You can import from local files
//import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>
      <View style ={styles.des} />
      <View style={styles.info}>
        <View style={styles.avatar1}>
          <Image style={styles.avatar} source={require('./src/assets/Avatar.png')} />
          <View style = {styles.box1}>
            <Text style = {{marginVertical: 6, fontSize: 20}}> Nickname </Text>
          </View>
          <View style={styles.box2}>
            <Text style = {{marginVertical: 6, fontSize: 20}}> First Name </Text>
          </View>
          <View style={styles.box3}>
            <Text style = {{marginVertical: 6, fontSize: 20}}> Last Name </Text>
          </View>
          <View style={styles.box4}>
            <Text style = {{marginVertical: 6, fontSize: 20}}> Email </Text>
          </View>
          <View style={styles.box4}>
            <Text style = {{marginVertical: 6, fontSize: 20}}> Birthday </Text>
          </View>
          <View style={styles.box4}>
            <Text style = {{marginVertical: 6, fontSize: 20}}> Gender </Text>
          </View>
          <View style={styles.box4}>
            <Text style = {{marginVertical: 6, fontSize: 20}}> Phone number </Text>
          </View>
          <View style={styles.button}> 
            <View style={styles.button1}>
              <Text style={styles.textBut}> Change profile </Text>
            </View>
          </View>
        </View>
      </View>
      <View style ={styles.des} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },

  des: {
    flex: 1.1,
    backgroundColor: '#de4552'
  },
  info: {
    flex: 8,
    backgroundColor: '#faedef',
  },
  avatar1: {
    flex:1,
  },
  avatar: {
    height: 120, 
    width: 120, 
    borderRadius: 90,
    marginTop: 20,
    marginLeft: 20,
    borderColor: 'gray',
    borderWidth: 0.3,
  },

  box1: {
    marginLeft: 170,
    borderWidth: 0.7,
    borderRadius: 5,
    marginTop: -70,
    marginRight: 20,
  },

  box2:{
    marginLeft: 20,
    borderWidth: 0.7,
    borderRadius: 5,
    marginTop: 70,
    width: 162,
  },
  box3:{
    marginLeft: 191,
    borderWidth: 0.7,
    borderRadius: 5,
    marginTop: -37,
    marginRight: 20,
    width: 162,
  },
  box4:{
    marginLeft: 20,
    borderWidth: 0.7,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 20,
  },
  button:{
    flex: 1,
    marginHorizontal: 100,
    marginVertical: 40,
    },
  button1:{
    backgroundColor: '#de4552',
    height: 40,
    width: 180,
    borderRadius: 10,
  },
  textBut:{
    color: 'white',
    marginHorizontal: 22.5,
    marginVertical: 7,
    fontSize: 20,
  },
});

*/}



import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import welcomescreen from './src/app/screens/welcomescreen'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={welcomescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}