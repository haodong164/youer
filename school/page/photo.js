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
	TouchableOpacity,ListView,Dimensions
} from 'react-native';

import {Navigator} from'react-native-deprecated-custom-components';
import {PullList} from 'react-native-pull';
import nav from './nav';
import photoji from './photoji';
import NetUtil from './NetUtil';
var {width,height} = Dimensions.get('window')
export default class photo extends Component {
	constructor(props) {
	  super(props);
	  this.state = ({
	   dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
	   
	  });
	}
	componentWillMount(){
		storage.load({
			key: 'photo',
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
			  let url="http://www.ryaonet.cn/index.php/api/Api/xiangce";
			  let parms="carrage=1";
				NetUtil.postJSON(url,'',function(result){
				  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				 storage.save({
					key: 'photo',  // 注意:请不要在key中使用_下划线符号!
					data: { 
					  studata: result,
					},
					expires: null
				  });
				});
			})
	}
	photoji=(wid)=>{
		const {navigator}=this.props;
			if (navigator) {
			  navigator.push({
				name:'photoji',
				component:photoji,
				params:{
				  wid:wid,
				}
			})
		}
	}
	houtui = () => {
		this.props.navigator.pop()
	}
	pullrelease=(resolve)=>{
		let _this=this;
			  let url="http://www.ryaonet.cn/index.php/api/Api/xiangce";
			  let parms="carrage=1";
				NetUtil.postJSON(url,'',function(result){
				  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				 storage.save({
					key: 'photo',  // 注意:请不要在key中使用_下划线符号!
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
		        		<Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>班级相册</Text>
		        	</View>
		        </View>
		        {/*相册列表*/}
				<View style={{width:'96%',height:'100%',marginLeft:'2%'}}>
				<PullList 
					contentContainerStyle={styles.fu}
					onPullRelease={this.pullrelease}
					dataSource={this.state.dataSource}
					renderRow={(rowData) =>
	<View style={styles.xiangce}>
		<TouchableOpacity onPress={this.photoji.bind(this,rowData.class_id)}>
			<Image source={{uri:rowData.photos}} style={styles.tup} />
		</TouchableOpacity>
		<View style={{flexDirection: 'row',borderWidth: 1,borderColor: '#eeeeee',}}>
			<Text onPress={this.photoji.bind(this,rowData.class_id)} style={styles.name}>{rowData.abname}</Text>
			<Text onPress={this.photoji.bind(this,rowData.class_id)} style={styles.name}>2017-07-12</Text>
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
		width: '48%',
		height: 150,
		marginLeft:'1%',
		marginTop: 14,
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