'use strict';
import React, {
  Component
} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import Util from './utils';
import index from './index';

let image1 = require('../img/guide_1.png');
let image2 = require('../img/guide_2.png');
let image3 = require('../img/guide_3.png');
export default class guideView extends Component {
  constructor(props){
    super(props);
    this.state=({
		
    });
};
	index = () => {
		this.props.navigator.push({
			name: 'index',
			component: index
		});
	}
  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        pagingEnabled={true}
        horizontal={true}>
        <Image source={image1} style={styles.backgroundImage}>
			<Text onPress={this.index}>1231212312</Text>
		</Image>
        <Image source={image2} style={styles.backgroundImage}>
			<Text>1231212312</Text>
		</Image>
        <Image source={image3} style={styles.backgroundImage}>
			<Text>1231212312</Text>
		</Image>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    width: Util.size.width * 3,
    height: Util.size.height,
  },
  backgroundImage: {
    width: Util.size.width,
    height: Util.size.height,
  },
});