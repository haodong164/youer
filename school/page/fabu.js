import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Navigator from 'react-native-deprecated-custom-components';
import hudong from './hudong';
import nav from './nav';
import liuyan from './liuyan';
import NetUtil from './NetUtil';
import ImagePicker from 'react-native-image-picker';

import {
  PullList
} from 'react-native-pull';

var {
  width,
  height
} = Dimensions.get('window');
var photoOptions = {
  //底部弹出框选项
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从图库选择',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
}
export default class pinglun extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telphone: '',
      id: this.props.userid,
      nickname: 'no',
      pudata: 'no',
      content: 'no',
      userinfo: '',
	  identity:'',
      imageurl: 'http://www.ryaonet.cn/public/Uploads/photos/add.png',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2

      }),

    }
  }
  componentWillMount() {
    storage.load({
      key: 'static',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    }).then(ret => {
      this.setState({
        telphone: ret.telphone,
		identity:ret.identity,
      });
    })
  }
  fanhui = () => {
    this.props.navigator.pop();
  }
  upload = () => {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      if (response.didCancel) {
        return
      }
      let _this = this;
      let url = 'http://www.ryaonet.cn/api/Api/uploadimg';
      NetUtil.postImg(url, response, function(result) {
        _this.setState({
          // uploadfilepath:_this.state.uploadfilepath.concat(result)
          imageurl: result['imageurl'],
          imgurl: result['imgurl'],
        });

      });
    })
  }
  render() {
    return (
      <View style={styles.container}>
  

     <View style={styles.welcome}>
       <View style={styles.fanhui}>
			<Text onPress={this.fanhui} style={{color:'#fff', fontSize:20,}}>取消</Text>
		</View>
		<Text style={styles.zuixin} onPress={this.fabu}>发表</Text>
   </View>

    <View style={{width:width-20,}}>
<TextInput
        style={{height:45,
        borderWidth: 1,
		borderColor: '#dcdcdc',
		backgroundColor: '#fff',
		elevation: 1,
        marginTop:17,}}
        multiline={true}
        placeholder="给个标题吧..."
        underlineColorAndroid="transparent"
        onChangeText={(text) => {this.title=text}}
        />
<TextInput
          style={styles.shuru}
          textAlignVertical='top'
          placeholder="说点什么吧..."
          underlineColorAndroid="transparent"
          onChangeText={(text) => {this.nums=text}}
        
        />
<View style={styles.bottomviews}>
            <View style={{paddingTop:12}}><Text>来张图片吧：</Text></View>
                <View style={styles.uploadview}>
          <TouchableOpacity activeOpacity={.8} onPress={this.upload}>
            <Image source={{uri:this.state.imageurl}} style={styles.uploadphoto}/>
          </TouchableOpacity>
            </View>
        </View>
</View>
         

</View>

    );
  }
  fabu = () => {
    succs = (res) => {
      if (res == 'succ') {
        this.props.navigator.push({
          name: 'hudong',
          component: hudong
        });
      }
      if (res == 'fail') {
        alert('发表失败');
      }
      if (res == 'title not kong') {
        alert('标题不能为空');
      }
      if (res == 'content not kong') {
        alert('内容不能为空');
      }

    };
    // alert(this.state.telphone);
    let url = 'http://www.ryaonet.cn/index.php/api/Api/fabu';
    let params = {
      'nums': this.nums,
      'title': this.title,
      'identity': this.state.identity,
	  'tel': this.state.telphone,
	  'imgurl':this.state.imgurl,
    };
    let rest = NetUtil.postJSON(url, params, function(result) {
      this.succs(result);
    })
  }
}


const styles = StyleSheet.create({

  timu: {
    height: 30,
    width: 500,
    marginLeft: 10,
    fontSize: 20,
  },


  zhuyao: {
    height: 350,
    width: 280,


  },

  fabiao: {

    height: 40,
    width: 40,
    backgroundColor: '#dcdcdc',

    borderRadius: 5,

  },



  shuru: {
    elevation: 3,
    height: 230,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    marginTop: 10,
  },



  jiajia: {
    height: 40,
    width: 300,

  },



  fanhui: {
    height: 30,
    width: 100,
    marginLeft: '3%'
  },


  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },



  zuixin: {
    fontWeight: '300',
    fontSize: 20,

    marginRight: '3%',
    color: '#f0f8ff',
  },



  welcome: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#3fdab8',
    alignItems: 'center',
    justifyContent: 'space-between',
  },


  uploadphoto: {
    width: 83,
    height: 83,
    marginRight: 20,
  },
  bottomviews: {
    marginLeft: 2,
    backgroundColor: '#FFF',
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    elevation: 4,
    marginTop: 13,
    width: 115
  },
  uploadview: {
    flexDirection: 'row',
    paddingTop: 6,
    paddingBottom: 10,
  },

});


/*AppRegistry.registerComponent('pinglun', () => pinglun);*/