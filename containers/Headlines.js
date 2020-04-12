/* eslint-disable */ 

import React, { Component } from 'react';
import {StyleSheet,SafeAreaView,FlatList} from 'react-native';
import TopHeadlineItem from './TopHeadlineItem';
import _ from 'underscore';


class Headlines extends Component {
    
  componentDidUpdate(){
    try{
        this.flatList.scrollToIndex({
        animated: true,
        index: 0
      })
    }catch(e){

    }
    
  }  


  render(){
      const {Topheadlines,headlineisLoading,SetDetailedNews}=this.props

      

 
    return (
        <SafeAreaView>
        <FlatList
            ref={ref => (this.flatList = ref)}
            data={Topheadlines}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item,index }) => {
                    if(item.urlToImage){
                        return <TopHeadlineItem key={item.title+index} SetDetailedNews={SetDetailedNews} item={item} index={index} headlineisLoading={headlineisLoading} Topheadlines={Topheadlines}/>
                    }else{
                        return null
                    }
            }}
            keyExtractor={item => item.title}
        />
    </SafeAreaView>
    );
  }
  
};

const styles=StyleSheet.create({


})


export default Headlines;
