/**
 * Sample React Native App
 * https://github.com/facebook/react-native 

 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';

export default class zhouyi extends Component {
	constructor(props) {
		super(props);
		this.state=({
			dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		});
    }
    componentWillMount(){
        // alert('123');
		let _this=this;
		let url="http://www.ryaonet.cn/index.php/api/Api/richeng";
		let parms={userid:1};
		NetUtil.postJSON(url,parms,function(result){
			 
			_this.setState({
				userinfo:result,
				dataSource:_this.state.dataSource.cloneWithRows(result),
            });
		});
	}
  render() {
    return (
      <View style={styles.container}>

        <View style={{height:'100%',backgroundColor:'#EBEBEB'}}>
	   <ListView
			style={{flex:1,backgroundColor:'#EBEBEB'}}
			dataSource={this.state.dataSource}
			renderRow={(rowData) => 
              <View style={{marginLeft:20,marginRight:10,backgroundColor:'#EBEBEB',flex:1,marginTop:8,}}>
                <View style={{marginTop:10,backgroundColor:'#fff',marginLeft:10,marginRight:10,flex:1,}}>

                  <View style={{marginTop:10,borderBottomWidth:1,height:80,marginLeft:20,marginRight:5,flexDirection:'row'}}>
                    <View style={{height:69,}}>
                      <Text style={{marginTop:30,}}>{rowData.title}</Text>
                    </View>
					<View style={{height:69,}}>
			<Text style={{marginTop:30,marginLeft:'30%'}}>{rowData.starttime}-{rowData.endtime}</Text>
					</View>
                    <View style={{height:69,}}>
                      <Text style={{marginTop:30,}}>{rowData.content}</Text>
                    </View>
                  </View>
                </View>
              </View>
			}
		/>
	    </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width:'100%'
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
