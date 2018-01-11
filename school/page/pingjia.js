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
import adddianping from './adddianping';
import {PullList} from 'react-native-pull';
import nav from './nav'
export default class pingjia extends Component {
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
		  key: 'pingjia',
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
			let url='http://www.ryaonet.cn/index.php/api/Api/pingjia';
			let params="currage="+this.state.currage;
			 NetUtil.postForm(url,params,function(result){
				 _this.setState({
				  datalist:result,
				  dataSource:_this.state.dataSource.cloneWithRows(result),
				});
				storage.save({
					key: 'pingjia',
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
	let url='http://www.ryaonet.cn/index.php/api/Api/pingjia';
	let params='currage=1';
	 NetUtil.postForm(url,params,function(result){
		 _this.setState({
			dataSource:_this.state.dataSource.cloneWithRows(result),
      });
		storage.save({
			key: 'pingjia',
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
      let url='http://www.ryaonet.cn/index.php/api/Api/pingjia';
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
	

	houtui = () => {
		this.props.navigator.push({
			name: 'nav',
			component: nav
		});
	}
	adddongtai = () => {
		this.props.navigator.push({
			name: 'adddianping',
			component: adddianping
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
			<View style={{height:'100%',backgroundColor:'#dcdcdc'}}>
			

				{/*家长头部*/}
				<View style={{flexDirection: 'row',paddingLeft: 10,height: 50,backgroundColor: '#3fdab8',alignItems: 'center'}}>
			
					<TouchableOpacity style={{width:'20%',}} onPress={this.houtui}>
						<Image source={require('../img/hotui.png')} style={{height: 23,width: 23,resizeMode: 'stretch',}}/>
					</TouchableOpacity>
		        	<View style={{alignItems:'center',width:'60%',}}>
		        		<Text style={{color:'#fff',fontSize:20,fontWeight:'bold',}}>点评</Text>
		        	</View>
				
					{/*教师头部*/}

					<TouchableOpacity style={this.state.identity=='教师'?{width:'20%',}:{display:'none'}} onPress={this.adddongtai}>
						<Image source={require('../img/add.png')} style={{width:40,height:35,marginLeft:'47%'}}/>
					</TouchableOpacity>

		        </View>
				

		 	
		    
			<PullList 
				onEndReached={this.onloadmore.bind(this)}
				onEndReachedThreshold={10}
				onPullRelease={this.pullrelease}
				dataSource={this.state.dataSource}
				renderRow={(rowData) => 
				<View style={{width:'94%',backgroundColor:'#fff',marginTop:5,marginLeft:'3%'}}>
						<Text style={{marginLeft:5,marginTop:5}}>{rowData.syudentname}：{rowData.content}</Text>
						<View style={{width:'100%',alignItems:'flex-end'}}>
								<Text style={{marginRight:20}}>点评人：{rowData.teachername}</Text>
								<Text style={{marginRight:20}}>点评时间：{rowData.pubdate}</Text>
						</View>
					</View>
			
			}
		    />
			</View>
		
	

		);
	}
}

const styles = StyleSheet.create({
	


});
