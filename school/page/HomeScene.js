import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ListView,
  AppRegistry,
  Image,
  TouchableOpacity,
} from 'react-native';

import {PullList} from 'react-native-pull';	 //下拉刷新	 下拉加载
import listcontent from '.stcontent';     //详情页
import NetUtil from '../login/NetUtil';
export default class laws extends Component{
constructor(props){
    super(props);
    this.state=({
		isloadmore:false,
		currage:1,
		datalist:[],
        dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    });
}
componentWillMount(){
  storage.load({
  key: 'lawlist',
  autoSync: true,
  syncInBackground: true,
  syncParams: {
	extraFetchOptions:{
	},
	someFlag: true,
    },
  }).then(ret => {
	  let _this=this;
		_this.setState({
        datalist:studata,
        dataSource:_this.state.dataSource.cloneWithRows(ret.studata),
      });	
  }).catch(err => {
	let _this=this;
	let url='http://www.alroy.cn/prisonapi/index/law_list';
	let params="currage="+this.state.currage;
	 NetUtil.postForm(url,params,function(result){
		 _this.setState({
          datalist:result,
          dataSource:_this.state.dataSource.cloneWithRows(result),
        });
		storage.save({
			key: 'lawlist',
			data: { 
				studata:result,
			},
				expires: null,
		});		 
	 });	
  }) 
}	
pullrelease=(resolve)=>{
	let _this=this;
	let url='http://www.alroy.cn/prisonapi/index/law_list';
	let params='currage=1';
	 NetUtil.postForm(url,params,function(result){
		 _this.setState({
			dataSource:_this.state.dataSource.cloneWithRows(result),
      });
		storage.save({
			key: 'lawlist',
			data: { 
				studata:result,
			},
				expires: null,
		});		 
	 });
	setTimeout(() => {
    resolve();
}, 3000);
}

  onloadmore=()=>{
    this.setState({
      isloadmore:true,
    });
    if(this.state.isloadmore)
    {
      let _this=this;
      let currage=this.state.currage+1;
      let url='http://www.alroy.cn/prisonapi/index/law_list';
      let params="currage="+currage;

      NetUtil.postForm(url,params,function(result){

        _this.setState({
          isloadmore:false,
          currage:_this.state.currage+1,
          datalist:_this.state.datalist.concat(result),
          dataSource:_this.state.dataSource.cloneWithRows(_this.state.datalist.concat(result)),
        });
      })
      this.setState({
        isloadmore:false,
      });
    }
}
	
renderfooter=()=>{
  if(this.state.isloadmore){
  return(
  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
      <Text>正在加载中...</Text>
    </View>
  );
}else{
  return(
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
      <Text>加载完成</Text>
    </View>
  );
}
}

fanhui=()=>{
	this.props.navigator.pop()
	}
xiangqing=(nid)=>{
	const {navigator}=this.props;
		if(navigator){
			navigator.push({
				name:'listcontent',
				component:listcontent,
				params:{
					nid:nid,
				}
			})
		}
	}
render() {
        return (
          <View style={styles.container}>
      <View style={{height:45,flexDirection:'row',backgroundColor:'#fff',}}>
      <TouchableOpacity onPress={this.fanhui} >
      <Image source={require('./imghui.png')} style={{width:46,height:45}} />
      </TouchableOpacity>
          <Text style={{width:'75%',fontWeight:'800',lineHeight:34,textAlign:'center',fontSize:17,}}>法律法规
          </Text>
        </View>
          <PullList
          onEndReached={this.onloadmore.bind(this)}
            onEndReachedThreshold={5}
          onPullRelease={this.pullrelease}
                  dataSource={this.state.dataSource}
          renderFooter={this.renderfooter.bind(this)}
          renderRow={(rowData)=>
          <TouchableOpacity onPress={this.xiangqing.bind(this,rowData.Id 

)} activeOpacity={1} style={styles.title}>
        <View style={{padding:9,width:55,height:70,}}>
            <Image source={{uri:'http://uploads.xuexila.com/allimg/1605/741-1605260RQ2-52.jpg'}} style={{width:50,height:70,}}/>
        </View>
        <View style={{width:'88%',paddingLeft:10}}>
      <Text numberOfLines={1} style={{fontSize:18,width:'89%',paddingLeft:10,paddingTop:10,color:'#2b3b48'}}>
        {rowData.title}
            </Text>
            <Text numberOfLines={2} style={{fontSize:12,width:'94%',paddingLeft:'2%',paddingTop:10,color:'#999',marginRight:20,}}>
        {rowData.content}
            </Text>   
        </View>
      </TouchableOpacity>     
      }/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
title:{
    width:'97%',
    height:90,
    marginLeft:5,
    marginRight:10,
   marginTop:10,
    borderWidth:1,
    borderColor:'#ccc',
    backgroundColor:'#fff',
    flexDirection:'row'
  },
});
