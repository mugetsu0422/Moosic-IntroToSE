import React,{useState} from 'react'
import{
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
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
const heightscreen =Dimensions.get('window').height;
const widthscreen = Dimensions.get('window').width;
const deviceWidth = Dimensions.get('window').width;
const Setting = ({navigation}) =>{
  const [modalVisible, setModalVisible] = useState(false);
  const [choice,setChoice]=useState('');
 
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
                  onPress={()=>{setModalVisible(!modalVisible)
                    setChoice(item.name)
                  }
                  
                }
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
      <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                      }}
                    >
                    <View style={styles.centeredView}>
        
          <View style={styles.modalView}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose,{alignSelf:'flex-start'}]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Icon name = "close"/>
              </TouchableOpacity>
              {choice =='Send feedback'?<Text style={styles.modalText}>Thank for your feedback!</Text>:choice =='Report error'?<Text style={styles.modalText}>What make you ảngy?</Text>:null}
              
                <TextInput
                placeholder="Text here!"
                placeholderTextColor="gray"
                style={styles.textinput}
                autoCapitalize = "none"
                />
              <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                <Text>         Send         </Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    
  },
  textinput:{
    margin:10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //position:'absolute',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width:'75%',
    // height: '30%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#f27e7e",
    //alignSelf:'flex-start',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
})

export default Setting;