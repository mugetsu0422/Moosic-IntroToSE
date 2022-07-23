import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik'
import axios from 'axios'

const API_URL = "http://192.168.100.9:4000/search/artist?q=andiez"

export default function ForgotPassword({navigation}) {
  const GetPassword = (formData) => {
    axios.get(API_URL, formData)
      .then(response => {
        console.log(response.data)
        alert('Login successfully')
      })
      .catch(error => {
        console.log(error)
        alert(error.response.data)
      })
  }

  return (
    <View style={styles.container}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  back:{
    marginVertical:10,
    marginHorizontal: 10,
    alignContent: 'flex-start',
    resizeMode: 'repeat',
    width:'10%',
    height:'5%',
    flex: 1,
    paddingTop: 25,
  },
  txt: {
    fontSize: 30,
    color: 'red',
    paddingVertical: 50,
    paddingHorizontal: 42,
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
    marginVertical: 9, 
    fontSize: 20, 
    color: 'white', 
    marginHorizontal: 63, 
    alignSelf: 'center'
  },
});