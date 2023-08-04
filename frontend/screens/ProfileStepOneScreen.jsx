import React, { useState, useEffect, useRef } from "react";
import { addAvatar, addData } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, STYLES_GLOBAL } from "../utils/styles";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import ButtonIcon from "../components/ButtonIcon";
import { DEFAULT_AVATAR } from "../utils/constants";
import { URL_EXPO } from "../environnement";

const ProfileStepOneScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  let cameraRef = useRef(null);
  const isFocused = useIsFocused();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [image, setImage] = useState(null);

  // Fonction pour choisir une image de la galerie du périphérique
  const pickImage = async () => {
    // Aucune demande de permission n'est nécessaire pour ouvrir la bibliothèque d'images
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Fonction pour prendre une photo en utilisant la caméra du périphérique
  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
    setImage(photo.uri);
    setCameraOpen(false);
  };

  // Fonction pour gérer l'enregistrement des données
  const handleRegister = () => {
    if (!image) {
      dispatch(addAvatar(DEFAULT_AVATAR));
      navigation.navigate("ProfileStepTwo");
      return;
    }

    const formData = new FormData();

    formData.append("avatar", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    fetch(`${URL_EXPO}:3000/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Si l'utilisateur ne sélectionne pas d'image, une image par défaut lui sera attribuée

        if (data.result) {
          dispatch(addAvatar(data.url));
          navigation.navigate("ProfileStepTwo");
        }
      });
  };

  // Demander les permissions de la caméra lors du montage du composant
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  // Demander les permissions de la galerie lors du montage du composant
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
        Création de votre profil
      </Text>
      <Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
        Etape 1/3
      </Text>
      {/* Afficher l'image de profil sélectionnée ou une image par défaut */}
      {!cameraOpen && (
        <Image
          source={{
            uri: image || DEFAULT_AVATAR,
          }}
          style={styles.camera}
        />
      )}
      {/* Afficher la caméra si les permissions sont accordées et le mode caméra est ouvert */}
      {hasCameraPermission && cameraOpen && (
        <View style={styles.cameraContainer}>
          <View style={styles.buttonsContainer}>
            {/* Bouton pour changer entre la caméra avant et arrière */}
            <ButtonIcon
              type="tertiary"
              name={
                type === CameraType.back ? "sync-circle" : "sync-circle-outline"
              }
              onpress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            />

            {/* Bouton pour activer/désactiver le flash */}
            <ButtonIcon
              type="tertiary"
              name={flashMode === FlashMode.off ? "flash" : "flash-outline"}
              onpress={() =>
                setFlashMode(
                  flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
                )
              }
            />
          </View>

          {/* Composant Camera pour afficher la vue de la caméra */}
          <Camera
            type={type}
            flashMode={flashMode}
            ref={(ref) => (cameraRef = ref)}
            style={styles.camera}
          ></Camera>

          <View style={styles.snapContainer}>
            {/* Bouton pour prendre une photo */}
            <ButtonIcon
              type="tertiary"
              name="aperture-outline"
              onpress={() => cameraRef && takePicture()}
            />
          </View>
        </View>
      )}

      <Text style={STYLES_GLOBAL.textLight}>
        Sélectionnez une photo de profil !
      </Text>
      <View style={styles.btnContainer}>
        {/* Afficher un message d'erreur si les permissions de la galerie ne sont pas accordées */}
        {!hasGalleryPermission ? (
          <Text style={STYLES_GLOBAL.error}>
            Pas de permission d'accéder à la gallerie
          </Text>
        ) : (
          /* Bouton pour ouvrir la galerie d'images et choisir une photo */
          <ButtonIcon
            type="secondary"
            name="images"
            onpress={() => {
              setCameraOpen(false);
              pickImage();
            }}
          />
        )}
        {/* Afficher un message d'erreur si les permissions de la caméra ne sont pas accordées ou si l'écran n'est pas actif */}
        {!hasCameraPermission || !isFocused ? (
          <Text style={STYLES_GLOBAL.error}>
            Pas de permission d'accéder à votre caméra
          </Text>
        ) : (
          /* Bouton pour activer/désactiver la caméra */
          <ButtonIcon
            type="secondary"
            name="camera-outline"
            onpress={() => setCameraOpen(!cameraOpen)}
          />
        )}
      </View>

      {/* Afficher les boutons pour revenir à l'écran précédent ou passer à l'écran suivant */}
      <View style={STYLES_GLOBAL.btnBottomContainer}>
        <ButtonIcon
          type="secondary"
          name="arrow-undo-outline"
          onpress={() => navigation.navigate("Signup")}
        />
        <Button type="secondary" label="Suivant" onpress={handleRegister} />
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
  cameraContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnContainer: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  camera: {
    width: 200,
    height: 200,
    borderRadius: 250,
  },
  buttonsContainer: {
    flex: 1,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileStepOneScreen;
