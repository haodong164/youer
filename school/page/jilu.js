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
  Image,
  TextInput,ListView,TouchableOpacity,
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import Carousel from 'react-native-carousel';
import jinei from './jinei';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';
import add from './add';
import nav from './nav';
export default class jilu extends Component {
constructor(props) {
  super(props);
  this.state = ({
  	isloadmore:false,
    currage:1,
    datalist:[],
    dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  });
}

  
	jinei =(wid)=>{
		const {navigator}=this.props;
			if (navigator) {
			  navigator.push({
				name:'jinei',
				component:jinei,
				params:{
				  wid:wid,
				}
			})
		}
	}
componentWillMount(){
  storage.load({
    key: 'jilu',
    autoSync: true,
  syncParams: {
    extraFetchOptions: {
    },
    someFlag: true,
  },
  }).then(ret => {
  	let _this=this;
   _this.setState({
   	datalist:listdata,
          dataSource:_this.state.dataSource.cloneWithRows(ret.listdata),
      });
  }).catch(err => {

  let _this=this;
  let url="http://www.ryaonet.cn/index.php/api/Api/jilu";
  let parms='currage=1';
    NetUtil.postJSON(url,parms,function(result){
      _this.setState({
          dataSource:_this.state.dataSource.cloneWithRows(result),
      });
    storage.save({
    key: 'jilu',  // 注意:请不要在key中使用_下划线符号!
    data: { 
      listdata:result,
    },
    expires: null
  		});
    });
  })
}
onPullRelease=(resolve)=> {
  let _this=this;
  let url="http://www.ryaonet.cn/index.php/api/Api/jilu";
  let parms='currage=1';
    NetUtil.postJSON(url,parms,function(result){
      _this.setState({
          dataSource:_this.state.dataSource.cloneWithRows(result),
      });
    storage.save({
    key: 'jilu',  // 注意:请不要在key中使用_下划线符号!
    data: {
      listdata:result,
    },
    expires: null
  		});
    });
  setTimeout(() => {
          resolve();
      }, 3000);
}
back= () => {
    this.props.navigator.push({
      name: 'nav',
      component: nav
    });
  }


add= () => {
    this.props.navigator.push({
      name: 'add',
      component: add
    });
  }
  render() {
    return (
      <View>

      

      <View style={styles.tou}>
	  
              <TouchableOpacity onPress={this.back} >
                <Image source={require('../img/hotui.png')} style={styles.houtui} />
              </TouchableOpacity>
		 
              <View style={{alignItems:'center',}}>
                  <Text style={{color:'#fff',fontSize:20,fontWeight:'bold',marginTop:15}}>成长记录</Text>
              </View>
			  
              <TouchableOpacity onPress={this.add}>
                <Image  source={require('../img/add.png')} style={styles.add} />
              </TouchableOpacity>
			  
</View>

<View style={{height:'91%'}}>
        <PullList 
				onEndReachedThreshold={10}
				onPullRelease={this.onPullRelease}
				dataSource={this.state.dataSource}
				renderRow={(rowData) =>  
	<TouchableOpacity onPress={this.jinei.bind(this,rowData.id)}>
		<View style={styles.top1}>
			<Image source={{uri:rowData.photos}} style={{width:200, height:100}} />
		<View style={{height:100}}>

		<View style={styles.wen}>
		  <Text style={styles.left}>
				<Image source={require('../img/j3.jpg')} style={{width:20,height:20}}/>
		  </Text>
		  <Text onPress={this.jinei.bind(this,rowData.id)} style={styles.right}>
				{rowData.pubdate}
		  </Text>
		</View>

		<View style={styles.wen}>
		  <Text style={styles.left}>
				<Image source={require('../img/j3.jpg')} style={{width:20,height:20}}/>
		  </Text>
		  <Text onPress={this.jinei.bind(this,rowData.id)} style={styles.right}>
				{rowData.truename}
		  </Text>
		</View>
			
		<View style={styles.wen}>
		  <Text style={styles.haha}> 
				<Image source={require('../img/j3.jpg')} style={{width:20,height:20}}/>
		  </Text>
		  <Text onPress={this.jinei.bind(this,rowData.id)} style={styles.right}>
				{rowData.address}
		  </Text>
		</View>


		  </View>
		  </View>
	  </TouchableOpacity>
	  }
    />
      </View>
     

     
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  top:{
    backgroundColor:'#3fdab8',
    width:500,
    height:60,
  },

  top1:{
     flexDirection:'row',
     paddingLeft:20,
     marginTop:10,
     borderBottomWidth:1,
	   paddingBottom: 10,
	   borderColor: '#D6D6D6',
  },

  title:{
    marginTop:-15,
    paddingRight:150,
    paddingLeft:160,
    fontWeight:'500',
    color:'#fff',
  },

  wen:{
	flexDirection:'row',
  },
 
    right:{
      marginTop:10,
      paddingLeft:10,
    },
    left:{
		marginTop:15,
        paddingLeft:'8%',
    },
    haha:{
      marginTop:15,
      paddingLeft:'8%',
    },
    
    center:{
		marginTop:10,
         flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    },

    body:{
		paddingLeft:10,
		paddingRight:30,
		borderWidth:1,
		height:30,
		width:120,
		borderRadius:5,

    },
    zi:{
		marginTop:10,
		paddingRight:10,
		paddingLeft:10,
		fontWeight:'500',
		color:'#fff',
    },

    tou:{
		justifyContent:'space-between',
		flexDirection: 'row', // 水平排布    
		height: 50,
		backgroundColor: '#3fdab8',
     // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
	},

  houtui: {
    marginLeft:10,
    marginTop:15,
    height: 23,
    width: 23,
    resizeMode: 'stretch',
  },

  add: {
    height:35,
    width:40,
    marginTop:10,
  },

  
});
