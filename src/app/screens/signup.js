import { StyleSheet,Image, Text ,  View,TouchableOpacity,TextInput,Alert, ImageBackground, StatusBar, Platform } from 'react-native';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/AntDesign';
import { Formik }  from 'formik'
import axios from 'axios'
import { API_URL, PATH } from '../constants/constants';

// const API_URL = "http://192.168.1.80:4000"

const SignUp = ({ navigation }) => {

  const register = (formData) => {
    if (!formData.username || !formData.password || !formData.password2) {
      alert('Please add all fields')
    }

    else if (formData.password !== formData.password2) {
      alert('Passwords do not match')
    }

    else {
      axios.post(API_URL + PATH.REGISTER, formData)
      .then(response => {
        console.log(response.data)
        alert('Register successfully')
        navigation.navigate('SignIn')
      })
      .catch(error => {
        console.log(error.response.data)
        alert(error.response.data)
      })
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex: 1}}>
      <View style={styles.AndroidSafeArea} >
          <View style ={styles.background}  >
            <ImageBackground style ={styles.large}  source={require('../../assets/wel.jpg')} />
            <View style ={styles.logo}>
                <Image style ={styles.small}  source={require('../../assets/sool.jpg')} />
                <Text style = {styles.wel}> Welcome, Guest!!!</Text>
            </View>
          </View>
          
        <Formik initialValues={{username: '', password: '', password2: ''}} onSubmit={register} >
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style = {styles.inputscreen}> 
            <TouchableOpacity style = {styles.back} onPress ={ () => navigation.goBack()}>
              <Icon name = "arrowleft" size={50} color='red' borderRadius={2}  />
            </TouchableOpacity>
            

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

                <TextInput
                  id="password"
                  name="password"
                  placeholder="Password"
                  placeholderTextColor="gray"
                  style={styles.textinput}
                  autoCapitalize = "none"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}

                />
                <TextInput
                  id="password2"
                  name="password2"
                  placeholder="Confirm Password"
                  placeholderTextColor="gray"
                  style={styles.textinput}
                  autoCapitalize = "none"
                  secureTextEntry
                  onChangeText={handleChange('password2')}
                  onBlur={handleBlur('password2')}
                  value={values.password2}

                />
              
              <View style={styles.sign}>
              <TouchableOpacity
                  style={styles.SignUp}
                  onPress={handleSubmit} title="Submit">
                  <Text style={styles.buttonText}>Create An Account </Text>
              </TouchableOpacity></View>
            </View>
            <View styles= {styles.signin}>
                <TouchableOpacity
                style={styles.click}
                onPress={() => navigation.navigate("SignIn")}>
                  <Text style= {styles.forgot} > Already has an account?</Text>
                  <Text style={styles.click}> Sign In </Text>
                </TouchableOpacity>
              </View> 
            </View >
            
            </View>
          )}
          
        </Formik>  
          
          
      </View>
  </KeyboardAwareScrollView>
  );
}
export default SignUp;


const styles = StyleSheet.create({
  container: {
    
    flex:1,
    backgroundColor:'white'
  },
  AndroidSafeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  background: {
    flex: 2,
    justifyContent:"center",
    alignItems:"center",
    alignContent:"center",
},
large:{
  flex: 1,
   width: '100%', resizeMode: 'stretch',

},
logo:{
  width: "100%",
  position: 'absolute',
  justifyContent:"center",
  alignItems:"center",
  alignContent:"center",

},
wel:{
  textAlign:"center",
  fontSize:40,
  fontWeight:"bold",
},
small:{
  borderRadius:100,
  width: '33%', height: '280%', resizeMode: 'cover',
},
  box:{
    flex: 5,
    paddingHorizontal: 20,
    flexDirection:'column',
    marginBottom: 8,
  },
  background1:{
    width: '100%',
    resizeMode:'stretch',
    flex:3,
  },
  inputscreen:{
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical:  4,
    paddingHorizontal: 20,
    borderColor:'black',
    borderWidth: 1,
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
    marginTop:1,
    borderWidth: 1,
    padding: 0,
    marginVertical:20,
    borderColor:'grey',
    
    borderRadius:20,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
},

back:{
  alignContent: 'flex-start',
  resizeMode: 'stretch',
  width:'15%',
  flex: 1,
},
  input:{
    flex:4,
    
  },
  click:{
    color: 'red',
    flexDirection:"row",
    justifyContent:"center"
  },
  signin:{
    color:'white',
    flex: 3,
    flexDirection:'row',
    
  },
  forgot:{
    color: 'black',
    
  },
  SignUp:{

    justifyContent: 'center',
    alignItems: "center",
    width: '100%',
    
    height:'30%',
    maxHeight:50,
    backgroundColor:'red',
    flex:1 ,
    borderRadius: 1,

  },
  sign:{
    flex:2,
    justifyContent: 'center',
  },
  buttonText:{
    color:'white',
    fontSize:15,
    textAlign:'center',
  }
  
});
 