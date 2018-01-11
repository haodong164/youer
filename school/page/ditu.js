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
  TextInput,
  TouchableHighlight,
  Button,
  Alert,
  Image,
  ListView,
  ScrollView,
  TouchableOpacity,
  Linking
} from 'react-native';

import {PullList} from 'react-native-pull';
import {Navigator} from 'react-native-deprecated-custom-components';
import NetUtil from './NetUtil';
export default class tongxun extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			userinfo:[],
			dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		});
	}
	componentWillMount(){
		storage.load({
			key: 'StudentList',
			autoSync: true,
			syncInBackground: true,
			syncParams: {
			extraFetchOptions: {
			},
			someFlag: true,
			},
		  }).then(ret => {
			  //alert('have');
			  let _this=this;
			  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(ret.studata),
					});
		  }).catch(err => {
			  //alert('none');
			  let _this=this;
			  let url="http://192.168.98.101/index.php/api/Api/getuserinfo";
			  let params="carrage=1";
				NetUtil.postForm(url,'',function(result){
				  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				 storage.save({
					key: 'StudentList',  // 注意:请不要在key中使用_下划线符号!
					data: { 
					  studata: result,
					},
					expires: null
				  });
				});
			})
	}


	houtui=()=>{
	  this.props.navigator.pop();
	}
	call=(telphone)=>{
		Linking.openURL("tel:"+telphone);
	}
	duanxin=(telphone)=>{
	  Linking.openURL("smsto:"+telphone); 
	}
	pullrelease=(resolve)=>{
		let _this=this;
			  let url="http://192.168.98.101/index.php/api/Api/getuserinfo";
			  let params="carrage=1";
				NetUtil.postForm(url,params,function(result){
				  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				 storage.save({
					key: 'StudentList',  // 注意:请不要在key中使用_下划线符号!
					data: { 
					  studata: result,
					},
					expires: null
				  });
				});
		setTimeout(() => {
          resolve();
      }, 3000);
	}
    

  render() {
    return (
      <View style={{width:'100%',height:'100%'}}>
            <View style={styles.tou}>
			     <TouchableOpacity onPress={this.houtui}>
			         	<Image source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
			    </TouchableOpacity>
			        	<View style={{alignItems:'center',flex:1,}}>
			         		<Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>学校位置</Text>
			         	</View>
		    </View>
          
      </View>
    );
  }
}
const styles = StyleSheet.create({ 
  tou:
	{
    width:'100%',
		flex: 0.08,
		position: 'absolute',
		flexDirection: 'row', // 水平排布    
		paddingLeft: 10,
		height: 60,
		paddingRight: 37,
		backgroundColor: '#3fdab8',
		alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
	},

	houtui: {
		height: 23,
		width: 23,
		resizeMode: 'stretch',
		marginLeft:10
	},

newlist:{
  flexDirection:'row',
  marginTop:10,
  marginLeft:10,
  paddingBottom:10,
  borderBottomWidth:1,
  flex: 1,
  borderColor:'#d6d6d6'
},
text:{
  marginLeft:10,
  marginTop:5,
  flex: 2.8,
},
  texts: {
    fontSize: 14,
    color: '#696969',
  },
  texx: {
    marginTop: 4,
    fontSize: 17,
    color: '#000',
  }	
});
