/* eslint-disable */ 
import React, { Component } from 'react';
import {StyleSheet,View,ImageBackground,Text,TouchableNativeFeedback} from 'react-native';
import SkeletonContent from "react-native-skeleton-content-nonexpo";
class TopHeadlineItem extends Component {  


 

  render(){
      const {urlToImage,title}=this.props.item;
      const {Topheadlines,index,headlineisLoading}=this.props;

      return(  
        <SkeletonContent
        containerStyle={!!Topheadlines[index+1]?styles.image:{...styles.image,marginRight:22}}
        isLoading={headlineisLoading}
        animationType="shiver"
        >  
      
    <ImageBackground source={{ uri: urlToImage }} imageStyle={styles.imagestyle} style={!!Topheadlines[index+1]?styles.image:{...styles.image,marginRight:15}}>
    <TouchableNativeFeedback onPress={()=>this.props.SetDetailedNews(this.props.item)}>   
        <View style={styles.overlay}>
        <Text style={styles.title}>{(title.split(" ").splice(0,6).join(" ")+"...").replace(/(<([^>]+)>)/ig, '')}</Text>
        </View>
        </TouchableNativeFeedback>


    </ImageBackground>
    
    
    </SkeletonContent>
    
    


    );
  }
  
};

const styles=StyleSheet.create({
    image:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        marginLeft:8,
        width:150,
        height:200
        
        

    },
    imagestyle:{
        borderRadius:12,
        backgroundColor:"black",
        opacity:0.7
    },
    overlay:{
        borderRadius:12,
        justifyContent:"flex-end",
        flex:1,
    },
    title:{
        color:"#FFFFFF",
        fontSize:18,
        fontWeight:"bold",
        paddingHorizontal:10,
        paddingTop:50,
        paddingBottom:10,
    }

})


export default TopHeadlineItem;
