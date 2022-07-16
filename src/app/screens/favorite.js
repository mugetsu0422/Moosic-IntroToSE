import { StyleSheet,FlatList,Image, Text ,  View, TouchableOpacity, Dimensions } from 'react-native';
import React,{useState} from "react";


const imageheight = Dimensions.get('window').width/3.5;



const Favorite = () =>{
    const [dataa, setdataa] = useState([
    {id:1, name:"rock", link:require('../../assets/rock.png')},
    {id:2, name:"electronic", link:require("../../assets/electronic.png")},
    {id:3, name:"pop", link:require("../../assets/pop.png")},
    {id:4, name:"country", link:require("../../assets/country.png")},
    {id:5, name:"funk", link:require("../../assets/funk.png")},
    {id:6, name:"jazz", link:require("../../assets/jazz.png")},
    {id:7, name:"soul", link:require("../../assets/soul.png")},
    {id:8, name:"classical", link:require("../../assets/classical.png")},
    {id:9, name:"chill", link:require("../../assets/chill.png")},
    {id:10, name:"edm", link:require("../../assets/edm.png")},
    {id:11, name:"love", link:require("../../assets/love.png")},
    {id:12, name:"motivation", link:require("../../assets/motivation.png")},
    {id:13, name:"rhymtm", link:require("../../assets/rhymtm.png")},
    {id:14, name:"sad", link:require("../../assets/sad.png")}  ]);


    const [count, setcount]= useState(0);

    const [arr, setarr] = useState([]);
    const is_on_arr = (id) =>{
        for (let i = 0 ; i <arr.length;i++ ){
            if(arr[i] == id)
            return true
        }
        return false
    }
    
    
    const onPress = (id) => {setarr((is_on_arr(id)) ? prevarr => prevarr.filter(i => i !==id):prevarr => (prevarr.length<5) ?prevarr.concat(id) : prevarr);}
    

    onValueChange = (item, index) => {
      
      const newData = dataa.map( preItem =>{
        
        if (item.id == preItem.id){
          
          if(count >= 5 && !preItem.selected){
            
              return {
                ...preItem,
                selected: preItem.selected,
              }
            
          }
          
          else{
            return {
              ...preItem,
              selected: !preItem.selected,
            }}
        }
          
        return {
            
            ...preItem,
            selected: preItem.selected,
          }
          
        }
      )
      setdataa(newData);
      
      
      let counting = 0;
      
      for (let i = 0 ; i <newData.length;i++ ){
        
        if(newData[i].selected == true){
         
          counting += 1;
          }
       
    }

      setcount(counting)
    }

    const ChoosenType = () => {
      for (let i = 0 ; i < dataa.length;i++ ){
        if(dataa[i].selected){
            console.log( dataa[i].name)
        }
    }
    
    }
      return (
        <View style={styles.container}>
            <View style={styles.tittle} >
            <Text style={styles.big}> Pick your favorite type off music</Text>
            <Text style={styles.small}> You can change this later</Text>
        </View>
            <View style={styles.selectzone}>
            
              <FlatList
                style= {styles.fl}
                data={dataa}
                renderItem= {({item, index})=>(
                
                    
                    <TouchableOpacity
                        style={styles.selected}
                        
                        onPress={()=>{
                            
                            {/*onPress(item.id)*/}
                            onValueChange(item,index)
                        }}
                        >
                        <Image style={styles.imageformat} 
                          blurRadius = {item.selected ? 4:0}
                         source={item.link}/>
                        
                        
                    </TouchableOpacity>
                )
                }
                keyExtractor={(item, index) => 'key'+index}
                numColumns={2} 
                
              />
          </View>
          <View style={styles.button}> 
          <Text style = {{color:'white', fontSize:15}}> {/*arr.length*/} {count} out of 5 selected </Text>
          <TouchableOpacity style={styles.next}

            onPress={()=>{
                                        
              {/*onPress(item.id)*/}
              ChoosenType()
            }}
          >
            <Text style = {{color:'white', fontSize:23,margin:20}}> NEXT </Text>  
          </TouchableOpacity>
        </View>
        
        </View>
      );
}

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
      paddingHorizontal: 10,
      paddingTop:30,
      flexDirection:'row',
      flexWrap:'wrap',
      //alignContent:'center',
      flex: 5,
      //borderWidth:2,
      //borderColor:'red',
      
    },
    fl:{
      width:"100%",
      height:"100%",
      //borderWidth: 10,
      borderColor:'blue',
      //borderWidth:10,
      
    },
    unselected:{
      flex:1/2,
      width:'100%',
      height:'100%',
      //width:'100%',
      //height:'100%',
      borderWidth:3,
      paddingHorizontal:6,
  
      
    },
    selected:{
      flex:1/2,
      width:'100%',
      height:'100%',
      //width:'100%',
      //height:'100%',
      //borderWidth:1,
      paddingHorizontal:6,
      
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
    },
    imageformat:{
        width:'100%',
        height:imageheight,
        resizeMode:'contain',
        //borderWidth:10,

    }
    
  });
   

export default Favorite;