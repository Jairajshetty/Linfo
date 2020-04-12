/* eslint-disable */ 

import React, { Component } from 'react';
import {StyleSheet,View,Dimensions} from 'react-native';


import _ from 'underscore'

class SearchSkeleton extends Component {

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
      const {index}=this.props;
 
    return (
      <View style={{paddingVertical:10,flexBasis:this.styleCondition(index)===22?250:this.state.windowWidth/2}}>
            <View style={{...styles.image,height:this.styleCondition(index)===11?100:250,width:this.styleCondition(index)===22?this.state.windowWidth-10:(this.state.windowWidth-20)/2}}>
            <View style={styles.overlay}>
        </View>
            </View>
    </View>
      
    );
  }
  
};

const styles=StyleSheet.create({

    image:{
        resizeMode:"cover",
        justifyContent: "flex-end",
        marginHorizontal:5,
        backgroundColor:"#E1E9EE",
        borderRadius:12,
        elevation:2,
        
        
    },
  
    overlay:{
        borderRadius:12,
        justifyContent:"flex-end",
        flex:1,
    }

})


export default SearchSkeleton;
