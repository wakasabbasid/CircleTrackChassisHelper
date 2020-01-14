import React, { Component } from "react";
import {
  Button,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  ImageBackground,
  KeyboardAvoidingView,
  AsyncStorage,
  StatusBar
} from "react-native";
import Constants from "expo-constants";
const { height, width } = Dimensions.get("window");
import dateTime from "../utilities/dateTime";
import Text from "../components/Text";

class AdjustmentScreen extends Component {
  state = {
    "Sway bar": "",
    "LF Psi": "",
    "RF Psi": "",
    "Spring Left": "",
    "Spring Right": "",
    "Left Camber": "",
    "Right Camber": "",
    "Rebound left": "",
    "Rebound right": "",
    "Compression Left": "",
    "Compression Right": "",
    "Ballast Arrow Up": false,
    "Ballast Arrow Down": false,
    Cross: "",
    "Brakes Arrow Up": false,
    "Brakes Arrow Up": false,
    "LR Psi": "",
    "RR Psi": "",
    "Spring Left Back": "",
    "Spring Right Back": "",
    "Panhard Bar Left": "",
    "Panhard Left Arrow Up": false,
    "Panhard Left Arrow Down": false,
    "Panhard Bar Right": "",
    "Panhard Right Arrow Up": false,
    "Panhard Right Arrow Down": false,
    "Rebound Left Back": "",
    "Rebound Right Back": "",
    "Compression Left Back": "",
    "Compression Right Back": "",
    "Track Location Field": "",
    Notes: "",
    "Adjustment Name": ""
  };

  componentDidMount() {
    if (this._getSheetname()) {
      console.log(this._getSheetname());

      this._displaylist();
    }
  }

  saveAdjustmentSheet = () => {
    for (let key in this.state) {
      if (this.state["Adjustment Name"] == "") {
        alert(["Adjustment Name"] + " field is empty, Please complete it");
        return false;
      }
    }
    this._savelist(this.state);
  };

  updateAdjustmentSheet = () => {
    for (let key in this.state) {
      if (this.state["Adjustment Name"] == "") {
        alert(["Adjustment Name"] + " field is empty, Please complete it");
        return false;
      }
    }
    this._updatelist(this.state);
  };
  _getSheetname = () => {
    var sheetname = this.props.navigation.getParam("adjSheetName");
    // alert(sheetname);
    return sheetname;
  };

  _displaylist = async currentAdjSheetData => {
    try {
      const data = await AsyncStorage.getItem(this._getSheetname());
      if (data !== null) {
        await this.setState(JSON.parse(data));
        this.setState({
          "Adjustment Name": this._getSheetname()
        });
      }
    } catch (error) {
      alert(error.message);
      // Error saving data
    }
  };
  _savelist = async currentAdjSheetData => {
    try {
      let current_datetime = new Date();
      let formatted_date =
        current_datetime.getMonth() +
        1 +
        "-" +
        current_datetime.getDate() +
        "-" +
        current_datetime.getFullYear() +
        " " +
        dateTime.ampm();
      // current_datetime.getHours() +
      // ":" +
      // current_datetime.getMinutes() +
      // ":" +
      // current_datetime.getSeconds();
      await AsyncStorage.setItem(
        this.state["Adjustment Name"].split("_").length
          ? this.state["Adjustment Name"].split("_")[0] + "_" + formatted_date
          : this.state["Adjustment Name"] + "_" + formatted_date,
        JSON.stringify(currentAdjSheetData)
      );
      //alert(this.state["Adjustment Name"] + "_" + formatted_date);
      alert(
        this.state["Adjustment Name"] + " " + "Adjustment Saved Successfully"
      );
    } catch (error) {
      alert(error.message);
    }
  };

  _updatelist = async currentAdjSheetData => {
    try {
      await AsyncStorage.setItem(
        this._getSheetname(),
        JSON.stringify(currentAdjSheetData)
      );
      //alert(this.state["Adjustment Name"]+"_"+formatted_date)
      alert("saved");
    } catch (error) {
      alert(error.message);
    }
  };

  _loadlist = async () => {
    try {
      const data = await AsyncStorage.getAllKeys();
      if (data !== null) {
        this.props.navigation.navigate("Savedtracks", {
          adjSheetNamesList: data
        });
      }
    } catch (error) {
      alert(error.message);
      // Error saving data
    }
  };

