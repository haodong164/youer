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
  ToastAndroid
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import NetUtil from './NetUtil';
import index from './index';
export default class zhuce extends Component {
  constructor(props){
		super(props);
		this.truename='';
		this.telphone='';
		this.password='';
		this.repassword=''
	}
  fanhui=()=>{
    this.props.navigator.pop();
  }

  render() {
    return (
        <Image style={styles.tu} source={require('../img/0.png')} > 
      <View style={styles.dakuang}>
     
        <View style={styles.kong}></View>
        
        <View style={styles.txkuang}>
        <Image style={styles.touxiang} source={require('../img/zhu10.jpg')} />
        <Text style={styles.title}>阳光幼儿园</Text>  
        </View>
       

	   <View style={styles.yonghukuang}>
			<View>
			  <Image style={{width:30,height:30, marginTop:5,marginLeft:2,}} source={require('../img/t2.png')} />
		   </View>
		   <View style={styles.zhenyonghu}>
				<TextInput onChangeText={(text)=>{this.truename=text}} underlineColorAndroid='transparent'  placeholder='姓名'/>
			</View>
		</View>
        <View style={styles.yonghukuang}>
			<View>
			  <Image style={{width:30,height:30, marginTop:5,marginLeft:2}} source={require('../img/dh.png')} />
		   </View>
		   <View style={styles.zhenyonghu}>
				<TextInput onChangeText={(text)=>{this.telphone=text}} underlineColorAndroid='transparent'  placeholder='电话'/>
			</View>
		</View>
       <View style={styles.yonghukuang}>

		   <View>
			  <Image style={{width:28,height:28, marginTop:6,marginLeft:3, borderRadius:50,}} source={require('../img/t3ss.png')} />
		   </View>

		   <View style={styles.zhenyonghu}>
				<TextInput onChangeText={(text)=>{this.password=text}} underlineColorAndroid='transparent'  placeholder='密码'/>
			</View>
		</View>
		<View style={styles.yonghukuang}>

		   <View>
			  <Image style={{width:28,height:28, marginTop:6,marginLeft:3, borderRadius:50,}} source={require('../img/t3ss.png')} />
		   </View>

		   <View style={styles.zhenyonghu}>
				<TextInput onChangeText={(text)=>{this.repassword=text}} underlineColorAndroid='transparent'  placeholder='确认密码'/>
			</View>
		</View>

        <View style={styles.comment}>
        <TouchableHighlight>
          <Text onPress={this.zhuce} style={styles.dl}>立即注册</Text>
        </TouchableHighlight>
        </View>

        <View style={styles.comments}>
        <TouchableHighlight>
          <Text onPress={this.fanhui} style={styles.dl}>已有账号</Text>
        </TouchableHighlight>
        </View>

      </View>
      </Image>
    );
  }
  zhuce=()=>{
	  succs=(res)=>{
		  if(res=='succ'){
			  ToastAndroid.show('注册成功请登陆', ToastAndroid.LONG);

			  this.props.navigator.push({
				 name:'index',
				component:index,
				//params:{
					//username:this.username
				//}
			  });
		  }if(res=='username exist'){
			  alert('用户名存在');
		  }if(res=='username not kong'){
			  alert('用户名不能为空');
		  }if(res=='password not same'){
			  alert('密码不相同');
		  }if(res=='truename not kong'){
			  alert('真实姓名不能为空');
		  }
	  }
	  // alert(this.username);
	  // alert(this.password);
	  // alert(this.qpsw);
	let url='http://www.ryaonet.cn/index.php/api/Api/do_zhuces';
	  let params={'truename':this.truename,'telphone':this.telphone,'password':this.password,'repassword':this.repassword};
	let rest=NetUtil.postJSON(url,params,function(result){
		this.succs(result);
	})
	}
}

const styles = StyleSheet.create({
  dakuang:{
   
    alignItems:'center',
  },
  
  kong2:{
     width:180,
  },
 
  tu:{
    width:385,
     height:580,

  },
  txkuang:{   
    marginTop:20,
    alignItems:"center",
    width:200,
    height:180,
    
    borderColor:'#FFFFFF',
    justifyContent:'center', 
  alignItems:'center',

  },
  title:{
    color:'#00FA9A',
    fontWeight:'500',
    fontSize:24,
    opacity:0.7,
    marginTop:5,

  },
  touxiang:{
     borderRadius:50,
     width:100,
     height:100,
  },
  ding:{
    width:10,
    height:40,

  },
  yonghukuang:{
    marginTop:5,
    backgroundColor:'#DCDCDC',
    width:300,
    height:40,
    borderRadius:20,
    opacity:0.75,
    flexDirection:'row',
 },
 zhenyonghu:{
  width:250,
  borderRadius:20,
  

 },
 comment:{
  width:300,
  height:40,
  marginTop:30,
  backgroundColor:'#40E0D0',
  borderRadius:20,
  justifyContent:'center', 
  alignItems:'center',
  opacity:0.8,
 },
 comments:{
  width:300,
  height:40,
  marginTop:10,
  backgroundColor:'#87CEEB',
  borderRadius:20,
  justifyContent:'center', 
  alignItems:'center',
  opacity:0.8,
 },
 dl:{
    color:'#FFFFFF',
    fontWeight:'500',
     },
xia:{
  color:'#000000',
  fontWeight:'500',
  opacity:0.7,
},
xiamian:{

  alignItems:'center',
  flexDirection:'row',
  justifyContent:'center',
},
xia:{

  margin:20,
  color:'#000',
  
},
     

  
 
});

