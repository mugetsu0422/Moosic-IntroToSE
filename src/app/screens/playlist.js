import { StyleSheet,
  Image, 
  Text, 
  View, 
  Dimensions,
  FlatList,
  TouchableOpacity, 
  Modal,
  ImageBackground,
  TextInput,
  StatusBar, 
  Alert} from 'react-native';
import React,{useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import { BottomPopup } from './pop2'
import { API_URL, PATH } from '../constants/constants';
import axios from 'axios'
import { AudioContext } from '../context/AudioProvider';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const imageheight = Dimensions.get('window').width*0.35;
const widthscreen = Dimensions.get('window').width;
const imageheight2 = Dimensions.get('window').height*0.12;
const heightscreen =Dimensions.get('window').height;



let imagelink = '../../assets/chill.png'

const popupPlaylist = [
  {id: 1,icon:'add-circle-outline', name: 'add new song to playlist'},
  {id: 2,icon: 'pencil-sharp', name: 'edit playlist'},
  {id: 3,icon:'search', name: 'search song/ artist'},
  {id: 4, icon:'ios-paper-plane-outline', name: 'add a song to occur streaming'},
  {id: 5,icon:'download', name: 'pick a song to download'},
  {id: 6,icon:'md-share-social-outline', name: 'share playlist'},
  {id: 7,icon:'md-trash-outline', name: 'remove playlist'},
  
]
const popupSong = [
  {id: 1,icon:'remove-circle-outline', name: 'remove from playlist'},
  {id: 2,icon:'add-circle-outline', name: 'add to another playlist'},
  {id: 3,icon:'md-add', name: 'add to streaming list'},
  {id: 4,icon:'play-forward', name: 'play next'},
  {id: 5, icon:'search', name: 'search song artist'},
  {id: 6,icon:'download', name: 'download this song'},
  
  {id: 7,icon:'md-share-social-outline', name: 'share song'},
]
const ExistancePlaylist=[
]

const Playlist = ({ navigation, route }) =>  {
  const [modalVisible, setModalVisible] = useState(false);
  const {playlistInfo, content} = route.params;
  const [data, setdata] = useState(content)
  const [playlistlove,setplaylist] = useState(false);
  const [playlistaddsong,setplaylistadd] = useState('');

  onValueChange = (item) => {
    const newData = data.map( preItem =>{
      
      if (item.song_id == preItem.song_id){
        
          return {
            ...preItem,
            selected: !preItem.selected,
          }
      }
      return {   
          ...preItem,
          selected: preItem.selected, } })
    setdata(newData);}

  const[setupSongID,setSongID]=useState("") //song dang duoc chon
  const audioContext = useContext(AudioContext)
  const [Songchoice,setSongChoice] = useState(""); //lua chon cho song
  const [Playlistchoice,setPlaylistChoice] = useState(ExistancePlaylist); //lua chon cho plalist

  const loadPlaylist = () => {
    try {
      AsyncStorage.getItem('uid')
      .then(value => {
        if (value != null) {
          axios.get(API_URL + `/user/${value}` + PATH.CREATE_PLAYLIST)
            .then(response => {
              let body = response.data
              let empList = []
              for (let i = 0; i < body.length; i++) {
                empList.push({id: body[i].playlist_id,
                                        image: require('../../assets/playlist.png'), 
                                        name: body[i].title, 
                                        selected: false 
                                      })
              }
              setPlaylistChoice(empList)
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    }
    catch(error) {
      console.log(error)
    }
  }

  const addSongToPlaylist = (playlist_id) => {
    axios.post(API_URL + `/playlists/${playlist_id}/tracks`, {song_id: setupSongID})
      .then(response => {
        console.log(response.data)
        Alert.alert("Song added to playlist")
        })
      .catch(error => {
        console.log(error.response.data)
        Alert.alert(error.response.data)
        }
      )
  }

  const removeSongToPlaylist = (song_id) => {
    Alert.alert('Warning', 'Do you want to delete this playlist' , [
      {text: 'Yes', onPress: () => {
        axios.delete(API_URL + `/playlists/${playlistInfo.id}/${song_id}`)
        .then(response => {
          console.log(response.data)
          let new_data = data.filter(function(item) {
            return item.song_id !== song_id
          })
  
          setdata(new_data)
          Alert.alert("Song removed")
          })
        .catch(error => {
          console.log(error.response.data)
          Alert.alert(error.response.data)
          }
        )
      }},
      {text: 'No'}
    ])
  }

settingChoice = (option,id) =>{
    popupPlaylist.map(pl=>{
      if(option == pl.name ){
        setPlaylistChoice(option)
        console.log('pl',pl.name)
        setSongID(id)
      }
    }
    )
  
    popupSong.map(s=>{
      if(option == s.name ){
        setSongChoice(option)
        setSongID(id)
      }
    }
    ) 

    if(option =='add to another playlist'){
      loadPlaylist()
      setModalVisible(!modalVisible)
    }

    if(option =='remove from playlist'){
      removeSongToPlaylist(id)
    }
    
}
  let popupRef1 = React.createRef()
  const onShowPopup1 = () => {
    popupRef1.show('','','')
  }
  const onClosePopup1 = () => {
    popupRef1.close()
  }
  let popupRef2 = React.createRef()
  const onShowPopup2 = (item) => {
    popupRef2.show(item.title,item.performer,item.song_id)
  }
  const onClosePopup2 = () => {
    popupRef2.close()
  }
  
  return (
    <View style = {styles.container}>
        <ImageBackground style = {styles.header} source = {require ('../../assets/blackblur.jpg')}>
          <TouchableOpacity style = {styles.back} onPress ={ () => navigation.goBack()}>
            <Icon1  name = "arrowleft" size ={55} color='white' borderRadius={2}  />
          </TouchableOpacity>
          <View style = {styles.plinfo}>

          {/* <Image
              style = {styles.imagesetting}
              source = {require('../../assets/chill.png')} /> */}
              <View style= {styles.info}>
                <Text style= {styles.plname}> {playlistInfo.title}</Text>
                <View style ={{flexDirection: 'row',justifyContent:'space-between'}}>
                  {/* <Text style ={{color:'white'}}> Trending Playlist</Text>  */}
                  {/* <Text style ={{color:'white'}}> 290K views</Text> */}
                </View>
              </View>
          </View>
        <View style ={styles.more}>
          <View>
          <TouchableOpacity style ={styles.artist}
            onPress ={()=>{

            }}>
              {/* <Icon name = "account-circle" size = {50} color = "white" />
              <Text style ={{color:'white',fontSize: 22}}> Artist's name </Text> */}
          </TouchableOpacity>
          <View style ={styles.star}>
            <TouchableOpacity 
            onPress={() =>{
                setplaylist(!playlistlove);
            }}> 
            {playlistlove ? <Icon5 name = "star"  size = {50} color = "white" /> : <Icon5 name = "star-o"  size = {50} color= "white" />}
              </TouchableOpacity>
              <TouchableOpacity 
               onPress={ onShowPopup1}>
              <Icon3 name = "more-horizontal" size = {50} color = "white" /></TouchableOpacity>
          </View>
          </View>
          <View style ={styles.play}>
            <TouchableOpacity 
            onPress={()=>{
                alert('play playlist')
                
            }}>
              <Icon2 name = "play" /*star */ size = {70} color = "#b8291f"  /></TouchableOpacity>
              <TouchableOpacity
              style= {{position:'absolute',justifyContent:'flex-end',alignSelf:'flex-end'}}
              onPress={()=>{
                alert('play shuffle playlist')
               
            }}>
              <Icon4 name = "shuffle" size = {30} color = "white" /></TouchableOpacity>
            
          </View>
        </View> 
        </ImageBackground>
      <View style = {styles.footer}>
      <FlatList
          style = {styles.st}
          data ={data}
          renderItem ={({item, index}) =>(
            <TouchableOpacity
              style={styles.songs}
              onPress={() => {
                audioContext.playNewSong(item, content)
                navigation.navigate("Music")}}>
              <Image style={styles.songimage} 
                         source={require('../../assets/song.png')}/>
                         <View style={styles.songinf} >
                         <Text style ={{fontSize:20, color:'black'}}>{item.title}</Text>
                         <View style ={{flexDirection:'row',paddingRight:'5%'}}>
                          <Text style ={{fontSize:13, color:'grey'}}>{item.performer}</Text>
                          {/* <Text style ={{fontSize:13, color:'grey'}}> {item.play_count}</Text> */}
                        </View>
                         <View>
                         </View>
                         </View>
                  <View style ={styles.star}>
                <TouchableOpacity
                onPress={() =>{
                  
                  onValueChange(item)
                  
                }
                  
                }>
                {item.selected ? <Icon5 name = "star"  size = {40} color = "red" /> : <Icon5 name = "star-o"  size = {40} color= "red" />}</TouchableOpacity>
                <TouchableOpacity 
                onPress={()=>{ onShowPopup2(item)}}>
                  <BottomPopup 
                    title = {item.title}
                    author= {item.performer}
                    settingChoice={settingChoice}
                    ref={(target) => popupRef2 = target}
                    onTouchOutside = {onClosePopup2}
                    data = {popupSong}
                />
                <Icon3 name = "more-horizontal" size = {40} color = "red" />
                
              </TouchableOpacity>
            </View>    
            </TouchableOpacity>)}
          keyExtractor={item => item.song_id} >
        </FlatList>
      </View>
      <BottomPopup 
          title ="Playlist's name"
          author= "Artist's name"
          ref={(target) => popupRef1 = target}
          onTouchOutside = {onClosePopup1}
          data = {popupPlaylist}
          settingChoice ={settingChoice}
        />

                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        setSongChoice("")
                      }}
                    >
                    <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <TouchableOpacity
                        style={[styles.button, styles.buttonClose,{alignSelf:'flex-start'}]}
                        onPress={() => {setModalVisible(!modalVisible)
                                        setSongChoice('') //xoa lua chon add song to another playlist o day cho no check khong mo modal nua
                                      }}
                      >
                      <Icon name = "close"/>
                      </TouchableOpacity>
                      <Text style={styles.modalText}>Your playlist here!</Text>
                      <FlatList
          
          data ={Playlistchoice}
          renderItem ={({item, index}) =>(
            
            <TouchableOpacity
              style={{height:heightscreen*0.05,width:widthscreen*0.55,borderBottomWidth:2,borderColor:'gray'}}
              onPress={() => {
                setplaylistadd(item.id)
                addSongToPlaylist(item.id)
                setSongChoice('') //xoa lua chon add song to another playlist o day cho no check khong mo modal nua
                setModalVisible(!modalVisible)
              }}>
                {item.selected?<Icon name = "checksquare"/>:null}
                <Text style ={{fontSize:20, color:'black',textAlign: 'center',color:'grey',justifyContent:'center'}}>{item.name}</Text>
              </TouchableOpacity>
              )}
          keyExtractor={item=> item.id} >
        </FlatList>
          </View>
        </View>
      </Modal>
    </View>

    
    
  );
}

export default Playlist;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingTop: StatusBar.currentHeight,
    
    //backgroundColor:'red',
    ////borderWidth:1,
  },
  header:{
    
    flex: 2,
    ////borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
   
  },
  footer:{
    flex: 3,
    borderTopColor:'grey',
    borderTopWidth:1,
  },
  
  plinfo:{
      width:'100%',
      flexDirection:'row',
      //borderWidth:3,
      justifyContent: 'space-evenly',
      alignItems:'flex-end',
      flex: 3,
      

  },
  imagesetting:{
      width:imageheight,
      height: imageheight,
      resizeMode: 'contain',
      //borderWidth:5,
      backgroundColor:'black',
  },
  plname:{
    fontSize:50,
    color:'white',
   
  },
  info:{
    alignSelf:'center',
    //borderWidth:1,
  },
  artist:{
    //borderWidth:1,
    flexDirection:'row',
    alignSelf:'flex-start',
    alignItems:'center',
  },
  star:{
    //borderWidth:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  play:{
    width:'35%',
    //borderWidth:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignSelf:'center',
    alignItems:'flex-start',
  },
  more:{
    flex:2,
    flexDirection:'row',
    //borderWidth:3,
    //alignItems:'center',
    width:widthscreen*0.92,
    justifyContent:'space-between',
    alignItems:'center',
  },
  st:{
    width:"100%",
      height:"100%",
      borderColor:'blue',
  },
  songs:{ 
    width:widthscreen,
    height:imageheight2,
    borderWidth:1,
    borderColor:'grey',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    
  },
  songinf:{
    width:'40%',
    //borderWidth:2,
    //justifyContent:'flex-start',
  },
  songimage:{
    width:imageheight,
    height:'80%',
    borderWidth:1,
    borderRadius:10,
    //justifyContent:'flex-start',
    
  },
  imageformat:{
    borderWidth:1,
    borderColor:'red'
  },
  back: {
    alignSelf:"flex-start",
    paddingBottom: 20,
    // backgroundColor:'blue',
    padding:10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //position:'absolute',
  },
  modalView: {
    borderWidth:1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    margin:20,
    alignContent:'center',
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
});
 