  updateAdjustment = (fieldname, text) => {
    this.setState({ [fieldname]: text });
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.titleStyle}>
              CIRCLE TRACK CHASIS ADJUSTMENTS
            </Text>
          </View>

          <View style={styles.dtspanview}>
            <View>
              <Text style={styles.datetext}>DATE</Text>
              <Text style={[styles.datetext, styles.tracktext]}>TRACK</Text>
            </View>

            <View style={styles.viewtime}>
              <Text style={styles.datetimetext}>Today</Text>
              <Text style={styles.datetimetext}>{dateTime.hours()}</Text>
              <Text style={styles.datetimetext}>{dateTime.min()}</Text>
              <Text style={styles.datetimetext}>{dateTime.tracktime()}</Text>
            </View>
          </View>

          <View>
            <TextInput
              style={styles.tracklocation}
              onChangeText={text =>
                this.updateAdjustment("Track Location Field", text)
              }
              value={this.state["Track Location Field"]}
              placeholder="TRACK LOCATION"
            />
          </View>

          <View>
            <Text style={styles.notestitle}>Notes</Text>
          </View>

          <View style={styles.notesview}>
            <TextInput
              style={{ paddingLeft: 7 }}
              multiline={true}
              onChangeText={text => this.updateAdjustment("Notes", text)}
              value={this.state["Notes"]}
              placeholder="Notes here!"
            />
          </View>

          <View>
            <Text style={styles.adjustmentname}>ADJUSTMENT NAME</Text>
          </View>

