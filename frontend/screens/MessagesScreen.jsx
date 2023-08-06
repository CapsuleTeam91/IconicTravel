import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ButtonIcon from "../components/ButtonIcon";
import { URL_EXPO } from '../environnement';
import { STYLES_GLOBAL, COLORS } from "../utils/styles";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';

const MessagesScreen = ({ navigation }, props) => {

  const isFocused = useIsFocused();

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`${URL_EXPO}:3000/users/getId/${user.token}/${user.email}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        fetch(`${URL_EXPO}:3000/bookings/traveler/${data.travelerId}`)
          .then(resp => resp.json())
          .then(bookings => {
            console.log(bookings)
          })
      })

  }, [isFocused])

  // Fausse donnée pas véritablement vrais
  const fakeData = [
    {
      id: "user1",
      username: "John Doe",
      messages: [
        {
          id: "3",
          text: "Hi there!",
          sender: "user2",
          time: "10:30",
        },
        {
          id: "4",
          text: "I am good.",
          sender: "user2",
          time: "10:32",
        },
      ],
    },
    {
      id: "user2",
      username: "Jane Smith",
      messages: [
        {
          id: "3",
          text: "Hi there!",
          sender: "user2",
          time: "10:30",
        },
        {
          id: "4",
          text: "I am good.",
          sender: "user2",
          time: "10:32",
        },
      ],
    },
  ];



  // Variable d'état pour stocker les utilisateurs et leurs messages
  const [users, setUsers] = useState(fakeData);

  // Fonction pour gérer le clic sur un utilisateur
  const handleUserPress = (userId) => {
    const selectedUser = users.find((user) => user.id === userId);
    if (selectedUser) {
      navigation.navigate("ChatScreen", { user: selectedUser });
    }
  };

  // J'vais tous devoir refaire parce qu'elle a prit ça sur Internet et que ça ne s'applique pas notre projet

  // Fonction pour afficher chaque élément d'utilisateur
  const renderUserItem = ({ item }) => {
    // Obtenir le dernier message de l'utilisateur
    const lastMessage = item.messages[item.messages.length - 1];
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => handleUserPress(item.id)}
      >
        <View style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {item.username}
            <Text style={styles.locationText}></Text>
          </Text>
          <View style={styles.lastMessageContainer}>
            <Text style={styles.lastMessageText}>{lastMessage.text}</Text>
            <View style={styles.timeText}>
              <Text style={styles.time}>{lastMessage.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={styles.messageContainer}>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.userList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  title: {
    color: COLORS.darkBlue,
    fontSize: 20,
    letterSpacing: 1.2,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 20,
  },
  userList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#dbd9d9",
    marginRight: 12,
    overflow: "hidden",
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    // fontWeight: "bold",
    color: COLORS.darkBlue,
  },

  lastMessage: {
    fontSize: 14,
    color: "#020202",
  },
  time: {
    color: "#555",
    fontSize: 12,
    flexDirection: "row-reverse",
  },
  timeText: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  messageContainer: {
    marginTop: 50,
  },
});

export default MessagesScreen;
