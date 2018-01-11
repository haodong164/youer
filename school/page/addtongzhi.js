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
import {
	Navigator
} from 'react-native-deprecated-custom-components';
import nav from './nav';
import tongzhi from './tongzhi';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';
export default class addtongzhi extends Component {
	constructor(props){
		super(props);
		this.state=({
			telphone:'',
		});
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
				identity:ret.identity
			});
		})
	}
	
	houtui = () => {
		this.props.navigator.pop()
	}
	fabutongzhi=()=>{
		// alert(this.state.telphone);
		// alert(this.content);
		// alert(this.state.imgurl);
	  succs=(res)=>{
		  if(res=='succ'){
			this.props.navigator.push({
			name: 'tongzhi',
			component: tongzhi
		});
		  }if(res=='fail'){
			  alert('失败');
		  }if(res=='title not kong'){
			  alert('标题不可以为空');
		  }if(res=='futitle not kong'){
			  alert('副标题不可以为空');
		  }if(res=='content not kong'){
			  alert('内容不可以为空');
		  }
	  }
	let url='http://www.ryaonet.cn/index.php/api/Api/fabutongzhi';
    let datas={'content':this.content,'tel':this.state.telphone,'title':this.title,'futitle':this.futitle};
	let rest=NetUtil.postJSON(url,datas,function(result){
		// alert(result);
		this.succs(result);
		})
	}
	render() {
		return (
			<View style={styles.container}>
				{/*头部*/}
				<View style={{width:'100%',flexDirection: 'row',paddingLeft: 10,height: 50,backgroundColor: '#3fdab8',alignItems: 'center'}}>
					<TouchableOpacity style={{width:'20%',}} onPress={this.houtui}>
						<Image source={require('../img/hotui.png')} style={{height: 23,width: 23,resizeMode: 'stretch',}}/>
					</TouchableOpacity>
		        	<View style={{alignItems:'center',width:'60%',}}>
		        		<Text style={{color:'#fff',fontSize:18,fontWeight:'bold',}}>发布通知</Text>
		        	</View>
					<TouchableOpacity style={{width:'20%',}} onPress={this.fabutongzhi}>
						<Text style={{marginRight:20,color:'#fff',fontSize:14,fontWeight:'bold',textAlign:'right'}}>完成</Text>
					</TouchableOpacity>
		        </View>
				{/*标题*/}
				<View style={{width:'90%',flexDirection:'row',alignItems:'center',backgroundColor:'#fff',marginBottom:2}}>
						<Text style={{marginLeft:'5%',width:'10%',fontSize:16,fontWeight:'bold'}}>标&nbsp;&nbsp;&nbsp;题</Text>
						<TextInput onChangeText={(text)=>{this.title=text}} multiline={true} style={{width:'80%'}} underlineColorAndroid='transparent'></TextInput>
					</View>
					
					{/*副标题*/}
					<View style={{width:'90%',marginBottom:3,flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
						<Text style={{marginLeft:'5%',width:'10%',fontSize:16,fontWeight:'bold'}}>副标题</Text>
						<TextInput onChangeText={(text) => {this.futitle=text}} multiline={true} style={{width:'80%'}} placeholder="请输入..." underlineColorAndroid='transparent'></TextInput>
					</View>
					{/*简介*/}
					<View style={{width:'90%',flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
						<Text style={{marginLeft:'5%',width:'10%',fontSize:16,fontWeight:'bold'}}>内&nbsp;&nbsp;&nbsp;容</Text>
						<TextInput onChangeText={(text)=>{this.content=text}} style={{fontSize:14,height:350,textAlignVertical: 'top',width:'80%'}} multiline={true} placeholderTextColor='#b0b0b0'  placeholder="请输入通知内容" underlineColorAndroid='transparent'></TextInput>
					</View>
		 </View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		height:'100%',
		alignItems:'center',
	},
	
});