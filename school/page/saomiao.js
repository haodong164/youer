import React,{Component} from 'react';
import{
AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View,
  Linking,
  TouchableOpacity,
  Alert,Image
}from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
export default class saomiao extends Component{
    constructor(props){
        super(props);
        this.state={
            barcode:'',
            tishi:'',
            cameraType:'back',
            text:'将二维码放入取景器',
            torchMode:'off',
            type:'',
            url:'',
        };
    }
    barcodeReceived(e){
		if(e.data){
			Linking.openURL(e.data);
		}

    }
    urlopen=()=>{
        if(this.state.url.substr(0,4)=='http'){
            Linking.openURL(this.state.url);
        }else{
            Alert.alert('Sorry~','这不是一个url地址 无法打开');
        }
    }
    render(){
        return(
            <View style={styles.container}>
				<View style={styles.tou}>
				    <TouchableOpacity onPress={()=>this.props.navigator.pop()}>
					    <Image  source={require('../img/hotui.png')} style={styles.houtui} onPress={this.houtui}/>
				    </TouchableOpacity>
				    <View style={{alignItems:'center',flex:1,}}>
					    <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>扫一扫</Text>
				    </View>
				</View>
                <BarcodeScanner
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    torchMode={this.state.torchMode}
                    style={{width:'100%',height:'92%'}}
                    cameraType={this.state.cameraType}
                >
            </BarcodeScanner>
            </View>

        );
    }
}
const styles = StyleSheet.create({
  container: {
    height:'100%',
    backgroundColor:'#FFF',
  },
  erweimaview:{
    position:'absolute',
    bottom:'35%',
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  erweimaview1:{
      position:'absolute',
      bottom:0,
      width:'100%',
      alignItems:'center',
      justifyContent:'center',
     backgroundColor:'rgba(0,0,0,.3)',
     padding:20,
  },
  statusBarText: {
    fontSize: 15,
    color:'#FFF',

  },
    	tou: {
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

});
