/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TextInput,
	ScrollView,ToastAndroid,
	ListView,TouchableHighlight
} from 'react-native';
import {
	Navigator
} from 'react-native-deprecated-custom-components';
import index from './index';
import NetUtil from './NetUtil';
export default class gai extends Component {
	constructor(props) {
		super(props);
    this.state = {
      userid:'',     
      userinfo:[],
			identity:'',
			telphone:'',
    }
	}
	componentWillMount(){
		storage.load({
			key: 'static',
			autoSync: true,
			syncInBackground: true,
			syncParams: {
				extraFetchOptions: {
				},
				someFlag: true,
			},
		}).then(ret => {
			this.setState({
				telphone:ret.telphone,
				identity:ret.identity,
			});
		})
		
	}
	houtui = () => {
		this.props.navigator.pop()
	}
	dologin=()=>{
	  succs=(res)=>{
		  if(res=='succ'){
			  this.props.navigator.push({
				name: 'index',
				component: index
				});
				ToastAndroid.show('修改成功,请重新登录', ToastAndroid.SHORT);
			//  alert('修改成功,请重新登录');
		  }if(res=='fail'){
			  alert('修改失败');
		  }if(res=='no same'){
			  alert('密码不正确');
		  }if(res=='pass'){
			  alert('两次密码不一致');
		  }if(res=='oldpassword'){
			  alert('请填写原密码');
		  }if(res=='password'){
			  alert('请填写新密码');
		  }if(res=='chong xin xie'){
			  alert('新密码不可与原密码一致');
		  }
	  }
	  // alert(this.username);
	  // alert(this.password);
	  // alert(this.qpsw);
	let url='http://www.ryaonet.cn/index.php/api/Api/xiugai';
	  let params={'identity':this.state.identity,'telphone':this.state.telphone,'oldpassword':this.oldpassword,'password':this.password,'repassword':this.repassword,};
	let rest=NetUtil.postJSON(url,params,function(result){
		this.succs(result);
	})
	
	
	}

	render() {
		return (
			<View style={styles.container}>
				{/*头部*/}
		        <View style={styles.tou}>
			        <TouchableOpacity onPress={this.houtui}>
			        	<Image source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
			        </TouchableOpacity>
			        	<View style={{alignItems:'center',flex:1,}}>
			        		<Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>修改密码</Text>
			        	</View>
		    	 </View>
<View style={styles.dakuang}>
    <View style={styles.yi}>
    <View style={styles.yuan}><Text style={{marginTop:9, marginLeft:5,}}>原密码</Text></View>
    <View style={styles.yuan2}><TextInput style={{marginLeft:5,}} onChangeText={(text)=>{this.oldpassword=text}} secureTextEntry={true} underlineColorAndroid='transparent'  placeholder=''/></View>
  </View>

   <View style={styles.yi}>
    <View style={styles.yuan}><Text style={{marginTop:9, marginLeft:5,}}>新密码</Text></View>
    <View style={styles.yuan2}><TextInput style={{marginLeft:5,}} onChangeText={(text)=>{this.password=text}} secureTextEntry={true} underlineColorAndroid='transparent'  placeholder=''/></View>
  </View>

   <View style={styles.yi}>
    <View style={styles.yuan}><Text style={{marginTop:9, marginLeft:5,}}>重复密码</Text></View>
    <View style={styles.yuan2}><TextInput style={{marginLeft:5,}} onChangeText={(text)=>{this.repassword=text}} secureTextEntry={true} underlineColorAndroid='transparent'  placeholder=''/></View>
  </View>
        <View>
        <TouchableHighlight  underlayColor='#40E0D0' style={styles.comment} onPress={this.dologin}>
          <Text style={styles.dl}>确认修改</Text>
        </TouchableHighlight>
        </View>

      </View>
		 </View>

		);
	}
}

const styles = StyleSheet.create({
	frame: {
		flex: 1,
	},
	// container: {
	// 	position: 'relative',
	// },

	//头部
	tou: {
		//flex:0.07,
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

	//内容
	  dakuang: {
		height:'100%',
		backgroundColor:'#EEE9E9',
		alignItems: 'center'
	  },
 yi:{
    marginTop:10,
    width:380,
    height:40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
 },
 yuan:{
  borderWidth:1,
  borderColor:'#DCDCDC',
  height:40,
  width:70,
  backgroundColor:'#fff',
  borderRadius: 10,
 },
  yuan2:{
  borderWidth:1,
  height:40,
  width:260,
  borderColor:'#DCDCDC',
  backgroundColor:'#fff',
  marginLeft:10,
  borderRadius: 10,
 },

  comment: {
    width: 300,
    height: 40,
    marginTop: 20,
    backgroundColor: '#40E0D0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  dl: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
 
});
