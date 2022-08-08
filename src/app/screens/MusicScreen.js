import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AudioContext } from '../context/AudioProvider';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default function Music({navigation, route}) {
  const audioContext = React.useContext(AudioContext)
  const {songInfo} = route.params

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('../../assets/background.jpg')} resizeMode="cover">
        <View style={styles.des1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={50} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.musicInf}>
          <Image style={styles.musicImg} source={require('../../assets/song.png')}/>
          <Text style={styles.nameSong}> {songInfo.title} </Text>
          <Text style={styles.artist}> {songInfo.performer} </Text>
        </View>
          
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => audioContext.updateState(audioContext, 
            {shuffle: audioContext.shuffle === 'random' ? 'alphabetical' : 'random'})}>
            {Shuffle.type[audioContext.shuffle]}
          </TouchableOpacity>

         <TouchableOpacity onPress={() => null}>
            <Ionicons name="play-skip-back-sharp" size={50} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {
            audioContext.updateState(audioContext,
              {play: audioContext.play === 'play' ? 'pause' : 'play'})
            audioContext.handleAudioPress(songInfo)}}>
            {PlayPause.type[audioContext.play]}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => audioContext.forwardButton()}>
            <Ionicons name="play-skip-forward-sharp" size={50} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => audioContext.updateState(audioContext,
              {repeat: 
              audioContext.repeat === 'none' ? 'playlist' 
              : audioContext.repeat === 'playlist' ? 'song' 
              : 'none'})}>
            {Repeat.type[audioContext.repeat]}
          </TouchableOpacity>
          
        </View>
      </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  des1: {
    flex: 1,
    height: 35,
    justifyContent: 'center',
    top: 25,
  },
  buttons: {
    flex: 1.5,
    flexDirection: "row", 
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 50,
  },
  background:{
    flex: 1,
    justifyContent: "center",
    opacity: 0.95,
  },
  musicInf:
  {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  musicImg:{
    width: widthScreen * 0.6,
    height: heightScreen * 0.3,
    borderRadius: 10,
    opacity: 0.8,
  },
  nameSong:{
    color: 'white',
    fontSize: 25,
    paddingTop: 10,
  },
  artist:{
    color: 'white',
    fontSize: 20,
    paddingTop: 10,
  },
});

const PlayPause = {
  type: {
    'play': <Ionicons name="play-sharp" size={70} color="white"/>,
    'pause': <Ionicons name="pause-sharp" size={70} color="white"/>,
  }
}

const Shuffle = {
  type: {
    'random': <MaterialIcons name="shuffle" size={50} color="white"/>,
    'alphabetical': <MaterialIcons name="shuffle" size={50} color="red"/>,
  }
}

const Repeat = {
  type: {
    'none': <MaterialIcons name="repeat" size={50} color="white"/>,
    'playlist': <MaterialIcons name="repeat" size={50} color="red"/>,
    'song': <MaterialIcons name="repeat-one" size={50} color="red"/>,
  }
}