/* eslint-disable */ 

import React, { PureComponent } from 'react';
import SearchSkeleton from './SearchSkeleton'
import SearchResultItem from './searchResultItem'
import {StyleSheet,View,Text,ScrollView,TextInput,SafeAreaView,BackHandler} from 'react-native';
import { Item,Button, Icon } from 'native-base'


class SearchScreen extends PureComponent {


    constructor(props) {
        super(props)
        this.state={
            searchResult:[],
            noResultsState:false
        }
        
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick=()=> {
      //this.props.navigation.goBack(null);
      this.props.setsearchScreenState(false);
        this.props.setSearchItem("");
        this.props.SetsearchResult([])
      return true
  }

    componentDidMount(){
        console.log("25",this.state.searchResult)
        this.setState({noResultsState:false})
        this.setState({searchResult:this.props.homesearchResult})
    }
    

    onSubmit=()=>{
            this.setState({isLoading:true},()=>{
                this.props.searchItem.length===0?this.props.setSearchItem("everything"):null
                return fetch(`https://newsapi.org/v2/everything?pageSize=100&language=en&q=${this.props.searchItem!==""?this.props.searchItem:"everything"}&apiKey=d810d90a2f98466ca6ff5d96aa7d13ae`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({searchResult:this.validArrayElements(this.uniqArrayElements(responseJson.articles))},()=>{
                            this.props.SetsearchResult(responseJson.articles)
                            this.setState({isLoading:false},()=>{
                                if(this.state.searchResult.length==0){
                                    this.setState({noResultsState:true})
                                }else{
                                    this.setState({noResultsState:false})
                                }
                            })
                            console.log("search",this.state.searchResult)
                        })
                    })
                    .catch((error) => {
                        console.error("85",error);
                    });
            })
        
        
        

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

      validArrayElements=(arr)=>{
          let result=[];
          arr.map((item)=>{
              if(!!item.urlToImage&&item.urlToImage!="null"&&item.urlToImage!==""&&!!item.title&&!!item.description&&!!item.publishedAt&&!!item.content&&!item.description.includes("URL")){
                result.push(item)
              }
          })
          return result


      }




  render(){
      const {setsearchScreenState,searchItem,SetsearchResult,setSearchItem,SetDetailedNews}=this.props
      const {searchResult,isLoading} =this.state;

 
    return (
    
    <SafeAreaView>
        <View style={styles.searchHeader}>
            <View style={{flexDirection:"row"}}>
        <Button onPress={()=>{setsearchScreenState(false);
        setSearchItem("");
        SetsearchResult([])

        
                                }} transparent>
            <Icon style={styles.icons} name='arrow-back' />
        </Button>
        <Item>
        <TextInput
             
             value={searchItem}
             ref={(input) => { this.TextInputSearch = input }}
             style={styles.searchInput}
             onChangeText={(e)=>{setSearchItem(e)
            this.setState({noResultsState:false});
        }} 
             
             autoFocus={searchItem.length==0} style={styles.searchInput} 
             placeholder="Search"
             maxLength={30}
             onSubmitEditing={this.onSubmit} />
             </Item>
             </View>
             {searchItem.length>0?<Button onPress={()=>{this.props.setSearchItem("");
            this.TextInputSearch.focus()}} transparent>
              <Icon style={styles.xicon} name='x' type="Feather" />
           </Button>:null}     
        </View>
        <View style={styles.searchResultsStyle}>
        {this.state.noResultsState&&searchItem.length>0?    
        <Text style={styles.noResults}>{`Sorry...No Results found for "${searchItem}"`} </Text>:
        
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false} horizontal={false}>
            {!!searchResult&&searchResult.map((item,index)=>{
                    return isLoading?<SearchSkeleton item={item} index={index} key={item.title+index}/>:<SearchResultItem item={item} index={index} SetDetailedNews={SetDetailedNews} key={item.title+index} urlToImage={item.urlToImage}/>
               
                
            })}
            
          </ScrollView>}
        </View>
    </SafeAreaView>
    );
  }
  
};

const styles=StyleSheet.create({
    title:{
        color:"#130D14",
        paddingRight:8,
        fontSize:24
      },
      noResults:{
        fontSize:37,
        fontWeight:"bold",
        color:"#006AAE",
        height:200,
        backgroundColor:"#FFFFFF",
        elevation:4,
        marginBottom:20,
        marginHorizontal:20,
        paddingLeft:10,
        borderRadius:10,


      },
      icons:{
        color:"#130D14",
        fontSize:29
      },
      xicon:{
        color:"#130D14",
        fontSize:20,
        marginRight:25,
        marginTop:2
      },
      searchInput:{
          borderBottomColor:"black",
          height:50,
          alignSelf:"stretch",
          color:"black"
      },
      header:{
        backgroundColor:"transparent",
        elevation:0,
      },
      searchResultsStyle:{
        marginTop:60
      },
      scrollStyle:{
        maxHeight:400
      },
      searchHeader:{
          flex:1,
          flexDirection:"row",
          justifyContent:"space-between"
      },
      scrollView:{
        flexDirection:"row",
        alignContent:"stretch",
        flexWrap:"wrap",

      }

})


export default SearchScreen;
