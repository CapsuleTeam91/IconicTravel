import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { addData } from "../reducers/user";
import { RemoteDataSet } from "../components/RemoteDataSet";
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from "../utils/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import Button from "../components/Button";
import Textarea from "../components/Textarea";
import ButtonIcon from "../components/ButtonIcon";
import DropdownLanguage from "../components/DropdownLanguage";

const ProfileStepTwoScreen = ({ navigation }) => {
  // Dispatch permettant d'envoyer des actions à Redux
  const dispatch = useDispatch();

  // État local pour stocker le nom de la ville de résidence de l'utilisateur
  const [city, setCity] = useState("");
  // État local pour stocker un message d'erreur, s'il y en a un
  const [error, setError] = useState("");
  // État local pour stocker la description de l'utilisateur
  const [description, setDescription] = useState("");
  // État local pour stocker les langues parlées par l'utilisateur
  const [spokenLanguages, setSpokenLanguages] = useState([]);

  // Fonction pour gérer l'enregistrement des données
  const handleRegister = () => {
    if (!city) {
      setError("Vous devez sélectionner une ville");
      return;
    } else if (!description) {
      setError("Attention vous avez oublié de vous présenter");
      return;
    } else if (spokenLanguages.length <= 0) {
      setError("On sait que vous parlez au moin une langue mais laquelle ?");
      return;
    }
    // Envoyer les données à Redux en utilisant l'action addData
    dispatch(addData({ description, city, spokenLanguages }));
    navigation.navigate("ProfileStepThree");
  };

  // Fonction pour ajouter la ville sélectionnée à l'état
  const addCity = (newCity) => {
    if (!newCity) return;
    setCity({
      name: newCity.name,
      latitude: newCity.latitude,
      longitude: newCity.longitude,
    });
  };

  // Fonction pour effacer la ville sélectionnée
  const clear = () => {
    setCity("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"white"} />
      <KeyboardAwareScrollView
        extraScrollHeight={100} // (when scroll) pour avoir une hauteur supplémentaire entre le clavier et l'entrée de texte
        enableOnAndroid={true}
        extraHeight={100} // hauteur supplémentaire pour que le clavier ne couvre pas les autres composants
        contentContainerStyle={styles.container}
      >
        <Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
          Création de votre profil
        </Text>
        <Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
          Etape 2/3
        </Text>
        <Text style={[STYLES_GLOBAL.textLight, { marginBottom: 20 }]}>
          Faisons plus ample connaissance ...
        </Text>

        {/* Composant Textarea pour la saisie de la description de l'utilisateur */}
        <Textarea
          label="Description"
          theme={COLORS_THEME.dark}
          autoFocus={false}
          onChangeText={(value) => setDescription(value)}
          value={description}
        />

        {/* fournit le contexte pour la liste déroulante */}
        <AutocompleteDropdownContextProvider>
          {/* Pour sélectionner la ville de résidence de l'utilisateur */}
          <RemoteDataSet
            addCity={addCity}
            label="Ville de Résidence"
            ligthTheme={false}
            clear={clear}
          />
          {/* Pour sélectionner les langues parlées */}
          <DropdownLanguage
            spokenLanguages={spokenLanguages}
            setSpokenLanguages={setSpokenLanguages}
          />
        </AutocompleteDropdownContextProvider>
        {/* Afficher le message d'erreur s'il y en a un */}
        {error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

        <View style={STYLES_GLOBAL.btnBottomContainer}>
          {/* Bouton pour revenir à l'étape précédente */}
          <ButtonIcon
            type="secondary"
            name="arrow-undo-outline"
            onpress={() => navigation.navigate("ProfileStepOne")}
          />
          {/* Bouton pour passer à l'étape suivante */}
          <Button type="secondary" label="Suivant" onpress={handleRegister} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
  },
});

export default ProfileStepTwoScreen;
