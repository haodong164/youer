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
  Image
} from 'react-native';
import JPushModule from 'jpush-react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';

import zhuangtai from './page/zhuangtai';
const NoBackSwipe = {
  ...Navigator.SceneConfigs.HorizontalSwipeJump,
  gestures: {
    pop: {}
  }
};
export default class school extends Component {
  componentDidMount() {

      //---------------------------------android start---------------------------------

      JPushModule.addReceiveCustomMsgListener((message) => {

        //这是默认的通知消息

        //  this.setState({pushMsg:message});

      });

      JPushModule.addReceiveNotificationListener((map) => {

        //自定义推送的消息

        //console.log("alertContent: " + map.alertContent);

        //extra是可选配置上的附件字段

        //console.log("extras: " + map.extras);

        var message = JSON.parse(map.extras);

        this.storeDB(message); //我这里是把内容存在了数据库里面，你可以把这里的message放到state里面显示出来

        //这里面解析json数据，并存在数据库中，同时显示在通知栏上

      })

      //点击通知进入应用的主页，相当于跳转到制定的页面

      JPushModule.addReceiveOpenNotificationListener((map) => {

        //console.log("Opening notification!");

        this.props.navigator.replace({
          name: "dongtai",
          component: dongtai
        });

      })
    }
    //---------------------------------android end---------------------------------

  render() {
    let defaultName = 'zhuangtai';
    let defaultComponent = zhuangtai;
    return ( < Navigator initialRoute = {
        {
          name: defaultName,
          component: defaultComponent,
          configure: NoBackSwipe
        }
      }
      configureScene = {
        (route) => {
          return NoBackSwipe;
        }
      }
      renderScene = {
        (route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }
      }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
AppRegistry.registerComponent('school', () => school);