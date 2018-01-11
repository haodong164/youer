
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TextInput,
  TouchableHighlight,
  PullList,
  rowData,TouchableOpacity

} from 'react-native';
import Navigator  from 'react-native-deprecated-custom-components';
import hudong  from './hudong';
import NetUtil from './NetUtil';
import pinglun from './pinglun';
export default class  liuyan extends Component {
  constructor(props){
    super(props);
      this.state={
      id:this.props.userid,
       userinfo:[],
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),                 
 }
}
  componentWillMount(){
    let _this=this;
    let url="http://www.ryaonet.cn/index.php/api/Api/liuyan";
    let params={wid:this.state.id};
    NetUtil.postJSON(url,params,function(result){
      _this.setState({
             dataSource:_this.state.dataSource.cloneWithRows(result),
       });
    });
  }
 tiaohuiqu = () => {
		this.props.navigator.push({
			name: 'hudong',
			component: hudong
		});
	}

  render() {
    return (
	<View style={styles.container}>
		  <View style={{height:50,alignItems: 'center',backgroundColor:'#3fdab8',flexDirection:'row',width:'100%'}}>
					<TouchableOpacity style={{alignItems: 'center',marginLeft:'2%'}} onPress={this.tiaohuiqu}>
						<Image source={require('../img/hotui.png')} style={{width: 23, height: 23}} />
					</TouchableOpacity>
					<Text style={{width:'80%',color:'#fff',fontSize:20,fontWeight:'bold',textAlign:'center',}}>最新评论</Text>
			</View>
		<View style={styles.neirong}>
<ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) =>
	  
		<View style={{marginTop:10,borderBottomWidth:1, borderColor:'#dcdcdc'}}>
			<View style={{height:40,flexDirection:'row',}}>
				<Image source={require('../img/h1.jpg')} style={{width: 30, height: 30,borderRadius:10,marginTop:10,marginLeft:15,borderRadius:25}} />
				<Text style={{marginTop:16,color:'#87ceeb', fontSize:13,height:20, marginLeft:10,}}>{rowData.nickname}</Text> 
			</View>
			<View style={{flex:1,marginLeft:30,marginRight:20,marginBottom:10}}>
				<Text style={{fontSize:12,marginTop:5,flex:3,alignItems:'center'}}>{rowData.neirong}</Text>
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
 container: { 
         alignItems: 'center',
            },

  zuixin:{
        fontWeight:'300',
        fontSize: 20,
        textAlign: 'center',
        color:'#f0f8ff',
  },


  welcome: {
            height:50,
            width:'100%',
            flexDirection:'row',
            backgroundColor: '#3fdab8',
            alignItems: 'center',
  },


neirong:{
          width:'100%',
          marginLeft:20,
          borderRadius:5,
          marginTop:10,

},


touxiang:{
          marginLeft:60,
          marginTop:20,
   },
 

 fanhui:{
        height:30,
        width:30,
        marginLeft:10,
},

});

 