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
} from 'react-native';

import NetUtil from './NetUtil';
export default class fuwu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			telphone:this.props.telphone,
			userinfo:[],
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
				telphone:ret.telphone
			});
		let _this=this;
		let url="http://www.ryaonet.cn/index.php/api/Api/nav";
		let parms={'userid':ret.telphone};
		NetUtil.postJSON(url,parms,function(result){
			_this.setState({
				userinfo:result,
			});
		});
		})		
	}
	houtui = () => {
		this.props.navigator.pop()
	}
	render() {
		return (
			<View style={styles.container}>
				{/*头部*/}
		        <View style={styles.tou}>
			        <TouchableOpacity onPress={this.houtui}>
			        	<Image  source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
			        </TouchableOpacity>
			        	<View style={{alignItems:'center',flex:1,}}>
			        		<Text style={{color:'#fff',fontSize:20,fontWeight:'500'}}>服务详情</Text>
			        	</View>
		    	 </View>
				 <View style={styles.zhong}>
				 

					
					<View style={styles.ni}>
						<View>
							<Text style={{fontSize:16}}>姓名</Text>
						</View>
						<View>
							<Text style={{fontSize:14,color:'#d5d5df'}}>{this.state.userinfo.truename}</Text>
						</View>
					</View>
					<View style={styles.ni}>
						<View>
							<Text style={{fontSize:16}}>手机号</Text>
						</View>
						<View>
							<Text style={{fontSize:14,color:'#d5d5df'}}>{this.state.userinfo.telphone}</Text>
						</View>
					</View>
					
					<View style={styles.nei}>
						<View style={{width:'30%'}}>
							<Text style={{fontSize:16}}>服务内容 :       </Text>
						</View>
						<View style={{width:'70%'}}>
							<Text style={{fontSize:14,color:'#d5d5df'}}>
							   欢迎来到智慧幼儿园，我们会以最先进的技术来服务大家。</Text>
						</View>
					</View>
					
					<View style={styles.ni}>
						<View>
							<Text style={{fontSize:16}}>服务开始日期 ： </Text>
						</View>
						<View>
							<Text style={{fontSize:14,color:'#d5d5df'}}>{this.state.userinfo.intotime}</Text>
						</View>
					</View>
					
					<View style={styles.ni}>
						<View>
							<Text style={{fontSize:16}}>服务截至日期 ： </Text>
						</View>
						<View>
							<Text style={{fontSize:14,color:'#d5d5df'}}>{this.state.userinfo.endtime}</Text>
						</View>
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
	zhong:{
		backgroundColor: '#fff',
	},
	xia:{
		width:null,
		height:100,
		flexDirection:'row',
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'#d5d5df',
		marginLeft:20,
		marginRight:20,
		justifyContent:'space-between',
	},
	ni:{
		flexDirection:'row',
		height:50,
		width:null,
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'#d5d5df',
		marginLeft:20,
		marginRight:20,
		justifyContent:'space-between',
	},
	nei:{
		width:null,
		height:70,
		flexDirection:'row',
		borderBottomWidth:1,
		borderColor:'#d5d5df',
		marginLeft:20,
		marginRight:20,
		marginTop:10,
	},
	liu:{
		width:70,
		height:70,
	},
});
