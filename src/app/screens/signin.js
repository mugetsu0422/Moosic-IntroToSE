import { StyleSheet,Image, Text , View, SafeAreaView, TouchableOpacity,Button, Dimensions, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { NetworkInfo } from "react-native-network-info"

const API_URL = "http://192.168.1.80:8888"


const SignIn = ({navigation}) => {

  const login = (formData) => {
    axios.post(API_URL + '/login', formData)
      .then(response => {
        console.log(response.data)
        alert('Login successfully')
      })
      .catch(error => {
        console.log(error.response.data)
        alert(error.response.data)
      })
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
    <View style={styles.container}>
      <Image style ={styles.background}  source={require('../../assets/si.png')} />
      <View style = {styles.inputscreen}> 
      <TouchableOpacity style = {styles.back} onPress ={ () => navigation.goBack()}>
        <Icon  name = "arrowleft" size ='50%' color='red' borderRadius={2}  />
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
                  placeholder="Your Password"
                  placeholderTextColor="gray"
                  style = {styles.textinput}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                /></View>

              <TouchableOpacity
                style={styles.reset}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style= {styles.forgot} > Forgot your password?</Text>
                <Text style={styles.reset}> reset password </Text>
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
  container: {
    
    flex:1,
    backgroundColor:'black'
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
   
    paddingBottom: 50,

   
    
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
    marginVertical:10,
    marginHorizontal: 10,
    alignContent: 'flex-start',
    resizeMode: 'repeat',
    width:'10%',
    height:'5%',
    flex: 1,
  },
  input:{
    flex:4,
  },
  reset:{
    color: 'red',
    flexDirection:"row",
    justifyContent:"center"
  },
  forgotpassword:{
    color:'white',
    flex: 3,
    flexDirection:'row',
    justifyContent:'center',
  },
  forgot:{
    color: 'black',
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
 