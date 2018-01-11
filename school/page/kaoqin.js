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
  ToastAndroid,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';  //日历组件
import {LocaleConfig} from 'react-native-calendars';

import quanban from './quanban';
import NetUtil from './NetUtil';

LocaleConfig.locales['fr'] = {
  monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  monthNamesShort: ['一.','二.','三','四','五','六','七.','八','九.','十.','十一.','十二.'],
  dayNames: ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
  dayNamesShort: ['日','一','二','三','四','五','六']
};
LocaleConfig.defaultLocale = 'fr';
export default class sign extends Component {
constructor(props){
    super(props);
	this.state={
		datelist:[],
	  userid:'',
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
			 	this.setState({
			 		userid:ret.userid,
			 	});
				let _this=this;
				let url='http://www.ryaonet.cn/index.php/api/Api/sign_none_add';
				let parms={userid:this.state.userid};
				NetUtil.postJSON(url,parms,function(result){
					//alert(result)
					//alert(str=JSON.stringify(result));
				_this.setState({
				datelist:result,
				});
				})
			})
}

sign=()=>{
		    let _this=this;
			let url="http://www.ryaonet.cn/index.php/api/Api/sign_add";
			let parms={userid:this.state.userid};
			NetUtil.postJSON(url,parms,function(result){
				if(result['info']=='succ'){
					//Alert.alert('提示','签到成功');
					ToastAndroid.show('签到成功!', ToastAndroid.SHORT);
				}else if(result['info']=='error'){
					//Alert.alert('提示','今日已经签到,无需重复签到');
					ToastAndroid.show('今日已经签到,无需重复签到!', ToastAndroid.SHORT);
				}else if(result['info']=='cuowu'){
					//Alert.alert('提示','签到失败');
					ToastAndroid.show('签到失败!', ToastAndroid.SHORT);
				}
			});
}
selectday=(day)=>{
     // storage.save({
     //    key: 'static',  // 注意:请不要在key中使用_下划线符号!
     //    data: { 
     //            days:day.dateString,
     //    },
     //    expires: null
     //    });
  //alert(day.dateString);
    const {navigator}=this.props;
      if (navigator) {
        navigator.push({
        name:'quanban',
        component:quanban,
        params:{
          day:day.dateString,
        }
      })
    }
}





fanhui=()=>{
     this.props.navigator.pop();
   }
// jilu=()=>{
//     this.props.navigator.push({
//       name:'',
//       component:,
//     });
  //}
  render() {
    return (  
   
   <View style={{width:'100%',height:'100%',backgroundColor:'#fff',}}>
     <View style={{height:50,flexDirection:'row',alignItems:'center',backgroundColor:'#3fdab8',}}>
         <TouchableOpacity  onPress={this.fanhui}  >
          <Image source={require('../img/hotui.png')} style={{width:25,height:25,marginLeft:10}} />
        </TouchableOpacity>
           <Text style={{paddingLeft:'36%',fontWeight:'800',textAlign:'center',fontSize:20,color:'#fff'}}>签到</Text>
          {/* <Text onPress={this.jilu} style={{paddingLeft:'25%',lineHeight:32,color:'#fff'}}>全班记录</Text>*/}
     </View>  
	{/*<Calendar
		markedDates={this.state.datelist}
        style={styles.calendar}
		markingType={'interactive'} //simple
		hideExtraDays={true}
    /> */}
    

<Calendar 
    markedDates={this.state.datelist}
    style={styles.calendar}
    onDayPress={(day) =>this.selectday(day)}
    markingType={'interactive'} //simple
    hideExtraDays={true}
  // Specify style for calendar container element. Default = {}
    style={{
      borderWidth: 1,
      borderColor: 'gray',
      height: 350
    }}
  // Specify theme properties to override specific styles for calendar parts. Default = {}
  theme={{
    calendarBackground: '#ffffff',//日历背景颜色
    textSectionTitleColor: '#b6c1cd',//星期颜色
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',//当天日期的颜色
    dayTextColor: '#2d4150',//除当天外其余日期的颜色
    textDisabledColor: '#d9e1e8',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    //arrowColor: 'orange',
    monthTextColor: 'blue'//月份颜色
  }}
/>


   		{/*	<View style={{alignItems:'center',marginBottom:85}}>
                <TouchableOpacity onPress={this.sign} activeOpacity={1} style={{alignItems:'center',justifyContent:'center',width:'75%',height:40,backgroundColor:'#3fdab8',
                    borderRadius:8,}}>
                        <Text style={{fontSize:18,color:'#f9fbf1'}}>点击</Text>
                </TouchableOpacity> 					
    </View>*/}
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
    width:'14.3%',
    alignItems:'center',
    backgroundColor:'#00d2f5',
    justifyContent:'center',
  },
  titles:{
    width:'14.3%',
    height:'100%',
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#e8e8e8',
    borderWidth:1,
  },
  
  //日历样式

    calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
  marginBottom:20,
    borderColor: '#ccc',
    height: 350
  },
  text: {
    textAlign: 'center',
  borderRadius:10,
    padding: 10,
  color:'#fff',
    backgroundColor: '#00adf5',
  marginBottom:100,
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
}
});
