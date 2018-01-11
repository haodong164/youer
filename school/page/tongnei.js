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
  TextInput,
  ListView,
  TouchableOpacity,
  Dimensions,
  WebView
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';
import Carousel from 'react-native-carousel';
import NetUtil from './NetUtil';
//获取设备的宽度和高度
var {    
  height: deviceHeight,
      width: deviceWidth
} = Dimensions.get('window');

export default class text extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      userinfo: [],
      id: this.props.wid,
    });
  }
  componentWillMount() {
    let _this = this;
    let url = "http://www.ryaonet.cn/index.php/api/Api/tongnei";
    let parms = {
      userid: this.state.id
    };
    NetUtil.postJSON(url, parms, function(result) {
      _this.setState({
        userinfo: result,
      });
    });
  }
  back = () => {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={{flex:1}}>

          <View style={styles.tou}>
              <TouchableOpacity onPress={this.back}>
                <Image  source={require('../img/hotui.png')} style={styles.houtui} onPress={this.back}/>
              </TouchableOpacity>
                <View style={{alignItems:'center',flex:1,}}>
                  <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>通知</Text>
                </View>
           </View>
      
		      <View style={{flex:1}}>  
            <View style={{marginTop:5}}>
              <Text style={{textAlign:'center',fontSize:20}}>{this.state.userinfo.title}</Text>
            </View>
              <WebView style={styles.webview_style}  
                source={{html:this.state.userinfo.content}} 
                startInLoadingState={true}  
                domStorageEnabled={true}  
                javaScriptEnabled={true}  
                >
              </WebView>  
          </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#3fdab8',
    width: 500,
    height: 60,
  },
  top1: {
    flexDirection: 'row',
    marginTop: 5,
    paddingBottom: 10,
    borderColor: '#D6D6D6',
  },
  title: {
    marginTop: -15,
    paddingRight: 150,
    paddingLeft: 160,
    fontWeight: '500',
    color: '#fff',
  },
  right: {
    marginTop: 10,
    paddingLeft: 20,
  },
  center: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zi: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    alignItems: 'center',
    marginTop: -20,
    paddingRight: 290,
  },
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
  neirong: {
    marginTop: 5,
    marginLeft: 20,
    marginRight: 10
  },
  img: {
    flexDirection: 'row',
  },
  webview_style:{
    width:'100%',
  },
});