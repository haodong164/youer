/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,ListView,TouchableOpacity,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Carousel from 'react-native-carousel';
import NetUtil from './NetUtil';
export default class jinei extends Component {

  constructor(props) {
  super(props);
	this.state=({
		userinfo:[],
		id:this.props.wid,
	});
}
	componentWillMount(){
		let _this=this;
		let url="http://www.ryaonet.cn/index.php/api/Api/jinei";
		let parms={userid:this.state.id};
		NetUtil.postJSON(url,parms,function(result){
			_this.setState({
				userinfo:result,
			});
		});
	}
   back=()=>{
		this.props.navigator.pop();
	}
  render() {
    return (
      <View>
      <View style={styles.tou}>
              <TouchableOpacity onPress={this.back}>
                <Image  source={require('../img/hotui.png')} style={styles.houtui} onPress={this.back}/>
              </TouchableOpacity>
                <View style={{alignItems:'center',flex:1,}}>
                  <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>成长记录</Text>
                </View>
           </View>

        <View style={{marginTop:20,width:'100%'}}>
				<Text style={{fontSize:24,textAlign:'center'}}>{this.state.userinfo.title}</Text>
			</View>
			
			<View style={styles.neirong}>
				<Text>{this.state.userinfo.content}</Text>
			</View>
			<View style={styles.img}>
				<Image source={{uri:this.state.userinfo.photos}} style={{width:300, height:100}} />
			</View>
			<View style={{width:'50%',marginLeft:'55%',marginTop:10,alignItems:'center'}}>
				<Text style={{fontSize:14,width:'50%',textAlign:'center'}}>{this.state.userinfo.name}</Text>
				<Text style={{fontSize:14,width:'50%',textAlign:'center'}}>{this.state.userinfo.pubdate}</Text>
			</View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  top:{
    backgroundColor:'#3fdab8',
    width:500,
    height:60,
  },
  top1:{
     flexDirection:'row',
     marginTop:5,
	 paddingBottom: 10,
	 borderColor: '#D6D6D6',
  },
  title:{
    marginTop:-15,
    paddingRight:150,
    paddingLeft:160,
    fontWeight:'500',
    color:'#fff',
  },
    right:{
      marginTop:10,
      paddingLeft:20,
    },
    center:{
    marginTop:10,
         flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    zi:{
      marginTop:10,
	  flexDirection:'row',
	  alignItems:'center',
    },
   photo:{
	   alignItems:'center',
	   marginTop:-20,
	   paddingRight:290,
    },
  tou: {
    flexDirection: 'row', // 水平排布    
    paddingLeft: 10,
    height:50,
    paddingRight: 37,
    backgroundColor: '#3fdab8',
    alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
  },
  houtui: {
    height: 23,
    width: 23,
    resizeMode: 'stretch',
  },
  neirong:{
	  marginTop:5,
	  marginLeft:20,
	  width:340
  },
  img:{
	  marginLeft:50,
	  marginTop:10,
  }
});
