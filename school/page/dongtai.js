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
	TouchableOpacity,
	TextInput,
	ScrollView,	
	ListView
} from 'react-native';
import Carousel from 'react-native-carousel';
import text from './text'
import {Navigator} from 'react-native-deprecated-custom-components';
import NetUtil from './NetUtil';
import adddongtai from './adddongtai';
import {PullList} from 'react-native-pull';
import nav from './nav'
export default class dongtai extends Component {
	constructor(props){
    super(props);
    this.state=({
		isloadmore:false,
		currage:1,
		datalist:[],
		identity:'',
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
		  key: 'dongtai',
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
			let url='http://www.ryaonet.cn/index.php/api/Api/dongtai';
			let params="currage="+this.state.currage;
			 NetUtil.postForm(url,params,function(result){
				 _this.setState({
				  datalist:result,
				  dataSource:_this.state.dataSource.cloneWithRows(result),
				});
				storage.save({
					key: 'dongtai',
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
	let url='http://www.ryaonet.cn/index.php/api/Api/dongtai';
	let params='currage=1';
	 NetUtil.postForm(url,params,function(result){
		 _this.setState({
			dataSource:_this.state.dataSource.cloneWithRows(result),
      });
		storage.save({
			key: 'dongtai',
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
      let url='http://www.ryaonet.cn/index.php/api/Api/dongtai';
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
}else{
  return(
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
      <Text>加载完成</Text>
    </View>
  );
}
}
	houtui = () => {
		this.props.navigator.push({
			name: 'nav',
			component: nav
		});
	}
	adddongtai = () => {
		this.props.navigator.push({
			name: 'adddongtai',
			component: adddongtai
		});
	}
	openbody=(wid)=>{
		const {navigator}=this.props;
		if (navigator) {
		  navigator.push({
			name:'text',
			component:text,
			params:{
			wid:wid,
		  }
		})
	  }
	}

	render() {
		return (
			<View style={{height:'100%',}}>
			

				{/*家长头部*/}
				<View style={{flexDirection: 'row',paddingLeft: 10,height: 50,backgroundColor: '#3fdab8',alignItems: 'center'}}>
			
					<TouchableOpacity style={{width:'20%',}} onPress={this.houtui}>
						<Image source={require('../img/hotui.png')} style={{height: 23,width: 23,resizeMode: 'stretch',}}/>
					</TouchableOpacity>
		        	<View style={{alignItems:'center',width:'60%',}}>
		        		<Text style={{color:'#fff',fontSize:20,fontWeight:'bold',}}>校园动态</Text>
		        	</View>
				
					{/*教师头部*/}

					<TouchableOpacity style={this.state.identity=='教师'?{width:'20%',}:{display:'none'}} onPress={this.adddongtai}>
						<Image source={require('../img/add.png')} style={{width:40,height:35,marginLeft:'47%'}}/>
					</TouchableOpacity>

		        </View>
				
		{ /*轮播*/ }
				<View style={styles.ss1}>	
					<Carousel indicatorOffset={-20} inactiveIndicatorColor={'#999'} indicatorColor={'#dcdcdc'} delay={2000}>
					<Image source={require('../img/banner1.jpg')} style={styles.beijing}/>
					<Image source={require('../img/banner3.jpg')} style={styles.beijing}/>
					<Image source={require('../img/banner4.jpg')} style={styles.beijing}/>
					</Carousel>
				</View>

		{
			/*  <View style={{alignSelf:'flex-end',marginRight:5}}>
								<ModalDropdown defaultValue='查看类型' options={['育儿知识', '趣味动画','精选儿歌','科学益智']}/>
							</View>
			*/
		}
		 	
		       
			<PullList 
				onEndReached={this.onloadmore.bind(this)}
				onEndReachedThreshold={10}
				renderFooter={this.renderfooter.bind(this)}
				onPullRelease={this.pullrelease}
				dataSource={this.state.dataSource}
				renderRow={(rowData) => 
			
			<TouchableOpacity onPress={this.openbody.bind(this,rowData.id)}>
				<View style={styles.dakuang}>
					<View style={styles.neitubiao}>
					
		        	<Image  source={require('../img/xlb.png')} style={styles.houtui1} />

					</View>

					<View style={styles.neirong}>
					
						<View style={styles.shang}>
							<Text numberOfLines={1} style={{width:'80%'}}>{rowData.title}</Text>
							<Text style={{width:'20%',fontSize:10,textAlign:'right'}}>{rowData.pubdate}</Text>
						</View>

						<View style={styles.zhong}>
							<Text numberOfLines={3} style={styles.zhongtext} onPress={this.openbody.bind(this,rowData.id)}>	{rowData.futitle}
							</Text>
						</View>
						
						<View  style={rowData.photo==''?{display:'none'}:styles.xia}>
							<Image source={{uri:rowData.photo}} style={{height:120,marginRight:4,		resizeMode:Image.resizeMode.stretch,
}}/>
						</View>
					</View>
				</View>
			</TouchableOpacity>
			}
		    />
			
		</View>
	

		);
	}
}

const styles = StyleSheet.create({
	

	frame: {
		flex: 1,
	},

	//头部
	tou: {
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
	//搜索
	ss1: {
		flexDirection: 'row', // 水平排布    
		//backgroundColor: '#eee',
		alignItems: 'center',
		height: 180,
	},
	//背景图片
	beijing: {
		height: 180,
	},



	inputText: {
		flex: 1,
		padding: 5,
		paddingLeft: 1,
		backgroundColor: 'transparent',
		fontSize: 10,

	},
	//内容
	dakuang: {
		//borderWidth: 1,
		flexDirection: 'row',
		marginTop: 5,
		borderBottomWidth: 1,
		marginLeft: 7,
		marginRight: 7,
		borderColor: '#f1f1f1',
	},

	//内容图标
	neitubiao: {
		//borderWidth: 1,
		width: 20,
	},

	houtui1: {
		height: 23,
		width: 23,
		resizeMode: 'stretch',
		marginTop: 2,
		marginLeft: 4,
	},

	//内容框
	neirong: {
		flex: 1,
		//	borderWidth: 1,
		marginLeft: 10,
		marginRight: 5,
		flexDirection: 'column',

	},

	shang: {
		height: 23,
		//borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	zhong: {
		marginTop: 5,
		borderWidth: 1,
		borderColor: '#fafafa',
	},
	zhongtext:{
		fontSize:13,
		color:'#000'
	},
	xia: {
		marginTop: 5,
		flex:1,
		//borderWidth: 1,
		paddingBottom:10,
	},
});

//AppRegistry.registerComponent('school', () => school);
