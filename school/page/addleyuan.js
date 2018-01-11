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
  Linking,
  TouchableNativeFeedback
} from 'react-native';
import {
	Navigator
} from 'react-native-deprecated-custom-components';
import nav from './nav';
import leyuan from './leyuan';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';
import ImagePicker from 'react-native-image-picker';
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
export default class addleyuan extends Component {
	constructor(props){
    super(props);
    this.state={
			imageurl:'http://www.ryaonet.cn/public/Uploads/failmy/fengmian.jpg',
			imgurl:'',
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
	fabuleyuan=()=>{
	  succs=(res)=>{
		  if(res=='succ'){
			this.props.navigator.push({
			name: 'leyuan',
			component: leyuan
		});
		  }if(res=='fail'){
			  alert('失败');
		  }if(res=='title not kong'){
			  alert('标题不可以为空');
		  }if(res=='type not kong'){
			  alert('类型不可以为空');
		  }if(res=='content not kong'){
			  alert('内容不可以为空');
		  }
	  }
	let url='http://www.ryaonet.cn/index.php/api/Api/fabuleyuan';
    let datas="content="+this.content+"&tel="+this.state.telphone+"&title="+this.title+"&futitle="+this.futitle+"&type="+this.type;
	let rest=NetUtil.postForm(url,datas,function(result){
		// alert(result);
		this.succs(result);
		})
	}
	upload=()=>{
        ImagePicker.showImagePicker(photoOptions,(response) =>{
        if (response.didCancel){
            return
        }
            let _this=this;
            let url='http://www.ryaonet.cn/api/Api/uploadimg';
            NetUtil.postImg(url,response,function(result){
                _this.setState({
                    // uploadfilepath:_this.state.uploadfilepath.concat(result)
					imageurl:result['imageurl'],
					imgurl:result['imgurl'],
                });
                
            });
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
		        		<Text style={{color:'#fff',fontSize:18,fontWeight:'bold',}}>发布乐园</Text>
		        	</View>
					<TouchableOpacity style={{width:'20%',}} onPress={this.fabuleyuan}>
						<Text style={{marginRight:20,color:'#fff',fontSize:14,fontWeight:'bold',textAlign:'right'}}>完成</Text>
					</TouchableOpacity>
		        </View>
				
				<ScrollView style={{width:'100%'}}>
				<View style={{width:'100%',alignItems:'center'}}>
				
					{/*图片*/}
					<View style={{width:'90%',marginLeft:10,marginRight:10,height:200,alignItems:'center',marginBottom:5}}>
						<TouchableNativeFeedback onPress={this.upload}>
							<Image source={{uri:this.state.imageurl}} style={{height:200,width:'100%',}}/>
						</TouchableNativeFeedback>
					</View>
					
					{/*标题*/}
					<View style={{width:'90%',flexDirection:'row',alignItems:'center',backgroundColor:'#fff',marginBottom:2}}>
						<Text style={{marginLeft:'5%',width:'10%',fontSize:16,fontWeight:'bold'}}>标&nbsp;&nbsp;&nbsp;题</Text>
						<TextInput onChangeText={(text) => {this.title=text}} multiline={true} style={{width:'80%'}} placeholder="请输入..." underlineColorAndroid='transparent'></TextInput>
					</View>
					
					{/*类型*/}
					<View style={{width:'90%',marginBottom:3,flexDirection:'row',alignItems:'center',backgroundColor:'#fff'}}>
						<Text style={{marginLeft:'5%',width:'10%',fontSize:16,fontWeight:'bold'}}>类型</Text>
						<TextInput onChangeText={(text) => {this.type=text}} multiline={true} style={{width:'80%'}} placeholder="请输入类型..." underlineColorAndroid='transparent'></TextInput>
					</View>
					{/*简介*/}
					<View style={{width:'90%',flexDirection:'row',backgroundColor:'#fff'}}>
						<Text style={{marginLeft:'5%',marginTop:7,width:'10%',fontSize:16,fontWeight:'bold'}}>内&nbsp;&nbsp;&nbsp;容</Text>
						<TextInput onChangeText={(text) => {this.content=text}} style={{fontSize:14,height:350,textAlignVertical: 'top',width:'80%'}} multiline={true} placeholderTextColor='#b0b0b0'  placeholder="请输入内容" underlineColorAndroid='transparent'></TextInput>
					</View>
				</View>
				</ScrollView>
				
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