import {StyleSheet, Dimensions} from 'react-native'
import Constants from 'expo-constants';
const { height, width } = Dimensions.get("window")


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      marginHorizontal: 0,
      justifyContent: 'space-evenly',
      // backgroundColor: 'yellow'
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      //height: 150,
      // marginTop: 70,
      // paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    leftbuttonPosition: {
      // marginLeft: 40,
      borderRadius: 15,
      //marginTop: 90,
      //backgroundColor: 'blue',
      //width: 100
    },
    rightbuttonPosition: {
      // marginRight: 40,
      borderRadius: 15,
      //marginTop: 100,
      //backgroundColor: 'blue',
      //width: 100  
    },
    titleStyle: {
      backgroundColor: 'black',
      paddingVertical: 3,
      alignItems: 'center',
      // marginTop: 5,
    },
    rightscreenButtonStyle: {
      backgroundColor: 'black',
      alignItems: "center",
      // marginLeft: 40,
      // marginRight: 40,
      // marginBottom: 10,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: 'red',
      width: 105,
    },
    leftscreenButtonStyle: {
      backgroundColor: 'black',
      alignItems: "center",
      // marginLeft: 40,
      // marginRight: 40,
      // marginBottom: 10,
      borderRadius: 15,
      borderWidth: 3,
      borderColor: 'red',
      width: 105,
    },
    contactButtonStyle: {
      backgroundColor: 'black',
      alignItems: "center",
      // marginLeft: 40,
      // marginRight: 40,
      // marginBottom: 10,
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
      paddingHorizontal: 5,
      fontSize: 15
    }
  });
  