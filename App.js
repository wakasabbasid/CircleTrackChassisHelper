import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, Dimensions, ScrollView, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Constants from 'expo-constants';
import MainScreen from './screens/MainScreen';
const { height, width } = Dimensions.get("window")
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import LooseOFF from './screens/LooseOFF';
import LooseIN from './screens/LooseIN';
import LooseMIDDLE from './screens/LooseMIDDLE';
import TightMIDDLE from './screens/TightMIDDLE';
import TightIN from './screens/TightIN';
import TightOFF from './screens/TightOFF';
import AdjustmentScreen from './screens/AdjustmentScreen';
import SavedTracks from './screens/SavedTracks';


console.disableYellowBox = true;

class App extends Component {

  render() {  
     return (
       <View></View>
     )
  }
}
export default createAppContainer(createSwitchNavigator(
  {
    Mainscreen: MainScreen,
    Adjustmentscreen: AdjustmentScreen,
    Looseoff: LooseOFF,
    Loosein: LooseIN,
    Loosemiddle: LooseMIDDLE,
    Tightmiddle: TightMIDDLE,
    Tightin: TightIN,
    Tightoff: TightOFF,
    Savedtracks: SavedTracks
  },
  {
    initialRouteName: 'Mainscreen',
  }
));