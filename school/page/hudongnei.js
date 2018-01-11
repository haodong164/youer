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
  TouchableOpacity,
  ListView,
  Dimensions,
} from 'react-native';
import fabu1 from './fabu1';
import Carousel from 'react-native-carousel';
import nav from './nav'
import {Navigator} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator'
import NetUtil from './NetUtil';
import hudong from './hudong';
import {PullList} from 'react-native-pull';
var {
  width,
  height
} = Dimensions.get('window')
export default class hudongnei extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      userinfo: [],
      id: this.props.id,
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      selectedTab: 'Event',
      data:this.props.data
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
		let url="http://www.ryaonet.cn/index.php/api/Api/hudongnei";
		let parms={userid:this.state.data.id};
		NetUtil.postJSON(url,parms,function(result){
			_this.setState({
				dataSource: _this.state.dataSource.cloneWithRows(result),
      })
		});
		  }).catch(err => {
			 
		  })
}	

  houtui = () => {
    this.props.navigator.push({
      name: 'hudong',
      component: hudong
    });
  }
  pingonChange(val){
    if(val.length!=0){
      this.setState({
        pingText:true,
      })
    }else{
      this.setState({
        pingText:false,
      })
    }
    this.intro=val;
  }
  pingonFocus(){
    this.setState({
      pingsub:true,
    })
  }
  pingonBlur(){
    this.setState({
      pingsub:false,
    })
  }
  pingsub=()=>{
    succs = (res) => {
      if (res == 'succ') {
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
              let url="http://www.ryaonet.cn/index.php/api/Api/hudongnei";
              let parms={userid:this.state.data.id};
              NetUtil.postJSON(url,parms,function(result){
                _this.setState({
                  dataSource: _this.state.dataSource.cloneWithRows(result),
                })
              });
            })
            
        }
       
      };
      let url = 'http://www.ryaonet.cn/index.php/api/Api/fabiaopinglu';
      let params = {
        'nums': this.intro,
        'tel': this.state.telphone,
        'id': this.state.data.id,
      };
      let rest = NetUtil.postJSON(url, params, function(result) {
        this.succs(result);
      })
    }
  render() {
    return (
      <View style={{flex: 1,}}>
      <View style={styles.container}>
        	<View style={{flexDirection: 'row',paddingLeft: 10,height: 50,backgroundColor: '#3fdab8',alignItems: 'center'}}>
			
					<TouchableOpacity style={{width:'20%',}} onPress={this.houtui}>
						<Image source={require('../img/hotui.png')} style={{height: 23,width: 23,resizeMode: 'stretch',}}/>
					</TouchableOpacity>
		        	<View style={{alignItems:'center',width:'60%',}}>
		        		<Text style={{color:'#fff',fontSize:20,fontWeight:'bold',}}>留言</Text>
		        	</View>
				

		        </View>

      <ScrollView style={{height:'85%'}}>
        <View style={{width:'100%',marginTop:5}}>
          <Text style={{fontSize:18,textAlign:'center'}}>{this.state.data.title}</Text>
        </View>
        <View style={{width:'60%',flexDirection:'row',marginLeft:'20%'}}>
          <Text style={{width:'50%',textAlign:'center'}}>{this.state.data.nickname}</Text>
          <Text style={{width:'50%',textAlign:'center'}}>{this.state.data.pudate}</Text>
        </View>
        <View style={{width:'90%',marginLeft:'5%'}}>
          <Text>{this.state.data.content}</Text>
        </View>
        <View style={{width:'90%',marginLeft:'5%'}}>
          <Image source={{uri:this.state.data.photo}} style={this.state.data.photo==''?{display:'none'}:{width:'100%',height:150,marginTop:8}} />
        </View>


            <View style={{height:'90%'}}>
              <Text style={{marginTop:10,borderColor:'#c0c0c0'}}>  全部评论</Text>
            
           {/*全部留言*/}
    <ListView 
				onEndReachedThreshold={10}
				dataSource={this.state.dataSource}
				renderRow={(rowData) =>
              <View style={{marginTop:10,borderBottomWidth:1, borderColor:'#dcdcdc'}}>
                <View style={rowData.photos==''?{display:'none'}:{height:40,flexDirection:'row',}}>
                  <Image source={{uri:rowData.photos}} style={{width: 30, height: 30,marginTop:10,marginLeft:15,borderRadius:25}} />
                  <Text style={{marginTop:16,color:'#005AB5', fontSize:13,height:20, marginLeft:10,}}>{rowData.nickname}</Text> 
                </View>
                <View style={{flex:1,marginLeft:30,marginRight:20,marginBottom:10}}>
                  <Text style={{fontSize:12,marginTop:5,flex:3,alignItems:'center'}}>{rowData.neirong}</Text>
                  <Text style={{fontSize:12,color:'#999',textAlign:'right'}}>{rowData.pubdate}</Text>
                </View>
              </View>
        }
        />
      </View>
      </ScrollView>
      </View>
        <View style={{ flexDirection: 'row',position:'absolute',bottom:0,backgroundColor:'#F5F5F5',width:'100%'}}>
            <TouchableOpacity onPress={()=>this.pingsub()} disabled={this.state.pingText?false:true}  style={{ width:'100%',flexDirection:'row'}}  activeOpacity={1}>

              <TextInput onFocus={()=>this.pingonFocus()} style={this.state.pingsub?styles.pingsubtrue:styles.pingsubfalse} onChangeText={(text)=>this.pingonChange(text)} onBlur={()=>this.pingonBlur()} underlineColorAndroid="transparent" placeholderTextColor='#B4B4B4' placeholder={'说点什么吧...'} multiline={true} />
                
                <Text style={this.state.pingsub?this.state.pingText?styles.pingTexttrue:styles.pingTextfalse:{display:'none'}}>发送</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
  tou: {
    width: '100%',
    flexDirection: 'row', // 水平排布
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#3fdab8',
  },
  houtui: {
    marginLeft: 10,
    marginTop: 15,
    height: 23,
    width: 23,
    resizeMode: 'stretch',
  },
  add: {
    height: 35,
    width: 40,
    marginTop: 10,
  },
  shuru: {
    elevation: 3,
    height: 230,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  pingsubfalse:{
    backgroundColor:'#e7e7e7',
    borderRadius:1,
    paddingBottom:6,
    borderWidth:1,
    width:'100%',
    height:40,
    borderColor:'#e0e0e0',
    paddingLeft:10,
  },
  pingsubtrue:{
    backgroundColor:'#fff',
    borderRadius:8,
    paddingBottom:6,
    borderWidth:1,
    width:'79%',
    height:35,
    borderColor:'#e0e0e0',
    paddingLeft:10,
  },
  pingTexttrue:{
    width:'16%',
    borderColor:'#3fdab8',
    borderWidth:1,
    backgroundColor:'#3fdab8',
    marginLeft:'2%',
    borderRadius:4,
    textAlign:'center',
    lineHeight:27,
    color:'#fff'
  },
  pingTextfalse:{
    width:'16%',
    borderColor:'#DFE0E2',
    borderWidth:1,
    backgroundColor:'#FEFEFE',
    marginLeft:'2%',
    borderRadius:4,
    textAlign:'center',
    lineHeight:27,
  },
});