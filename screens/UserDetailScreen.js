import React, { useEffect, useState } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { editUser, deleteUser } from "../redux/actions/index";
import firebase from "../database/firebase";
const UserDetailScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
  };
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };
  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  const openConfirmationAlert = () => {
    Alert.alert("Remove the user", "Are you sure", [
      { text: "yes", onPress: () => handleDeleteUser() },
      { text: "No", onPress: () => navigation.navigate("UserList") },
    ]);
  };
  const handleDeleteUser = async () => {
    try {
      const dbRef = firebase.db.collection("users").doc(route.params.userId);
      await dbRef.delete();
      await dispatch(deleteUser(route.params.userId));
      navigation.navigate("UserList");
    } catch (error) {
      console.log(error);
    }
  };
  const updateUser = async () => {
    const dbRef = firebase.db.collection("users").doc(user.id);
    await dbRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    dispatch(editUser(user));
    setUser(initialState);

    navigation.navigate("UserList");
  };
  useEffect(() => {
    getUserById(route.params.userId);
  }, []);
  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText("name", value)}
          value={user.name}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleChangeText("email", value)}
          value={user.email}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          onChangeText={(value) => handleChangeText("phone", value)}
          value={user.phone}
        />
      </View>
      <View>
        <Button color="#19AC52" title="Update" onPress={() => updateUser()} />
      </View>
      <View>
        <Button
          color="#E37399"
          title="Delete"
          onPress={() => openConfirmationAlert()}
        />
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
export default UserDetailScreen;
