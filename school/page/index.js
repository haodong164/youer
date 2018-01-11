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
  ImageBackground,
  TouchableHighlight,
  Alert
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';
import nav from './nav';
import zhuce from './zhuce';
import NetUtil from './NetUtil';
export default class index extends Component {
  constructor(props) {
    super(props);
    this.telphone = '';
    this.password = '';
  }
  componentWillMount(){

  }
  nav = () => {
    this.props.navigator.push({
      name: 'nav',
      component: nav
    });
  }
  zhuce = () => {
    this.props.navigator.push({
      name: 'zhuce',
      component: zhuce
    });
  }
  render() {
    return (

      <Image style={styles.tu} source={require('../img/9s.jpg')} > 

	  <View style={styles.dakuang}>
     
        <View style={styles.kong}></View>

        <View style={styles.txkuang}>
          <Image style={styles.touxiang} source={require('../img/deng4.jpg')} />
       </View>

       <View style={styles.yonghukuang}>
			<View>
			  <Image style={{width:30,height:30, marginTop:5,marginLeft:2,}} source={require('../img/t2.png')} />
		   </View>
		   <View style={styles.zhenyonghu}>
			<TextInput onChangeText={(text)=>{this.telphone=text}} underlineColorAndroid='transparent'  placeholder='手机号'/>
			</View>
		</View>
       <View style={styles.yonghukuang}>

       <View>
          <Image style={{width:28,height:28, marginTop:6,marginLeft:3, borderRadius:50,}} source={require('../img/t3ss.png')} />
       </View>

       <View style={styles.zhenyonghu}><TextInput onChangeText={(text)=>{this.password=text}} underlineColorAndroid='transparent' secureTextEntry={true} placeholder='密码'/></View></View>
<TouchableHighlight underlayColor='#40E0D0' style={styles.comment} onPress={this.dologin}>
        <View >
        
          <Text style={styles.dl}>登陆</Text>
        
        </View>
</TouchableHighlight>
        
      </View>
      </Image>
    );
  }
  dologin = () => {
    succs = (res) => {
      if (res.msg == 'succ') {
        storage.save({
          key: 'static', // 注意:请不要在key中使用_下划线符号!
          data: {
            telphone:res.info.telphone,
			userid:res.info.id,
            imageurl:res.info.photo,
			identity:res.info.identity
          },
          expires: null
        });
        const {
          navigator
		  } = this.props;
        if (navigator) {
          navigator.push({
          name: 'nav',
          component: nav,
          params: {
				    telphone: this.telphone,
          }
			  })
			}
      }
      if (res == 'kong') {
        Alert.alert(
          '提示',
          '请先登录'
        );
      }if (res == 'password kong') {
        Alert.alert(
          '提示',
          '请先输入密码'
        );
      }if (res == 'not find') {
        Alert.alert(
          '提示',
          '请输入正确手机号'
        );
      }if (res.msg == 'fail') {
        Alert.alert(
          '提示',
          '密码错误'
        );
      }
    }
    let url = 'http://www.ryaonet.cn/index.php/api/Api/do_login';
    let params = {
      'telphone': this.telphone,
      'password': this.password
    };
    let rest = NetUtil.postJSON(url, params, function(result) {
      this.succs(result);
    })
  }
}

const styles = StyleSheet.create({
  dakuang: {
    alignItems: 'center',
  },
  kong: {
    width: 285,
    height: 100,
  },
  kong2: {
    width: '50%',
  },
  title: {
    color: '#00FFFF',
    marginTop: 10,
    fontSize: 16,
    opacity: 0.55,
  },
  tu: {
    width: "100%",
    height: 780,

  },
  txkuang: {
    alignItems: "center",
    //width: 200,
    height: 100,

  },
  touxiang: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  ding: {
    width: 10,
    height: 40,

  },
  yonghukuang: {
    marginTop: 10,
    backgroundColor: '#fff',
    width: '70%',
    height: 40,
    borderRadius: 20,
    opacity: 0.55,
    flexDirection: 'row',
  },
  zhenyonghu: {
    width: 250,
    borderRadius: 20,
  },
  comment: {
    width: '70%',
    height: 40,
    marginTop: 10,
    backgroundColor: '#40E0D0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  dl: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  xia: {
    //color: '#000000',
	// marginLeft:'3%',
    fontWeight: '500',
    opacity: 0.7,
    margin: 20,
    color: '#FFFFFF',
  },
  xiamian: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
	marginLeft:'4%'
  },
});
