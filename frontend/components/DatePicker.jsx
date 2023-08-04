import React, { useState } from "react";
import { COLORS } from "../utils/styles";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const DatePicker = (props) => {
  // État local pour gérer la visibilité du sélecteur de date
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  // Fonction pour afficher le sélecteur de date
  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  // Fonction pour masquer le sélecteur de date
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  // Définition des styles du composant
  const styles = StyleSheet.create({
    container: {
      width: props.width ? props.width : "70%", // Applique la largeur spécifiée dans les props ou utilise 70% par défaut
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    btnContainer: {
      ...StyleSheet.absoluteFillObject, // Positionne le bouton de calendrier à droite du conteneur en utilisant StyleSheet.absoluteFillObject
      right: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    light: {
      // Styles spécifiques au thème "light"
      container: {
        borderWidth: 1,
        borderColor: COLORS.darkBlue,
        backgroundColor: COLORS.bg,
      },
      label: {
        color: COLORS.darkBlue,
      },
    },
    dark: {
      // Styles spécifiques au thème "dark"
      container: {
        backgroundColor: COLORS.bgDark,
      },
      label: {
        color: COLORS.bg,
      },
    },
  });

  return (
    <View style={[styles.container, styles[props.theme].container]}>
      <Text style={styles[props.theme].label}>{props.label}</Text>
      {/* Bouton pour afficher le sélecteur de date */}
      <TouchableOpacity
        onPress={showDatePicker}
        activeOpacity={0.8}
        style={styles.btnContainer}
      >
        <Ionicons
          name="calendar-outline"
          size={28}
          color={props.theme === "dark" ? COLORS.bg : COLORS.darkBlue}
        />
      </TouchableOpacity>

      {/* Modal pour sélectionner la date */}
      <DateTimePickerModal
        date={props.date}
        display="spinner"
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={(date) => {
          // Appelle la fonction onconfirm avec la date sélectionnée
          props.onconfirm(date);
          // Masque le sélecteur de date
          hideDatePicker();
        }}
        onCancel={hideDatePicker} // Quand la date est confirmée, on appelle la fonction onconfirm avec la date en paramètre
        minimumDate={props.minimumDate} // Date minimum autorisée pour la sélection
      />
    </View>
  );
};

export default DatePicker;
