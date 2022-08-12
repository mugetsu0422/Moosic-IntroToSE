import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AudioContext } from '../context/AudioProvider';
import Slider from '@react-native-community/slider';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;

export default function Music({navigation, route}) {
  const audioContext = React.useContext(AudioContext)

  const calculateSeekBar =() => {
    if(audioContext.playbackPosition !== null && audioContext.playbackDuration !== null) {
      return audioContext.playbackPosition / audioContext.playbackDuration
    }
    return 0
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('../../assets/musicBackground.jpg')} 
        resizeMode="cover">
        <View style={styles.des1}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={50} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.musicInf}>
          <Image style={styles.musicImg} source={require('../../assets/song.png')}/>
          <Text style={styles.nameSong}> {audioContext.currentSong.title} </Text>
          <Text style={styles.artist}> {audioContext.currentSong.performer} </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeekBar()}
            // onValueChange={(value) => audioContext.seekbarSlider(value)}
            minimumTrackTintColor="red"
            maximumTrackTintColor="white"
            onSlidingComplete={(value) => audioContext.seekbarSlider(value)}
          />
        </View>
          
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => audioContext.shuffleButton()}>
            {Shuffle.type[audioContext.shuffle]}
          </TouchableOpacity>

         <TouchableOpacity onPress={() => audioContext.backwardButton()}>
            <Ionicons name="play-skip-back-sharp" size={50} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {
            audioContext.playpauseButton()}}>
            {PlayPause.type[audioContext.play]}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => audioContext.forwardButton()}>
            <Ionicons name="play-skip-forward-sharp" size={50} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => audioContext.repeatButton()}>
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
    opacity: 0.9,
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
  },
  nameSong:{
    color: 'white',
    fontSize: 30,
    paddingTop: 10,
    textAlign: 'center',
  },
  artist:{
    color: 'white',
    fontSize: 20,
    paddingTop: 10,
  },
  slider:{
    width: widthScreen - 50, 
    height: 50,
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
    'alphabetical': <MaterialIcons name="shuffle" size={50} color="white"/>,
    'random': <MaterialIcons name="shuffle" size={50} color="red"/>,
  }
}

const Repeat = {
  type: {
    'none': <MaterialIcons name="repeat" size={50} color="white"/>,
    'playlist': <MaterialIcons name="repeat" size={50} color="red"/>,
    'song': <MaterialIcons name="repeat-one" size={50} color="red"/>,
  }
}