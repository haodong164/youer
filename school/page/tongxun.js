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
	ListView,Dimensions,Linking
} from 'react-native';
import {
	Navigator
} from 'react-native-deprecated-custom-components';
import ModalDropdown from 'react-native-modal-dropdown';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';
var height = Dimensions.get('window').height;
export default class tongxun extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	isloadmore:false,
      	currage:1,
				datalist:[],
				telphone:'',
				identity:'',
	   dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
	  };
	}
	componentWillMount(){
			storage.load({
				key: 'static',
				autoSync: true,
				syncInBackground: true,
				syncParams: {
					extraFetchOptions: {},
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
		let url="http://www.ryaonet.cn/index.php/api/Api/getuserinfo";
		let parms={telphone:ret.telphone,identity:ret.identity};
		NetUtil.postJSON(url,parms,function(result){
			_this.setState({
				userinfo:result,
				dataSource:_this.state.dataSource.cloneWithRows(result),
			});
			_this.forceUpdate
		});
		  })
	}
	houtui = () => {
		this.props.navigator.pop()
	}
	call=(telphone)=>{
		Linking.openURL("tel:"+telphone);
	}
	duanxin=(telphone)=>{
	  Linking.openURL("smsto:"+telphone); 
	}
	
	 onloadmore=()=>{
    this.setState({
      isloadmore:true,
    });
    if(this.state.isloadmore)
    {
      let _this=this;
      let currage=this.state.currage+1;
      let url="http://www.ryaonet.cn/index.php/api/Api/getuserinfo";
      let params={telphone:this.state.telphone,identity:this.state.identity};

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
tongxun=(rowData)=>{
		if(rowData.photo==''){
			return(
		   <View style={styles.newlist}>
				  <View>
					<Image source={require('../img/duanxin.png')}/>
				  </View>
				  <View style={styles.text}>
					<Text style={styles.texts}>{rowData.sname}({rowData.truename})</Text>
					<Text style={styles.texx}>{rowData.telphone}</Text>
				  </View>
				  <View style={{flexDirection:'row',marginTop:10,marginRight:20,flex: 1,}}>
					  <TouchableOpacity onPress={this.call.bind(this,rowData.telphone)}>
							<Image source={require('../img/dianhua.png')} style={{width:40,height:40,borderRadius:50,marginRight:3,}}/>
						</TouchableOpacity>
					  <TouchableOpacity onPress={this.duanxin.bind(this,rowData.telphone)}>
							  <Image source={require('../img/duanxin.png')} style={{width:40,height:40,borderRadius:50}}/>
					  </TouchableOpacity>
				   </View>
				</View>
		  );
		}else{
			return(
		  <View style={styles.newlist}>
				  <View>
					<Image source={{uri:rowData.photo}}style={{width:60,height:60,borderRadius:50}}/>
				  </View>
				  <View style={styles.text}>
					<Text style={styles.texts}>{rowData.sname}({rowData.truename})</Text>
					<Text style={styles.texx}>{rowData.telphone}</Text>
				  </View>
				  <View style={{flexDirection:'row',marginTop:10,marginRight:20,flex: 1,}}>
					  <TouchableOpacity onPress={this.call.bind(this,rowData.telphone)}>
							<Image source={require('../img/dianhua.png')}style={{width:40,height:40,borderRadius:50,marginRight:3,}}/>
						</TouchableOpacity>
					  <TouchableOpacity onPress={this.duanxin.bind(this,rowData.telphone)}>
							  <Image source={require('../img/duanxin.png')}style={{width:40,height:40,borderRadius:50}}/>
					  </TouchableOpacity>
				   </View>
				</View>
		  );
		}
		  
	}
	  render() {
    return (
      <View style={{width:'100%',height:'100%'}}>
            <View style={styles.tou}>
			     <TouchableOpacity onPress={this.houtui}>
			         	<Image source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
			    </TouchableOpacity>
			        	<View style={{alignItems:'center',flex:1,}}>
			         		<Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>通讯录</Text>
			         	</View>
		    </View>
           <ListView 
				style={{marginTop:60}}
				dataSource={this.state.dataSource}
				renderRow={(rowData) =>this.tongxun(rowData)}
				
              
            />
      </View>
    );
  }
}
const styles = StyleSheet.create({ 
  tou:
	{
    width:'100%',
		flex: 0.08,
		position: 'absolute',
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

newlist:{
  flexDirection:'row',
  marginTop:10,
  marginLeft:10,
  paddingBottom:10,
  borderBottomWidth:1,
  flex: 1,
  borderColor:'#d6d6d6'
},
text:{
  marginLeft:10,
  marginTop:5,
  flex: 2.8,
},
  texts: {
    fontSize: 14,
    color: '#696969',
  },
  texx: {
    marginTop: 4,
    fontSize: 17,
    color: '#000',
  }	
});
