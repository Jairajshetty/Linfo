/* eslint-disable */ 

import React, { Component } from 'react';
import {StyleSheet,View,ImageBackground,Text,TouchableNativeFeedback,Dimensions} from 'react-native';


import _ from 'underscore'

class SearchResultItem extends Component {

  constructor(props){
      super(props);
      this.state={
          windowWidth:Dimensions.get('window').width
      }
  }

  styleCondition=(n)=>{
    n=String(n);
    let last=n[n.length-1]
    if(last==="0"||last==="9"){
        return 22
    }else if(last==="1"||last==="2"||last==="5"||last==="6"){
        return 12
    }else{
        return 11
    }
  }
  
  

  render(){
    const {urlToImage,title}=this.props.item;
      const {index}=this.props;
      console.log("width",this.state.windowWidth)
 
    return (
      <View style={{paddingVertical:10,flexBasis:this.styleCondition(index)===22?250:this.state.windowWidth/2}}>
        <ImageBackground source={{ uri: urlToImage }} imageStyle={styles.imagestyle} style={{...styles.image,height:this.styleCondition(index)===11?100:250,width:this.styleCondition(index)===22?this.state.windowWidth-10:(this.state.windowWidth-20)/2}}>
            <TouchableNativeFeedback onPress={()=>this.props.SetDetailedNews(this.props.item)}>   
            <View style={styles.overlay}>
        <Text style={styles.title}>{!!title&&title.length>65?title.split("").splice(0,65).join("").replace(/(<([^>]+)>)/ig, '')+"...":!!title&&title.replace(/(<([^>]+)>)/ig, '')}</Text>
        </View>
            </TouchableNativeFeedback>


    </ImageBackground>
    </View>
      
    );
  }
  
};

const styles=StyleSheet.create({

    image:{
        resizeMode:"cover",
        justifyContent: "flex-end",
        marginHorizontal:5,
        
        
    },
    imagestyle:{
        borderRadius:12,
        backgroundColor:"black",
        opacity:0.7,

        
    },
    overlay:{
        borderRadius:12,
        justifyContent:"flex-end",
        flex:1,
    },
    title:{
        color:"white",
        fontSize:18,
        fontWeight:"bold",
        paddingHorizontal:10,
        paddingTop:50,
        paddingBottom:10,
    }

})


export default SearchResultItem;
