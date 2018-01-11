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
  Image,TouchableOpacity
} from 'react-native';
import {StackNavigator, TabNavigator} from "react-navigation";
import {Navigator} from 'react-native-deprecated-custom-components';
// import TuijianPage from './TuijianPage';
// import DingyuePage from './DingyuePage';
// import BiaoqianPage from './BiaoqianPage';
import zhouyi from './zhouyi';
import zhouer from './zhouer';
import zhousan from './zhousan';
import zhousi from './zhousi';
import zhouwu from './zhouwu';
import zhouliu from './zhouliu';
import zhoumo from './zhoumo';
// 注册tabs
const Tabs = TabNavigator({
    zhouyi: {
        screen: zhouyi,
        navigationOptions: {  // 也可以写在组件的static navigationOptions内
						tabBarLabel: '周一',  //icon: ({tintColor}) => (<Image source={require('./app/images/home.png')} style={[{tintColor: tintColor},styles.icon]}/>),          
        }
    },
    zhouer: {
        screen: zhouer,
        navigationOptions: {
            tabBarLabel: '周二',
        }
    },
    zhousan: {
        screen: zhousan,
        navigationOptions: {
            tabBarLabel: '周三',
        }
		},
		zhousi: {
        screen: zhousi,
        navigationOptions: {
            tabBarLabel: '周四',          
        }
		},
			zhouwu: {
        screen: zhouwu,
        navigationOptions: {
            tabBarLabel: '周五',          
        }
		},
		zhouliu: {
        screen: zhouliu,
        navigationOptions: {
            tabBarLabel: '周六',         
        }
		},
		zhoumo: {
        screen: zhoumo,
        navigationOptions: {
            tabBarLabel: '周末',         
        }
    },
	},
	{
		swipeEnabled: true,
		tabBarOptions:{
			activeTintColor: '#1ebba6',//选中的颜色
            inactiveTintColor:'#000',//未选中的颜色
            indicatorStyle: {
              height: 2,  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
              backgroundColor:'#1ebba6',
          },
        style:{
					backgroundColor:'#f4f1ee',
					height:50,
				},
				labelStyle: {
					fontSize:14, // 文字大小
					fontWeight:'bold',
					marginTop:-5
          },
      },
    },
);

export default class richeng extends Component {
houtui = () => {
		this.props.navigator.pop()
	}
  render() {
    return (
        <View style={styles.title}>
					{/*头部*/}
          <View style={styles.top}>
						<TouchableOpacity style={{width:'20%'}} onPress={this.houtui}>
							<Image style={{height: 23,width: 23,resizeMode: 'stretch',marginLeft:10}} source={require('../img/hotui.png')}/> 
						</TouchableOpacity>
						<View style={{width:'60%'}}>
							<Text style={{fontSize:20,color:'#fff',textAlign: 'center'}}>
								课程表
							</Text>
						</View>
          </View>
     <Tabs/>
        </View>   
    );
  }
  
}

const styles = StyleSheet.create({
body:{
  width:'100%',
  height:'100%',

},
title:{
  width:'100%',
  height:'100%',
  
},
top:{
  width:'100%',
  height:50,
  backgroundColor:'#3fdab8',
  flexDirection:'row',
  alignItems:'center'
}

});