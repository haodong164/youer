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
		telphone:'',
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
				let _this=this;
		let url="http://www.ryaonet.cn/index.php/api/Api/mypingjia";
		let parms={userid:ret.telphone};
		NetUtil.postJSON(url,parms,function(result){
			_this.setState({
				dataSource: _this.state.dataSource.cloneWithRows(result),
			})
		});
		  }).catch(err => {
			 
		  })
}	


	houtui = () => {
		this.props.navigator.pop();
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
		        		<Text style={{color:'#fff',fontSize:18,fontWeight:'bold',}}>我的评价</Text>
		        	</View>
				
					{/*教师头部*/}

					<TouchableOpacity style={this.state.identity=='教师'?{width:'20%',}:{display:'none'}} onPress={this.adddongtai}>
						<Image source={require('../img/add.png')} style={{width:40,height:35,marginLeft:'47%'}}/>
					</TouchableOpacity>

		        </View>
				

		 	
		    
			<PullList 
				onEndReachedThreshold={10}
				dataSource={this.state.dataSource}
				renderRow={(rowData) => 
				<View style={{width:'94%',backgroundColor:'#fff',marginTop:5,marginLeft:'3%'}}>
						<Text style={{marginLeft:5,marginTop:5}}>{rowData.content}</Text>
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
