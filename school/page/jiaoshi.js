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
  ListView,
  TouchableOpacity,
  Alert,
  ToastAndroid,Width,Dimensions,TextInput,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';
var {width,height} = Dimensions.get('window');
export default class sign extends Component {
constructor(props){
    super(props);
    this.yuanyin = '';

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state={
		datelist:[],
	  	userid:'',
	  	dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}),
	  	day:this.props.day,
	  	days:'',
    };
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
			}).then(ret =>{	
				//alert(ret.days);
			 	this.setState({
			 		userid:ret.userid,
					days:ret.days,
					identity:ret.identity,
					telphone:ret.telphone,
			 	});
				let _this=this;
			  	let url="http://www.ryaonet.cn/index.php/api/Api/lianbiao";
			  	let parms={userid:ret.userid,day:this.state.day,telphone:ret.telphone,identity:ret.identity,};
			  	NetUtil.postJSON(url,parms,function(result){
			  	//alert(result);
			 	//str=JSON.stringify(result);
				//alert(str);
				_this.setState({
						dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				
		   });

			})
}



fanhui=()=>{
     this.props.navigator.pop();
   }
dianji=(Rid)=>{
	if(this.yuanyin==''){
		let url="http://www.ryaonet.cn/index.php/api/Api/jqiandao";
		let params={day:this.state.day,id:Rid};
		let rest=NetUtil.postJSON(url,params,function(result){
		this.succs(result);
  })
	}else{
		
		let url="http://www.ryaonet.cn/index.php/api/Api/jqiandao";
		let params={day:this.state.day,id:Rid,reason:this.yuanyin};
  	let rest=NetUtil.postJSON(url,params,function(result){
		this.succs(result);
  })
	}

	
 succs=(res)=>{
      if(res=='succ'){
      	 Alert.alert(
        	'提示',
        	'签到成功',
        	[{text: '取消'}]
      	) 
      }
      if(res=='fail'){
		  Alert.alert(
        	'提示',
        	'已签到，无需重复',
        	[{text: '取消'}]
      	)
      }if(res=='insert succ'){
		  Alert.alert(
        	'提示',
        	'签到成功',
        	[{text: '取消'}]
      	)
	  }
	if(res=='insert fail'){
		Alert.alert(
        	'提示',
        	'已签到，无需重复',
        	[{text: '取消'}]
      	)
      }
      if(res=='yi qian'){
		  Alert.alert(
        	'提示',
        	'已签到，无需重复',
        	[{text: '取消'}]
      	)
      }
    }

    
   }

  render() {
    return (  
   
   <View style={{width:'100%',height:'100%',backgroundColor:'#EBEBEB',}}>
     <View style={{height:45,flexDirection:'row',backgroundColor:'#3fdab8',}}>
         <TouchableOpacity  onPress={this.fanhui}  >
      <Image source={require('../img/hotui.png')} style={{width:25,height:25, marginTop:10,marginLeft:10}} />
     </TouchableOpacity>

           <Text style={{paddingLeft:'30%',lineHeight:34,fontWeight:'800',textAlign:'center',fontSize:17,color:'#fff'}}>全班签到</Text>
   
     </View>  
     <View style={styles.title}>
       {/*<View style={styles.titles}><Text style={{fontSize:16}}>班级</Text></View>*/}
       <View style={styles.titles}><Text style={{fontSize:16}}>孩子照片</Text></View>
       <View style={styles.titles}><Text style={{fontSize:16}}>学生姓名</Text></View>
       <View style={styles.titles}><Text style={{fontSize:16}}>未签到原因</Text></View>
       <View style={styles.titles}><Text style={{fontSize:16}}>点击签到</Text></View>
    </View>
  
    <View style={{height:'90%',backgroundColor:'#EBEBEB'}}>
 	 <ListView
 	 
      dataSource={this.state.dataSource}
      renderRow={(rowData) =>
        <View style={styles.content}>
        <View style={styles.names}>
        
        <View style={{width:'100%',height:'100%',alignItems: 'center',justifyContent:'center',}}>
        <Image source={{uri:rowData.studentphoto}} style={{width:75,height:75,borderRadius: 100,borderWidth:2, borderColor:'#fff'}} />
        </View>
		
				</View>
       {/*<View style={styles.names}><Text style={{fontSize:16}}>{rowData.ban}</Text></View>*/}
       <View style={styles.names}><Text style={{fontSize:16}}>{rowData.sname}</Text></View>    
        <View style={styles.names}><TextInput style={{fontSize:16,borderBottomWidth:1,width:100,}} onChangeText={(text)=>{this.yuanyin=text}} underlineColorAndroid='transparent'/></View>
       <TouchableOpacity style={styles.namess}  onPress={this.dianji.bind(this,rowData.id)}>
       <View style={styles.names}><Text style={{fontSize:10}}>签到提交</Text></View>
       </TouchableOpacity>
    </View>

                 }
    />


	</View>



    

  </View>
    );
  }
}
const styles = StyleSheet.create({

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
	title:{
		// 屏幕宽度
        width:'100%',
		flexDirection: 'row', // 水平排布
		alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
		justifyContent:'center',
		
	},
	titles:{
		width:'25%',
		height:35,
		justifyContent:'center',
		alignItems: 'center',
		backgroundColor:'#fff',


	
	},
	content:{
		width:width,
		flexDirection: 'row', // 水平排布
		alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
		justifyContent:'center',
		


	},
	name:{
		width:'100%',
		height:90,
		borderColor:'#fff',
		alignItems: 'center',
		justifyContent:'center',
		
},
	names:{
		width:'25%',
		height:120,
		
		alignItems: 'center',
		justifyContent:'center',
		marginTop:5,
		backgroundColor:'#fff',
},
	namess:{
		width:'30%',
		height:120,	
		alignItems: 'center',
		justifyContent:'center',
		marginTop:5,
		backgroundColor:'#fff',
},






 
});
