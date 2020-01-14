import React, { Component } from "react";
import {
  StyleSheet,
  Alert,
  Button,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage,
  Platform
} from "react-native";
import Constants from "expo-constants";
const { height, width } = Dimensions.get("window");
import dateTime from "../utilities/dateTime";
import Text from "../components/Text";

class SavedTracks extends Component {
  state = {
    adjSheetNamesList: this.props.navigation.getParam("adjSheetNamesList")
  };

  fetchadjscreen = () => {
    this.props.navigation.navigate("Adjustmentscreen");
  };

  // loadlist = item => {
  //  this._removeAdjSheet(item);
  // };

  _removeAdjSheet = async key => {
    Alert.alert(
      "Remove Adjustment Sheet",
      "Are you sure you want to remove this adjustment sheet?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem(key);
            this.setState({
              adjSheetNamesList: this.state.adjSheetNamesList.filter(
                val => val !== key
              )
            });
            alert(key.split("_")[0] + " is removed successfully!");
          }
        }
      ],
      { cancelable: false }
    );
  };

  getSheetName = item => {
    return item;
  };
  displaysheet = item => {
    if (item !== null) {
      this.props.navigation.navigate("Adjustmentscreen", {
        adjSheetName: item
      });
      // alert(item);
    }
    return item;
  };

  render() {
    //  alert( this.state.adjSheetNamesList);
    let pic = require("../assets/ADJUSTMENTTABS.png");

    return (
      <ImageBackground
        source={pic}
        style={{
          width: width,
          height: height - Constants.statusBarHeight,
          marginTop: Constants.statusBarHeight,
          backgroundColor: 'orange'          
        }}
      >
        <StatusBar barStyle='default' translucent= {false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ backgroundColor: "black", padding: 20 }}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              SAVED TRACKS
            </Text>
          </View>
          {this.state.adjSheetNamesList.length == 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>No Saved Adjustment Sheets</Text>
            </View>
          ) : (
            this.state.adjSheetNamesList.map((item, index) => (
              <View key={index} style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                  key={item}
                  activeOpacity= {0.7}
                  style={styles.container}
                  onPress={() => this.displaysheet(item)}
                >
                  <View style={{ flexDirection: "row" }}>
    {/* ///////////////////////////                 */}
                    
                    <View style={{ flexDirection: "column" }}>
                      <Text
                        style={styles.text}
                      >
                        {this.getSheetName(item).split("_")[0]}
                      </Text>

                      <Text style={styles.text}>
                        {this.getSheetName(item).split("_")[1]}
                      </Text>
                    </View>
{/* /////////////////////// */}
                    <View style={{width: width/6}}>

                    </View>
                    
                    <View style={{width: width / 6 }}>
                      <TouchableOpacity
                        onPress={() => this._removeAdjSheet(item)}
                        style={{
                          width: width / 8,
                          marginTop: 10
                        }}
                      >
                        <ImageBackground
                          style={{ width: 35, height: 35 }}
                          source={require("../adjustmentassets/Crossbutton2.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={{ marginTop: 17 }}
                  onPress={() => this._removeAdjSheet(item)}
                >
                  <ImageBackground
                    style={{ width: 29, height: 29 }}
                    source={require("../adjustmentassets/Crossbutton.png")}
                  />
                </TouchableOpacity> */}
              </View>
            ))
          )}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={this.fetchadjscreen}
              style={styles.gobackbutton}
            >
              <Text style={styles.gobacktextstyle}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
export default SavedTracks;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
    // marginLeft: 40,
    //paddingRight: 150,
    width: width,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "red",
    // paddingTop: 10,
    // marginTop: 30,
    // width: 200,
    // backgroundColor: "#d9f9b1",
    // alignItems: "center",
   // flexDirection: "row"
  },
  text: {
    width: width/1.5,
    textAlign: "center",
    color: "white",
    //borderWidth: 1,
    borderRadius: 12,
    //borderColor: 'white',
    paddingVertical: 3,
    fontSize: 20,
    // justifyContent:'center'
    left: 30
  },
  gobackbutton: {
    // borderColor: "black",
    // borderWidth: 1,
    // borderRadius: 12,
    // backgroundColor: "white",
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 10,
    // marginTop: 30,
     width: width/3,
    backgroundColor: 'white',
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'black'
  },
  gobacktextstyle:{
    //color: "black"
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
