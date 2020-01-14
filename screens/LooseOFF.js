import React, { Component } from 'react';
import { StyleSheet, Button, View, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { Image } from 'react-native';
import Constants from 'expo-constants';
const { height, width } = Dimensions.get("window")
import {styles} from '../styles.js'
import Text from '../components/Text'
import TouchableOpacity from '../components/TouchableOpacity'

class LooseOFF extends Component {

  ms_buttonpress = () => {
    this.props.navigation.navigate('Mainscreen')
  }
  navigationHandler = (screenName) => {
    this.props.navigation.navigate(screenName)
}

  render() {

    let pic = require("../assets/ADJUSTMENTTABS.png");
    return (
      <View style={styles.container}>
        <ImageBackground source={pic} style={{ width: width, height: height - Constants.statusBarHeight }}>
          <View style={styles.titleStyle} >
            <Text style={{ color: 'white' }}>CIRCLE TRACK CHASIS HELP</Text>
          </View>
          <View style={{ height: 10 }} />
          <ImageBackground source={require('../assets/LooseOFF.png')} style={{ width: width, flex: 1 }} resizeMode= 'stretch'>
          </ImageBackground>
          {/*  */}
          <View style={{
            flexDirection: 'row', justifyContent: 'space-evenly',
            //backgroundColor:'yellow',
            alignItems:'center',
            height:60,
            //marginBottom: -2, 
            paddingTop: 5
          }}>
            <TouchableOpacity
              style={styles.rightscreenButtonStyle}
              onPress={()=>this.navigationHandler('Loosein')} >
              <Text style={styles.contactButtonTextStyle}>LOOSE IN</Text>
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
            //style={styles.contactButtonStyle}
            onPress={this.ms_buttonpress}
            >
              <ImageBackground 
                resizeMode='stretch'
                style={{ height:50, width: 75, }}
                source={require('../assets/mainScreenButton.png')}
              />
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              style={styles.leftscreenButtonStyle}
              onPress={()=>this.navigationHandler('Loosemiddle')}>
              <Text style={styles.contactButtonTextStyle}>LOOSE MID</Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>



      </View>
    );
  }
}

export default LooseOFF

