/* eslint-disable */ 

import React, { Component } from 'react';
import {StyleSheet,ImageBackground,Text,View,BackHandler} from 'react-native';
import {Button, Icon } from 'native-base'


class DetailView extends Component {

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
 
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick=()=> {
        //this.props.navigation.goBack(null);
        this.props.SetDetailedNews({})
        return true
    }


   onBackArrowPress=()=>{
    this.props.SetDetailedNews({})
   } 

  render(){
    const {title,urlToImage,content,source,publishedAt}=this.props.item
    let modifiedDate=Date(Date.UTC(Date.parse(publishedAt)))
    let result=modifiedDate.split(" ").slice(1,4)
    
    return (
      
        <View style={styles.container}>
            <ImageBackground imageStyle={styles.imagestyle} source={{uri:urlToImage}} style={styles.image}>
                <Button onPress={this.onBackArrowPress} transparent>
                    <Icon style={styles.icons} type="Ionicons" name='ios-arrow-back' />
                </Button>
                <View style={styles.channelTimeInfo}>
                    <View style={styles.NewsIconandName}>
                        <View style={styles.NewsIcon}><Text style={styles.NewsLetter}>{source.name[0]}</Text></View>
                        <Text style={styles.NewsChannel}>{source.name}</Text>
                        
                    </View>
                    <Text style={styles.PublishedTime}>{`${result[0]} ${result[1]},${result[2]}`}</Text>
                </View>
                <View style={styles.newsInfo}>
                    <Text style={styles.title}>{!!title&&title.replace(/(<([^>]+)>)/ig, '')}</Text>
                    <Text style={styles.description}>{!!content&&content.replace(/(<([^>]+)>)/ig, '')}</Text>
    
                </View>
                
            
            </ImageBackground>
            
        </View>
      
    );
  }
  
};

const styles=StyleSheet.create({
   
    image:{
        height:350,
        flex:1,
        backgroundColor:"black",
    },
    imagestyle:{
        opacity:0.7,
    },
    container:{
        flex:1,
        
    },
    NewsIconandName:{
        flexDirection:"row",
        marginLeft:10,
        alignItems:"center"
    },
    NewsLetter:{
        color:"orange",
        fontSize:24,
        fontWeight:"bold"

    },
    NewsIcon:{
       backgroundColor:"black" ,
       width:50,
       height:50,
       borderRadius:25,
       opacity:0.8,
       alignItems:"center",
       justifyContent:"center",
    },
    newsInfo:{
        // marginTop:200,
        borderTopStartRadius:35,
        borderTopEndRadius:35,
        flex:1,
        backgroundColor:"white",
        alignItems:"center"

    },
    title:{
        marginTop:18,
        paddingHorizontal:20,
        fontSize:20,
        fontWeight:"bold",
    },
    description:{
        marginTop:18,
        paddingHorizontal:20,
        fontSize:17,
    },
    icons:{
        color:"white"
    },
    channelTimeInfo:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingTop:200,
        paddingBottom:10
    },
    NewsChannel:{
        color:"white",
        fontSize:15,
        marginLeft:10,
    },
    PublishedTime:{
        color:"white",
        fontSize:15,
        paddingRight:10
    }
  

})


export default DetailView;
