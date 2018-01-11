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
  TextInput,
  Alert,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import NetUtil from './NetUtil';
import index from './index';
export default class shezhi extends Component {
  constructor(props){
		super(props);
		
	}
  houtui=()=>{
    this.props.navigator.pop();
  }
  tuichu = () => {
		storage.remove({
		key: 'static'
		});
		this.props.navigator.push({
			name:'index',
			component:index
		});
	}
	kai=()=>{
		Alert.alert
		(
			'提示',
			'正在开发中',
			[{text: '取消'}]
		);
	}
  render() {
    return (
    	<View style={{height:'100%',backgroundColor:'#EBEBEB'}}>
			

				{/*头部*/}
		        <View style={styles.tou}>
		        <TouchableOpacity onPress={this.houtui}>
		        	<Image  source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
		        </TouchableOpacity>
		        	<View style={{alignItems:'center',flex:1,}}>
		        		<Text style={{color:'#fff',fontSize:18,fontWeight:'bold',}}>设置</Text>
		        	</View>
		        </View>
		        <ScrollView style={{marginTop:20}}>
					<View style={styles.foots4}>
						<TouchableOpacity onPress={this.kai} style={{flexDirection: 'row'}} >
							  <View style={{width:'90%'}}><Text style={{marginLeft:10}}>账号管理</Text></View>
							  <View style={{width:'10%'}}><Image source={require('../img/login.jpg')} style={{width:20,height:20}}/></View>
						</TouchableOpacity>
					 </View>
					 <View style={styles.foots4}>
						<TouchableOpacity onPress={this.kai} style={{flexDirection: 'row'}} >
							  <View style={{width:'90%'}}><Text onPress={this.fuwu} style={{marginLeft:10}}>消息通知</Text></View>
							  <View style={{width:'10%'}}><Image source={require('../img/login.jpg')} style={{width:20,height:20}}/></View>
						</TouchableOpacity>
					 </View>
					 <View style={styles.foots4}>
						 <TouchableOpacity onPress={this.kai} style={{flexDirection: 'row'}} >
							  <View style={{width:'90%'}}><Text onPress={this.gai} style={{marginLeft:10}}>空间清理</Text></View>
							  <View style={{width:'10%'}}><Image source={require('../img/login.jpg')} style={{width:20,height:20}}/></View>
						</TouchableOpacity>
					 </View>
					 <View style={styles.foots4}>
						 <TouchableOpacity onPress={this.kai} style={{flexDirection: 'row'}} >
							  <View style={{width:'90%'}}><Text onPress={this.gai} style={{marginLeft:10}}>账号丶设备安全</Text></View>
							  <View style={{width:'10%'}}><Image source={require('../img/login.jpg')} style={{width:20,height:20}}/></View>
						</TouchableOpacity>
					 </View>
					 <View style={styles.foots4}>
						 <TouchableOpacity onPress={this.kai} style={{flexDirection: 'row'}} >
							  <View style={{width:'90%'}}><Text onPress={this.gai} style={{marginLeft:10}}>辅助功能</Text></View>
							  <View style={{width:'10%'}}><Image source={require('../img/login.jpg')} style={{width:20,height:20}}/></View>
						</TouchableOpacity>
					 </View>
					 <View style={styles.foots4}>
						 <TouchableOpacity onPress={this.kai} style={{flexDirection: 'row'}} >
							  <View style={{width:'90%'}}><Text onPress={this.gai} style={{marginLeft:10}}>关于软件</Text></View>
							  <View style={{width:'10%'}}><Image source={require('../img/login.jpg')} style={{width:20,height:20}}/></View>
						</TouchableOpacity>
					 </View>
					<TouchableHighlight underlayColor='#D4D4D4' onPress={this.tuichu} style={styles.dibu}>
						<Text style={styles.di} >退出登录</Text>
					</TouchableHighlight>
			</ScrollView>
		</View>
        
    );
  }
  
}
const styles = StyleSheet.create({
  
     //头部
	tou: {
		flexDirection: 'row', // 水平排布    
		paddingLeft: 10,
		height: 50,
		paddingRight: 37,
		backgroundColor: '#3fdab8',
		alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
	},
	houtui: {
		height: 23,
		width: 23,
		resizeMode: 'stretch',
	},

  foots4: {
		width: '90%',
		height: 40,
		backgroundColor: '#fff',
		marginTop: 5,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 20,
	},
	dibu: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		width: '90%',
		height: 40,
		marginTop:20,
		marginLeft:'5%'
	},
	di: {
		// color: '#fff',
		fontSize: 20,
	}
 
});

//AppRegistry.registerComponent('shezhi', () => shezhi);
