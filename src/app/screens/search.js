import React,{useState} from 'react'
import{
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,Dimensions,FlatList
} from 'react-native'
import { BottomPopup } from './pop'
import Icon from 'react-native-vector-icons/AntDesign';


const widthScreen =Dimensions.get('window').width;
const heightScreen =Dimensions.get('window').height;
const popupList = [
  {id: 1,icon:'checkmark-sharp', name:'Search Artist' },
  {id: 2,icon:'checkmark-sharp', name:'Search Song' },
  {id: 3, icon:'checkmark-sharp',name:'Search Playlist' },
]
const link = '../assets/chill.png'
const song = [
  {id: 1,image: require('../../assets/song.png'), name:"song's name", artist : "artist's name", view : " K views", selected: false },
  {id: 2, image: require('../../assets/song.png'),name:"song's name", artist : "artist's name", view : " K views",selected: false },
  {id: 3,image: require('../../assets/song.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 4,image: require('../../assets/song.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 5, image: require('../../assets/song.png'), name:"song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 6,image: require('../../assets/song.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
 ]

const playlist = [
    {id: 1,image: require('../../assets/playlist.png'), name:"playlist's name", artist : "artist's name", view : " K views", selected: false },
    {id: 2, image: require('../../assets/playlist.png'),name:"playlist's name", artist : "artist's name", view : " K views",selected: false },
    {id: 3,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
    {id: 4,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
    {id: 5,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
   ]

    const artist = [
      {id: 1,image: require('../../assets/account.png'), name:"artist's name", },
      {id: 2, image: require('../../assets/account.png'),name:"artist's name" },
      {id: 3,image: require('../../assets/account.png'),  name:"artist's name" },
      {id: 4,image: require('../../assets/account.png'),  name:"artist's name" },
      {id: 5, image: require('../../assets/account.png'), name:"artist's name" }]

let popupRef1 = React.createRef()
  const onShowPopup1 = () => {
    popupRef1.show()
}
const onClosePopup1 = () => {
  popupRef1.close()
}

const Search = () =>{
  
  return (
      <View style = {styles.container}>
        <View style={styles.header}>
          <View style = {{flexDirection:'row', height:'35%', width:'100%', justifyContent:'space-around'}}>
          <TouchableOpacity style = {{justifyContent:'flex-start'}} onPress ={ () => navigation.goBack()}>
                <Icon  name = "left" size ={25} color='black' borderRadius={2}  />
            </TouchableOpacity>

            <TextInput
              placeholder="Search"
              placeholderTextColor="gray"
              style = {styles.searchbar}
              
            />
            <TouchableOpacity style = {{justifyContent:'flex-start'}} onPress ={ onShowPopup1}>
                <Icon  name = "filter" size ={25} color='black' borderRadius={2}  />
                <BottomPopup 
          title =""
          author= ""
          
          ref={(target) => popupRef1 = target}
          onTouchOutside = {onClosePopup1}
          data = {popupList}
        />
            </TouchableOpacity>

            </View>
        </View>
        <View style ={styles.footer}>
          <View style= {styles.listartist}>
              <Text style ={{ fontSize:15, color:'grey',paddingVertical:15,}}> TOP ARTISTS RESULT</Text>
              
            <FlatList
                style= {styles.fl}
                data={artist}
               horizontal
                renderItem= {({item, index})=>(
                    <TouchableOpacity
                        style={styles.artist}  >
                        <Image style={styles.imageformat1} 
                         source={item.image}/>
                        <View >
                         <Text style ={{fontSize:15, color:'black'}}>{item.name}</Text>
                         <View style ={{flexDirection:'row',paddingRight:'5%'}}>
                          <Text style ={{fontSize:13, color:'grey'}}>{item.artist}</Text>
                          <Text style ={{fontSize:13, color:'grey'}}> {item.view}</Text>
                        </View>
                         
                         </View>
                        
                    </TouchableOpacity>
                )
                }
                keyExtractor={(item, index) => 'key'+index}
                
                
              />
              
            </View>
            <View style= {styles.listplaylist}>
              <Text style ={{ fontSize:15, color:'grey',paddingVertical:15,}}> TOP PLAYLIST RESULT</Text>
              
            <FlatList
                style= {styles.fl}
                data={playlist}
               horizontal
                renderItem= {({item, index})=>(
                    <TouchableOpacity
                        style={styles.playlist}  >
                        <Image style={styles.imageformat} 
                         source={item.image}/>
                        <View >
                         <Text style ={{fontSize:15, color:'black'}}>{item.name}</Text>
                         <View style ={{flexDirection:'row',paddingRight:'5%'}}>
                          <Text style ={{fontSize:13, color:'grey'}}>{item.artist}</Text>
                          <Text style ={{fontSize:13, color:'grey'}}> {item.view}</Text>
                        </View>
                         
                         </View>
                        
                    </TouchableOpacity>
                )
                }
                keyExtractor={(item, index) => 'key'+index}
                
                
              />
              
            </View>
            <View style= {styles.song}>
              <Text style ={{ fontSize:15, color:'grey',paddingVertical:15,}}> TOP SONG RESULT</Text>
            <FlatList
                
                data={song}
                renderItem= {({item, index})=>(
                    <TouchableOpacity
                        style={styles.songinf1}  >
                        <Image style={styles.imageformat} 
                         source={item.image}/>
                        <View style={styles.songinf} >
                         <Text style ={{fontSize:15, color:'black'}}>{item.name}</Text>
                         <View style ={{flexDirection:'row',paddingRight:'5%'}}>
                          <Text style ={{fontSize:13, color:'grey'}}>{item.artist}</Text>
                          <Text style ={{fontSize:13, color:'grey'}}> {item.view}</Text>
                        </View>
                         
                         </View>
                        
                    </TouchableOpacity>
                )
                }
                keyExtractor={(item, index) => 'key'+index}
                
                
              />
              
            </View>
        </View>
      </View>
  )
}

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  header:{
    flex:1,
    width:'100%',
    borderWidth:1,
    backgroundColor:"#e02f2f",
    justifyContent:'flex-end',
    alignContent:'flex-end',
    alignItems:'flex-end',
    paddingBottom:10,
  },
  searchbar:{
    borderWidth:1,
    borderColor:'#f7b9b9',
    borderRadius:4,
    width:'80%',
    height:'100%',
    textAlign:'center',
    backgroundColor:'#f7b9b9',
  },
  footer:{
    flex:9,
    borderWidth:1,
  },
  listplaylist:{
    width:widthScreen,
    height:heightScreen*0.23,
    //borderWidth:1,
    justifyContent:'center',
    alignContent:'space-around',
    //alignItems:'center',
    

  },
  listartist:{
    width:widthScreen,
    height:heightScreen*0.2,
    //borderWidth:1,
    justifyContent:'center',
    alignContent:'space-around',
    //alignItems:'center',
    

  },
  playlist:{
    height:heightScreen*0.2,
  },
  imageformat:{
    width:heightScreen*0.12,
    height:heightScreen*0.12,
    resizeMode:'contain',
    backgroundColor:'black',
},
imageformat1:{
  width:heightScreen*0.1,
  height:heightScreen*0.1,
  resizeMode:'contain',
  backgroundColor:'black',
  borderRadius:80,
},
song:{
  height:heightScreen*0.6,
  //borderWidth:1,
},
artist:{
  paddingHorizontal:10,
},
songinf1:{
  flexDirection:'row',
  padding:5,
},
songinf:{
  justifyContent:'center',
  paddingHorizontal:15,
  width:widthScreen,
}
})