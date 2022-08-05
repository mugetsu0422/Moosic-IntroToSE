import React,{useState} from 'react'
import{
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const widthScreen =Dimensions.get('window').width;
const heightScreen =Dimensions.get('window').height;
const song = [
  {id: 1,image: require('../../assets/song.png'), name:"song's name", artist : "artist's name", view : " K views", selected: false },
  {id: 2, image: require('../../assets/song.png'),name:"song's name", artist : "artist's name", view : " K views",selected: false },
  {id: 3,image: require('../../assets/song.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 4,image: require('../../assets/song.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 5, image: require('../../assets/song.png'), name:"song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 6,image: require('../../assets/song.png'),  name:"song's name", artist: "artist's name", view : " K views",selected: false },
 ]
 const recently  = [
  {id: 1,image: require('../../assets/recently.jpg'), name:" recently song's name", artist : "artist's name", view : " K views", selected: false },
  {id: 2, image: require('../../assets/recently.jpg'),name:"recently song's name", artist : "artist's name", view : " K views",selected: false },
  {id: 3,image: require('../../assets/recently.jpg'),  name:"recently song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 4,image: require('../../assets/recently.jpg'),  name:"recently song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 5, image: require('../../assets/recently.jpg'), name:"recently song's name", artist: "artist's name", view : " K views",selected: false },
  {id: 6,image: require('../../assets/recently.jpg'),  name:"recently song's name", artist: "artist's name", view : " K views",selected: false },
 ]

const playlist = [
    {id: 1,image: require('../../assets/add.png'), name:"Add" },
    {id: 2, image: require('../../assets/playlist.png'),name:"playlist's name", artist : "artist's name", view : " K views",selected: false },
    {id: 3,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
    {id: 4,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
    {id: 5,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
    {id: 6,image: require('../../assets/playlist.png'), name:"playlist's name", artist : "artist's name", view : " K views", selected: false },
    {id: 7, image: require('../../assets/playlist.png'),name:"playlist's name", artist : "artist's name", view : " K views",selected: false },
    {id: 8,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
    {id: 9,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
    {id: 10,image: require('../../assets/playlist.png'),  name:"playlist's name", artist: "artist's name", view : " K views",selected: false },
   ]

    const artist = [
      {id: 1,image: require('../../assets/account.png'), name:"artist's name", },
      {id: 2, image: require('../../assets/account.png'),name:"artist's name" },
      {id: 3,image: require('../../assets/account.png'),  name:"artist's name" },
      {id: 4,image: require('../../assets/account.png'),  name:"artist's name" },
      {id: 5, image: require('../../assets/account.png'), name:"artist's name" }]

const listTab = [
{
  status: 'Playlist'
},
{
  status: 'Song'
},
{
  status: 'Recently'
},
]

const MySong = () =>{
  const [status,setStatus] = useState('Playlist')
  const setStatusFilter = status =>{
    setStatus(status)
    console.log(status)
  }
  const [modalVisible, setModalVisible] = useState(false);
  return (
    
      <View style = {styles.container}>
        <View style={styles.header}>
        <View style= {styles.listartist}>
              <Text style ={{ fontSize:25, color:'black',paddingVertical:15,}}> FAVORITE ARTISTS</Text>
            <FlatList
                style= {styles.fl}
                data={artist}
               horizontal
               keyExtractor={(item, index) => item.key}
                renderItem= {({item, index})=>(
                    <TouchableOpacity
                        style={styles.artist}  >
                        <Image style={styles.imageformat1} 
                         source={item.image}/>
                        <View >
                         <Text style ={{fontSize:15, color:'black'}}>{item.name}</Text>
                         <View style ={{flexDirection:'row',paddingRight:'5%'}}>
                          
                        </View>
                         
                         </View>
                        
                    </TouchableOpacity>
                )
                }
                
                
                
              />
              
            </View>
        </View>
        <View style ={styles.footer}>
        
            <View style={styles.listTab}>
              {
                listTab.map(e =>(
                  <TouchableOpacity 
                  style = {[styles.TabButton, status ===e.status && styles.TabButtonActive]}
                    onPress = {() =>setStatusFilter(e.status)}
                  >
                    <Text style = {{color:'white'}} > {e.status}</Text>
                  </TouchableOpacity>
                ))   
              }</View>
              {status =='Playlist'? 
              <View style= {styles.listplaylist}>
                <FlatList
                style= {{width:widthScreen, padding:20}}
                data={playlist}
                _keyExtractor = {(item, index) => item.item.key}
                renderItem= {({item, index})=>(
                <View style ={{ flexDirection:'row',  justifyContent:'space-between',position:'relative',
                  width:widthScreen*0.9}}>
                  <TouchableOpacity
                      style={styles.songinf1} >
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
                 
                    {item.name != 'Add'? 
                    <TouchableOpacity style = {{borderWidth:0, justifyContent:'center', paddingHorizontal:20}}>
                      <Icon  name = "remove-circle-outline" size ={40} color='black' borderRadius={2}  /></TouchableOpacity>
                      :
                      <TouchableOpacity style = {{borderWidth:0, justifyContent:'center', paddingHorizontal:20}}>
                      <Icon  name = "add-circle-outline" size ={40} color='black' borderRadius={2}  /></TouchableOpacity>
                }
                  </View>
              )
              }
              
              
              />
            </View> : status =='Song' ?  <View style= {{width:widthScreen, padding:20}}>
              
            <FlatList
                
                data={song}
              
                renderItem = {({item, index})=>(
                    <TouchableOpacity
                        style={styles.songinf1} >
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
                
                
                
              />
              
            </View>: <View style= {{width:widthScreen, padding:20}}>
              
              <FlatList
                  
                  data={recently}
                  keyExtractor ={(item, index) => `${item.key}${index}`}
                  renderItem= {({item, index})=>(
                      <TouchableOpacity
                          style={styles.songinf1} >
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
                  
                  
                  
                />
                
              </View> }
        </View>
      </View>
  )
}

export default MySong;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  header:{
    height:heightScreen*0.25,
    width:'100%',
    backgroundColor:"#c94444",
    justifyContent:'flex-end',
    alignContent:'flex-end',
    alignItems:'flex-end',
    
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
    width:widthScreen,
  },
  listplaylist:{
   
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
  borderRadius:80,
  borderWidth:12,
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
  width:widthScreen*0.7,
},
songinf:{
  justifyContent:'center',
  paddingHorizontal:15,
  width:widthScreen,
},
listTab:{
  backgroundColor:'#e03838',
  height:heightScreen*0.05,
  flexDirection:'row',
  justifyContent:'space-between',

},
TabButton:{
  width:widthScreen*0.33,
  justifyContent:'center',
  alignItems:'center',
},
TabButtonActive:{
  width:widthScreen*0.33,
  justifyContent:'center',
  alignItems:'center',
  borderBottomColor:'white',
  borderBottomWidth:4,
},

})