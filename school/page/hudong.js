import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,Alert,
  TouchableOpacity,
  ScrollView,
  PullView,
  TextInput,
  TouchableHighlight,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import {
  Navigator
} from 'react-native-deprecated-custom-components';
import pinglun from './pinglun';
import hudongnei from './hudongnei';
import liuyan from './liuyan';
import NetUtil from './NetUtil';
import fabu1 from './fabu1';
import fabu from './fabu';
import nav from './nav';
import {
  PullList
} from 'react-native-pull';

var {
  width,
  height
} = Dimensions.get('window');

export default class hudong extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      telphone:'',
      index:10,
      dianzan:10,
      id: 'no',
      nickname: 'no',
      pudata: 'no',
      content: 'no',
      img:1,
      identity:'',
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2}),
      
    });
  }

  componentWillMount() {
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
		  })


    storage.load({
      key: 'studentlist',
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    }).then(ret => {
      let _this = this;
      _this.setState({
        datalist:studata,//本地缓存(注释之后)
        dataSource: _this.state.dataSource.cloneWithRows(ret.studata),
      });

    }).catch(err => {
    // alert(this.state.telphone);
      let _this = this;
      let url = 'http://www.ryaonet.cn/index.php/api/Api/xinwen';
      let parms = {'tel':this.state.telphone,'identity':this.state.identity};
      NetUtil.postJSON(url,parms, function(result) {
        _this.setState({
          dataSource: _this.state.dataSource.cloneWithRows(result),
        });
        storage.save({
          key: 'studentlist', // 注意:请不要在key中使用_下划线符号!
          data: {
            studata: result,
          },
          expires: null
        });
      });
    })
  }

  houtui = () => {
    this.props.navigator.push({
      name: 'nav',
      component: nav
    });
  }

  fabu1 = (id) => {
    const {
      navigator
    } = this.props;
    if (navigator) {
      navigator.push({
        name: 'fabu1',
        component: fabu1,
        params: {
          userid: id,
        }
      })
    }
  }
  hudongnei = (rowData) => {
    const {navigator} = this.props;
    if (navigator) {
      navigator.push({
        name: 'hudongnei',
        component: hudongnei,
        params: {
          data:rowData,
        }
      })
    }
  }

  _onPressButton=(id)=>{
    // alert(this.state.telphone+this.state.identity+id);
    succs = (res) => {
      if (res== 'succ') {
        let _this = this;
        let url = 'http://www.ryaonet.cn/index.php/api/Api/xinwen';
        let parms = {'tel':this.state.telphone,'identity':this.state.identity};
        NetUtil.postJSON(url,parms, function(result) {
          _this.setState({
            dataSource: _this.state.dataSource.cloneWithRows(result),
          });
        storage.save({
          key: 'studentlist', // 注意:请不要在key中使用_下划线符号!
          data: {
            studata: result,
          },
          expires: null
         });
        });
      }if(res== 'fail') {
        Alert('错误');
      }
    }
    let _this=this;
    let url = 'http://www.ryaonet.cn/index.php/api/Api/dianzan';
    let params = {
      'telphone':this.state.telphone,
      'identity':this.state.identity,
      'id':id
    };
    let rest = NetUtil.postJSON(url,params, function(result) {
      this.succs(result);
    })
  }
  //   this.setState({dianzan:this.state.dianzan+1});
  //   this.setState({img:this.state.img-1});
  // }
  fabu = () => {
    this.props.navigator.push({
      name: 'fabu',
      component: fabu
    });
  }

    yidian=()=>{
      Alert.alert(
        '提示',
        '您已赞过',
        [{text: '取消'}]
      ) 
    }

  pullrelease = (resolve) => {
    let _this = this;
    let url = 'http://www.ryaonet.cn/index.php/api/Api/xinwen';
    let parms = {'tel':this.state.telphone,'identity':this.state.identity,};
    NetUtil.postJSON(url,parms,function(result) {
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRows(result),
      });
      storage.save({
        key: 'studentlist', // 注意:请不要在key中使用_下划线符号!
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
    <View style={styles.tou}>
    
              <TouchableOpacity onPress={this.houtui} >
                <Image source={require('../img/hotui.png')} style={styles.houtui} />
                  </TouchableOpacity>
     
                  <View style={{alignItems:'center',}}>
                  <Text style={{color:'#fff',fontSize:20,fontWeight:'bold',marginTop:15}}>互动区</Text>
              </View>
        
              <TouchableOpacity onPress={this.fabu}>
                   <Image source={require('../img/add.png')} style={styles.add} />
              </TouchableOpacity>
        
</View>

   
<View style={{width:'100%',height:height-74}}>
<PullList onPullRelease={this.pullrelease}
 dataSource={this.state.dataSource}
          renderRow={(rowData) =>

<View>
    
        <View style={styles.diyihang}>
            <Image source={{uri:rowData.familyphoto}} style={{height: 47,width:47,borderRadius:30,}}/>
            <View style={styles.jieshao}>
                <Text style={{color:'#6C6C6C',fontSize:19,marginTop:25}}>{rowData.nickname}</Text>
            </View>
        </View>
     
    <View style={styles.pinglun}>
      <TouchableOpacity onPress={this.hudongnei.bind(this,rowData)}>
          <View style={styles.jieshao1}>
                <Text style={{fontSize:16,color:'#4F4F4F',}}>{rowData.title}</Text>
                <Text></Text>
                <Text style={{fontSize:12,color:'#8E8E8E',marginTop:-5}}>{rowData.pudate}</Text>
          </View>
		  </TouchableOpacity>
		  <TouchableOpacity activeOpacity={1} onPress={this.hudongnei.bind(this,rowData)}>
				<Text style={{fontSize:14,color:'#7B7B7B',lineHeight:22}}>{rowData.content}</Text>
				<Image source={{uri:rowData.photo}} style={rowData.photo==''?{display:'none'}:{width:'100%',height:150,marginTop:8}} />
		  </TouchableOpacity>

		  <View style={{height:20,width:'100%',marginTop:5,borderBottomWidth:1,borderColor:'#d0d0d0',paddingBottom:28}}>
				 <View style={{alignSelf:'flex-end',flexWrap:'wrap',}}>
           {/*点赞*/}
            <View style={{flexDirection:'row',height:30,width:50}}>
              <TouchableOpacity style={rowData.state==0?'':{display:'none'}} onPress={this._onPressButton.bind(this,rowData.id)}>
                <Image source={require('../img/xin.png')} style={{width:20,height:20,tintColor:'#5B5B5B'}}/>
              </TouchableOpacity>
 
              <TouchableOpacity style={rowData.state==1?'':{display:'none'}} onPress={this.yidian}>
                <Image source={require('../img/xin1.png')} style={{width:20,height:20}}/>
              </TouchableOpacity> 

                <Text style={{marginRight:20,color:'#5B5B5B',fontSize:14,marginTop:1}}>{rowData.dianzan}</Text>
            </View>



            {/*评论*/}
					<TouchableNativeFeedback onPress={this.hudongnei.bind(this,rowData)}>
				  	<Image source={require('../img/text.png')} style={{width:20,height:20,tintColor:'#5B5B5B',marginTop:1}} />
					</TouchableNativeFeedback>
					  <Text style={{marginRight:20,color:'#5B5B5B',fontSize:14,marginTop:1}}>{rowData.num}</Text>
				</View> 
		  </View>
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
  pinglun: {
    marginLeft: 11,
    marginRight: 11,
  },
  container: {
    alignItems: 'center',
  },
  diyihang: {
    height: 40,
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 11,
    marginRight: 11,
    marginBottom: 15,

  },
  jieshao: {
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row', // 水平排布
  },
  jieshao1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 30,
    flexDirection: 'row', // 水平排布
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

});