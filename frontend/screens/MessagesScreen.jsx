import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import ButtonIcon from "../components/buttons/ButtonIcon";
import { URL_EXPO } from "../environnement";
import { STYLES_GLOBAL, COLORS } from "../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

const MessagesScreen = ({ navigation }, props) => {
  const isFocused = useIsFocused();

  const user = useSelector((state) => state.user.value);
  const [chats, setChats] = useState([]);

  // Utilisation de useEffect pour charger les chats lorsque l'écran est focalisé
  useEffect(() => {
    if (isFocused) {
      fetch(`${URL_EXPO}:3000/chats/${user.token}`) // Appel à l'API pour récupérer les chats de l'utilisateur
        .then((resp) => resp.json())
        .then((resp) => {
          setChats(resp.chats); // Mise à jour de l'état local avec les chats récupérés
        });
    }
  }, [isFocused]);

  // Création d'une liste de chats à afficher
  const chatList = chats.map((chat, i) => {
    // Détermination de l'utilisateur à afficher dans la liste en fonction du rôle (traveler ou host)
    let userToDisplay = chat.traveler;
    if (chat.host.email !== user.email) {
      userToDisplay = chat.host;
    }

    return (
      <View key={i} style={styles.messageContainer}>
        <Image
          source={{ uri: userToDisplay.avatarUrl }}
          style={styles.avatar}
        />
        <Text style={styles.message}>
          {userToDisplay.firstname} · {userToDisplay.city.name}
        </Text>
        <ButtonIcon
          onpress={() => chatClicked(chat)}
          name="arrow-forward-outline"
          type="transparent"
        />
      </View>
    );
  });

  // Gestion de l'appui sur un chat
  const chatClicked = (chat) => {
    navigation.navigate("Chat", { chat }); // Naviguer vers l'écran de chat en passant le chat sélectionné comme paramètre
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        style={styles.messagesContainer2}
      >
        {chatList}
      </ScrollView>
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
  messagesContainer: {
    alignItems: "center",
  },
  messageContainer: {
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },
  message: {
    marginStart: 20,
  },
});

export default MessagesScreen;
