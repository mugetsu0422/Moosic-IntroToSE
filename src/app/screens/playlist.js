import { StyleSheet,Image, Text ,  View,SafeAreaView,Dimensions,FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import React,{useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from 'react-native-vector-icons/Entypo';
import Icon5 from 'react-native-vector-icons/FontAwesome';
import { BottomPopup } from './pop'
import { API_URL, PATH } from '../constants/constants';
import axios from 'axios'


const imageheight = Dimensions.get('window').width*0.35;
const widthscreen = Dimensions.get('window').width;
const imageheight2 = Dimensions.get('window').height*0.12;
const widthScreen =Dimensions.get('window').width;



let imagelink = '../../assets/chill.png'

const popupPlaylist = [
  {id: 1,icon:'add-circle-outline', name: 'add song'},
  {id: 2,icon: 'pencil-sharp', name: 'edit playlist'},
  {id: 3,icon:'search', name: 'search song/ artist'},
  {id: 4,icon:'ios-musical-note', name: 'add to playlist'},
  {id: 5, icon:'ios-paper-plane-outline', name: 'add to occur streaming'},
  {id: 6,icon:'download', name: 'pick song to download'},
  {id: 8,icon:'md-share-social-outline', name: 'share'},
  {id: 9,icon:'md-trash-outline', name: 'remove playlist'},
  
]
const popupSong = [
  {id: 1,icon:'remove-circle-outline', name: 'remove from playlist'},
  {id: 2,icon:'add-circle-outline', name: 'add to playlist'},
  {id: 3,icon:'md-add', name: 'add to stream list'},
  {id: 4,icon:'play-forward', name: 'play next'},
  {id: 5, icon:'search', name: 'search artist'},
  {id: 6,icon:'download', name: 'download'},
  {id: 8,icon:'close', name: 'ban'},
  {id: 9,icon:'md-share-social-outline', name: 'share'},
]

const getPlaylistContent = async(playlist_id) => {
  const fullURL = API_URL + PATH.PLAYLIST_CONTENT + playlist_id
  try {
    const {data:response} = await axios.get(fullURL) //use data destructuring to get data from the promise object
    return response
  }
  catch (error) {
    console.log(error);
  }
}

const Playlist = ({ navigation }) =>  {
  const content = getPlaylistContent(1)
  console.log(content)
  const [data, setdata] = useState([
    // {id: 1,image: require('../../assets/chill.png'), name:"song's name", artist : "artist's name", view : " K views", selected: false },
    // {id: 2, image: require('../../assets/love.png'),name:"song's name", artist : "artist's name", view : " K views",selected: false },
    // {id: 3,image: require('../../assets/motivation.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
    // {id: 4,image: require('../../assets/soul.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
    // {id: 5, image: require('../../assets/rhymtm.png'), name:"song's name", artist: "artist's name", view : " K views",selected: false },
    // {id: 6,image: require('../../assets/pop.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
    // {id: 7,image: require('../../assets/chill.png'), name:"song's name", artist: "artist's name", view : " K views",selected: false },
    // {id: 8, image: require('../../assets/chill.png'), name:"song's name", artist: "artist's name", view : " K views",selected: false },
    // {id: 9, image: require('../../assets/chill.png'), name:"song's name", artist: "artist's name", view : " K views",selected: false },
    // {id: 10, image: require('../../assets/chill.png'), name:"song's name", artist: "artist's name", view : " K views",selected: false }
    {
      "id": "1",
      "uploaded_by": "1",
      "artist": "Rick Astley",
      "name": "Never Gonna Give You Up",
      "play_count": 0,
      "liked_count": 0,
      "status": "APPROVED"
    }
  ])


  const [playlistlove,setplaylist] = useState(false);
  onValueChange = (item, index) => {
    const newData = data.map( preItem =>{
      if (item.id == preItem.id){
          return {
            ...preItem,
            selected: !preItem.selected,
          }
      }
      return {   
          ...preItem,
          selected: preItem.selected, } })
    setdata(newData);}

  let popupRef1 = React.createRef()
  const onShowPopup1 = () => {
    popupRef1.show()
  }
  const onClosePopup1 = () => {
    popupRef1.close()
  }
  let popupRef2 = React.createRef()
  const onShowPopup2 = () => {
    popupRef2.show()
  }
  const onClosePopup2 = () => {
    popupRef2.close()
  }
  
  return (
    <View style = {styles.container}>
        <ImageBackground style = {styles.header} source = {require ('../../assets/blackblur.jpg')}>
          <View style = {styles.plinfo}>
          <Image
              style = {styles.imagesetting}
              source = {require('../../assets/chill.png')} />
              <View style= {styles.info}>
                <Text style= {styles.plname}> Playlist's name</Text>
                <View style ={{flexDirection: 'row',justifyContent:'space-between'}}>
                  <Text style ={{color:'white'}}> Trending Playlist</Text> 
                  <Text style ={{color:'white'}}> 290K views</Text>
                </View>
              </View>
          </View>
        <View style ={styles.more}>
          <View>
          <TouchableOpacity style ={styles.artist}
            onPress ={()=>{

            }}>
              <Icon name = "account-circle" size = {50} color = "white" />
              <Text style ={{color:'white',fontSize: 22}}> Artist's name </Text>
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
                onPress={()=>{ alert("play song "+ item.id) } }>
                <Image style={styles.songimage} 
                         source={item.image}/>
                         <View style={styles.songinf} >
                         <Text style ={{fontSize:20, color:'black'}}>{item.name}</Text>
                         <View style ={{flexDirection:'row',paddingRight:'5%'}}>
                          <Text style ={{fontSize:13, color:'grey'}}>{item.artist}</Text>
                          <Text style ={{fontSize:13, color:'grey'}}> {item.view}</Text>
                        </View>
                         <View>
                         </View>
                         </View>
                  <View style ={styles.star}>
            <TouchableOpacity 
            onPress={() =>{onValueChange(item,index)}}>
              {item.selected ? <Icon5 name = "star"  size = {40} color = "red" /> : <Icon5 name = "star-o"  size = {40} color= "red" />}</TouchableOpacity>
              <TouchableOpacity 
               onPress={ onShowPopup2}>
                <BottomPopup 
              title = {item.name}
              author= {item.artist}
          
              ref={(target) => popupRef2 = target}
              onTouchOutside = {onClosePopup2}
              data = {popupSong}
        />
              <Icon3 name = "more-horizontal" size = {40} color = "red" />
              
              </TouchableOpacity>
          </View>    
          </TouchableOpacity>)}
          keyExtractor={item => item.id} >
        </FlatList>
      </View>
      <BottomPopup 
          title ="Playlist's name"
          author= "Artist's name"
          
          ref={(target) => popupRef1 = target}
          onTouchOutside = {onClosePopup1}
          data = {popupPlaylist}
        />

        
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
    fontSize:30,
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
    width:widthScreen*0.92,
    justifyContent:'space-between',
    alignItems:'center',
  },
  st:{
    width:"100%",
      height:"100%",
      borderColor:'blue',
  },
  songs:{ 
    width:widthScreen,
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
}
});
 