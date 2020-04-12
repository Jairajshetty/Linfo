/* eslint-disable */ 

import React, { Component } from 'react';
import {StyleSheet,SafeAreaView,Text,View} from 'react-native';

class Skeleton extends Component {

  render(){
 
    return (
      
        <SafeAreaView style={this.props.index===0?styles.newsComponentatzero:styles.newsComponent}>
            
            <View style={styles.Image}></View>
         
            <View style={{flex:1,justifyContent:"space-around"}}>
           
            <Text style={styles.title}>{}</Text>
                <Text style={styles.description}>{}</Text>
            <Text style={styles.time}>{}</Text>
            
            </View>
        </SafeAreaView>
      
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
        backgroundColor:"#E1E9EE"
    },
    title:{
        paddingTop:8,
        flexShrink:1,
        paddingRight:10,
        marginRight:10,
        marginLeft:6,
        height:20,
        borderRadius:12,
        backgroundColor:"#E1E9EE"

        
    },
    description:{
        fontSize:12,
        paddingRight:12,
        marginRight:10,
        marginLeft:6,
        height:20,
        backgroundColor:"#E1E9EE",
        borderRadius:12,
        
    },
    time:{
        paddingBottom:3,
        marginRight:10,
        marginLeft:6,
        height:20,
        width:150,
        backgroundColor:"#E1E9EE",
        borderRadius:12,
    }

  

})


export default Skeleton;
