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
  ToastAndroid,Width,Dimensions
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import NetUtil from './NetUtil';
import jiaoshi from './jiaoshi';
import {PullList} from 'react-native-pull';
var {width,height} = Dimensions.get('window');
export default class sign extends Component {
constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state={
		datelist:[],
	  	userid:'',
	  	dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}),
	  	day:this.props.day,
	  	fid:'',
		identity:'',
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
				//alert(ret.userid);
			 	this.setState({
			 		userid:ret.userid,
					identity:ret.identity,
					telphone:ret.telphone,			
			 	});
				let _this=this;
			  	let url="http://www.ryaonet.cn/index.php/api/Api/lianbiao";
			  	let parms={userid:ret.userid,day:this.state.day,telphone:ret.telphone,identity:ret.identity};
			  	NetUtil.postJSON(url,parms,function(result){
			  	// alert(result);
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
   qiandao=()=>{
      this.props.navigator.push({
      name: 'jiaoshi',
      component: jiaoshi,
      params:{
           day:this.state.day,
         }
    });
 // const {navigator}=this.props;
 //      if (navigator) {
 //        navigator.push({
 //        name:'jiaoshi',
 //        component:jiaoshi,
 //        params:{
 //          sid:this.sid,
 //        }
 //      })
 //    }
  }

  render() {
    return (  
   
   <View style={{width:'100%',height:'100%',backgroundColor:'#EBEBEB',}}>
     <View style={{height:45,flexDirection:'row',backgroundColor:'#3fdab8',}}>
         <TouchableOpacity  onPress={this.fanhui}  >
      <Image source={require('../img/hotui.png')} style={{width:25,height:25, marginTop:10,marginLeft:10}} />
     </TouchableOpacity>

           <Text style={{paddingLeft:'30%',lineHeight:34,fontWeight:'800',textAlign:'center',fontSize:17,color:'#fff'}}>全班签到记录</Text>
           <TouchableOpacity style={this.state.identity=='教师'?null:{display:'none'}} onPress={this.qiandao}  >
          <View>
			  <Text style={{paddingLeft:'15%',lineHeight:34,fontWeight:'800',textAlign:'center',fontSize:17,color:'#fff'}}>教师签到</Text>
			</View>
           </TouchableOpacity>
     </View>  
     <View style={styles.title}>
       {/*<View style={styles.titles}><Text style={{fontSize:16}}>班级</Text></View>*/}
       <View style={styles.titles}><Text style={{fontSize:16}}>孩子照片</Text></View>
       <View style={styles.titles}><Text style={{fontSize:16}}>学生姓名</Text></View>
       <View style={styles.titles}><Text style={{fontSize:16}}>未签到原因</Text></View>
       <View style={styles.titles}><Text style={{fontSize:16}}>签到状态</Text></View>
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
       <View style={styles.names}><Text style={{fontSize:16}}>{rowData.yuan}</Text></View>
       <View style={styles.names}><Text style={{fontSize:16}}>{rowData.state=='1'?'已签到':'未签到'}</Text></View>
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
        width:width,
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




 
});
