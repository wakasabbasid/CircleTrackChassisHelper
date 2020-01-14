import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Dimensions, ScrollView, ImageBackground, Linking } from 'react-native';
import Constants from 'expo-constants';
const { height, width } = Dimensions.get("window")
import TouchableOpacity from '../components/TouchableOpacity'


class MainScreen extends Component {

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

          <View style={{ justifyContent: 'space-evenly', flex: 1 }}>
            <View style={styles.fixToText}>
              <TouchableOpacity
              activeOpacity={.7}
                style={styles.leftbuttonPosition}
                onPress={() => this.navigationHandler('Loosein')} >
                <ImageBackground
                  style={{ width: 120, height: 120 }}
                  source={require('../assets/LOOSEINBUTTON.jpg')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rightbuttonPosition}
                onPress={() => this.navigationHandler('Tightin')} >
                <ImageBackground
                  style={{ width: 120, height: 120 }}
                  source={require('../assets/TIGHTINBUTTON.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.fixToText}>
              <TouchableOpacity
                style={styles.leftbuttonPosition}
                onPress={() => this.navigationHandler('Loosemiddle')} >
                <ImageBackground
                  style={{ width: 120, height: 120 }}
                  source={require('../assets/LOOSEMIDBUTTON.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rightbuttonPosition}
                onPress={() => this.navigationHandler('Tightmiddle')} >
                <ImageBackground
                  style={{ width: 120, height: 120 }}
                  source={require('../assets/TIGHTMIDBUTTON.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.fixToText}>
              <TouchableOpacity
                style={styles.leftbuttonPosition}
                onPress={() => this.navigationHandler('Looseoff')} >
                <ImageBackground
                  style={{ width: 120, height: 120 }}
                  source={require('../assets/LOOSEOFFBUTTON.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rightbuttonPosition}
                onPress={() => this.navigationHandler('Tightoff')} >
                <ImageBackground
                  style={{ width: 120, height: 120 }}
                  source={require('../assets/TIGHTOFFBUTTON.png')}
                />
              </TouchableOpacity>
            </View>

          </View>
          <View>
            <TouchableOpacity
              style={styles.ASButtonStyle}
              onPress={() => this.navigationHandler('Adjustmentscreen')}>
              <Text style={styles.ASButtonTextStyle}>Adjustment Sheets</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.contactButtonStyle}
              onPress={() => Linking.openURL('http://afloatart.com/privacypolicy.html')}>
              <Text style={styles.contactButtonTextStyle}>CONTACT : DEVELOPER</Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>



      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    marginHorizontal: 0,
    justifyContent: 'space-evenly',
    backgroundColor: '#FF8C00'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftbuttonPosition: {
    borderRadius: 15,
  },
  rightbuttonPosition: {    
    borderRadius: 15,    
  },
  titleStyle: {
    backgroundColor: 'black',
    paddingVertical: 3,
    alignItems: "center",
  },
  contactButtonStyle: {
    backgroundColor: 'black',
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'red'
  }, 
  contactButtonTextStyle: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'white',
    paddingVertical: 3,
    fontSize: 15
  },
  ASButtonStyle: {
    backgroundColor: 'white',
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'black'
  },
  ASButtonTextStyle: {
    width: '100%',
    textAlign: 'center',
    color: 'black',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'white',
    paddingVertical: 3,
    fontSize: 19,
    fontStyle: 'normal',
    // fontWeight:800
  }
});


export default MainScreen

