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
  Linking
} from 'react-native';
import {
	Navigator
} from 'react-native-deprecated-custom-components';
import nav from './nav';
import tongnei from './tongnei';
import addtongzhi from './addtongzhi';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';
export default class tongzhi extends Component {
	constructor(props){
    super(props);
    this.state=({
		isloadmore:false,
		currage:1,
		datalist:[],
        dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    });
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
			 		userid:ret.userid,
			 		imageurl:ret.imageurl,
					identity:ret.identity,
			 	});
		  });	
	
  storage.load({
  key: 'lawlist',
  autoSync: true,
  syncInBackground: true,
  syncParams: {
	extraFetchOptions:{
	},
	someFlag: true,
    },
  }).then(ret => {
	  let _this=this;
		_this.setState({
        datalist:studata,
        dataSource:_this.state.dataSource.cloneWithRows(ret.studata),
      });	
  }).catch(err => {
	let _this=this;
	let url='http://www.ryaonet.cn/index.php/api/Api/tongzhi';
	let params="currage="+this.state.currage;
	 NetUtil.postForm(url,params,function(result){
		 _this.setState({
          datalist:result,
          dataSource:_this.state.dataSource.cloneWithRows(result),
        });
		storage.save({
			key: 'lawlist',
			data: { 
				studata:result,
			},
				expires: null,
		});		 
	 });	
  }) 
}	
pullrelease=(resolve)=>{
	let _this=this;
	let url='http://www.ryaonet.cn/index.php/api/Api/tongzhi';
	let params='currage=1';
	 NetUtil.postForm(url,params,function(result){
		 _this.setState({
			dataSource:_this.state.dataSource.cloneWithRows(result),
      });
		storage.save({
			key: 'lawlist',
			data: { 
				studata:result,
			},
				expires: null,
		});		 
	 });
	setTimeout(() => {
    resolve();
}, 3000);
}

  onloadmore=()=>{
    this.setState({
      isloadmore:true,
    });
    if(this.state.isloadmore)
    {
      let _this=this;
      let currage=this.state.currage+1;
      let url='http://www.ryaonet.cn/index.php/api/Api/tongzhi';
      let params="currage="+currage;
      NetUtil.postForm(url,params,function(result){
        _this.setState({
          isloadmore:false,
          currage:_this.state.currage+1,
          datalist:_this.state.datalist.concat(result),
          dataSource:_this.state.dataSource.cloneWithRows(_this.state.datalist.concat(result)),
        });
      })
      this.setState({
        isloadmore:false,
      });
    }
}
	
renderfooter=()=>{
  if(this.state.isloadmore){
  return(
  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
      <Text>正在加载中...</Text>
    </View>
  );
}else if(this.state.isloadmore==''){
	return (
		null
	);
}else if(this.state.isloadmore==''){
	return (
		null
	);
}else{
  return(
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
      <Text>加载完成</Text>
    </View>
  );
}
}
		rendowlist=(rowData)=>{
			let colors=rowData.status;

			return(

<TouchableOpacity onPress={this.tongnei.bind(this,rowData.id)}>
		        <View style={styles.kuang}>
		        	<View style={styles.tu}>
						{
					// style={this.state.tabIndex===0?styles.TabSelect:styles.TabUnSelect}
						}
		        		<Image source={require('../img/xlb.png')} style={[styles.laba,{tintColor:colors}]}/>
		        	</View>

		        	<View style={styles.xiaokuang}>
		        		<View style={styles.title}>
		        			<Text numberOfLines={2} style={{fontSize:13,color:'#555',width:'80%'}}>{rowData.title}</Text>
		        			<Text style={{fontSize:9,width:'30%'}}>{rowData.pubdate}</Text>
		        		</View>

		        		<View style={styles.time}>
										<Text numberOfLines={2} onPress={this.tongnei.bind(this,rowData.id)} style={{fontSize:12,color:'#999'}}>{rowData.futitle}</Text>
		        		</View>
		        	</View>
		        </View>
		        </TouchableOpacity>
				);
		}
	tongnei=(wid)=>{
		const {navigator}=this.props;
			if (navigator) {
			  navigator.push({
				name:'tongnei',
				component:tongnei,
				params:{
				  wid:wid,
				}
			})
		}
	}
	houtui = () => {
		this.props.navigator.pop()
	}
	addtongzhi = () => {
		this.props.navigator.push({
			name: 'addtongzhi',
			component: addtongzhi
		});
	}
	render() {
		return (
			<View style={styles.container}>
				{/*家长头部*/}
				<View style={styles.tou}>
			
					<TouchableOpacity style={{width:'20%',}} onPress={this.houtui}>
						<Image source={require('../img/hotui.png')} style={styles.houtui}/>
					</TouchableOpacity>
		        	<View style={{alignItems:'center',width:'60%',}}>
		        		<Text style={{color:'#fff',fontSize:20,fontWeight:'bold',}}>班级通知</Text>
		        	</View>
				
					{/*教师头部*/}

					<TouchableOpacity style={this.state.identity=='教师'?{width:'20%',}:{display:'none'}} onPress={this.addtongzhi}>
						<Image source={require('../img/add.png')} style={{width:40,height:35,marginLeft:'47%'}}/>
					</TouchableOpacity>

		        </View>
				
		    <PullList
		    dataSource={this.state.dataSource}
			onEndReached={this.onloadmore.bind(this)}
				onEndReachedThreshold={10}
				onPullRelease={this.pullrelease}
				dataSource={this.state.dataSource}
				renderFooter={this.renderfooter.bind(this)}
		    renderRow={(rowData) =>this.rendowlist(rowData)}
		    />
		 </View>

		);
	}
}

const styles = StyleSheet.create({
	container: {
		height:'100%'
	},
	laba:{
		width:50,
		height:50
	},

	//头部
	tou: {
		//flex:0.07,
		flexDirection: 'row', // 水平排布    
		paddingLeft: 10,
		height: 50,
		backgroundColor: '#3fdab8',
		alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
	},

	houtui: {
		height: 23,
		width: 23,
		resizeMode: 'stretch',
	},

	//内容
	//
	kuang: {
		position: 'relative',
		//top: 150,
		//borderWidth: 1,
		marginTop: 10,
		paddingBottom: 15,
		flexDirection: 'row',
		borderBottomWidth: 1,
		marginLeft: 7,
		marginRight: 7,
		borderColor: '#f1f1f1',

	},
	xiaokuang: {
		//borderWidth: 1,
		height: 60,
		flex: 1,
		marginTop: 10,
	},
	tu: {
		//borderWidth: 1,
		height: 50,
		width: 50,
		marginLeft: 10,
		marginRight: 10,

	},
	title: {
		// flex: 0.2,
		marginRight: 10,
		flexDirection: 'row',
	},
	time: {
		//borderWidth: 1,
		height: 30,
		marginRight: 10,
		marginTop: 5,

	},
});