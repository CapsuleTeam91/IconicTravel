import React, { useState } from "react";
import { addData } from "../reducers/user";
import { ERRORS } from "../utils/constants";
import { URL_EXPO } from "../environnement";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, STYLES_GLOBAL } from "../utils/styles";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import ButtonIcon from "../components/ButtonIcon";
import HobbiesAutoCompleteHomeMade from "../components/HobbiesAutoCompleteHomeMade";

const ProfileStepThreeScreen = ({ navigation }) => {
  // Dispatch permettant d'envoyer des actions à Redux
  const dispatch = useDispatch();

  // Utilisation du sélecteur pour accéder aux données de l'utilisateur stockées dans le state Redux
  const user = useSelector((state) => state.user.value);

  // État local pour stocker la liste complète des hobbies disponibles
  const [hobbies, setHobbies] = useState([]);
  // État local pour stocker les hobbies sélectionnés par l'utilisateur
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  // État local pour stocker le nouveau hobby entré par l'utilisateur
  const [newHobby, setNewHobby] = useState("");
  // État local pour stocker un message d'erreur, s'il y en a un
  const [error, setError] = useState("");

  // Gère l'ajout d'un nouveau hobby via l'API backend
  const handleNewHobby = () => {
    // Vérifie si un nouveau hobby a été saisi
    console.log("newHobby", newHobby);

    if (!newHobby) {
      setError("Entrez un nouvel hobby");
      return;
    }
    // Formatte le nouveau hobby en minuscules avec des underscores (ex: "Nouveau Hobby" => "nouveau_hobby")
    let hobby = newHobby.toLowerCase().replace(" ", "_");
    console.log(hobby);

    // Appelle l'API pour ajouter le nouveau hobby
    fetch(`${URL_EXPO}:3000/hobbies/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hobby }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Met à jour la liste des hobbies après l'ajout réussi
          const newHobbies = data.hobbiesList?.map((el) =>
            el.replace("_", " ")
          );
          setHobbies(newHobbies);
          setNewHobby("");
        } else {
          setError("Problème");
        }
      });
  };

  // Gère la sélection/désélection d'un hobby par l'utilisateur
  const handleSelection = (hobby) => {
    selectedHobbies.includes(hobby)
      ? setSelectedHobbies(selectedHobbies.filter((el) => el !== hobby))
      : setSelectedHobbies([...selectedHobbies, hobby]);
  };

  // Gère l'enregistrement final des hobbies sélectionnés dans le state Redux et la navigation vers l'écran suivant
  const handleRegister = () => {
    setError(""); // reset previous errors

    // Vérifie si l'utilisateur a sélectionné au moins un hobby
    if (hobbies.length === 0) {
      setError("Sélectionnez au moins une passion !");
      return;
    }
    // Envoie les données des hobbies sélectionnés à Redux
    dispatch(addData({ hobbies }));

    // Envoie les données de l'utilisateur à l'API backend pour enregistrement
    fetch(`${URL_EXPO}:3000/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) =>
        response.status > 400 ? response.status : response.json()
      )
      .then((userFound) => {
        if (typeof userFound === "number") {
          setError(ERRORS[`err${userFound}`]);
          return;
        }
        if (userFound.result) {
          // Mise à jour du state Redux avec les données de l'utilisateur reçues de l'API
          console.log("User created:", userFound.data);
          const {
            firstname,
            lastname,
            dateOfBirth,
            email,
            token,
            avatarUrl,
            description,
            city,
            spokenLanguages,
            hobbies,
            travels,
          } = userFound.data;
          dispatch(
            addData({
              firstname,
              lastname,
              dateOfBirth,
              email,
              token,
              avatarUrl,
              description,
              city,
              spokenLanguages,
              hobbies,
              travels,
            })
          );
          // Réinitialise la liste des hobbies sélectionnés après l'enregistrement réussi
          setHobbies([]);

          navigation.navigate("ProfileStepFour");
        } else {
          setError(ERRORS[`err${userFound.status}`]);
        }
      });
  };

  // Effet useEffect qui se déclenche au montage du composant pour récupérer la liste des hobbies depuis l'API
  useEffect(() => {
    fetch(`${URL_EXPO}:3000/hobbies`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Formatte la liste des hobbies en enlevant les underscores (ex: "nouveau_hobby" => "nouveau hobby")
          const newHobbies = data.hobbiesList?.map((el) =>
            el.replace("_", " ")
          );
          setHobbies(newHobbies);
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"white"} />
      <View style={{ alignItems: "center" }}>
        <Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
          Création de votre profil
        </Text>
        <Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
          Etape 3/3
        </Text>

        <Text style={STYLES_GLOBAL.textLight}>
          Envie de partager vos passions ? Séléctionnez en au moins 1 et maximum
          5 pour terminez la création de votre Iconic Profile !
        </Text>

        <HobbiesAutoCompleteHomeMade
          hobbies={hobbies}
          setHobbies={setHobbies}
          error={error}
          setError={setError}
        />
      </View>

      {error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

      <View style={STYLES_GLOBAL.btnBottomContainer}>
        <ButtonIcon
          type="secondary"
          name="arrow-undo-outline"
          onpress={() => navigation.navigate("ProfileStepTwo")}
        />
        <Button type="secondary" label="Enregistrer" onpress={handleRegister} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkBlue,
  },
  hobbiesBtn: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    rowGap: -20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  test: {
    borderColor: "red",
    borderWidth: 2,
  },
});

export default ProfileStepThreeScreen;
