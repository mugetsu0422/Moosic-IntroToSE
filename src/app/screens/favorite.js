import { StyleSheet,Image, Text ,  View,SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';




const FavoriteScreen = ({navigation}) =>  {
  
  return (
    
    <View style={styles.container}>
        <View style={styles.tittle} >
            <Text style={styles.big}> Pick your favorite type off music</Text>
            <Text style={styles.small}> You can change this later</Text>
        </View>
        <View style={styles.selectzone}>
            <View style={styles.select}>
                <TouchableOpacity
                style={styles.selected}
                >
                    <Image style={{width:"100%", height:"100%"}} source={require('../../assets/rock.png')} />
                </TouchableOpacity>
              </View>
            <View style={styles.select}>
                <TouchableOpacity
                style={styles.selected}
                >
                    <Image style={{width:"100%", height:"100%"}} source={require('../../assets/electronic.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.select}>
                <TouchableOpacity
                style={styles.selected}
                >
                    <Image style={{width:"100%", height:"100%"}} source={require('../../assets/pop.png')} />
                </TouchableOpacity>
              </View>
            <View style={styles.select}>
                <TouchableOpacity
                style={styles.selected}
                >
                    <Image style={{width:"100%", height:"100%"}} source={require('../../assets/country.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.select}>
                <TouchableOpacity
                style={styles.selected}
                >
                    <Image style={{width:"100%", height:"100%"}} source={require('../../assets/funk.png')} />
                </TouchableOpacity>
              </View>
            <View style={styles.select}>
                <TouchableOpacity
                style={styles.selected}
                >
                    <Image style={{width:"100%", height:"100%"}} source={require('../../assets/jazz.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.select}>
                <TouchableOpacity
                style={styles.selected}
                >
                    <Image style={{width:"100%", height:"100%"}} source={require('../../assets/soul.png')} />
                </TouchableOpacity>
              </View>
            <View style={styles.select}>
                <TouchableOpacity
                style={styles.selected}
                >
                    <Image style={{width:"100%", height:"100%"}} source={require('../../assets/classical.png')} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.button}> 
          <Text style = {{color:'white', fontSize:15}}> 3 out of 5 selected </Text>
          <TouchableOpacity style={styles.next}
          >
            <Text style = {{color:'white', fontSize:23,margin:20}}> NEXT </Text>  
          </TouchableOpacity>
        </View>
        
     </View>
    
  );
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex:1,
   
  },
  tittle:{
    paddingTop:30,
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'center',
    alignContent:'flex-end',
    flex:1.2,
    //borderWidth:2,
  },
  big:{
    fontSize: 27,
  },
  small:{
    paddingTop:20,
    fontSize:15,
    color:'grey',
  },
  selectzone:{
    width:"100%",
    height:"85%",
    flexDirection:'row',
    flexWrap:'wrap',
    alignContent:'center',
    justifyContent:'center',
    flex: 5,
    //borderWidth:2,
  },
  select:{
    width:'50%',
    height:'20%',
    padding:8,
  },
  selected:{

    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    flex:0.7,
    //borderWidth:2,
    justifyContent:'center',
    alignItems:'center', 
    backgroundColor:'red',
  },
  outof:{
    fontSize: 20,
    color: '#f44336',
  },
  next:{
    position:'absolute',
    alignSelf:'flex-end',
    marginTop:-20,
  }
});
 