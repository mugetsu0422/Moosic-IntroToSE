import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, ImageBackground,ScrollView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Playlist from './playlist'
const Stack = createNativeStackNavigator();


export default function Home() {
  return(
  <NavigationContainer independent={true}>
            <Stack.Navigator >
              <Stack.Screen name='Home' component={HomeDisplay} options={{headerShown: false,}}/>
              <Stack.Screen name='Playlist' component={Playlist} options={{headerShown: false,}}/>
            </Stack.Navigator>
  </NavigationContainer>
  );
}


const HomeDisplay = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image 
          source={require('../../assets/screen1.jpg')}
          style={styles.background}
        />
      </View>
      
      <View style={styles.body}> 
        <ScrollView>
        <View>
          <Image style={styles.tropy} source={require('../../assets/trophy.png')} />
          <Text style={styles.recommend}> Recommend play list </Text>

          <TouchableOpacity onPress={() => navigation.navigate('Playlist')}>
            <Image style={styles.playlist} source={require('../../assets/PL1.png')} />
            <View style={styles.name} > 
              <Text style={styles.PLname} > Fall out boy </Text>
            </View>
            
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Playlist')}>
            <Image style={styles.playlist} source={require('../../assets/PL2.png')} />
            <View style={styles.name} > 
              <Text style={styles.PLname} > Sơn Tùng</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Playlist')}>
            <Image style={styles.playlist} source={require('../../assets/PL3.png')} />
            <View style={styles.name} > 
              <Text style={styles.PLname1} > MAROON </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Playlist')}>
            <Image style={styles.playlist} source={require('../../assets/PL4.png')} />
            <View style={styles.name} > 
              <Text style={styles.PLname} >ALAN WALKER</Text>
            </View>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  top:{
    flex: 1.85,
  },
  body:{
    flex: 4,
    backgroundColor:'white',
    justifyContent: 'center',
  },
  background:{
    width:'100%',
    height:'100%',
  },
  tropy:{
    width: 40,
    height: 40,
    marginVertical: 30,
    marginLeft: 80,
  },
  recommend:{
    fontSize: 18,
    marginTop: -60,
    marginLeft: 130,
    marginBottom: 20,
  },
  playlist:{
    width: 250,
    height: 150,
    marginHorizontal: 60,
    marginBottom: -40,
  },
  name:{
    height:150,
    width: 100,
    marginTop: -45,
    marginLeft: 200,
  },
  PLname:{
    fontSize: 18,
    color: 'white'
  },
  PLname1:{
    fontSize: 18,
    color: 'black'
  },
});
