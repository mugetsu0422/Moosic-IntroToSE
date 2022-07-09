 import * as React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

export default function App() {

  const [type, setType] = React.useState(1);
  const [type1, setType1] = React.useState(2);

  const _onPress = (code) => {
    setType(code)
    setType1(type)
  };

  const [type2, setType2] = React.useState(1);
  const [type3, setType3] = React.useState(2);

  const _onPress1 = (code) => {
    setType2(code)
    setType3(type2)
  };
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

            <Image style={styles.musicButton2} source={require('./assets/shuffle.png')}/>


            <Image style={styles.musicButton1} source={require('./assets/back.png')}/>

            <TouchableOpacity onPress={() => _onPress(type1)}>
                <Image style={styles.musicButton0} source={image.type[type]}/>
            </TouchableOpacity>    

            <TouchableOpacity>
              <Image style={styles.musicButton3} source={require('./assets/next.png')}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => _onPress1(type3)}>
              <Image style={styles.musicButton4} source={image1.type[type2]}/>
            </TouchableOpacity>
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
    height: '100%',
    width: '100%',
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
    marginLeft: 100,
    marginRight: 15,
    marginVertical: 40,
  },
    musicButton2:{
    height: 25,
    width: 45,
    marginLeft: 45,
    marginRight: 15,
    marginTop: 55,
    marginBottom: -80,
  },
    musicButton3:{
    height: 55,
    width: 55,
    marginLeft: 222,
    marginTop: -95,
  },
    musicButton4:{
    height: 55,
    width: 55,
    marginLeft: 282,
    marginTop: -95,
  },
  musicButton0:{
    height: 55,
    width: 55,
    marginRight: 70,
    marginLeft: 162,
    marginTop: -95,
  },
});

export const image = {
  type:{
      '1': require('./assets/play.png'),
      '2': require('./assets/pause.png'),
    }
};

export const image1 = {
  type:{
      '1': require('./assets/repeat.png'),
      '2': require('./assets/repeatT.png'),
    }
};

