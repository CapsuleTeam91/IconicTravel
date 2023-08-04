import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from "../utils/styles";
import ButtonIcon from "../components/ButtonIcon";
import React, { useEffect, useRef, useState } from "react";

const AdventuresScreen = ({ navigation }) => {
  // Fausse base de données
  const fakeData = [
    {
      destination: "Paris",
      date: "2023-07-15",
      hôte: "Margot",
      text: "Bonjour.",
    },

    {
      destination: "New York",
      date: "2023-09-15",
      hôte: "Sana",
      text: "Hello.",
    },
  ];

  // Variable d'état
  const [messagesConfirmes, setMessagesConfirmes] = useState([fakeData]);
  const [messagesEnAttente, setMessagesEnAttente] = useState([]);
  const [currentTab, setCurrentTab] = useState("confirmes");

  // Utilisation de useEffect pour initialiser les messages en attente au chargement de la page
  useEffect(() => {
    // Au chargement, fausses données seront dans  "messagesEnAttente"
    setMessagesEnAttente(fakeData);
  }, []);

  // Fonction pour gérer la confirmation d'un message
  const handleConfirmerMessage = (message) => {
    // Ajout du message aux messages confirmés et suppression du message des messages en attente
    setMessagesConfirmes([...messagesConfirmes, message]);
    setMessagesEnAttente(messagesEnAttente.filter((msg) => msg !== message));
  };

  // Fonction pour gérer l'annulation d'un message
  const handleAnnulerMessage = (message) => {
    // Suppression du message des messages en attente
    setMessagesEnAttente(messagesEnAttente.filter((msg) => msg !== message));
  };

  // Liste des messages confirmés
  const messageConfimesList = messagesConfirmes.map((message, index) => (
    <View key={index} style={styles.messageCard}>
      <Text style={styles.voyageInfo}>
        {" "}
        Destination : {message.destination} - Date : {message.date}
      </Text>
      <Text style={styles.messageHote}>Hôte : {message.hôte}</Text>
      <Text style={styles.messageText}>Message : {message.text}</Text>
    </View>
  ));

  // Liste des messages en Attente
  const messageEnAttenteList = messagesEnAttente.map((message, index) => (
    <View key={index} style={styles.messageCard}>
      <Text style={styles.voyageInfo}>
        Destination : {message.destination} - Date : {message.date}{" "}
      </Text>
      <Text style={styles.messageHote}>Hôte : {message.hôte}</Text>

      <Text style={styles.messageText}>Message : {message.text}</Text>
      {/* Button pour confirmés le message ou l'annuler. */}
      {/* <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => handleConfirmerMessage(message)}
      >
        <Text style={styles.confirmButtonText}>Confirmer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleAnnulerMessage(message)}
      >
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity> */}
    </View>
  ));

  // Composant pour afficher les messages confirmés
  const MessagesConfirmes = ({ messages }) => {
    return <View style={styles.MessagesConfirmes}>{messages}</View>;
  };

  // Composant pour afficher les messages en attente
  const MessagesEnAttente = ({ messages }) => {
    return <View style={styles.MessagesConfirmes}>{messages}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Iconic Adventures</Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              currentTab === "confirmes" ? styles.activeTab : null,
            ]}
            onPress={() => setCurrentTab("confirmes")}
          >
            <Text style={styles.confirmesContainer}>Confirmés</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              currentTab === "en_attente" ? styles.activeTab : null,
            ]}
            onPress={() => setCurrentTab("en_attente")}
          >
            <Text style={styles.enAttenteContainer}>En Attente</Text>
          </TouchableOpacity>
        </View>
        {currentTab === "confirmes" ? (
          <MessagesConfirmes messages={messageConfimesList} />
        ) : (
          <MessagesEnAttente
            messages={messageEnAttenteList}
            onConfirmer={handleConfirmerMessage}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f0f0f0",
  },
  header: {
    paddingBottom: 10,
    alignItems: "center",
  },
  title: {
    color: COLORS.darkBlue,
    fontSize: 20,
    letterSpacing: 1.2,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    marginTop: 20,
    overflow: "visible",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  confirmesContainer: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 10,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 30,
    overflow: "hidden",
  },

  enAttenteContainer: {
    backgroundColor: "#ffff",
    borderRadius: 10,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    color: COLORS.darkBlue,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 30,
    overflow: "hidden",
  },

  messageCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },

  voyageInfo: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  messageHote: {
    fontSize: 14,
    fontWeight: "bold",
  },

  confirmButton: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
  },

  confirmButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#ffff",
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    color: "black",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  cancelButtonText: {
    color: COLORS.darkBlue,
    fontSize: 16,
    textAlign: "center",
  },

  messageHote: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
  messageText: {
    fontSize: 14,
    color: "grey",
  },
});
export default AdventuresScreen;
