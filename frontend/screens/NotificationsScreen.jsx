import { SafeAreaView, StyleSheet, Text, View, Switch } from "react-native";
import ButtonIcon from "../components/ButtonIcon";
import { COLORS, STYLES_GLOBAL } from "../utils/styles";
import { useState } from "react";

const NotificationsScreen = ({ navigation }) => {
  // Variable d'état
  const [isEnabledPhone, setIsEnabledPhone] = useState(false); // État local pour gérer l'activation/désactivation des notifications par téléphone
  const [isEnabledSms, setIsEnabledSms] = useState(false); // État local pour gérer l'activation/désactivation des notifications par SMS

  return (
    <SafeAreaView style={styles.container}>
      {/* Section des notifications */}
      <View style={styles.notificationsContainer}>
        {/* Titre de la section */}
        <Text style={[STYLES_GLOBAL.subTitle, styles.title]}>
          Notifications
        </Text>

        {/* Description des notifications */}
        <Text>
          Recevez des rappels importants sur vos réservations, vos annonces et
          les messages des hôtes.
        </Text>

        {/* Options de notifications par téléphone et par SMS */}
        <View style={styles.notifications}>
          {/* Option de notification par téléphone */}
          <View style={styles.btn}>
            <Text>Téléphone</Text>
            <Switch
              // Couleurs de la track (fond) du Switch pour les états activé/désactivé
              trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
              // Couleur du bouton du Switch pour les états activé/désactivé
              thumbColor={isEnabledPhone ? COLORS.bg : COLORS.lightBlue}
              style={{
                // Ajustement de la taille du Switch pour iOS et Android
                transform: [
                  { scaleX: Platform.OS === "ios" ? 1 : 1.7 },
                  { scaleY: Platform.OS === "ios" ? 1 : 1.7 },
                ],
              }}
              // Couleur de fond du Switch pour iOS
              ios_backgroundColor={COLORS.lightBlue}
              onValueChange={() => setIsEnabledPhone(!isEnabledPhone)}
              // Valeur du Switch basée sur l'état local isEnabledPhone
              value={isEnabledPhone}
            />
          </View>

          {/* Option de notification par SMS */}
          <View style={styles.btn}>
            <Text>SMS</Text>
            <Switch
              trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
              // Couleur du bouton du Switch pour les états activé/désactivé
              thumbColor={isEnabledSms ? COLORS.bg : COLORS.lightBlue}
              style={{
                // Ajustement de la taille du Switch pour iOS et Android
                transform: [
                  { scaleX: Platform.OS === "ios" ? 1 : 1.7 },
                  { scaleY: Platform.OS === "ios" ? 1 : 1.7 },
                ],
              }}
              // Couleur de fond du Switch pour iOS
              ios_backgroundColor={COLORS.lightBlue}
              // Gère le changement d'état du Switch "SMS"
              onValueChange={() => setIsEnabledSms(!isEnabledSms)}
              // Valeur du Switch basée sur l'état local isEnabledSms
              value={isEnabledSms}
            />
          </View>
        </View>
      </View>

      {/* Bouton de retour */}
      <ButtonIcon
        type="secondary"
        name="arrow-undo-outline"
        onpress={() => {
          // Navigue vers l'écran des paramètres
          navigation.navigate("TabNavigator", { screen: "Settings" });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 25,
    marginTop: 70,
    marginBottom: 60,
  },

  notificationsContainer: {
    width: "100%",
    alignItems: "center",
  },

  notifications: {
    width: "100%",
    alignItems: "center",
    marginTop: 60,
  },

  btn: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
});

export default NotificationsScreen;
