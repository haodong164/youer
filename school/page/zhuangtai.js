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
  View,BackHandler,ToastAndroid
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';
import nav from './nav';
import index from './index';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires:null,
  enableCache: true,
  //sync: require('./sync')  // 这个sync文件是要你自己写的
}) 
// window.storage = storage;
  
// 对于react native
 	global.storage = storage;
var lastBackTime = ""; //记录点击返回键的时间
export default class zhuangtai extends Component {
	
	
	
	componentWillMount(){
		// 读取
		storage.load({
			key: 'static',
			autoSync: true,
			syncInBackground: true,
			syncParams: {
				extraFetchOptions: {},
				someFlag: true,
			},
		}).then(ret => {
			this.props.navigator.push({
				name: 'nav',
				component: nav,
				params: {
					telphone: ret.telphone,
				}
			});
		}).catch(err => {
			this.props.navigator.push({
				name: 'index',
				component: index
			});
		})
		BackHandler.addEventListener('hardwareBackPress', () => {
			if (this.props.navigator) {
				let routes = this.props.navigator.getCurrentRoutes();
				let lastRoute = routes[routes.length - 1]; // 当前页面对应的route对象  
				if (lastRoute.onHardwareBackPress) { // 先执行route注册的事件  
					let flag = lastRoute.onHardwareBackPress();
					if (flag === false) { // 返回值为false就终止后续操作  
						return true;
					}
				}
				if (routes.length === 2) { // 在第一页了,2秒之内点击两次返回键，退出应用  
					if (this.lastBackPressed && (this.lastBackPressed + 2000) >= Date.now()) {
						return false;
					}
					// 此处可以根据情况实现 点2次就退出应用，或者弹出rn视图等  
					//记录点击返回键的时间  
					this.lastBackPressed = Date.now();
					ToastAndroid.show('再次点击退出应用', ToastAndroid.SHORT);

				} else {
					this.props.navigator.pop();
				}
			}
			return true;
		});

	}
	componentWillUnmount() {
		if (Platform.OS === 'android') {
			BackHandler.removeEventListener('hardwareBackPress', () => {});
		}
	}


  render() {
    return (
	  <View style={styles.dakuang}>
        <Text></Text>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
});
