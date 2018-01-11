import React,{Component} from 'react';
import {
    ToolbarAndroid,
    DeviceEventEmitter,
    StyleSheet,
    Text,
    TouchableOpacity,
	View,
	Image
}from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import nav from './nav';
export default class handnav extends Component {
    constructor(props) {
	  super(props);
	  this.state = {
	  };
	}
    // houtui = () => {
		// this.props.navigator.push({
			// name: 'nav',
			// component: nav
		// });
	// }
    //初始化props
    static defaultProps = {
        title:'',//标题
        subtitle:'',//副标题
        subScene:true,//是否是子页面
    };

    render() {
        return(
            <View style={styles.tou}>
			        <TouchableOpacity onPress={this.houtui}>
			        	<Image  source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
			        </TouchableOpacity>
			        <View style={{alignItems:'center',flex:1,}}>
			        		<Text style={{color:'#fff',fontSize:16,}}>小一班课程表</Text>
			        </View>

		        </View>
        );
    }

    //返回按钮事件
    _onIconClick(){
		
    }
}

const styles = StyleSheet.create({
    tou: {
		flexDirection: 'row', // 水平排布    
		paddingLeft: 10,
		height: 50,
		paddingRight: 37,
		backgroundColor: '#1ebba6',
		alignItems: 'center' // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中    
	},
		houtui: {
		height: 23,
		width: 23,
		resizeMode: 'stretch',
	},
});