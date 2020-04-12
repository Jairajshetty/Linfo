/* eslint-disable */ 

import React, { Component } from 'react';
import {StyleSheet,SafeAreaView,Image,Text,TouchableNativeFeedback,View} from 'react-native';


class NewsComponent extends Component {



    onNewsPress=()=>{
        this.props.SetDetailedNews(this.props.item);
    }

  render(){
      const {title,urlToImage,description,publishedAt}=this.props.item
      const ripple = TouchableNativeFeedback.Ripple("#E9ECF5");
      let publishedTime=(((Date.now()/1000)-(Date.parse(publishedAt)/1000))/60000).toFixed();
      let timeOfPublish=publishedTime==0?"just now":publishedTime==1?publishedTime+" minute ago":publishedTime+" minutes ago";
      let t=(title.split("").splice(0,35).join("")+"...").replace(/(<([^>]+)>)/ig, '');
 
    return (
        
        <TouchableNativeFeedback onPress={this.onNewsPress} background={ripple}>
        <SafeAreaView style={this.props.index===0?styles.newsComponentatzero:styles.newsComponent}>
            
            <Image
                style={styles.Image}
                source={{
                    uri: urlToImage,
                  }}
            />
         
            <View style={{flex:1,justifyContent:"space-between"}}>
           
            <Text style={styles.title}>{title.length<=40?title.replace(/(<([^>]+)>)/ig, ''):t}</Text>
                <Text style={styles.description}>{(description.split("").splice(0,60).join("")+"...").replace(/(<([^>]+)>)/ig, '')}</Text>
            <Text style={styles.time}>{timeOfPublish}</Text>
            
            </View>
        </SafeAreaView>
        </TouchableNativeFeedback>
        
         

        
    );
  }
  
};

const styles=StyleSheet.create({
    newsComponentatzero:{
        backgroundColor:"white",
        alignSelf: "stretch",
        height:110,
        elevation:4,
        marginTop:15,
        marginBottom:10,
        marginHorizontal:15,
        borderRadius:10,
        flexDirection:"row",
    },
    newsComponent:{
        backgroundColor:"white",
        alignSelf: "stretch",
        height:110,
        elevation:4,
        marginTop:6,
        marginBottom:10,
        marginHorizontal:15,
        borderRadius:10,
        flexDirection:"row",
    },
    Image:{
        width:120,
        height:100,
        marginHorizontal:5,
        borderRadius:7,
        marginVertical:5,
    },
    title:{
        fontSize:18,
        color:"#323643",
        fontWeight:"bold",
        fontFamily:"notoserif",
        paddingTop:8,
        flexShrink:1,
        paddingRight:10
        
    },
    description:{
        fontSize:12,
        color:"#403D52",
        paddingRight:12
        
    },
    time:{
        fontSize:12,
        paddingBottom:3,
        fontFamily:"monospace"
    }

})


export default NewsComponent;
