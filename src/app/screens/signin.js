import { StyleSheet,Image, Text , View, SafeAreaView, TouchableOpacity,Button, Dimensions, TextInput, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import Icon from 'react-native-vector-icons/AntDesign';
import { API_URL, PATH } from '../constants/constants';
import {encode as btoa} from 'base-64'
import AsyncStorage from '@react-native-async-storage/async-storage';

const prepareHomeData = async() => {
  const fullURL = API_URL + PATH.SEARCH_BY_PLAYLIST + '?q='
  try {
    const {data:response} = await axios.get(fullURL) //use data destructuring to get data from the promise object
    return response
  }
  catch (error) {
    console.log(error);
  }
}

const SignIn = ({navigation}) => {
  const login = async (formData) => {
    var basicAuth = 'Basic ' + btoa(formData.username + ':' + formData.password)

    await axios.post(API_URL + PATH.LOGIN, {}, {
      headers: {'Authorization': basicAuth}
    }
    )
      .then(response => {
        data = response.data
        console.log(data.data)
        try {
          AsyncStorage.clear()
          AsyncStorage.setItem('uid' ,data.data._uid)
          // navigation.navigate('HomeNavigator')
          prepareHomeData().then(content => {
            navigation.navigate('HomeNavigator', {content: content})
          })
        } catch (error) {
          console.log(error)
        }
      })
      .catch(error => {
        var errorMsg = error.response.status
        console.log(errorMsg)

        if (errorMsg == '401') {
          alert("Invalid username/password")
        }
      })
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
    <View style={styles.AndroidSafeArea}>
      <Image style ={styles.background}  source={require('../../assets/si.png')} />
      <View style = {styles.inputscreen}> 
      <TouchableOpacity style = {styles.back} onPress ={ () => navigation.goBack()}>
        <Icon  name = "arrowleft" size={50} color='red' borderRadius={2}  />
      </TouchableOpacity>

        <Formik initialValues={{username: '', password: ''}} onSubmit={login} >
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style = {styles.box}>

              <View style = {styles.input}>
                <TextInput
                id="username"
                name="username"
                placeholder="Username"
                placeholderTextColor="gray"
                style={styles.textinput}
                autoCapitalize = "none"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                />
              </View>

              <View style = {styles.input}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="gray"
                  style = {styles.textinput}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                /></View>

              <TouchableOpacity
                style={styles.reset}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style= {styles.forgot} > Forgot your password?</Text>
                <Text style={styles.reset}> Get your password back </Text>
              </TouchableOpacity>

              <View style={styles.sign}>
                  <TouchableOpacity
                  style={styles.Signin}
                  onPress={handleSubmit} title="Submit">
                  <Text style={styles.buttonText}>SIGN IN </Text>
                </TouchableOpacity>
              </View>

            </View>
          )}  
          </Formik>
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
}
export default SignIn;


const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
},
  background: {
    width: '100%',
    resizeMode:'stretch',
    flex:3,
},
  box:{
    flex: 5,
    paddingVertical:  20,
    paddingHorizontal: 20,
    
    flexDirection:'column',
    marginTop: -20,
    marginBottom: 8,
    flexDirection:'column',
  },
  inputscreen:{
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    
    
  },
  views2:{
    flex: 1.5,
    flexDirection:'column',
    justifyContent:'flex-start',
   alignItems:'center',
},
  textinput:{
    textAlign:'center',
    flex: 1,
    height: 20,
    margin: 25,
    marginTop:1,
    borderWidth: 1,
    padding: 0,
   
    borderColor:'grey',
    borderRadius:20,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    justifyContent: "center",
    alignItems: "stretch",
    
},
textinput2:{
  flex: 1,
  height: 20,
  margin: 25,
  marginTop:3,
  borderWidth: 1,
  padding: 0,
  borderColor:'grey',
  borderRadius:20,
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center',
  textAlign:'center',
},
  back:{
    alignContent: 'flex-start',
    resizeMode: 'repeat',
    width:'15%',
    height:'5%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    flex:4,
  },
  reset:{
    color: 'red',
    flexDirection:"row",
    justifyContent:"center",
    marginBottom: 10,
    fontSize: 15,
  },
  forgotpassword:{
    color:'white',
    flex: 3,
    flexDirection:'row',
    justifyContent:'center',
  },
  forgot:{
    color: 'black',
    fontSize: 15,
  },
  Signin:{

    justifyContent: 'center',
    alignItems: "center",
    width: '100%',
    
    height:'20%',
    maxHeight:50,
    borderWidth: 0,
    backgroundColor:'red',
    flex:1 ,
    borderRadius: 6,

  },
  sign:{
    flex:2,
    justifyContent: 'center',
  },
  buttonText:{
    color:'white',   
    fontSize:20,
    textAlign:'center',
  }
  
});
 