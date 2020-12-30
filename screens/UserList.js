import React, { useState, useEffect } from "react";
import { ScrollView, Button } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { useSelector } from "react-redux";
const UserList = ({ navigation }) => {
  const users = useSelector((state) => state.user);
  return (
    <ScrollView>
      <Button
        title="Create User"
        onPress={() => navigation.navigate("CreateUserScreen")}
      />
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() =>
              navigation.navigate("UserDetailScreen", {
                userId: user.id,
              })
            }
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://cnnespanol.cnn.com/wp-content/uploads/2019/01/cnn-china-1.jpg?quality=100&strip=info&w=780&h=438&crop=1",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};
export default UserList;
