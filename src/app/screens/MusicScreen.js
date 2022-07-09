import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Music() {

  const [play, setPlay] = React.useState('play')
  const [shuffle, setShuffle] = React.useState('random')
  const [repeat, setRepeat] = React.useState('none')

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('../../assets/background.jpg')} resizeMode="cover">
        <View style={styles.des1}>
          <MaterialIcons name="arrow-back" size={50} color="white" />
        </View>

        <View style={styles.musicInf}>
          <Image style={styles.musicImg} source={require('../../assets/music.jpg')}/>
          <Text style={styles.nameSong} > Name song - name artist </Text>
        </View>
          
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => setShuffle(shuffle === 'random' ? 'alphabetical' : 'random')}>
            {Shuffle.type[shuffle]}
          </TouchableOpacity>

         <TouchableOpacity onPress={() => null}>
            <Ionicons name="play-skip-back-sharp" size={50} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setPlay(play === 'play' ? 'pause' : 'play')}>
            {PlayPause.type[play]}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => null}>
            <Ionicons name="play-skip-forward-sharp" size={50} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setRepeat(
              repeat === 'none' ? 'playlist' 
              : repeat === 'playlist' ? 'song' 
              : 'none')}>
            {Repeat.type[repeat]}
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
    width: 200,
    height: 200,
    opacity: 0.8,
  },
  nameSong:{
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