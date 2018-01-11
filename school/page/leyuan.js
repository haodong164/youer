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
	ListView,Dimensions
} from 'react-native';
import {
	Navigator
} from 'react-native-deprecated-custom-components';
import ModalDropdown from 'react-native-modal-dropdown';
import lenei from './lenei';
import nav from './nav';
import addleyuan from './addleyuan';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';
var height = Dimensions.get('window').height;
export default class leyuan extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	isloadmore:false,
      	currage:1,
      	datalist:[],
	   dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
	  };
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
			key: 'stud',
			autoSync: true,
			syncInBackground: true,
			syncParams: {
			extraFetchOptions: {
			},
			someFlag: true,
			},
		  }).then(ret => {
		  	//alert('you');
		  	 let _this=this;
			 _this.setState({
			  dataSource:_this.state.dataSource.cloneWithRows(ret.studata),
		  });
		  }).catch(err => {
		  	//alert('wu');
		  	 let _this=this;
	  		let url="http://www.ryaonet.cn/index.php/api/Api/leyuan"
	  		let params="currage="+this.state.currage;
			NetUtil.postJSON(url,'',function(result){
		 	 _this.setState({
			  dataSource:_this.state.dataSource.cloneWithRows(result),
		  });
		 	 storage.save({
        key: 'stud',  // 注意:请不要在key中使用_下划线符号!
        data: { 
          studata: result,
         
        },
        expires: null
        });

		});
			
		  })

	 
	}
	houtui = () => {
		this.props.navigator.push({
			name: 'nav',
			component: nav
		});
	}
	addleyuan = () => {
		this.props.navigator.push({
			name: 'addleyuan',
			component: addleyuan
		});
	}
	lenei=(wid)=>{
		const {navigator}=this.props;
			if (navigator) {
			  navigator.push({
				name:'lenei',
				component:lenei,
				params:{
				  wid:wid,
			  }
			})
	  }
	}
	pullrelease=(resolve)=>{
		let _this=this;
	  		let url="http://www.ryaonet.cn/index.php/api/Api/leyuan"
	  		let params="currage=1";
			NetUtil.postJSON(url,params,function(result){
		 	 _this.setState({
		 	 	datalist:result,
			  dataSource:_this.state.dataSource.cloneWithRows(result),
		  });
		 	 storage.save({
        key: 'stud',  // 注意:请不要在key中使用_下划线符号!
        data: { 
          studata: result,
         
        },
        expires: null
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
      let url="http://www.ryaonet.cn/index.php/api/Api/leyuan";
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
		<View>
		  <Text style={{fontSize:14}}>正在加载中...</Text>
		</View>
	  );
	}else{
	  return(
		<View>
		  <Text style={{fontSize:14}}>加载完成</Text>
		</View>
	  );
	}
	}
	render() {
		return (

			<View style={styles.container}>
								{/*家长头部*/}
				<View style={{flexDirection: 'row',paddingLeft: 10,height: 50,backgroundColor: '#3fdab8',alignItems: 'center'}}>
			
					<TouchableOpacity style={{width:'20%',}} onPress={this.houtui}>
						<Image source={require('../img/hotui.png')} style={{height: 23,width: 23,resizeMode: 'stretch',}}/>
					</TouchableOpacity>
		        	<View style={{alignItems:'center',width:'60%',}}>
		        		<Text style={{color:'#fff',fontSize:20,fontWeight:'bold',}}>成长乐园</Text>
		        	</View>
				
					{/*教师头部*/}

					<TouchableOpacity style={this.state.identity=='教师'?{width:'20%',}:{display:'none'}} onPress={this.addleyuan}>
						<Image source={require('../img/add.png')} style={{width:40,height:35,marginLeft:'47%'}}/>
					</TouchableOpacity>

		        </View>

		        	{/*搜索*/}
<View style={{height:height-75}}>
		        <PullList onEndReached={this.onloadmore.bind(this)}
		         onPullRelease={this.pullrelease}  
		         onEndReachedThreshold={10}
		    dataSource={this.state.dataSource}
		    renderFooter={this.renderfooter.bind(this)}
		    renderRow={(rowData) => 
<TouchableOpacity onPress={this.lenei.bind(this,rowData.id)}>
		        <View style={styles.kuang}>
		        	<View style={styles.tu}>
		        		<Image source={{uri:rowData.photo}} style={{width:100,height:100}}/>
		        	</View>

		        	<View style={styles.xiaokuang}>
		        		<View style={styles.title}>
							<View style={{width:'60%'}}>
		        				<Text style={{fontSize:16,color:'#fd3c68',marginBottom:1,}}>{rowData.type}</Text>
							</View>
							<View style={{width:'40%'}}>
								<Text style={{textAlign:'right',marginRight:10,fontSize:13}}>{rowData.pubdate}</Text>
							</View>
						</View>

						<View>
		        			<Text numberOfLines={4} onPress={this.lenei.bind(this,rowData.id)} style={{fontSize:14,marginTop:10,}}>{rowData.content}</Text>
		        		</View>

		        		{/* <View style={styles.time}>
		        			<Text style={{fontSize:9,}}>{rowData.pubdate}</Text>
		        		</View> */}
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
	frame: {
		flex: 1,
	},
	// container: {
	// 	position: 'relative',
	// },

	//头部
	tou: {
		//top: 10,
		// position: 'absolute',
		//flex:0.08,
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
	//搜索
	ss1: {
		//flex:0.08,
		//top: 60,
		//position: 'relative',
		height: 44,
		flexDirection: 'row', // 水平排布    
		backgroundColor: '#eee',
		alignItems: 'center',
		paddingRight: 8,
		paddingLeft: 8,

	},
	ss: {
		marginLeft: 5,
		marginTop: 2,
		height: 28,
		flexDirection: 'row', // 水平排布    
		width: 300,
		borderRadius: 7, // 设置圆角边    
		backgroundColor: '#fff',
	},

	inputText: {
		flex: 1,
		padding: 5,
		paddingLeft: 1,
		backgroundColor: 'transparent',
		fontSize: 10,

	},

	//搜索图标
	tubiao: {
		height: 20,
		width: 22,
		marginLeft: 8,
		marginTop: 4,
		resizeMode: 'stretch',
	},


	//内容
	//
	kuang: {
		position: 'relative',
		//top: 150,
		//borderWidth: 1,
		marginTop: 10,
		paddingBottom: 5,
		flexDirection: 'row',
		borderBottomWidth: 1,
		marginLeft: 7,
		marginRight: 7,
		borderColor: '#f1f1f1',

	},
	xiaokuang: {
		//borderWidth: 1,
		height: 100,
		flex: 1,
	},
	tu: {
		//borderWidth: 1,
		height: 100,
		width: 100,
		marginLeft: 10,
		marginRight: 10,
	},
	title: {
		//borderWidth: 1,
		flex: 1,
		marginRight: 10,
		marginTop: 5,
		marginBottom: 10,
		flexDirection:'row',
	},
	time: {
		//borderWidth: 1,
		height: 10,
		marginBottom: 10,
		marginRight: 10,
		alignItems: 'flex-end',

	},
});
//AppRegistry.registerComponent('school', () => school);
