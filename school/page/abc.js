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
class CustomButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#a5a5a5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}
var i=0;
export default class baoxiu extends Component {
constructor(props){
    super(props);
	this.intro='';
	this.userid='';
	this.type='';
    this.state={
        username:'',
        telphone:'',
        userid:'',
        avatarSource1:require('./../img/add.png'),
        avatarSource2:require('./../img/add.png'),
        avatarSource3:require('./../img/add.png'),
        uploadfilepath:[],

    }
     this.onSelect = this.onSelect.bind(this);
}
onSelect(index, value){
         this.setState({
         textv:`${value}`,
         text: `Selected index: ${index} , value: ${value}`
         })
}
componentWillMount(){
    storage.load({
        key:'userdata'
    }).then(ret=>{
        let qiantel=ret.telphone.substr(0,3);
        let houtel=ret.telphone.substr(ret.telphone.length-4,4);
        this.setState({
            username:ret.truename,
            telphone:qiantel+'****'+houtel,
            userid:ret.userid,
        })
    }).catch(err=>{

    })
}
    index=()=>{
		 this.props.navigator.pop();
	};
    upload=()=>{
        ImagePicker.showImagePicker(photoOptions,(response) =>{
        if (response.didCancel){
            return
        }
            let _this=this;
            let url='http://www.ryaonet.cn/api/Api/uploadimg';
            NetUtil.postImg(url,response,function(result){
                _this.setState({
                    uploadfilepath:_this.state.uploadfilepath.concat(result)
                });
                if(i==1){
                    _this.setState({
                        avatarSource1:{uri:result}
                    })
                }
                if(i==2){
                    _this.setState({
                        avatarSource2:{uri:result}
                    })
                }
                if(i==3){
                    _this.setState({
                        avatarSource3:{uri:result}
                    })
                }
            });


        })

    }
  render() {
    return (
      <View style={{width:'100%',height:'100%',backgroundColor:'#ececec',}}>
<ScrollView>

        <View style={styles.views}>
            <View style={{height:50,}}></View>
        </View>

        <View style={styles.views}>
            <View style={styles.dataview}>
                <Image source={require('./../img/add.png')} style={styles.userphoto}/>
                <Text style={styles.dataname}>联系人：{this.state.username}</Text>
                <Text style={styles.datatel}>{this.state.telphone}</Text>
            </View>
            <View style={styles.dataview}>
                <Image source={require('./../img/add.png')} style={styles.userphoto}/>
                <Text style={styles.dataname}>山东临沂白鹭金岸-和风苑-23栋-2单元-40......</Text>
                <TouchableOpacity><Image source={require('./../img/add.png')} style={styles.ico1}/></TouchableOpacity>
            </View>
        </View>

        <View style={styles.views}>
            <View style={styles.typeview}>
                <Text style={styles.dataname}>选择类型：</Text>
            </View>
            
              </View>
        <View style={styles.views}>
            <View>
                <TextInput onChangeText={(text)=>{this.intro=text}} style={styles.content} multiline={true} placeholderTextColor='#b0b0b0'  placeholder="请简要描述一下您要告知我们的事情，以便于我们更换的处理（可能会产生费用，您需要自行承担！）..." underlineColorAndroid='transparent'></TextInput>
            </View>
        </View>


        <View style={styles.bottomviews}>
            <View style={{paddingTop:12}}><Text>有图有真相，上传图片：</Text></View>
                                                                                                                                                    <View style={styles.uploadview}>
        <TouchableOpacity activeOpacity={.8} onPress={this.upload}>
               <Image source={require('./../img/add.png')} style={styles.uploadphoto}/>
        </TouchableOpacity>

            <Image source={this.state.avatarSource1} style={styles.uploadphoto}/>
            <Image source={this.state.avatarSource2} style={styles.uploadphoto}/>
            <Image source={this.state.avatarSource3} style={styles.uploadphoto}/>
            </View>
        </View>
        <View style={{alignItems:'center',}}>
			 <TouchableOpacity activeOpacity={.9} onPress={this.p}  style={styles.subBtn}>
				<Text style={styles.subText}>填好了</Text>
		  </TouchableOpacity>
        </View>
</ScrollView>
      </View>
	  
    );
  }
  p=()=>{
      if(!this.state.textv){
            Alert.alert('温馨提示','请选择类型');
            return;
      }
      if(this.intro==''){
            Alert.alert('温馨提示','请描述您的问题 便于我们处理');
            return;
      }
      let _this=this;
      let url='http://www.guokaiyuan.cn/wyapi/Api/baoxiu';
      let params ='userid='+this.state.userid+'&intro='+this.intro+'&type='+this.state.textv+'&uploadfile='+this.state.uploadfilepath;
      NetUtil.postForm(url,params,function (result) {
        if(result=='succ'){
            Alert.alert('温馨提醒','提交成功，我们会尽快为您解决',
            [{text:'确定',onPress:()=>_this.props.navigator.pop()}]);
        }if(result=='fail'){
          Alert.alert('温馨提醒','提交失败 请稍后重试',
            [{text:'确定',onPress:()=>ToastAndroid.show('sorry~~',ToastAndroid.SHORT)}]);
        }
      })
  }


}

const styles = StyleSheet.create({
    views:{
        backgroundColor:'#FFF',
        marginBottom:10,
        paddingLeft:15,
        paddingRight:15,
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
        width:73,
        height:73,
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
});
