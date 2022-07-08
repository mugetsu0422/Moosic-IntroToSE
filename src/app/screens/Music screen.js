import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <View style={styles.container}>

      <View style ={styles.info}>
        <ImageBackground style={styles.background} source={require('./assets/background.jpg')}>
          <View style={styles.des1}>
            <Image style={styles.back} source={require('./assets/a.png')}/>
          </View>

            <View style={styles.musicInf}>
              <Image style={styles.musicImg} source={require('./assets/music.jpg')}/>
              <Text style={styles.nameSong} > Name song - name artist </Text>
            </View>
            
          <View style={styles.des}>
            <Image style={styles.musicButton1} source={require('./assets/back.png')}/>
            <Image style={styles.musicButton2} source={require('./assets/play.png')}/>
            <Image style={styles.musicButton3} source={require('./assets/pause.png')}/>
            <Image style={styles.musicButton4} source={require('./assets/next.png')}/>
          </View>
        </ImageBackground>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  back:{
    height:50,
    width:50,
    marginTop: 13,
    marginHorizontal: 5,
  },
  des1: {
    flex: 1,
    backgroundColor: '#ded7d7',
    opacity: 0.5,
    height:35,
  },
  des: {
    flex: 2.5,
    backgroundColor: '#ded7d7',
    opacity: 0.5,
    height:35,
  },
  info: {
    flex: 1,
  },
  background:{
    flex: 1,
    height: 700,
    width: 375,
  },
  musicInf:
  {
    flex: 8,
  },
  musicImg:{
    width: 200,
    height: 200,
    opacity: 0.8,
    marginVertical: 130,
    marginHorizontal:80,
  },
  nameSong:{
    color: 'white',
    fontSize: 20,
    marginTop: -110,
    marginHorizontal: 75,
  },
  musicButton1:{
    height: 55,
    width: 55,
    marginLeft: 70,
    marginTop: 40,
  },
    musicButton2:{
    height: 55,
    width: 55,
    marginLeft: 130,
    marginTop: -55,
  },
    musicButton3:{
    height: 55,
    width: 55,
    marginLeft: 190,
    marginTop: -55,
  },
    musicButton4:{
    height: 55,
    width: 55,
    marginRight: 70,
    marginLeft: 250,
    marginTop: -55,

  },
});
