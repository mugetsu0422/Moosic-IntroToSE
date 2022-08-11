import { Modal, Dimensions, TouchableWithoutFeedback,TouchableOpacity, StyleSheet,FlatList, View, Text } from "react-native";
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
const deviceHeight = Dimensions.get('window').height
export class BottomPopup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show: false,
            choice: '',
        }
          
    }
    show = (option) =>{
        this.setState({show:true, choice:option})
        
    }
    close = () =>{
        this.setState({show:false})
    }
    settingChoice = (option)=>{
       
    }
    renderOutsideTouchabe(onTouch){
        const view = <View style ={{flex: 1, width:'100%'}}/>
        if (!onTouch) return view
        return (
          <TouchableWithoutFeedback 
            onPres = {onTouch} style ={{ flex: 1, width:'100%'}}
          >
            {view}
          </TouchableWithoutFeedback>
        )
      }

    renderTitle = () =>{
        const {title,author} = this.props
        return (
            <View style ={{margin: 10}} > 
            <Text style ={{
                color:'black',
                fontSize: 25, 
               
            }}>
                {title}

            </Text>
            <Text style ={{
                color:'black',
                fontSize: 15, 
               
            }}>
                {author}

            </Text>
        </View>
        )
    }
    renderContent = () => {
        const {data} = this.props
        return (
            <View style = {{borderTopColor: 'gray', borderTopWidth:1}}>

                <FlatList 
                    style = {{marginBottom: 20, paddingBottom:10}}
                    showsVerticalScrollIndicator = {false}
                    data = {data}
                    renderItem = {this.renderItem}
                    extraData = {data}
                    keyExtractor={(item,index) => index.toString() } 
                    //ItemSeparatorComponent = {this.renderSeparator}
                    contentContainerStyle = {{paddingBottom:40}}
                />
            </View>
        )   
    }
    renderItem = ({item}) => {
        
        return (
            <TouchableOpacity style={{flexDirection:'row', padding: 10}} 
                onPress = {
                    ()=> {
                        this.setState({choice: item.name,
                        
                    })
                        
                    }
                }
            >
                {this.state.choice == item.name ? <Icon name = {item.icon} size = {25} />:null}
                <Text style = {{fontSize:20}}>    {item.name}</Text>
            </TouchableOpacity>
        )
    }
    renderSeparator = () => {
        <View
            style = {{
               opacity:0.1,
                backgroundColor:'gray',
                height : 1,
            }}
        >

        </View>
    }
    render(){
        let {show} = this.state
        const {onTouchOutside, title,author,Choice} = this.props
        this.settingChoice(Choice)
        return (
            show ? 
        <Modal
            style ={{borderWidth:12}}
            animationType="slide"
            transparent= {true}
            visible= {show}
            onRequestClose = {this.close}
        >
            <TouchableWithoutFeedback 
            onPress = {()=>{this.setState({show:false})
            settingChoice(this.state.choice)
           
        }}

            >
            <View  style = {{ flex: 1, justifyContent:'flex-end'}} >
           
            <View style ={{backgroundColor:'white',width:'100%', borderTopRightRadius:10, borderTopLeftRadius:10,paddingHorizontal:10, borderWidth:2, maxHeight:deviceHeight*0.5}}
            >
               {this.renderTitle()}
               {this.renderContent()}

            </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>: null
        )
    }}