import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from "react-native";
import firebase from "../database/firebase";
import { useDispatch } from "react-redux";

import { setUser } from "../redux/actions/index";

const CreateUserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
  };
  const saveUser = async () => {
    if (state.name === "") {
      alert("Please provide a name");
    } else {
      try {
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          phone: state.phone,
        });
        dispatch(setUser(state));
        navigation.navigate("UserList");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button title="Save" onPress={() => saveUser()} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 35,
    flex: 1,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});
export default CreateUserScreen;