          <View style={styles.updateloadview}>
            <TouchableOpacity
              onPress={this._loadlist}
              style={styles.loadbutton}
            >
              <Text style={styles.loadbuttontext}>LOAD</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.savetextfield}
              value={this.state["Adjustment Name"].split("_")[0]}
              onChangeText={text =>
                this.updateAdjustment("Adjustment Name", text)
              }
            />

            <TouchableOpacity
              disabled={this._getSheetname() == undefined}
              style={[
                styles.updatebutton,
                {
                  backgroundColor: this._getSheetname() ? "#ff1514" : "grey",
                  borderColor: this._getSheetname() ? "#ff1514" : "grey"
                }
              ]}
              onPress={this.updateAdjustmentSheet}
            >
              <Text style={styles.updatebuttontext}>UPDATE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.saveloadview}>
            <TouchableOpacity
              style={styles.savebutton}
              onPress={this.saveAdjustmentSheet}
            >
              <Text style={styles.savebuttontext}>SAVE AS NEW</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.frontsettingsview}>
            {/* TODO: */}

            {/* Right Side adjustment View 1st Column */}

            <View style={styles.frontadjustview}>
              <TouchableOpacity style={{ marginTop: 200 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/LF.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 20 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SPRINGS.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.leftspringtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Spring Left", text)
                }
                value={this.state["Spring Left"]}
              />

              <TouchableOpacity style={{ marginTop: 20 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/LEFTCAMBER.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.leftspringtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Left Camber", text)
                }
                value={this.state["Left Camber"]}
              />
            </View>

            {/* Right Side adjustment View 2nd Column */}

            <View style={styles.secondviewborder}>
              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rightlfpsitextfield}
                onChangeText={text => this.updateAdjustment("LF Psi", text)}
                value={this.state["LF Psi"]}
              />

              <TouchableOpacity style={{ marginTop: 86 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SHOCKS.png")}
                />
              </TouchableOpacity>

              <Text style={{ marginTop: 5, fontSize: 10 }}>REBOUND</Text>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.leftreboundtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Rebound left", text)
                }
                value={this.state["Rebound left"]}
              />

              <Text style={{ marginTop: 5, fontSize: 10 }}>COMPRESSION</Text>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.leftreboundtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Compression Left", text)
                }
                value={this.state["Compression Left"]}
              />
            </View>

            {/* Middle adjustment View Column */}
            <View
              style={{
                // backgroundColor: "#6f7179",
                flexDirection: "column",
                width: width / 5,
                marginTop: 48
              }}
            >
              <TouchableOpacity style={{ marginTop: 60 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SWAYBAR.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.centertextfield}
                onChangeText={text => this.updateAdjustment("Sway bar", text)}
                value={this.state["Sway bar"]}
              />

              <View style={{ flexDirection: "row" }}>
                <View style={styles.centrallineleftview} />
                <View style={styles.centrallinerightview} />
              </View>
            </View>

            {/* Left Side adjustment View 3rd Column */}

            <View style={styles.thirdviewborder}>
              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rightlfpsitextfield}
                onChangeText={text => this.updateAdjustment("RF Psi", text)}
                value={this.state["RF Psi"]}
              />

              <TouchableOpacity style={{ marginTop: 86 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SHOCKS.png")}
                />
              </TouchableOpacity>

              <Text style={{ marginTop: 5, fontSize: 10 }}>REBOUND</Text>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rightreboundtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Rebound right", text)
                }
                value={this.state["Rebound right"]}
              />

              <Text style={{ marginTop: 5, fontSize: 10 }}>COMPRESSION</Text>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rightreboundtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Compression Right", text)
                }
                value={this.state["Compression Right"]}
              />
            </View>

            {/* Left Side adjustment View 4th Column */}
            <View style={styles.frontadjustview}>
              <TouchableOpacity
                style={styles.backtoappbutton}
                onPress={() => this.props.navigation.navigate("Mainscreen")}
              >
                <ImageBackground
                  style={{ width: 70, height: 70, marginTop: 10 }}
                  source={require("../adjustmentassets/app_76.png")}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 10, marginTop: 10 }}> BACK TO APP</Text>
              <TouchableOpacity style={{ marginTop: 96 }}>
                <ImageBackground
                  style={{ width: 70, height: 70, right: 0 }}
                  source={require("../adjustmentassets/RF.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 20, right: 0 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SPRINGS.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.leftspringtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Spring Right", text)
                }
                value={this.state["Spring Right"]}
              />

              <TouchableOpacity>
                <ImageBackground
                  style={{ width: 70, height: 70, marginTop: 20, right: 0 }}
                  source={require("../adjustmentassets/RIGHTCAMBER.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.leftspringtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Right Camber", text)
                }
                value={this.state["Right Camber"]}
              />
            </View>
          </View>

          {/* Central View Starts here ------       */}

          <View
            style={{
              backgroundColor: "#6f7179",
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            {/* <View style={{ backgroundColor: "#6f7179", flexDirection: "row" }}> */}
            <TouchableOpacity>
              <ImageBackground
                style={{ width: 73, height: 73, marginTop: 10 }}
                source={require("../adjustmentassets/BALLAST.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <ImageBackground
                style={{ width: 73, height: 73, marginTop: 10 }}
                source={require("../adjustmentassets/CROSSWEIGHT.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <ImageBackground
                style={{ width: 73, height: 73, marginTop: 10 }}
                source={require("../adjustmentassets/BRAKES.png")}
              />
            </TouchableOpacity>
          </View>

          {/* Arrow button view starts from here        */}

          <View
            style={{
              backgroundColor: "#6f7179",
              flexDirection: "row",
              borderBottomWidth: 4
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() =>
                  this.setState({
                    ["Ballast Arrow Up"]: !this.state["Ballast Arrow Up"]
                  })
                }
              >
                <ImageBackground
                  style={{ width: 30, height: 30 }}
                  source={
                    !this.state["Ballast Arrow Up"]
                      ? require("../adjustmentassets/ARROW_UP.png")
                      : require("../adjustmentassets/ARROW_GREEN_UP.png")
                  }
                />
              </TouchableOpacity>

              <View style={{ width: 10 }} />

              <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() =>
                  this.setState({
                    ["Ballast Arrow Down"]: !this.state["Ballast Arrow Down"]
                  })
                }
              >
                <ImageBackground
                  style={{ width: 30, height: 30 }}
                  source={
                    !this.state["Ballast Arrow Down"]
                      ? require("../adjustmentassets/ARROW_DOWN.png")
                      : require("../adjustmentassets/ARROW_RED_DOWN.png")
                  }
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.crosstextfield}
                onChangeText={text => this.updateAdjustment("Cross", text)}
                value={this.state["Cross"]}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() =>
                  this.setState({
                    ["Brakes Arrow Up"]: !this.state["Brakes Arrow Up"]
                  })
                }
              >
                <ImageBackground
                  style={{ width: 30, height: 30 }}
                  source={
                    !this.state["Brakes Arrow Up"]
                      ? require("../adjustmentassets/ARROW_UP.png")
                      : require("../adjustmentassets/ARROW_GREEN_UP.png")
                  }
                />
              </TouchableOpacity>

              <View style={{ width: 10 }} />

              <TouchableOpacity
                style={{ marginTop: 5 }}
                onPress={() =>
                  this.setState({
                    ["Brakes Arrow Down"]: !this.state["Brakes Arrow Down"]
                  })
                }
              >
                <ImageBackground
                  style={{ width: 30, height: 30 }}
                  source={
                    !this.state["Brakes Arrow Down"]
                      ? require("../adjustmentassets/ARROW_DOWN.png")
                      : require("../adjustmentassets/ARROW_RED_DOWN.png")
                  }
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* --------------------Cars back adjustment View starts here ---------------- */}

          <View style={styles.rearsettingsview}>
            {/* REAR ---- Right Side adjustment View 1st Column */}

            <View style={styles.rearadjustview}>
              <TouchableOpacity style={{ marginTop: 47 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/LR.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 20 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SPRINGS.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearrightspringtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Spring Left Back", text)
                }
                value={this.state["Spring Left Back"]}
              />

              <TouchableOpacity style={{ marginTop: 20 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/PANHARD_LEFT.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearrightspringtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Panhard Bar Left", text)
                }
                value={this.state["Panhard Bar Left"]}
              />

              {/* ////////// Adding Arrows to the Panhard Left/////////////// */}

              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: 'yellow',
                  // flex: 1,
                  justifyContent: "center"
                  //  alignItems: 'stretch'
                }}
              >
                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() =>
                    this.setState({
                      ["Panhard Left Arrow Up"]: !this.state[
                        "Panhard Left Arrow Up"
                      ]
                    })
                  }
                >
                  <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={
                      !this.state["Panhard Left Arrow Up"]
                        ? require("../adjustmentassets/ARROW_UP.png")
                        : require("../adjustmentassets/ARROW_GREEN_UP.png")
                    }
                  />
                </TouchableOpacity>

                <View style={{ width: width / 47 }} />

                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() =>
                    this.setState({
                      ["Panhard Left Arrow Down"]: !this.state[
                        "Panhard Left Arrow Down"
                      ]
                    })
                  }
                >
                  <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={
                      !this.state["Panhard Left Arrow Down"]
                        ? require("../adjustmentassets/ARROW_DOWN.png")
                        : require("../adjustmentassets/ARROW_RED_DOWN.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* REAR ---- Right Side adjustment View 2nd Column */}

            <View style={styles.rearsecondviewborder}>
              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearleftlfpsitextfield}
                onChangeText={text => this.updateAdjustment("LR Psi", text)}
                value={this.state["LR Psi"]}
              />

              <TouchableOpacity style={{ marginTop: 86 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SHOCKS.png")}
                />
              </TouchableOpacity>

              <Text style={{ marginTop: 5, fontSize: 10 }}>REBOUND</Text>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearleftreboundtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Rebound Left Back", text)
                }
                value={this.state["Rebound Left Back"]}
              />

              <Text style={{ marginTop: 5, fontSize: 10 }}>COMPRESSION</Text>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearleftreboundtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Compression Left Back", text)
                }
                value={this.state["Compression Left Back"]}
              />
            </View>

            {/* REAR ----  Middle adjustment View Column */}
            <View
              style={{
                //backgroundColor: "#6f7179",
                flexDirection: "column",
                width: width / 5
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={styles.rearcentrallineleftview} />
                <View style={styles.rearcentrallinerightview} />
              </View>
            </View>
            {/*  REAR ---- Left Side adjustment View 3nd Column */}

            <View style={styles.rearthirdviewborder}>
              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearleftlfpsitextfield}
                onChangeText={text => this.updateAdjustment("RR Psi", text)}
                value={this.state["RR Psi"]}
              />

              <TouchableOpacity style={{ marginTop: 86 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SHOCKS.png")}
                />
              </TouchableOpacity>

              <Text style={{ marginTop: 5, fontSize: 10 }}>REBOUND</Text>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearleftreboundtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Rebound Right Back", text)
                }
                value={this.state["Rebound Right Back"]}
              />

              <Text style={{ marginTop: 5, fontSize: 10 }}>COMPRESSION</Text>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearleftreboundtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Compression Right Back", text)
                }
                value={this.state["Compression Right Back"]}
              />
            </View>

            {/* REAR ----  Left Side adjustment View 4th Column */}
            <View style={styles.rearadjustview}>
              <TouchableOpacity style={{ marginTop: 47 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/RR.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity style={{ marginTop: 20 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/SPRINGS.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearleftspringtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Spring Right Back", text)
                }
                value={this.state["Spring Right Back"]}
              />

              <TouchableOpacity style={{ marginTop: 20 }}>
                <ImageBackground
                  style={{ width: 70, height: 70 }}
                  source={require("../adjustmentassets/PANHARD_RIGHT.png")}
                />
              </TouchableOpacity>

              <TextInput
                numeric
                value
                keyboardType={"numeric"}
                style={styles.rearleftspringtextfield}
                onChangeText={text =>
                  this.updateAdjustment("Panhard Bar Right", text)
                }
                value={this.state["Panhard Bar Right"]}
              />
              <View
                style={{
                  flexDirection: "row"
                  // backgroundColor:'red'
                  //flex: 1,
                  // justifyContent: "center",
                  // alignItems: "center"
                }}
              >
                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() =>
                    this.setState({
                      ["Panhard Right Arrow Up"]: !this.state[
                        "Panhard Right Arrow Up"
                      ]
                    })
                  }
                >
                  <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={
                      !this.state["Panhard Right Arrow Up"]
                        ? require("../adjustmentassets/ARROW_UP.png")
                        : require("../adjustmentassets/ARROW_GREEN_UP.png")
                    }
                  />
                </TouchableOpacity>

                <View style={{ width: width / 47 }} />

                <TouchableOpacity
                  style={{ marginTop: 5 }}
                  onPress={() =>
                    this.setState({
                      ["Panhard Right Arrow Down"]: !this.state[
                        "Panhard Right Arrow Down"
                      ]
                    })
                  }
                >
                  <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={
                      !this.state["Panhard Right Arrow Down"]
                        ? require("../adjustmentassets/ARROW_DOWN.png")
                        : require("../adjustmentassets/ARROW_RED_DOWN.png")
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Afloat icon comes here  */}

          <View style={{ backgroundColor: "#6f7179", alignItems: "center" }}>
            <TouchableOpacity style={{ margin: 20 }}>
              <ImageBackground
                style={{ width: 75, height: 30 }}
                source={require("../adjustmentassets/AFLOATNEW.png")}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    marginHorizontal: 0,
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  titleStyle: {
    backgroundColor: "#FF8C00",
    textAlign: "center",
    width: "100%",
    flex: 1
  },
  tracktext: { backgroundColor: "black", color: "white" },
  datetext: {
    textAlign: "center",
    paddingVertical: 5,
    // fontWeight: 100,
    paddingHorizontal: 10
  },

  dtspanview: {
    backgroundColor: "#d3d3d3",
    flexDirection: "row"
  },
  viewtime: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#d3d3d3",
    flex: 1
  },
  datetimetext: {
    fontSize: 24
  },
  tracklocation: {
    textAlign: "center",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  notestitle: {
    textAlign: "center",
    flexDirection: "row",
    flex: 1,
    color: "white",
    backgroundColor: "black"
  },
  notesview: {
    //alignItems: "right",
    flex: 1,
    borderColor: "black",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderWidth: 3.5,
    paddingVertical: 20,
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  adjustmentname: {
    textAlign: "center",
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#6f7179"
    //marginRight: 20
  },
  loadbutton: {
    backgroundColor: "#f37021",
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 150,
    // marginRight: 150,
    // paddingLeft: 10,
    // paddingRight: 10,
    width: width / 5,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#f37021"
  },
  loadbuttontext: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 19
    // fontWeight: 400
  },
  savetextfield: {
    height: 28,
    width: 165,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center"
  },
  updateloadview: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    backgroundColor: "#6f7179",
    alignItems: "center"
    //flexWrap: 'wrap'
    // borderColor: 'black',
    // borderTopWidth: 0,
    // borderWidth: 3
  },

  saveloadview: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6f7179"
    //flexWrap: 'wrap'
    // borderColor: 'black',
    // borderTopWidth: 0,
    // borderWidth: 3
  },
  updatebutton: {
    backgroundColor: "#ff1514",
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 150,
    // marginRight: 150,
    //  padding: 5,
    //  paddingLeft: 10,
    // marginBottom: 5,
    width: width / 4,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#ff1514"
  },
  savebutton: {
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
    marginRight: 70,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 5,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "teal",
    //flexWrap: 'wrap'
    marginTop: 5
  },
  updatebuttontext: {
    //paddingVertical: 7,
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 19
    // fontWeight: 400
  },
  savebuttontext: {
    paddingVertical: 3,
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 19
    // fontWeight: 400
  },
  frontsettingsview: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#6f7179",
    //backgroundColor: "yellow",
    borderColor: "black",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 3
    // marginBottom: 100
  },
  rearsettingsview: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#6f7179",
    //backgroundColor: "yellow",
    borderColor: "black",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 3
    // marginBottom: 100
  },
  frontadjustview: {
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor: "red",
    width: width / 5
  },
  rearadjustview: {
    flexDirection: "column",
    // backgroundColor: "red",
    alignItems: "center",
    width: width / 5
    //borderBottomWidth:0
  },
  rightspringtextfield: {
    height: 28,
    width: 70,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    right: -5,
    marginTop: 10,
    borderRadius: 5,
    textAlign: "center"
  },
  rearrightspringtextfield: {
    height: 28,
    width: 70,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 5,
    textAlign: "center"
  },
  leftspringtextfield: {
    height: 28,
    width: 70,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    //right: 80,
    marginTop: 10,
    borderRadius: 5,
    textAlign: "center"
  },
  rearleftspringtextfield: {
    height: 28,
    width: 70,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    //right: 80,
    marginTop: 10,
    borderRadius: 5,
    textAlign: "center"
  },
  crosstextfield: {
    height: 28,
    width: 70,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    //left: 88,
    //marginTop: 10,
    borderRadius: 5,
    textAlign: "center"
  },
  rightlfpsitextfield: {
    height: 28,
    width: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    // right: -7,
    marginTop: 192,
    borderRadius: 5,
    textAlign: "center"
  },
  rearrightlfpsitextfield: {
    height: 28,
    width: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    right: -7,
    marginTop: 89,
    borderRadius: 5,
    textAlign: "center"
  },
  leftlfpsitextfield: {
    height: 28,
    width: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    right: -15,
    marginTop: 192,
    borderRadius: 5,
    textAlign: "center"
  },
  rearleftlfpsitextfield: {
    height: 28,
    width: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    //right: -15,
    marginTop: 89,
    borderRadius: 5,
    textAlign: "center"
  },
  rightreboundtextfield: {
    height: 28,
    width: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    //right: -15,
    marginTop: 5,
    borderRadius: 5,
    textAlign: "center"
  },
  rearrightreboundtextfield: {
    height: 28,
    width: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    right: -15,
    marginTop: 5,
    borderRadius: 5,
    textAlign: "center"
  },
  leftreboundtextfield: {
    height: 28,
    width: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    //right: -10,
    marginTop: 5,
    borderRadius: 5,
    textAlign: "center"
  },
  rearleftreboundtextfield: {
    height: 28,
    width: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    //right: -10,
    marginTop: 5,
    borderRadius: 5,
    textAlign: "center"
  },
  centertextfield: {
    height: 28,
    width: 70,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 5,
    textAlign: "center"
  },
  secondviewborder: {
    // borderRightColor: 'black',
    // backgroundColor: "#6f7179",
    // backgroundColor:'red',
    width: width / 5,
    //borderWidth: 3,
    overflow: "visible",
    alignItems: "center",
    marginTop: 46
  },
  rearsecondviewborder: {
    // borderRightColor: 'black',
    //backgroundColor: "#6f7179",
    // backgroundColor:'red',
    width: width / 5,
    alignItems: "center"
    //borderWidth: 3,
  },
  thirdviewborder: {
    // borderRightColor: 'black',
    // backgroundColor: "#6f7179",
    //backgroundColor:'red',
    width: width / 5,
    alignItems: "center",
    marginTop: 46
    //borderWidth: 3,
  },
  rearthirdviewborder: {
    // borderRightColor: 'black',
    // backgroundColor: "#6f7179",
    //backgroundColor:'red',
    width: width / 5,
    //borderWidth: 3,
    alignItems: "center"
  },
  centrallinerightview: {
    flex: 1,
    borderColor: "black",
    borderLeftWidth: 1,
    paddingBottom: 310
  },
  rearcentrallinerightview: {
    flex: 1,
    borderColor: "black",
    borderLeftWidth: 1,
    paddingBottom: 310
  },
  centrallineleftview: {
    flex: 1,
    borderColor: "black",
    borderRightWidth: 1,
    paddingBottom: 310
  },
  rearcentrallineleftview: {
    flex: 1,
    borderColor: "black",
    borderRightWidth: 1,
    paddingBottom: 380
  }
});

export default AdjustmentScreen;
