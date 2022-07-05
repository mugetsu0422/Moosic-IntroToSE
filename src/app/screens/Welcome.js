import { StyleSheet,Image, Text ,  View,SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Welcomescreen = ({ navigation }) =>  {
  
  return (
    
    <SafeAreaView style={styles.container}>
      
        <Image style ={styles.logo}  source={require('../../assets/sool.jpg')} />
        <View style ={styles.views1}>
          <Text style = {styles.welcome} >Welcome  </Text>
          <Text style = {styles.script}>Nice place to relax...  </Text>
        </View>
        <View style ={styles.views2}>
          <TouchableOpacity  style={styles.button1}
            onPress={() =>
              navigation.navigate('SignIn', { name: 'SignIn' })
            } >
        
            <Text style = {styles.buttonText1}> LOGIN </Text>  
          
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.button2}
              onPress={() => navigation.navigate('SignUp', { name: 'Jane2' })}>
                <Text style={styles.buttonText2}>SIGN UP FOR FREE</Text>
          </TouchableOpacity>
        </View>
     </SafeAreaView>
    
  );
}

export default Welcomescreen;

const styles = StyleSheet.create({
  container: {
   backgroundColor:'white',
    flex:1,
    
  },
  logo: {
    top:20,
    width:'100%',
    height: '100%',
    resizeMode:'contain',
    flex: 3,
    
},
views1:{
    flex: 1,
    
},
  welcome:{
    fontSize: 40,
    fontWeight:'bold',
    marginLeft: 40,
    marginBottom:10,
    fontStyle: 'italic',
  },
  script:{
    
    fontSize:28,
    fontWeight:'400',
    marginLeft: 40,
   
    fontStyle: 'italic',
    
  },
  views2:{
    flex: 1.5,
    flexDirection:'column',
    justifyContent:'flex-start',
   alignItems:'center',
},
  button1:{
    justifyContent: 'center',
    width: '80%',
    maxHeight:50,
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor:'red',
    flex:1 ,
    
    borderRadius: 6,
    marginBottom:20,
  },
  buttonText1:{
    color:'red',
   
    fontSize:20,
    textDecorationLine:'underline',
    textAlign:'center',
  },
  button2:{
    justifyContent: 'center',
    alignItems: "center",
    width: '80%',
    height:'20%',
    maxHeight:50,
    borderWidth: 0,
    backgroundColor:'red',
    flex:1 ,
    borderRadius: 6,
    
    
  },
  buttonText2:{
    color:'white',
    
   
    fontSize:20,
    textDecorationLine:'underline',
    textAlign:'center',
  },
  
});
 