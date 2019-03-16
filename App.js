import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet
} from "react-native";
import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBHdAk17E5tUwq4I3aO174mWb3wADMH-Uw",
  authDomain: "shopping-list-ce9b5.firebaseapp.com",
  databaseURL: "https://shopping-list-ce9b5.firebaseio.com",
  projectId: "shopping-list-ce9b5",
  storageBucket: "shopping-list-ce9b5.appspot.com",
  messagingSenderId: "865883914403"
};
firebase.initializeApp(config);

firebase.database().ref("items/");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", amount: "", items: [] };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("items/")
      .on("value", snapshot => {
        const data = snapshot.val();

        // console.warn(data);
        /*
        const items = Object.values(data);
*/

        items = [];

        for (const k in data) {
          let item = data[k];

          items.push({
            name: item.name,
            amount: item.amount,
            id: k
          });
        }

        this.setState({ items });
        // this.deleteItem(data.id);
      });
  }

  saveItem = () => {
    firebase
      .database()
      .ref("items/")
      .push({ amount: this.state.amount, name: this.state.name });
  };

  deleteItem = key => {
    firebase
      .database()
      .ref("items/")
      .child(key)
      .remove();

    //  console.warn(key);
  };

  listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  buttonClear = () => {
    this.setState({ inputOne: "", items: [] });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 70
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ width: 200, borderColor: "gray", borderWidth: 1 }}
            onChangeText={amount => this.setState({ amount })}
            value={this.state.amount}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: 150,
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-around",
            padding: 20
          }}
        >
          <View style={styles.buttonContainer}>
            <Button onPress={this.saveItem} title="Add" />
            <Button onPress={this.buttonClear} title="Clear list" />
          </View>
          <Text
            style={{
              margin: 10,
              fontSize: 20,
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-around"
            }}
          >
            Shopping List
          </Text>
        </View>
        <FlatList
          style={{ marginLeft: "5%" }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.listcontainer}>
              <Text style={{ fontSize: 18 }}>
                {item.name}, {item.amount}{" "}
              </Text>
              <Text
                style={{ fontSize: 18, color: "#0000ff" }}
                onPress={() => this.deleteItem(item.id)}
              >
                Bought
              </Text>
            </View>
          )}
          data={this.state.items}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    padding: 20
  },
  listcontainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center"
  }
});
