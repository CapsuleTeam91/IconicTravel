import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonIcon from "../components/ButtonIcon";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from "../utils/styles";

const AdventuresScreen = ({ navigation }) => {
  // Variable d'état
  const [messageConfirmes, setMessageConfirmes] = useState([]);
  const [messageEnAttente, setMessageEnAttente] = useState([]);
  const [currentTab, setCurrentTab] = useState("confirmes");

  const handleConfirmerMessage = (message) => {
    setVoyagesConfirmes([...messageConfirmes, message]);
    setVoyagesEnAttente(messageEnAttente.filter((msg) => msg !== message));
  };

  const handleAnnulerMessage = (message) => {
    setVoyagesEnAttente(messageEnAttente.filter((msg) => msg !== message));
  };

  const messageConfimesList = messageConfirmes.map((message, index) => (
    <View key={index} style={styles.messageCard}>
      <Text style={styles.voyageInfo}>
        {" "}
        Destination : {message.destination} - Date : {message.date}{" "}
      </Text>
      <Text style={styles.messageHote}>Hôte : {message.hote}</Text>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  ));

  const messageEnAttenteList = messageEnAttente.map((message, index) => (
    <View key={index} style={styles.messageCard}>
      <Text style={styles.voyageInfo}>
        Destination : {message.destination} - Date : {message.date}{" "}
      </Text>
      <Text style={styles.voyageHote}>Hôte : {message.hote}</Text>
      <Text style={styles.messageText}>{message.text}</Text>
      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  ));

  //   // Fausse base de données
  //   const fakeData = [
  //     {
  //       destination: "Paris",
  //       date: "2023-07-15",
  //       hôte: "Margot",
  //       message: "Bonjour.",
  //     },

  //     {
  //       destination: "New York",
  //       date: "2023-09-15",
  //       hôte: "Sana",
  //       message: "Hello.",
  //     },
  //   ];

  return (
    <View style={styles.tabcontainer}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setCurrentTab("confirmes")}
        >
          <Text style={styles.tabConfime}> Confirmés </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setCurrentTab("en attente")}
        >
          <Text style={styles.tabPending}>En Attente</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {currentTab === "confirme" ? messageConfimesList : messageEnAttenteList}
      </View>
      <View style={styles.title}>
        <Text style={STYLES_GLOBAL.title}>Iconic Adventures</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    backgroundColor: "#007AFF",
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    borderColor: "red",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center", // Aligne les éléments au centre verticalement
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center", // Aligne les éléments au centre horizontalement
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabConfime: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
    border: 1,
    borderColor: "red",
    borderRadius: "10%",
  },

  tabPending: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
  },

  activeTab: {
    borderBottomWidth: 2,
    borderColor: "#007AFF",
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
    backgroundColor: "#007AFF",
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
    backgroundColor: "#FF3B30",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 5,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
export default AdventuresScreen;
