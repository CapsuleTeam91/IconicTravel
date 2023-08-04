import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { clearData } from "../reducers/user";
import { STYLES_GLOBAL } from "../utils/styles";
import Button from "../components/Button";
import StrokeAnimation from "../components/StrokeAnimation";

const LoginScreen = ({ navigation }) => {
  // Dispatch permettant d'envoyer des actions à Redux
  const dispatch = useDispatch();

  // Effet useEffect qui s'exécute une seule fois au montage du composant
  useEffect(() => {
    dispatch(clearData());
  }, []);

  return (
    <View style={STYLES_GLOBAL.container}>
      {/* Titre de l'application */}
      <Text style={STYLES_GLOBAL.title}>Iconic Travel</Text>

      {/* Animation d'une ligne qui se dessine */}
      <StrokeAnimation />

      {/* Bouton pour se connecter */}
      <Button
        type="primary"
        size="big"
        label="Se connecter"
        onpress={() => navigation.navigate("Signin")}
      />

      {/* Bouton pour créer un compte */}
      <Button
        type="secondary"
        size="big"
        label="Créer un compte"
        onpress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

export default LoginScreen;
