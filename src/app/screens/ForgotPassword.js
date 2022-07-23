import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import Constants from 'expo-constants';

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <View style={styles.des}>
        <Text style={styles.back}> BACK </Text>
      </View>
      <View style ={styles.info}>
        <Text style = {styles.txt}>Get your password back </Text>

        <View style ={styles.box}>
          <TextInput style = {{marginVertical: 6, fontSize: 20, marginHorizontal: 10}} placeholder="Username"/>
        </View>

        <View style ={styles.box}>
          <TextInput style = {{marginVertical: 6, fontSize: 20, marginHorizontal: 10}} placeholder="email"/>
        </View>

        <View style ={styles.button}>
          <Text style = {{marginVertical: 9, fontSize: 20, color: 'white', marginHorizontal: 63}}>Done </Text>
        </View>
      </View>
      <View style={styles.des}/>
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
    flex: 1,
    color: 'black',
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 25,
  },
  txt: {
      fontSize: 30,
      color: '#de4552',
      paddingVertical: 50,
      paddingHorizontal: 42,
  },
  des: {
    flex: 1.1,
    backgroundColor: '#de4552'
  },
  info: {
    flex: 8,
  },
  box:{
    marginLeft: 20,
    borderWidth: 0.7,
    borderRadius: 5,
    marginRight: 20,
    marginTop: 10,
  },
  button:{
    borderRadius: 5,
    marginHorizontal: 100,
    marginVertical: 100,
    backgroundColor: '#de4552',
    weight: 200,
    height: 44,
  },
});