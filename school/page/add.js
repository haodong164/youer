/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *naoxiu
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Alert,
  ToastAndroid,
  NativeModules
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import ImagePicker from 'react-native-image-picker';
import NetUtil from './NetUtil';
import jilu from './jilu';
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



export default class add extends Component {
	constructor(props){
		super(props);
		this.intro='';
		this.userid='';
		this.type='';
		this.state={
			telphone:'',
			identity:'',
			imageurl:'http://www.ryaonet.cn/public/Uploads/photos/add.png',
			imgurl:'',
		}
	};
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
	back = () => {
		this.props.navigator.pop()
	}
	fabu=()=>{
		// alert(this.state.telphone);
		// alert(this.content);
		// alert(this.state.imgurl);
	  succs=(res)=>{
		  if(res=='succ'){
			this.props.navigator.push({
			name: 'jilu',
			component: jilu
		});
		  }if(res=='fail'){
			  alert('失败');
		  }if(res=='kong'){
			  alert('不为空');
		  }
	  }
	let url='http://www.ryaonet.cn/index.php/api/Api/fabiao';
    let datas={'content':this.content,'address':this.address,'imgurl':this.state.imgurl,'tel':this.state.telphone,'title':this.title,'identity':this.state.identity};
	let rest=NetUtil.postJSON(url,datas,function(result){
		// alert(result);
		this.succs(result);
		})
	}
  render() {
    return (
      <View style={{width:'100%',height:'100%',backgroundColor:'#ececec',alignItems:'center'}}>
        <View style={styles.tou}>
		   <Text onPress={this.back} style={{marginTop:20,fontSize:18,color:'#fff',flex:1}}>取消</Text>
		   <Text onPress={this.fabu}  style={{marginTop:20,fontSize:18,color:'#fff',flex:1,paddingRight:10,textAlign:'right'}}>发表</Text>
	   </View>
		
		{/*标题*/}
		<View style={{width:'90%',flexDirection:'row',alignItems:'center',backgroundColor:'#fff',marginBottom:2}}>
			<Text style={{marginLeft:'5%',width:'10%',fontSize:16,fontWeight:'bold'}}>标&nbsp;&nbsp;&nbsp;题</Text>
			<TextInput onChangeText={(text) => {this.title=text}} multiline={true} style={{width:'90%'}} placeholder="请输入..." underlineColorAndroid='transparent'></TextInput>
		</View>
        {/*地点*/}
		<View style={{width:'90%',flexDirection:'row',alignItems:'center',backgroundColor:'#fff',marginBottom:2}}>
			<Text style={{marginLeft:'5%',width:'10%',fontSize:16,fontWeight:'bold'}}>地&nbsp;&nbsp;&nbsp;点</Text>
			<TextInput onChangeText={(text) => {this.address=text}} multiline={true} style={{width:'80%'}} placeholder="请输入..." underlineColorAndroid='transparent'></TextInput>
		</View>
        {/*内容*/}
        <View style={{width:'90%',flexDirection:'row',alignItems:'center',backgroundColor:'#fff',marginBottom:2}}>
            <TextInput onChangeText={(text) => {this.content=text}} style={{fontSize:14,height:150,textAlignVertical: 'top',width:'80%'}} multiline={true} placeholderTextColor='#b0b0b0'  placeholder="请输入内容" underlineColorAndroid='transparent'></TextInput>
        </View>

        {/*图片*/}
        <View style={{width:'90%',backgroundColor:'#fff',marginBottom:2}}>
            <View style={{paddingTop:12,paddingLeft:12}}>
                <Text>来张图片吧：</Text>
            </View>
            <View style={{flexDirection:'row',paddingTop:6,paddingBottom:10,}}>
				<TouchableOpacity activeOpacity={.8} onPress={this.upload}>
					<Image source={{uri:this.state.imageurl}} style={{width:83,height:83,marginRight:20,}}/>
				</TouchableOpacity>
            </View>
        </View>

	  {/*图片路经*/}
		  {/*<View>
			<Text>{this.state.imgurl}</Text>
			</View>*/}
		
		
      </View>
	  
	  

    );
  }

}

