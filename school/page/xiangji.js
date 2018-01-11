import React from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,NativeModules
} from 'react-native';
//import ImagePicker from 'react-native-image-picker';
var ImagePicker = NativeModules.ImageCropPicker;
export default class xiangji extends React.Component {
  state = {
    avatarSource: null,
    videoSource: null
  };
  pickSingle(crop,circular=false){
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: crop,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
    }).then(image=>{
      let sfsdf=this;
      let url="http://www.ryaonet.cn/index.php/api/Api/photo";
      let datas=new FormData();
      let file={uri:image.path,type:'multipart/form-data',name:'1.jpg'}
      datas.append("images",file);
      NetUtil.postimg(url,datas,function(result){
        sfsdf.setState({
          imageurl:result,
        });
      })
    }).catch(e => alert(e));

  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source
        });
      }
    });
  }
  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }
  	houtui = () => {
		this.props.navigator.pop()
	}

  render() {
    return (
      <View style={styles.container}>
	  	<View style={styles.tou}>
		    <TouchableOpacity onPress={this.houtui}>
		        <Image source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
		    </TouchableOpacity>
		    <View style={{alignItems:'center',flex:1,}}>
		        <Text style={{color:'#fff',fontSize:16,}}>照片</Text>
		    </View>
		</View>
		<View style={styles.yuan}>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>相机</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
		<TouchableOpacity onPress={() => this.pickSingle(true,true)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>相册中选取</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
		</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  yuan:{
	justifyContent:'center',
    alignItems:'center',
	marginTop:50
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  },
  	tou: {
		flexDirection: 'row', // 水平排布    
		paddingLeft: 10,
		height: 60,
		paddingRight: 37,
		backgroundColor: '#3fdab8',
		alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
	},
	houtui: {
		height: 23,
		width: 23,
		resizeMode: 'stretch',
	},

});