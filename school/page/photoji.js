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
	ScrollView,
	TouchableOpacity,ListView,Dimensions,Easing
} from 'react-native';

import {Navigator} from'react-native-deprecated-custom-components';
import {PullList} from 'react-native-pull';
import ZoomImage from 'react-native-zoom-image';
import nav from './nav';
import fangda from './fangda';
// import photoji from './photoji';
import NetUtil from './NetUtil';
var {width,height} = Dimensions.get('window')
export default class photoji extends Component {
	constructor(props) {
	  super(props);
	  this.state = ({
	   dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
	   id:this.props.wid,
	  });
	}
	componentWillMount(){
		storage.load({
			key: 'xiangce',
			autoSync: true,
			syncInBackground: true,
			syncParams: {
			extraFetchOptions: {
			},
			someFlag: true,
			},
		  }).then(ret => {
			  let _this=this;
			 _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(ret.studata),
					});
		  }).catch(err => {
			  //alert('none');
			  let _this=this;
			  let url="http://www.ryaonet.cn/index.php/api/Api/xiangceji";
			  let parms={wid:this.state.id};
				NetUtil.postJSON(url,parms,function(result){
				  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				 storage.save({
					key: 'xiangce',  // 注意:请不要在key中使用_下划线符号!
					data: { 
					  studata: result,
					},
					expires: null
				  });
				});
			})
	}
	houtui = () => {
		this.props.navigator.pop()
	}
	fangda=(wid)=>{
		const {navigator}=this.props;
			if (navigator) {
			  navigator.push({
				name:'fangda',
				component:fangda,
				params:{
				  wid:wid,
				}
			})
		}
	}
	pullrelease=(resolve)=>{
		let _this=this;
			  let url="http://www.ryaonet.cn/index.php/api/Api/xiangceji";
			  let parms={wid:this.state.id};
				NetUtil.postJSON(url,parms,function(result){
				  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				 storage.save({
					key: 'xiangce',  // 注意:请不要在key中使用_下划线符号!
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
	
		topIndicatorRender(pulling, pullok, pullrelease) {
		return (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                <ActivityIndicator size="small" color="gray" />
                <Text ref={(c) => {this.txtPulling = c;}}>下拉刷新...</Text>
                <Text ref={(c) => {this.txtPullok = c;}}>松开刷新...</Text>
                <Text ref={(c) => {this.txtPullrelease = c;}}>玩命刷新中...</Text>
    		</View>
        );
	}
	render() {
		return (
			<View style={styles.container}>
				{/*头部*/}
		        <View style={styles.tou}>
		        <TouchableOpacity onPress={this.houtui}>
		        	<Image source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
		        </TouchableOpacity>
		        	<View style={{alignItems:'center',flex:1,}}>
		        		<Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>学生相册</Text>
		        	</View>
		        </View>
		        {/*相册列表*/}
				<View style={{width:'96%',height:'100%',marginLeft:'2%'}}>
				<PullList 
					contentContainerStyle={styles.fu}
					onPullRelease={this.pullrelease}
					dataSource={this.state.dataSource}
					renderRow={(rowData) =>
			      <View style={{width:'47%',marginTop:8,marginLeft:7}}>
							<ZoomImage
								source={{uri:rowData.photos}}
								imgStyle={{width:'100%',height:160,}}
								style={styles.img}
								duration={200}
								enableScaling={false}
								easingFunc={Easing.ease}
							/>
						</View>
					}
				/>
				
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	fu:{
	    flexDirection:'row',
        flexWrap:'wrap',
        width:width,
	},
	container:{
		flex: 1,
	},
	//头部
	tou:{
		flexDirection: 'row', // 水平排布    
		paddingLeft: 10,
		height: 50,
		paddingRight: 37,
		backgroundColor: '#3fdab8',
		alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
	},
	houtui:{
		height: 23,
		width: 23,
		resizeMode: 'stretch',
	},
	ss:{
		marginLeft: 5,
		marginTop: 2,
		height: 28,
		flexDirection: 'row', // 水平排布    
		width: 300,
		borderRadius: 7, // 设置圆角边    
		backgroundColor: '#fff',
	},
	//照片列表
	xiangce:{

		width: '44%',
		marginTop: 14,
		marginLeft:'3%'
	},
	tup:{
		width: '100%',
		height: 120,
	},
	name:{
		marginLeft:5,
		paddingTop: 5,
		flex: 1,
		borderColor: '#eeeeee',
	},
});