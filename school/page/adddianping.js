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
	ScrollView,	
	ListView
} from 'react-native';
import Carousel from 'react-native-carousel';
import {Navigator} from 'react-native-deprecated-custom-components';
import {PullList} from 'react-native-pull';
import ImagePicker from 'react-native-image-picker';
import NetUtil from './NetUtil';
import pingjia from './pingjia'
var photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'从图库选择',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
    skipBackup: true,
    path:'images'
    }
}
export default class adddianping extends Component {
	constructor(props){
    super(props);
    this.state={
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
				identity:ret.identity
			});
		})
	}
	
	houtui = () => {
		this.props.navigator.pop()
	}
	fabudianping=()=>{
		// alert(this.state.telphone);
		// alert(this.content);
		// alert(this.state.imgurl);
	  succs=(res)=>{
		  if(res=='succ'){
			this.props.navigator.push({
			name: 'pingjia',
			component: pingjia
		});
		  }if(res=='fail'){
			  alert('失败');
		  }if(res=='name not kong'){
			  alert('姓名不可以为空');
		  }if(res=='content not kong'){
			  alert('内容不可以为空');
		  }
	  }
	let url='http://www.ryaonet.cn/index.php/api/Api/fabudianping';
    let datas={'content':this.content,'name':this.name,'tel':this.state.telphone};
	let rest=NetUtil.postJSON(url,datas,function(result){
		// alert(result);
		this.succs(result);
		})
	}
	render() {
		return (
			<View style={{backgroundColor:'#ededed',height:'100%',alignItems:'center'}}>
			
				{/*头部*/}
				<View style={{width:'100%',flexDirection: 'row',paddingLeft: 10,height: 50,backgroundColor: '#3fdab8',alignItems: 'center'}}>
					<TouchableOpacity style={{width:'20%',}} onPress={this.houtui}>
						<Image source={require('../img/hotui.png')} style={{height: 23,width: 23,resizeMode: 'stretch',}}/>
					</TouchableOpacity>
		        	<View style={{alignItems:'center',width:'60%',}}>
		        		<Text style={{color:'#fff',fontSize:18,fontWeight:'bold',}}>发布动态</Text>
		        	</View>
					<TouchableOpacity style={{width:'20%',}} onPress={this.fabudianping}>
						<Text style={{marginRight:20,color:'#fff',fontSize:14,fontWeight:'bold',textAlign:'right'}}>完成</Text>
					</TouchableOpacity>
		        </View>
			<ScrollView style={{width:'100%'}}>
				<View style={{width:'100%',alignItems:'center'}}>
				
					{/*点评对象*/}
					<View style={{width:'90%',flexDirection:'row',alignItems:'center',backgroundColor:'#fff',marginBottom:2}}>
						<Text style={{marginLeft:'5%',width:'15%',fontSize:16}}>点评对象</Text>
						<TextInput onChangeText={(text) => {this.name=text}} multiline={true} style={{width:'80%'}} placeholder="请输入学生姓名" underlineColorAndroid='transparent'></TextInput>
					</View>
					
					{/*点评内容*/}
					<View style={{width:'90%',flexDirection:'row',backgroundColor:'#fff'}}>
						<Text style={{marginLeft:'5%',marginTop:7,width:'15%',fontSize:16}}>点评内容</Text>
						<TextInput onChangeText={(text) => {this.content=text}} style={{fontSize:14,height:350,textAlignVertical: 'top',width:'80%'}} multiline={true} placeholderTextColor='#b0b0b0'  placeholder="请输入内容" underlineColorAndroid='transparent'></TextInput>
					</View>
				</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	

	
});

//AppRegistry.registerComponent('school', () => school);
