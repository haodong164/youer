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
import NetUtil from './NetUtil';
import xiangji from './xiangji';
var {width,height} = Dimensions.get('window')
export default class photo2 extends Component {
	constructor(props) {
	  super(props);
	  this.state = ({
	   dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
	   
	  });
	}
	componentWillMount(){
		storage.load({
			key: 'photo2',
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
			  let url="http://www.ryaonet.cn/index.php/api/Api/xiangceji2";
			  let parms="carrage=1";
				NetUtil.postJSON(url,'',function(result){
				  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				 storage.save({
					key: 'studentlist',  // 注意:请不要在key中使用_下划线符号!
					data: { 
					  studata: result,
					},
					expires: null
				  });
				});
			})
	}
	photoji= () => {
		this.props.navigator.push({
			name: 'photo2',
			component: photoji
		});
	}
	houtui = () => {
		this.props.navigator.pop()
	}

	pullrelease=(resolve)=>{
		let _this=this;
			  let url="http://www.ryaonet.cn/index.php/api/Api/xiangceji2";
			  let parms="carrage=1";
				NetUtil.postJSON(url,'',function(result){
				  _this.setState({
					  dataSource:_this.state.dataSource.cloneWithRows(result),
					});
				 storage.save({
					key: 'photo2',  // 注意:请不要在key中使用_下划线符号!
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
						<Image  source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
					</TouchableOpacity>
		        	<View style={{alignItems:'center',width:'90%'}}>
		        		<Text style={styles.toutext}>我的相册</Text>
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
	container: {
	},
	//头部
	tou: {
		width:'100%',
		flexDirection: 'row', // 水平排布    
		paddingLeft: 10,
		height: 50,
		paddingRight: 37,
		backgroundColor: '#3fdab8',
		alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
	},
	toutext:{
		color:'#fff',
		alignItems:'center',
		fontSize:18,
		fontWeight:'bold',
	},
	houtui: {
		height: 23,
		width: 23,
		resizeMode: 'stretch',
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
	name: {
		textAlign: 'center',
		paddingTop: 10,
		flex: 1,
		borderWidth: 1,
		borderColor: '#eeeeee',
	},
});