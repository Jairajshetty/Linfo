/* eslint-disable */ 

import React, { Component } from 'react';
import AppHeader from './AppHeader'
import Headlines from './Headlines'
import NewsComponent from './NewsComponent'
import Skeleton from "./skeleton"
import SearchScreen from './SearchScreen'
import DetailView from './DetailView';

import {StyleSheet,View,FlatList,Text,ScrollView} from 'react-native';

import _ from 'underscore'

class Home extends Component {

  constructor(props){
    super(props);
    this.state={
      title:"Linfo",
      category:"general",
      searchItem:"",
      Topheadlines:[],
      searchResult:[],
      EnglishSources:"",
      everything:[],
      headlineisLoading:true,
      newslistisLoading:true,
      DetailViewObject:{},
      searchScreenState:false
    }
  }


    componentDidMount(){
      console.log("36",this.state.searchResult)
      return fetch(`https://newsapi.org/v2/sources?language=en&category=${this.state.category}&apiKey=d810d90a2f98466ca6ff5d96aa7d13ae`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({EnglishSources:this.setEnglishSources(responseJson.sources)},()=>{
           return fetch(`https://newsapi.org/v2/top-headlines?sources=${this.state.EnglishSources}&apiKey=d810d90a2f98466ca6ff5d96aa7d13ae`)
                .then((response) => response.json())
                .then((responseJson) => {

                  this.setState({Topheadlines:this.uniqArrayElements(responseJson.articles)},()=>{
                    return fetch(`https://newsapi.org/v2/everything?sources=${this.state.EnglishSources}&language=en&pageSize=100&apiKey=d810d90a2f98466ca6ff5d96aa7d13ae`)
                          .then((response) => response.json())
                          .then((responseJson) => {

                            this.setState({everything:this.uniqArrayElements(responseJson.articles)},()=>{
                                
                              this.setState({newslistisLoading:false,headlineisLoading:false})
                            })
                            })
                          .catch((error) => {
                            console.error("43",error);
                          })
                  })
                  })
                .catch((error) => {
                  console.error("48",error);
                });
        })
      })
      .catch((error) => {
        console.error("53",error);
      });
  }

    EnglishSourcesandHeadlinesfetchingFunction=()=>{

      return fetch(`https://newsapi.org/v2/sources?language=en&category=${this.state.category}&apiKey=d810d90a2f98466ca6ff5d96aa7d13ae`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({EnglishSources:this.setEnglishSources(responseJson.sources)},()=>{
           return fetch(`https://newsapi.org/v2/top-headlines?sources=${this.state.EnglishSources}&apiKey=d810d90a2f98466ca6ff5d96aa7d13ae`)
                .then((response) => response.json())
                .then((responseJson) => {

                  this.setState({Topheadlines:this.uniqArrayElements(responseJson.articles)},()=>{
                    console.log("51",this.state.Topheadlines)
                    return fetch(`https://newsapi.org/v2/everything?sources=${this.state.EnglishSources}&language=en&pageSize=100&apiKey=d810d90a2f98466ca6ff5d96aa7d13ae`)
                          .then((response) => response.json())
                          .then((responseJson) => {
                            console.log(responseJson)
                            this.setState({everything:this.uniqArrayElements(responseJson.articles)},()=>{
                              this.setState({headlineisLoading:false,newslistisLoading:false})
                            })
                            })
                          .catch((error) => {
                            console.error("75",error);
                          })
                  })
                  })
                .catch((error) => {
                  console.error("80",error);
                });
        })
      })
      .catch((error) => {
        console.error("85",error);
      });

  }

  SetDetailedNews=(obj)=>{
    this.setState({DetailViewObject:obj})
  }
  SetsearchResult=(val)=>{
    this.setState({searchResult:val})
  }

  setEnglishSources=(arr)=>{
    let source="";
    arr.map(ele=>{
      if((source.length==0||source.split(",").length<24)&&ele.id!=="business-insider-uk"){
        source+=ele.id!==null?`${ele.id},`:""
      }else{
        return
      }
      
    })

    return source

  }

  uniqArrayElements=(arr)=>{
    const filteredArr = arr.reduce((acc, current) => {
      const x = acc.find(item => item.title === current.title);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return filteredArr
  }

  setSearchItem=(val)=>{
    this.setState({searchItem:val})
  }
  setsearchScreenState=(val)=>{
    this.setState({searchScreenState:val})
  }


  setCategory=(c)=>{

    this.setState({category:c},()=>{
      this.setState({headlineisLoading:true,newslistisLoading:true})
      this.EnglishSourcesandHeadlinesfetchingFunction();
      try{
        this.flatList.scrollToIndex({
        animated: true,
        index: 0,
      });
    }catch(e){

    }
    })
    
  }


    



  

  render(){
    const {title,Topheadlines,searchItem,searchScreenState,searchResult,category,everything,DetailViewObject,headlineisLoading,newslistisLoading} =this.state;
    const categoriesArray=["General","Business","Entertainment","Health","Science","Sports","Technology"];

 
    return (
      _.keys(DetailViewObject).length!==0?
      <DetailView item={DetailViewObject} SetDetailedNews={this.SetDetailedNews}/>:
      searchScreenState?<SearchScreen homesearchResult={searchResult} SetsearchResult={this.SetsearchResult} SetDetailedNews={this.SetDetailedNews} setSearchItem={this.setSearchItem} searchItem={searchItem} setsearchScreenState={this.setsearchScreenState}/>:
      <View style={styles.container}>
        
          <AppHeader title={title} setsearchScreenState={this.setsearchScreenState}/>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scrollStyle}>
            {categoriesArray.map((ele,index)=>{
                return <Text onPress={()=>this.setCategory(ele.toLocaleLowerCase())}
                                style={category===ele.toLocaleLowerCase()?styles.categorySelected:styles.categorylist}
                                key={ele+index}>{ele}
                              </Text> 
                
            })}
            
          </ScrollView>
       
          <Headlines SetDetailedNews={this.SetDetailedNews} setEnglishSources={this.setEnglishSources} headlineisLoading={headlineisLoading} Topheadlines={Topheadlines} />   
          <View style={styles.everything}>
          <FlatList
            ref={ref => (this.flatList = ref)}
            data={everything}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item,index }) => {
                    if(!!item.urlToImage&&item.urlToImage!="null"&&!!item.title&&!!item.description&&!!item.publishedAt&&!!item.content&&!item.description.includes("URL")){
                        return newslistisLoading?<Skeleton key={item.publishedAt} item={item} index={index}/>:<NewsComponent SetDetailedNews={this.SetDetailedNews} key={item.title} item={item}  index={index}/>
                    }else{
                        return null
                    }
            }}
            keyExtractor={(item,index) => item.title+index}
        />
            
          </View>
      </View>
    );
  }
  
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#FFFFFF",
    
  },
  categorylist:{
    marginHorizontal:15,
    color:"#7D7B98",
    fontFamily:"sans-serif-medium",
    backgroundColor:"transparent"
  },
  scrollStyle:{
    maxHeight:40
  },
  categorySelected:{
    fontFamily:"sans-serif-medium",
    marginHorizontal:15,
    color:"black",
    fontWeight:"bold"
  },
  everything:{
    backgroundColor:"#E9ECF5",
    marginTop:12,
    borderTopStartRadius:15,
    borderTopEndRadius:15,
    flex:1
  }



})


export default Home;
