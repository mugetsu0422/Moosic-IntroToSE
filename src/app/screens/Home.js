import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  SafeAreaView, 
  ImageBackground,
  ScrollView, 
  TouchableOpacity, 
  FlatList } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Playlist from './playlist'
import { API_URL, PATH } from '../constants/constants';
import axios from 'axios'
import Music from './MusicScreen';
import Profile from './Profile';
import { AudioContext } from '../context/AudioProvider';
const Stack = createNativeStackNavigator();

const prepareHomeData = async() => {
  const fullURL = API_URL + PATH.SEARCH_BY_PLAYLIST + '?q='
  try {
    const {data:response} = await axios.get(fullURL) //use data destructuring to get data from the promise object
    return response
  }
  catch (error) {
    console.log(error);
  }
};

prepareHomeData()

export default function Home({navigation, route}) {
  const {content} = route.params
  return(
  <NavigationContainer independent={true}>
            <Stack.Navigator >
              <Stack.Screen name='Home' component={HomeDisplay} options={{headerShown: false,}} 
                initialParams={{content: content}}/>
              <Stack.Screen name='Playlist' component={Playlist} options={{headerShown: false,}}/>
              <Stack.Screen name="Music" component={Music} options={{headerShown: false,}}/>
            </Stack.Navigator>
  </NavigationContainer>
  );
}

const HomeDisplay = ({navigation, route}) => {
  // var data = []
  // prepareHomeData().then(content => data = content)
  // const [data, setData] = React.useState(prepareHomeData())
  // prepareHomeData().then(data => setData(data))
  const {content} = route.params
  const audioContext = React.useContext(AudioContext)

  const getPlaylistContent = async(playlist_id) => {
    const fullURL = API_URL + PATH.PLAYLIST_CONTENT + playlist_id
    try {
      const {data:response} = await axios.get(fullURL) //use data destructuring to get data from the promise object
      return response
    }
    catch (error) {
      console.log(error);
    }
  }

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => {
      getPlaylistContent(item.playlist_id).then(playlistContent => {
        navigation.navigate('Playlist', {playlistInfo: item, content: playlistContent})}).catch(err =>{
          console.log(err)
        });
      ;}}>
      <View style={{
        flexDirection: 'row', 
        alignContent: 'center',     
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth, 
        paddingBottom: 10,
        paddingTop: 10,
        }}>
        <Image style={styles.playlist} source={require('../../assets/playlist.png')} />
          <Text style={styles.PLname} > {item.title} </Text>
      </View>
      
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image 
          source={require('../../assets/screen1.jpg')}
          style={styles.background}
        />
      </View>
      
      <View style={styles.body}> 
        {/* <ScrollView> */}
          <View style={{flexDirection: 'row', alignSelf: 'center', paddingBottom: 20}}>
            <Image style={styles.tropy} source={require('../../assets/trophy.png')} />
            <Text style={styles.recommend}> Recommend play list </Text>
          </View>

          <FlatList
            
            data={content}
            renderItem={renderItem}
            keyExtractor={item => item.playlist_id}
            extraData={data}
          />

            {/* <TouchableOpacity onPress={() => {
              getPlaylistContent(2).then(playlistContent => {
                navigation.navigate('Playlist', {content: playlistContent})}).catch(err =>{
                  console.log(err)
                });
              ;}}>
              <Image style={styles.playlist} source={require('../../assets/PL1.png')} />
              <View style={styles.name} > 
                <Text style={styles.PLname} > Fall out boy </Text>
              </View>
              
            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => navigation.navigate('Playlist')}>
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
            </TouchableOpacity> */}

        {/* </ScrollView> */}
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
    // marginVertical: 30,
    // marginLeft: 80,
  },
  recommend:{
    fontSize: 18,
    // marginTop: -60,
    // marginLeft: 130,
    // marginBottom: 20,
    alignSelf:'center',
  },
  playlist:{
    width: '60%',
    height: 150,
  },
  name:{
    height:150,
    width: 100,
    marginTop: -45,
    marginLeft: 200,
  },
  PLname:{
    fontSize: 22,
    color: 'black',
    alignSelf: 'center',
  },
  PLname1:{
    fontSize: 18,
    color: 'black'
  },
});
