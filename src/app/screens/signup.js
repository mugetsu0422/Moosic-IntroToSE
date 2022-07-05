import { StyleSheet,Image, Text ,  View,TouchableOpacity,TextInput,Alert, ImageBackground } from 'react-native';
import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const SignUp = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flex: 1}}>
      <View style={styles.container} >
          <View style ={styles.background}  >
            <ImageBackground style ={styles.large}  source={require('../../assets/wel.jpg')} />
            <View style ={styles.logo}>
                <Image style ={styles.small}  source={require('../../assets/sool.jpg')} />
                <Text style = {styles.wel}> Welcome, Guest!!!</Text>
            </View>
          </View>
        <View style = {styles.inputscreen}> 
          <TouchableOpacity style = {styles.back} onPress ={ () => navigation.goBack()}>
          <ImageBackground style ={styles.background1}  source={require('../../assets/arrrows.jpg')} />
          </TouchableOpacity>

          <View style = {styles.box}>
            <View style = {styles.input}>
              <TextInput
              placeholder="Username"
              
              placeholderTextColor="gray"
              style={styles.textinput}
              autoCapitalize = "none"

              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                style = {styles.textinput}

              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                style = {styles.textinput}

              />
            
            <View style={styles.sign}>
            <TouchableOpacity
                style={styles.SignUp}
                onPress={() => {Alert.alert ('HEHE','account created')}}>
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
  background: {
    flex: 2,
    alignItems:"center",
    alignContent:"center",
},
large:{
  flex: 1,
   width: '100%', resizeMode: 'stretch',

},
logo:{
  width: "100%",
  marginTop:200,
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
    flexDirection:'column',
   
    paddingBottom: 50,

   
    
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
    paddingVertical:  20,
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
  width:'10%',
  height:'3%',
  
  
  flex: 0.7,
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
 