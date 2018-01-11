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
  ScrollView,TouchableOpacity


} from 'react-native';
import  Navigator  from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator'
import  hudong  from './hudong';
import  liuyan  from './liuyan';
import NetUtil from './NetUtil';
import {PullList} from 'react-native-pull';
export default class  pinglun extends Component {
  constructor(props){
    super(props);
     this.state={
      id:this.props.userid,
	  telphone:'',
      nickname:'no',
      pudata:'no',
      content:'no',
      userinfo:'',
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),                 
        selectedTab: 'Event'
}
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
				telphone:ret.telphone
			});
		})
    let _this=this;
    let url="http://www.ryaonet.cn/index.php/api/Api/pinglu";
    let params={id:this.state.id};
    NetUtil.postJSON(url,params,function(result){
      _this.setState({
        userinfo:result,
      });
    });
  }
 tiaohuiqu=()=>{
      this.props.navigator.pop();
  }


 xianshi=() =>{
   const {navigator}=this.props;
      if (navigator){
      navigator.push({
        name:'liuyan',
        component:liuyan,
        params:{
          userid:this.state.id,
        }
    })
  }
  }
  render() {
    return (
 <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        //设置选中的位置
                        selected={this.state.selectedTab === 'Event'}
                        //标题
                        title="详情"
                        //标题样式
                         titleStyle={styles.tabText}
                        //选中时标题文字样式
                        //图标
                        // renderIcon={() => <Image  style={[styles.icon,{tintColor:'#c0c0c0'}]} source={require("../img/0.png")} />}
                       onPress={() => this.setState({ selectedTab: 'Event' })}>
                        <View>
			<View style={{height:50,alignItems: 'center',backgroundColor:'#3fdab8',flexDirection:'row',width:'100%'}}>
					<TouchableOpacity style={{alignItems: 'center',marginLeft:'2%'}} onPress={this.tiaohuiqu}>
						<Image source={require('../img/hotui.png')} style={{width: 23, height: 23}} />
					</TouchableOpacity>
					<Text style={{width:'80%',color:'#fff',fontSize:20,fontWeight:'bold',textAlign:'center',}}>最新评论</Text>
			</View>
    <ScrollView style={styles.neirong}>
		<View style={{marginLeft:20,flexDirection:'row',}}>
			<Image source={require('../img/h1.jpg')} style={{width: 30, height: 30,borderRadius:10, marginLeft:10}} />
			<View style={styles.jieshao}>
				<Text>{this.state.userinfo.nickname}</Text>
				<Text>{this.state.userinfo.pudate}</Text>
			</View>
		</View>
		{/*标题*/}
		<View style={{alignItems:'center'}}>
			<Text style={styles.timu}>{this.state.userinfo.title}</Text>
		</View>
		{/*内容*/}
		<View style={{marginLeft:'5%', marginRight:'5%',}}>
			<Text>{this.state.userinfo.content}</Text>
		</View>
		
		<View style={{borderTopWidth:1,borderColor:'#dcdcdc', marginTop:20}}> 
			<View style={{height:30,flexDirection:'row',marginLeft:20,marginTop:20}}>
				<Image source={require('../img/h1.jpg')} style={{width: 30, height: 30,borderRadius:10, marginLeft:10}} />
				<View style={styles.jieshao}>
					<Text>{this.state.userinfo.nickname}</Text>
					<Text>{this.state.userinfo.pudate}</Text>
				</View>
			</View>
			{/*回复内容*/}
			<View style={{marginTop:20,marginLeft:50}}>
				<Text>{this.state.userinfo.neirong}</Text>
			</View>
		</View>
		
		<View style={{marginTop:20,alignItems:'center'}}>
			<Text onPress={this.xianshi}>继续查看更多评论></Text>
		</View>
    </ScrollView>
    </View>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Log'}
                        title="评论"
                        titleStyle={styles.tabText}
                        onPress={() => this.setState({ selectedTab: 'Log' })}>
                     <View style={styles.container}>
     <View style={{height:50,flexDirection:'row',backgroundColor: '#3fdab8',}}>
     <View style={{flexDirection:'row',alignItems:'center'}}>
     <Text style={{marginLeft:'2%'}} onPress={this.tiaohuiqu}><Image source={require('../img/hotui.png')} style={{width: 40, height: 40,borderRadius:40,}} /></Text>
     <View style={{height:20,marginLeft:'80%'}}><Text onPress={this.fabiao} style={{fontSize:20,color:'#fff'}}>发表</Text></View>
           </View>
             </View>
        <TextInput
              style={styles.shuru}
              multiline={true}
              placeholder="说点什么吧..."
              underlineColorAndroid="transparent"
              onChangeText={(text) => {this.nums=text}}
            />

      </View>

                    </TabNavigator.Item>
                    </TabNavigator>
     </View>
         );
      }
         fabiao=()=>{
			 // alert(this.state.id);
			 succs=(res)=>{
			  if(res=='succ'){
				 const {navigator}=this.props;
					  if (navigator){
					  navigator.push({
						name:'liuyan',
						component:liuyan,
						params:{
						  userid:this.state.id,
						}
					})
				  }
			  }if(res=='fail'){
				  alert('发表失败');
			}if(res=='kong'){
				  alert('不能为空');
			}

			};
			 // alert(this.state.telphone);
            let url='http://www.ryaonet.cn/index.php/api/Api/fabiaopinglu';
            let params={'nums':this.nums,'id':this.state.id,'tel':this.state.telphone};
			let rest=NetUtil.postJSON(url,params,function(result){
				this.succs(result);
             })
      }
}
   const styles = StyleSheet.create({
shuru:{
},

tijiao:{
       fontWeight:'300',
       fontSize: 20,
       marginTop:10,
       color:'#f0f8ff',
  },


 container: {
        flex: 1,
    },


timu:{
     fontSize:22,
	 width:'90%',
	 textAlign:'center'
  },


tabText: {
        fontSize:16,
        color: '#c0c0c0',
        marginBottom:15,
      },


icon: {    
     height: 10
   },


fabiao:{
      height:40,
      width:40,
      backgroundColor:'#dcdcdc',
      borderRadius:5,
     },


diyihang:{
        height:40,
        flexDirection:'row',
        borderRadius:10,
      },


jieshao: {
         marginLeft: 10,  
        },


  fanhui:{
          height:30,
          width:30,
          marginLeft:10,
       },


  zuixin:{
        fontWeight:'300',
        fontSize: 20,
        textAlign: 'center',
        color:'#f0f8ff',
       },
welcome: {
       height:50,
       flexDirection:'row',
       backgroundColor: '#3fdab8',
       alignItems: 'center',
       },
  daohang:{
         height:100,
         width:300,  
         flexDirection:'row',
  },
neirong:{
         marginTop:10,
       }, 
});


 