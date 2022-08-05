import React from 'react'
import{
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { BottomPopup } from './pop'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native';

const general = [
  
  {id: 1,icon: "person-sharp", name:'Account' },
  {id: 2,icon:"notifications-outline" , name:'Notification'},
  {id: 3,icon:"ios-log-out-outline" , name:'Log out' },
  {id: 4,icon:"trash-outline" , name:'Delete account'},
]
const feedback = [
  {id: 1,icon:"bulb-outline" , name:'Report error' },
  {id: 2,icon: "paper-plane-outline", name:'Send feedback' },
]
const deviceWidth = Dimensions.get('window').width;
const Setting = ({navigation}) =>{
  
  return (

    <>
      <View style = {styles.container}>
        <View style = {styles.header}>
            {/* <TouchableOpacity style = {styles.back} onPress ={ () => navigation.goBack()}>
                <Icon1  name = "arrowleft" size ={55} color='black' borderRadius={2}  />
            </TouchableOpacity> */}
            <Text style= {styles.headerTitle}> Setting </Text>
        </View>
        <View style = {styles.footer}>
          <View style=  {styles.general}>
            
              <Text style ={styles.title}> GENERAL </Text>
              <FlatList
              style= {styles.fl}
              data={general}
              scrollEnabled= {false}
              renderItem= {({item, index})=>(
                    <TouchableOpacity
                    style={styles.selected}
                    onPress={() => item.name === 'Account' ? navigation.navigate('Profile') : null}
                    >
              <View style ={{flexDirection:'row',padding:10, paddingHorizontal: 10,justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'grey'}}>
                    <Icon name = {item.icon} size = {30} >
                    <Text style ={{fontSize:20}}>   {item.name}</Text></Icon>
                    <Icon style = {{ }} name ="chevron-forward" size = {30} />
              </View>
          
          
                    </TouchableOpacity>)}
               keyExtractor={(item, index) => 'key'+index} />
              </View>
   
              <View style=  {styles.general}>
            
            <Text style ={styles.title}> FEEDBACK </Text>
            <FlatList
            style= {styles.fl}
            data={feedback}
            scrollEnabled= {false}
            renderItem= {({item, index})=>(
                  <TouchableOpacity
                  style={styles.selected}
                  >
            <View style ={{flexDirection:'row',padding:10, paddingHorizontal: 10,justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'grey'}}>
                  <Icon name = {item.icon} size = {30} >
                  <Text style ={{fontSize:20}}>   {item.name}</Text></Icon>
                  <Icon style = {{ }} name ="chevron-forward" size = {30} />
            </View>
        
        
                  </TouchableOpacity>)}
             keyExtractor={(item, index) => 'key'+index} />
            </View>
 
      </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,justifyContent:'center', alignItems:'center'
  },
  header:{
    flex: 2,
    width:'100%',
    backgroundColor:'#cf4848',
    justifyContent:'space-around',
    alignContent:'flex-start',
    paddingHorizontal:14,
  },
  back:{
    
  },
  headerTitle:{
   fontSize:50,
  },
  footer:{
    flex:5,
    
  },
  general:{
    width:deviceWidth,
    padding:20,
    paddingBottom:60,

  },
  feedback:{
   
  },
  title:{
    fontSize:25,
    color:'grey',
    
  }
})

export default Setting;