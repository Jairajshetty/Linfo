/* eslint-disable */ 

import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Body, Right,Title, Button, Icon,Header } from 'native-base'

import _ from 'underscore'

class AppHeader extends Component {

  render(){

    const {title,setsearchScreenState}=this.props
 
    return (
      
        <Header noLeft style={styles.header}>
          <Body style={styles.titleBody}>
        
            <Title style={styles.title}>{title}</Title>
          </Body>
          <Right>
            <Button onPress={()=>{setsearchScreenState(true)}} transparent>
          
              <Icon style={styles.icons} type="AntDesign" name='search1' />
            </Button>
            
          </Right>         
      </Header>
      
    );
  }
  
};

const styles=StyleSheet.create({

  pickerStyle:{
    width:150,
    height:50,
     backgroundColor:"white"
     
    
  },
  title:{
    color:"#130D14",
    paddingRight:8,
    fontSize:24
  },
  icons:{
    color:"#130D14",
    fontSize:29
  },
  header:{
    backgroundColor:"transparent",
    elevation:0,
  },

})


export default AppHeader;
