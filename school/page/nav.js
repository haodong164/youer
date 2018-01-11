/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableHighlight,ScrollView, NativeModules, Dimensions
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';
import Carousel from 'react-native-carousel';
import index from './index';
import tongxun from './tongxun';
import dongtai from './dongtai';
import leyuan from './leyuan';
import tongzhi from './tongzhi';
import hudong from './hudong';
import photo from './photo';
import photo2 from './photo2';
import jilu from './jilu';
import kaoqin from './kaoqin';
import richeng from './richeng';
import xiangji from './xiangji';
import shengcheng from './shengcheng';
import saomiao from './saomiao';
import NetUtil from './NetUtil';
import fuwu from './fuwu';
import homework from './homework';
import gai from './gai';
import ditu from './ditu';
import shezhi from './shezhi';
import myleyuan from './myleyuan';
import abc from './abc';
import pingjia from './pingjia';
import Storage from 'react-native-storage';
var ImagePicker = NativeModules.ImageCropPicker;

export default class nav extends Component {

	
	constructor(props) {
		super(props);
		this.state = {
			userid:'',
			selectedTab: 'Event',
			userinfo:[],
			imageurl:'',
			telphone:'',
			identity:''
		}
	}
	pickSingle(crop,circular=false){
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: crop,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
    }).then(image=>{
      let _this=this;
      let url="http://www.ryaonet.cn/index.php/api/Api/photoss";
      let datas=new FormData();
      let file={uri:image.path,type:'multipart/form-data',name:'1.jpg'}
      datas.append("images",file);
      datas.append("userid",this.state.telphone);

      NetUtil.postimg(url,datas,function(result){
       	if(result.msg=='succ')
       	{
       		_this.setState({
	          imageurl:result.info,
	        });
	         storage.save({
				key: 'static',  // 注意:请不要在key中使用_下划线符号!
				data: { 
          			imageurl:result.info,
          			userid:_this.state.userid,
					telphone:_this.state.telphone,
					identity:_this.state.identity,
				},
				expires: null
			  });
	         
       	}
       	else{
       		alert('修改失败');
       	}
        
      })
    }).catch(e => alert(e));
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
		let url="http://www.ryaonet.cn/index.php/api/Api/nav";
		let parms={userid:ret.telphone};
		NetUtil.postJSON(url,parms,function(result){
			_this.setState({
				userinfo:result,
			});
		});
		  }).catch(err => {
			 
		  })
	}
	tuichu = () => {
		storage.remove({
		key: 'static'
		});
		this.props.navigator.push({
			name:'index',
			component:index
		});
	}
	gai = () => {
		this.props.navigator.push({
			name: 'gai',
			component: gai
		});
	}
	pingjia = () => {
		this.props.navigator.push({
			name: 'pingjia',
			component: pingjia
		});
	}
	tongxun = () => {
		this.props.navigator.push({
			name: 'tongxun',
			component: tongxun
		});
	}
	skip = () => {
		this.props.navigator.push({
			name: 'leyuan',
			component: leyuan,
		});
	}
	photo = () => {
		this.props.navigator.push({
			name: 'photo',
			component: photo,
		});
	}
	abc = () => {
		this.props.navigator.push({
			name: 'abc',
			component: abc,
		});
	}
	fanhui = () => {
		this.props.navigator.pop();
	}
	dongtai = () => {
		this.props.navigator.push({
			name: 'dongtai',
			component: dongtai
		});
	}
	leyuan = () => {
		this.props.navigator.push({
			name: 'leyuan',
			component: leyuan
		});
	}
	myleyuan = () => {
		this.props.navigator.push({
			name: 'myleyuan',
			component: myleyuan
		});
	}
	tongzhi = () => {
		this.props.navigator.push({
			name: 'tongzhi',
			component: tongzhi
		});
	}
	hudong = () => {
		this.props.navigator.push({
			name: 'hudong',
			component: hudong
		});
	}
	photo = () => {
		this.props.navigator.push({
			name: 'photo',
			component: photo
		});
	}
	photo2 = () => {
		this.props.navigator.push({
			name: 'photo2',
			component: photo2
		});
	}
	homework = () => {
		this.props.navigator.push({
			name:'homework',
			component:homework
		});

	}
	jilu = () => {
		this.props.navigator.push({
			name: 'jilu',
			component: jilu
		});
	}
	kaoqin = () => {
		this.props.navigator.push({
			name: 'kaoqin',
			component: kaoqin
		});
	}
	xiangji = () => {
		this.props.navigator.push({
			name: 'xiangji',
			component: xiangji
		});
	}
	shengcheng = () => {
		this.props.navigator.push({
			name: 'shengcheng',
			component: shengcheng
		});
	}
	saomiao= () => {
		this.props.navigator.push({
			name: 'saomiao',
			component: saomiao
		});
	}
	richeng= () => {
		this.props.navigator.push({
			name: 'richeng',
			component: richeng
		});
	}
	fuwu= () => {
		this.props.navigator.push({
			name: 'fuwu',
			component: fuwu
		});
	}
	ditu= () => {
		this.props.navigator.push({
			name: 'ditu',
			component: ditu
		});
	}
	shezhi= () => {
		this.props.navigator.push({
			name: 'shezhi',
			component: shezhi
		});
	}
	
	render() {
		if(this.state.identity=='教师')
			{
				return (
			<View style={styles.container}>
				
                <TabNavigator>
                    <TabNavigator.Item
                        //设置选中的位置
                        selected={this.state.selectedTab === 'Event'}
                        //标题
                        title="首页"
                        //标题样式
                        titleStyle={styles.tabText}
                        //选中时标题文字样式
                        selectedTitleStyle={styles.selectedTabText}
                        //图标
                        renderIcon={() => <Image style={styles.icon} source={require("../img/houzi.png")} />}
                        //选中时图标
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'#008B45'}]} source={require("../img/houzi.png")} />}
                        //点击Event
                        onPress={() => this.setState({ selectedTab: 'Event' })}>
                        <View style={styles.page0}>
		<View>
      <View style={styles.head1}>
        <Text style={{fontWeight:'700',color:'#fff',fontSize:20,}}>
			智慧幼儿园
        </Text>
      </View>
      <View style={{height:150}}>
	<Carousel indicatorOffset={-20} inactiveIndicatorColor={'#999'} indicatorColor={'#dcdcdc'} delay={3000}>
      <Image source={require('../img/banner9.jpg')} style={{width:null,height:150}} />
      <Image source={require('../img/banner2.jpg')} style={{width:null,height:150}} />
      </Carousel>
      </View>
        <View style={{alignItems:'center',backgroundColor:'#fff'}}>
          <View style={styles.dawaikuang}>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.dongtai}>
					<Image source={require('../img/1.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.dongtai} style={styles.waikuangtext}>校园动态</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.tongzhi}>
					<Image source={require('../img/2.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.tongzhi} style={styles.waikuangtext}>班级通知</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.richeng}>
					<Image source={require('../img/3.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.richeng} style={styles.waikuangtext}>班级日程</Text>
            </View>
          </View>
          <View style={styles.dawaikuang}>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.photo}>
					<Image source={require('../img/4.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.photo} style={styles.waikuangtext}>班级相册</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.kaoqin}>
					<Image source={require('../img/5.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.kaoqin} style={styles.waikuangtext}>幼儿考勤</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.jilu}>
					<Image source={require('../img/6.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.jilu} style={styles.waikuangtext}>成长记录</Text>
            </View>
          </View>
          <View style={styles.dawaikuang}>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.hudong}>
					<Image source={require('../img/7.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.hudong} style={styles.waikuangtext}>互动圈</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.tongxun}>
					<Image source={require('../img/8.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.tongxun} style={styles.waikuangtext}>及时通讯</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.leyuan}>
					<Image source={require('../img/9.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.leyuan} style={styles.waikuangtext}>成长乐园</Text>
            </View>
          </View>
        </View>
		
      </View>


                        </View>
                    </TabNavigator.Item>
					<TabNavigator.Item
                        selected={this.state.selectedTab === 'Device'}
                        title="我的班级"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={[styles.icon,]} source={require("../img/xm.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'#008B45'}]} source={require("../img/xm.png")} />}
                        onPress={() => this.setState({ selectedTab: 'Device' })}>
                        <View style={styles.page1}>
<View>
        <View style={styles.tou} >
          
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.header}>我的班级</Text>
          </View>
        </View>
        <View style={{height:170}}>
          <Carousel indicatorOffset={-20} inactiveIndicatorColor={'#999'} indicatorColor={'#dcdcdc'} delay={3000}>
            <Image source={require('../img/bannerb.jpg')} style={{height:170}}/>
            <Image source={require('../img/bannerc.jpg')} style={{height:170}}/>
          </Carousel>
        </View>
         <View style={styles.foot2}>
			
			{// <View style={styles.foots}>
			  // <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.ditu}>
	              // <View style={{flexDirection: 'row',height: 45,alignItems: 'center',}}>
						// <Image source={require('../img/leyuan.png')} style={{width:23,height:23 ,marginLeft:20}}/>
						// <Text onPress={this.ditu} style={{marginLeft:10}}>校园地图</Text>
	               // </View>
	                // <View style={{flexDirection: 'row',height: 45,alignItems: 'center',marginLeft:200}}>
						  // <TouchableOpacity onPress={this.ditu}>
							// <Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
						  // </TouchableOpacity>
					// </View>
				// </TouchableOpacity>
			// </View>
			}
            <View style={styles.foots}>
			<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.homework}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
	                  <Image source={require('../img/zz.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
	                 <Text style={{marginLeft:10}}>班级作业</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				</TouchableOpacity>
            </View>
			
            <View style={styles.foots}>
			<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.photo}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						<Image source={require('../img/nao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						<Text style={{marginLeft:10}}>班级相册</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
			  </TouchableOpacity>
              </View>
			  
			  <View style={this.state.identity=='教师'?styles.foots:{display:'none'}}>
			<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.pingjia}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						<Image source={require('../img/nao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						<Text style={{marginLeft:10}}>评价学生</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
			  </TouchableOpacity>
              </View>

               <View style={styles.foots}>
			   <TouchableOpacity style={{flexDirection: 'row'}} >
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
	                  <Image source={require('../img/suo.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
	                 <Text  style={{marginLeft:10}}>更多栏目正在飞奔中·····</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				</TouchableOpacity>
				</View>
              {/*<View style={styles.footer}>
                  <TouchableHighlight>
                      <Text onPress={this.fanhui} style={{color:'#fff', fontSize:20}}>返      回</Text>
                  </TouchableHighlight>
              </View>*/}
          </View>
      </View>


                        </View>
                    </TabNavigator.Item>
                    
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'User'}
                        title="个人中心"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../img/yz.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'#008B45'}]} source={require("../img/yz.png")} />}
                        onPress={() => this.setState({ selectedTab: 'User' })}>
                        <View style={styles.page1}>
                           
<ScrollView>
        <View style={{backgroundColor:'#EBEBEB'}}>
			<View style={styles.tou}>
			    <View style={{alignItems:'center'}}>
			       <Text style={{color:'#fff',fontSize:20,fontWeight: 'bold',}}>个人中心</Text>
			    </View>
		    </View>
			<View style={{height: 170,alignItems: 'center',backgroundColor: '#e1dac8',width:'100%'}}>
			<TouchableOpacity onPress={() => this.pickSingle(true,true)}>
				<Image source={{uri:this.state.imageurl}} style={{width: 100,height: 100,marginTop: 15,borderRadius: 50,}}/>
			</TouchableOpacity>
				<Text style={{marginTop:15,fontWeight:'bold',fontSize:20}}>{this.state.userinfo.truename}</Text>
          </View>
			<View style={styles.foot2}>
				<View style={styles.foots}>
				<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.saomiao}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						  <Image source={require('../img/sao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						 <Text style={{marginLeft:10}}>扫一扫</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
			  </TouchableOpacity>
				 </View>
				 
				 <View style={styles.foots}>
				 <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.fuwu}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						<Image source={require('../img/nao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						<Text style={{marginLeft:10}}>服务到期时间</Text>
	                 </View>
	                 <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				 </TouchableOpacity>
				 </View>
				 
				 <View style={styles.foots}>
				 <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.gai}>

	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						  <Image source={require('../img/suo.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						  <Text style={{marginLeft:10}}>修改密码</Text>
	                 </View>
	                 <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				 </TouchableOpacity>
				 </View>
				<View style={styles.foots}>
				 <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.tuichu}>
			  		<Text style={{width:'100%',fontSize:18,textAlign:'center'}}>退出登录</Text>
	                  {/* <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						  <Image source={require('../img/shezhi.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						  <Text style={{marginLeft:10}}>设置</Text>
	                 </View>
	                 <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View> */}
				 </TouchableOpacity>
				 </View>
				 {
				 // <TouchableOpacity style={styles.dibu}>
					// <Text style={styles.di} onPress={this.tuichu}>退出登录</Text>
				 // </TouchableOpacity>
				 }
			 </View>
		</View>
</ScrollView>


                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
		);
			}else{
		return (
			<View style={styles.container}>
				
                <TabNavigator>
                    <TabNavigator.Item
                        //设置选中的位置
                        selected={this.state.selectedTab === 'Event'}
                        //标题
                        title="首页"
                        //标题样式
                        titleStyle={styles.tabText}
                        //选中时标题文字样式
                        selectedTitleStyle={styles.selectedTabText}
                        //图标
                        renderIcon={() => <Image style={styles.icon} source={require("../img/houzi.png")} />}
                        //选中时图标
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'#008B45'}]} source={require("../img/houzi.png")} />}
                        //点击Event
                        onPress={() => this.setState({ selectedTab: 'Event' })}>
                        <View style={styles.page0}>
		<View>
      <View style={styles.head1}>
        <Text style={{fontWeight:'700',color:'#fff',fontSize:20,}}>
			智慧幼儿园
        </Text>
      </View>
      <View style={{height:150}}>
	<Carousel indicatorOffset={-20} inactiveIndicatorColor={'#999'} indicatorColor={'#dcdcdc'} delay={3000}>
      <Image source={require('../img/banner9.jpg')} style={{width:null,height:150}} />
      <Image source={require('../img/banner2.jpg')} style={{width:null,height:150}} />
      </Carousel>
      </View>
        <View style={{alignItems:'center',backgroundColor:'#fff'}}>
          <View style={styles.dawaikuang}>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.dongtai}>
					<Image source={require('../img/1.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.dongtai} style={styles.waikuangtext}>校园动态</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.tongzhi}>
					<Image source={require('../img/2.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.tongzhi} style={styles.waikuangtext}>班级通知</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.richeng}>
					<Image source={require('../img/3.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.richeng} style={styles.waikuangtext}>班级日程</Text>
            </View>
          </View>
          <View style={styles.dawaikuang}>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.photo}>
					<Image source={require('../img/4.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.photo} style={styles.waikuangtext}>班级相册</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.kaoqin}>
					<Image source={require('../img/5.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.kaoqin} style={styles.waikuangtext}>幼儿考勤</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.jilu}>
					<Image source={require('../img/6.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.jilu} style={styles.waikuangtext}>成长记录</Text>
            </View>
          </View>
          <View style={styles.dawaikuang}>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.hudong}>
					<Image source={require('../img/7.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.hudong} style={styles.waikuangtext}>互动圈</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.tongxun}>
					<Image source={require('../img/8.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.tongxun} style={styles.waikuangtext}>及时通讯</Text>
            </View>
            <View style={styles.waikuang}>
				<TouchableOpacity onPress={this.leyuan}>
					<Image source={require('../img/9.png')} style={styles.waikuangimg} />
				</TouchableOpacity>
				<Text onPress={this.leyuan} style={styles.waikuangtext}>成长乐园</Text>
            </View>
          </View>
        </View>
		
      </View>


                        </View>
                    </TabNavigator.Item>
					<TabNavigator.Item
                        selected={this.state.selectedTab === 'Device'}
                        title="我的班级"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={[styles.icon,]} source={require("../img/xm.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'#008B45'}]} source={require("../img/xm.png")} />}
                        onPress={() => this.setState({ selectedTab: 'Device' })}>
                        <View style={styles.page1}>
<View>
        <View style={styles.tou} >
          
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.header}>我的班级</Text>
          </View>
        </View>
        <View style={{height:170}}>
          <Carousel indicatorOffset={-20} inactiveIndicatorColor={'#999'} indicatorColor={'#dcdcdc'} delay={3000}>
            <Image source={require('../img/bannerb.jpg')} style={{height:170}}/>
            <Image source={require('../img/bannerc.jpg')} style={{height:170}}/>
          </Carousel>
        </View>
         <View style={styles.foot2}>
			
			{// <View style={styles.foots}>
			  // <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.ditu}>
	              // <View style={{flexDirection: 'row',height: 45,alignItems: 'center',}}>
						// <Image source={require('../img/leyuan.png')} style={{width:23,height:23 ,marginLeft:20}}/>
						// <Text onPress={this.ditu} style={{marginLeft:10}}>校园地图</Text>
	               // </View>
	                // <View style={{flexDirection: 'row',height: 45,alignItems: 'center',marginLeft:200}}>
						  // <TouchableOpacity onPress={this.ditu}>
							// <Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
						  // </TouchableOpacity>
					// </View>
				// </TouchableOpacity>
			// </View>
			}
            <View style={styles.foots}>
			<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.homework}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
	                  <Image source={require('../img/zz.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
	                 <Text style={{marginLeft:10}}>班级作业</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				</TouchableOpacity>
            </View>
			
            <View style={styles.foots}>
			<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.photo}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						<Image source={require('../img/nao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						<Text style={{marginLeft:10}}>班级相册</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
			  </TouchableOpacity>
              </View>
			  
			  <View style={this.state.identity=='教师'?styles.foots:{display:'none'}}>
			<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.pingjia}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						<Image source={require('../img/nao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						<Text style={{marginLeft:10}}>评价学生</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
			  </TouchableOpacity>
              </View>

               <View style={styles.foots}>
			   <TouchableOpacity style={{flexDirection: 'row'}} >
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
	                  <Image source={require('../img/suo.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
	                 <Text  style={{marginLeft:10}}>更多栏目正在飞奔中·····</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				</TouchableOpacity>
				</View>
              {/*<View style={styles.footer}>
                  <TouchableHighlight>
                      <Text onPress={this.fanhui} style={{color:'#fff', fontSize:20}}>返      回</Text>
                  </TouchableHighlight>
              </View>*/}
          </View>
      </View>


                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Log'}
                        title="我的宝贝"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../img/hema.png")} />}
                        renderSelectedIcon={() =>  <Image style={[styles.icon,{tintColor:'#008B45'}]} source={require("../img/hema.png")} />}
                        onPress={() => this.setState({ selectedTab: 'Log' })}>
                        <View style={styles.page1}>
<View>
        <View style={styles.tou} >
          
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.header}>我的宝贝</Text>
          </View>
        </View>
          <View style={{height: 170,alignItems: 'center',backgroundColor: '#e1dac8',width:'100%'}}>
            <Image source={require('../img/photo.jpg')} style={{width: 100,height: 100,marginTop: 15,borderRadius: 50,}}/>
            <Text style={{marginTop:15,fontWeight:'bold',fontSize:20}}>{this.state.userinfo.sname}</Text>
          </View>
          <View style={styles.foot2}>
		  
              <View style={styles.foots}>
			  <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.shengcheng}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
	                  <Image source={require('../img/sao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
	                 <Text style={{marginLeft:10}}>个人资料</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				</TouchableOpacity>
              </View>
              <View style={styles.foots}>
				<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.photo2}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
	                  <Image source={require('../img/zz.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
	                 <Text style={{marginLeft:10}}>宝宝照片</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				</TouchableOpacity>
              </View>
              <View style={styles.foots}>
			  
			  <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.myleyuan}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
	                  <Image source={require('../img/leyuan.png')} style={{width:25,height:25 ,marginLeft:20}}/>
	                 <Text style={{marginLeft:5}}>我的评价</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
			  </TouchableOpacity>
              </View>
              {/*<View style={styles.footer}>
                  <TouchableHighlight>
                      <Text onPress={this.fanhui} style={{color:'#fff', fontSize:20}}>返      回</Text>
                  </TouchableHighlight>
              </View>*/}
          </View>
      </View>


                        </View>
                    </TabNavigator.Item>
                    
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'User'}
                        title="个人中心"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../img/yz.png")} />}
                        renderSelectedIcon={() => <Image style={[styles.icon,{tintColor:'#008B45'}]} source={require("../img/yz.png")} />}
                        onPress={() => this.setState({ selectedTab: 'User' })}>
                        <View style={styles.page1}>
                           
<ScrollView>
        <View style={{backgroundColor:'#EBEBEB'}}>
			<View style={styles.tou}>
			    <View style={{alignItems:'center'}}>
			       <Text style={{color:'#fff',fontSize:20,fontWeight: 'bold',}}>个人中心</Text>
			    </View>
		    </View>
			<View style={{height: 170,alignItems: 'center',backgroundColor: '#e1dac8',width:'100%'}}>
			<TouchableOpacity onPress={() => this.pickSingle(true,true)}>
				<Image source={{uri:this.state.imageurl}} style={{width: 100,height: 100,marginTop: 15,borderRadius: 50,}}/>
			</TouchableOpacity>
				<Text style={{marginTop:15,fontWeight:'bold',fontSize:20}}>{this.state.userinfo.truename}</Text>
          </View>
			<View style={styles.foot2}>
				<View style={styles.foots}>
				<TouchableOpacity style={{flexDirection: 'row'}} onPress={this.saomiao}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						  <Image source={require('../img/sao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						 <Text style={{marginLeft:10}}>扫一扫</Text>
	                 </View>
	                  <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
			  </TouchableOpacity>
				 </View>
				 
				 <View style={styles.foots}>
				 <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.fuwu}>
	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						<Image source={require('../img/nao.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						<Text style={{marginLeft:10}}>服务到期时间</Text>
	                 </View>
	                 <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				 </TouchableOpacity>
				 </View>
				 
				 <View style={styles.foots}>
				 <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.gai}>

	                  <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						  <Image source={require('../img/suo.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						  <Text style={{marginLeft:10}}>修改密码</Text>
	                 </View>
	                 <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View>
				 </TouchableOpacity>
				 </View>
				<View style={styles.foots}>
				 <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.tuichu}>
					<Text style={{width:'100%',fontSize:18,textAlign:'center'}}>退出登录</Text>

	                  {/* <View style={{flexDirection: 'row',height: 45,alignItems: 'center',width:'85%'}}>
						  <Image source={require('../img/shezhi.jpg')} style={{width:20,height:20 ,marginLeft:20}}/>
						  <Text style={{marginLeft:10}}>设置</Text>
	                 </View>
	                 <View  style={{flexDirection: 'row',height: 45,alignItems: 'center',marginRight:10,width:'20%'}}>
							<Image source={require('../img/login.jpg')} style={{width:19,height:19}}/>
					</View> */}
				 </TouchableOpacity>
				 </View>
				 {
				 // <TouchableOpacity style={styles.dibu}>
					// <Text style={styles.di} onPress={this.tuichu}>退出登录</Text>
				 // </TouchableOpacity>
				 }
			 </View>
		</View>
</ScrollView>


                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
		);
			}
	}
}

const styles = StyleSheet.create({
	//底部导航
	container: {
		flex: 1
	},
	tabText: {
		fontSize: 10,
		color: 'black'
	},
	selectedTabText: {
		fontSize: 10,
		color: '#008B45'
	},
	icon: {
		width: 22,
		height: 22
	},
	page0: {
		flex: 1,
		backgroundColor: '#fff'
	},
	page1: {
		flex: 1,
		backgroundColor: '#ebebeb'
	},
	//首页样式
	head1: {
		height: 50,
		backgroundColor: '#3fdab8',
		justifyContent: 'center',
		alignItems: 'center',
	},
	waikuang: {
		width: 100,
		height: 90,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		borderRadius: 5,
		borderColor: '#fff',
	},
	waikuangimg:{
		width:65,
		height:65
	},
	waikuangtext:{
		color:'#e87e1f',
		fontSize:14,
	},
	dawaikuang: {
		flexDirection: 'row',
	},
	foot: {
		//borderTopWidth:1,
		height: 45,
		//borderColor:'#3fdab8',
		backgroundColor: '#F4F4F4',
		flexDirection: 'row',
		alignItems: 'center',
	},
	foots: {
		//width: 75,
		// height: 50,
		borderColor: '#000',
		// marginLeft: 16,
		width:'90%',
		height: 45,
		backgroundColor: '#fff',
		marginTop: 30,
		flexDirection: 'row',
		alignItems: 'center',
	},
	foot1s: {
		borderColor: '#000',
		width:'90%',
		height: 45,
		backgroundColor: '#fff',
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
	},


	//我的宝贝
	head: {
		width: '100%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#3fdab8',
	},
	heads: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold',
		width:'60%',
		marginLeft:'20%',
		textAlign:'center'
	},
	banner: {
		width: 390,
		height: 200,
		alignItems: 'center',
		backgroundColor: '#e1dac8',
	},
	photo: {
		width: 100,
		height: 100,
		marginTop: 15,
		borderRadius: 50,
	},
	foot2: {
		width:'100%',
		backgroundColor: '#EBEBEB',
		alignItems: 'center',
		height:'100%'
	},
	footers: {
		fontSize: 20,
		color: '#fff',
	},
	//我的班级
	//
	heads2: {
		backgroundColor: '#3fdab8',
		height: 50,
		//flexDirection: 'row',
		alignItems: 'center',
		justifyContent:'center',
	},
	header: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 20,
	},
	foot3: {
		marginLeft: 75,
		fontSize: 15,
	},
	footer: {
		marginLeft: 75,
		fontSize: 15,
	},


	//个人中心
	tou: {
		// position: 'absolute',
		//flexDirection: 'row', // 水平排布    
		//paddingLeft: 10,
		height: 50,
		//paddingRight: 37,
		backgroundColor: '#3fdab8',
		alignItems: 'center', // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中 
		justifyContent:'center',		
	},
	houtui: {
		height: 23,
		width: 30,
		resizeMode: 'stretch',
	},
	zong: {
		width: null,
		height: 150,
		backgroundColor: '#e1dbcb',
	},
	li: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 100,
	},
	bu: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
	},
	qu: {
		fontSize: 20,
	},
	foots4: {
		width: 340,
		height: 47,
		backgroundColor: '#fff',
		marginTop: 13,
		flexDirection: 'row',
		alignItems: 'center',
		margin: 20,
	},
	dibu: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#1fbba6',
		width: 340,
		height: 35,
	},
	di: {
		color: '#fff',
		fontSize: 20,
	}
});