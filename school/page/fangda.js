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
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from 'react-native-scrollable-tab-view/DefaultTabBar';
import ImageViewer from 'react-native-image-zoom-viewer';
import NetUtil from './NetUtil';

const images = [{
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'}, 
  {url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'}, 
  {url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'}, 
  // {url:t},
  {url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
  
  }]


export default class fangda extends Component {
	constructor(props) {
	  super(props);
	  this.state = ({
	   id:this.props.wid,
	   userinfo:[],
	  });
	}
	componentWillMount(){
		let _this=this;
		let url="http://www.ryaonet.cn/index.php/api/Api/chakan";
		let parms={wid:this.state.id};
		NetUtil.postJSON(url,parms,function(result){
			_this.setState({
				userinfo:result,
			});
		});
	}
	houtui = () => {
		this.props.navigator.pop()
	}
	fangda=(wid)=>{
		const {navigator}=this.props;
			if (navigator) {
			  navigator.push({
				name:'fangda',
				component:fangda,
				params:{
				  wid:wid,
				}
			})
		}
	}

	
  render() {
    return (
      <View style={{flex:1}} visible={true} transparent={true}>
		  <ImageViewer imageUrls={[{
			url:'this.state.userinfo.photos'}, 
			  // {url:t},
			]}/>
		  
		  {/*<Image source={{uri:this.state.userinfo.photos}}/>*/}
				<Text>{this.state.userinfo.photos}</Text>
            </View>
    );
  }
}