const styles = StyleSheet.create({
    views:{
        backgroundColor:'#FFF',
        marginBottom:10,
        paddingLeft:15,
        paddingRight:15,
        width:'90%',
    },
    titleview:{
        paddingTop:15,
        paddingBottom:15,
    },
    backimg:{
        width:13,
        height:23,
        position:'absolute',
        top:13,
        zIndex:99,

    },
    title:{
      fontSize:16,
      textAlign:'center',
    },
    dataview:{
      flexDirection:'row',
      paddingTop:12,
      paddingBottom:12,
      borderBottomWidth:1,
      borderColor:'#f0f0f0',
    },
    ico1:{
        width:8,
        height:16,
        marginLeft:17,
    },
    userphoto:{
        width:21,
        height:21,
        marginRight:13,
    },
    dataname:{
        fontSize:14,
    },
    datatel:{
        position:'absolute',
        right:0,
        top:12,
    },
    typeview:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:12,
        paddingBottom:12,
        borderBottomWidth:1,
        borderColor:'#f0f0f0',
    },
    type:{
       height:30,
    },
    radio:{
         width:'100%',
         flexDirection:'row',
         flexWrap:'wrap',
         marginBottom:5,
         marginTop:15,
    },
    content:{
        fontSize:14,
        height:150,
        textAlignVertical: 'top',
    },
	contents:{
        fontSize:14,
        height:50,
        textAlignVertical: 'top',
		borderWidth:1,
		borderColor:'#dcdcdc',
    },
    uploadview:{
        flexDirection:'row',
        paddingTop:6,
        paddingBottom:10,
    },
    bottomviews:{
        backgroundColor:'#FFF',
        marginBottom:10,
        paddingLeft:15,
        paddingRight:15,
        elevation: 2,
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    uploadphoto:{
        width:83,
        height:83,
        marginRight:20,
    },
    subBtn:{
        marginTop:5,
        marginBottom:10,
        backgroundColor:'#acc23b',
        borderRadius:5,
        width:'90%',
        height:40,
        alignItems:'center',
        justifyContent:'center',
    },
    subText:{
        color:'#fff',
        fontSize:15,
    },
    typetouch:{
        paddingLeft:22,
        paddingRight:22,
        paddingTop:6,
        paddingBottom:6,
        borderWidth:1,
        borderColor:'#acacac',
        borderRadius:3,
        marginLeft:12,
        marginBottom:12,
    },
    typetouchCurrent:{
        paddingLeft:22,
        paddingRight:22,
        paddingTop:6,
        paddingBottom:6,
        borderWidth:1,
        borderColor:'#aec054',
        borderRadius:3,
        marginLeft:10,
    },
    typetextCurrent:{
        color:'#aec054',
    },
    type:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:12,
        paddingBottom:12,
        borderBottomWidth:1,
        borderColor:'#f8f8f8',
        flexWrap:'wrap',
    },
  tou:{
	  paddingLeft:10,
	  flexDirection:'row',
	  borderBottomWidth:1,
	  borderColor:'#c0c0c0',
	  bottom:3,
	  backgroundColor:'#3fdab8',
	  height: 50,
  },

  quan:{
    backgroundColor:'#fffafa',
  },
  body:{
	  paddingLeft:10,
	  height:"50%",
	  borderColor:'#c0c0c0',
  },

  border:{
	  paddingLeft:5,
	  borderBottomWidth:1,
	  borderColor:'#c0c0c0',
	  marginTop:10,
	  marginLeft:10,
	  flexDirection:'row',
	  paddingLeft:5,
	  paddingRight:10,
	  width:360
  },

  photo:{
		marginTop:70,
		paddingLeft:3,

  },

  tu:{
		paddingLeft:271,
  },
  tut:{
		paddingLeft:300,
  },
  say:{
	  borderWidth:1,
	  width:80,
	  height:25,
	  marginLeft:100,
	  borderRadius:3,
	  borderColor:'#7cfc00',
	  backgroundColor:'#e0ffff',
	  alignItems:'center',
	  color:'#7cfc00',
	  borderRadius:5,
	  paddingLeft:25,
	  paddingTop:4,
  },
  sayy:{
	  borderWidth:1,
	  width:50,
	  height:25,
	  borderRadius:1,
	  borderColor:'#ffff00',
	  color:'#808080',
	  borderRadius:1,
	  paddingLeft:10,
	  paddingTop:4,
  },
  bottom:{
	   paddingLeft:10,
	   marginTop:10,
	   flexDirection:'row',
  },
});

