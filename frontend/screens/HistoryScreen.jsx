import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { STYLES_GLOBAL } from "../utils/styles";
import React, { useEffect, useRef, useState } from "react";
import { ERRORS, URL_EXPO } from "../utils/constants";

const HistoryScreen = ({ navigation }) => {
  // Fausse donnée pour tester la fonctionnalité du code
  const fakeData = [
    {
      destination: "Paris",
      date: "2023-07-15",
    },
    {
      destination: "New York",
      date: "2023-08-05",
    },
    {
      destination: "Tokyo",
      date: "2024-02-20",
    },
    {
      destination: "Barcelone",
      date: "2024-05-10",
    },
  ];

  // Variable d'états
  const [voyages, setVoyages] = useState(fakeData);

  // Message d'erreur / conditions
  const afficherHistorique = () => {
    if (voyages.length === 0) {
      return (
        <Text style={styles.message}>
          Oh non mon pauvre chaton 🥹 ! Tu n’es pas encore un Iconic Traveler ...
        </Text>
      );
    } else {
      return (
        // FlatList qui affiche une liste des voyages effectués
        <FlatList
          data={voyages}
          // keyExtractor  utilisée pour attribuer une clé unique pour chaque élément de la liste.
          keyExtractor={(item, index) => index.toString()}
          // renderItem définit la maniere dont chaque élément de la liste sera rendu à l'écran
          renderItem={({ item }) => (
            <View style={styles.voyage}>
              <Text style={styles.destination}>
                Destination : {item.destination}
              </Text>
              <Text style={styles.date}>Date : {item.date}</Text>
            </View>
          )}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Précédents Voyages</Text>
      {afficherHistorique()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1E4F61",
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
    marginTop: "80%",
  },
  voyage: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  destination: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
  },
});

export default HistoryScreen;
