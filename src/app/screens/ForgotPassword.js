import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik'
import axios from 'axios'

const API_URL = "http://192.168.100.9:4000/search/artist?q=andiez"

export default function ForgotPassword({navigation}) {
  const GetPassword = async(formData) => {
    const {data} = await axios.get(API_URL, formData)
      .then(response => {
        console.log(response.data)
        alert('Login successfully')
      })
      .catch(error => {
        console.log(error)
        console.error(error.request?._response);
      })

    // const res = await fetch("http://localhost:4000/search/artist?q=andiez", {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // const json = await res.json()
    // console.log(json)
  }

  return (
    <View style={styles.AndroidSafeArea}>
      <View style={styles.des}>
        <TouchableOpacity style = {styles.back} onPress ={ () => navigation.goBack()}>
          <AntDesign name = "arrowleft" size={50} color='white' borderRadius={2}  />
        </TouchableOpacity>
      </View>

      <View style ={styles.info}>
        <Text style = {styles.txt}>Get your password back </Text>

        <Formik initialValues={{username: '', email: ''}} onSubmit={GetPassword}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <View style ={styles.box}>
                <TextInput style = {styles.textinput} 
                placeholder="Username"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                />
              </View>

              <View style ={styles.box}>
                <TextInput style = {styles.textinput} 
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                />
              </View>

              <View style ={styles.button}>
                <TouchableOpacity
                  onPress={handleSubmit}>
                  <Text style = {styles.getbackText}> Get Back </Text>
                </TouchableOpacity>
              </View>
            </>
          )} 
        </Formik>
      </View>

      <View style={styles.des}/>

    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
},
  back:{
    marginHorizontal: 10,
    alignContent: 'flex-start',
    resizeMode: 'repeat',
    flex: 1,
    width: '15%',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 30,
    color: 'red',
    paddingVertical: 50,
    alignSelf: 'center',
  },
  des: {
    flex: 1.1,
    backgroundColor: 'red'
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
    backgroundColor: 'red',
    weight: 200,
    height: 44,
    justifyContent: 'center',
  },
  textinput:{
    textAlign:'center',
    marginVertical: 6, 
    fontSize: 20, 
    marginHorizontal: 10,
   
    borderColor:'grey',
    borderRadius:20,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  getbackText: {
    fontSize: 20, 
    color: 'white', 
    alignSelf: 'center',
  },
});