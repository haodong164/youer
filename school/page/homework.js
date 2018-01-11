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
	ListView,
} from 'react-native';
import {
	Navigator
} from 'react-native-deprecated-custom-components';
import nav from './nav';
import {PullList} from 'react-native-pull';
import NetUtil from './NetUtil';
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
  key: 'homework',
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
	let url='http://www.ryaonet.cn/index.php/api/Api/homework';
	let params="currage="+this.state.currage;
	 NetUtil.postForm(url,params,function(result){
		 _this.setState({
          datalist:result,
          dataSource:_this.state.dataSource.cloneWithRows(result),
        });
		storage.save({
			key: 'homework',
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
	let url='http://www.ryaonet.cn/index.php/api/Api/homework';
	let params='currage=1';
	 NetUtil.postForm(url,params,function(result){
		 _this.setState({
			dataSource:_this.state.dataSource.cloneWithRows(result),
      });
		storage.save({
			key: 'homework',
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
      let url='http://www.ryaonet.cn/index.php/api/Api/homework';
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
}else{
  return(
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
      <Text>加载完成</Text>
    </View>
  );
}
}

	houtui = () => {
		this.props.navigator.pop()
	}
	render() {
		return (
			<View style={{width:'100%',height:'100%',backgroundColor:'#f1f1f1'}}>
				{/*头部*/}
		        <View style={styles.tou}>
			        <TouchableOpacity onPress={this.houtui}>
			        	<Image  source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
			        </TouchableOpacity>
			        <View style={{alignItems:'center',flex:1,}}>
			        	<Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>宝贝作业</Text>
			        </View>
		    	</View>
		        <PullList
								onEndReached={this.onloadmore.bind(this)}
            		onEndReachedThreshold={10}
								renderFooter={this.renderfooter.bind(this)}
								onPullRelease={this.onPullRelease}
		    				dataSource={this.state.dataSource}
		    				renderRow={(rowData) => 

		        <View style={styles.kuang}>
		         <View style={{flexDirection:'row',marginLeft:10,marginRight:10,}}>
							<View style={{flexDirection:'column',width:'100%',}}>
									<View style={{flexDirection:'row',marginTop:6}}>
											<Image source={require('../img/j3.jpg')} style={{width:10,height:10,marginTop:6}}/>
											<Text style={{fontSize:15,color:'#3fdab8',marginLeft:10}}>
												{rowData.pubdate}
											</Text>
											<Text style={{marginLeft:10}}>
												{rowData.name}
											</Text>
									</View>
									<View style={{borderLeftWidth:1,marginLeft:'1.3%',borderColor:'#3fdab8'}}>
										<View style={{flexDirection:'row',width:'97%',marginLeft:'3%',backgroundColor:'#ebeff3',borderRadius:20}}>
												<View >
														<Text style={{paddingLeft:20,marginTop: 10,fontSize:20}}>{rowData.title}</Text>
														<Text style={{paddingLeft:20,marginTop: 10,fontSize:16}}>{rowData.content}</Text>
												</View>
											</View>
									</View>
								</View>
              </View>
		        </View>
		        
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
	// container: {
	// 	position: 'relative',
	// },

	//头部
	tou: {
		//flex:0.07,
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

	//内容
	//
	kuang: {
		// position: 'relative',
		//top: 150,
		//borderWidth: 1,
		marginTop: 3,
		marginBottom:1,
		paddingBottom:5,
		flexDirection: 'row',
		backgroundColor:'#fff'
	},
	
});