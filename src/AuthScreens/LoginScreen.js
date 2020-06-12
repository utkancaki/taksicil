import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useUserContext } from "../context/UserContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setUser } = useUserContext();

  async function signIn() {
    //do any call to your server
    //and  may be save token, info from server etc

    try {
      const response = await fetch("http://192.168.1.28/taksicil/login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const parsedResponse = await response.json();
      // If server response message same as Data Matched
      if (parsedResponse === "Data Matched") {
        setUser((ps) => ({ ...ps, email }));
      } else {
        Alert.alert(parsedResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ImageBackground
      source={require("../../assets/login.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.outerBox}>
        <View style={styles.email}>
          <MaterialCommunityIcons name="email-outline" style={styles.icon} />
          <TextInput
            placeholder="Email..."
            autoCapitalize="none"
            style={styles.textInputStyle}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.password}>
          <Feather name="lock" style={styles.icon} />
          <TextInput
            placeholder="Şifre..."
            autoCapitalize="none"
            style={styles.textInputStyle}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 15 }}>
            Giriş Yap
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "black" }}>Hesabınız yok mu? </Text>
          <Text
            style={{ color: "#e3386a", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Register")}
          >
            Hemen kayıt olun!
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  outerBox: {
    alignSelf: "center",
    marginTop: 230,
    width: 350,
    backgroundColor: "#00000030",
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#FFCC4D",
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginHorizontal: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInputStyle: {
    marginLeft: 10,
    width: 270,
  },
  email: {
    marginTop: 30,
    marginHorizontal: 30,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: "white",
    height: 45,
    alignItems: "center",
  },
  password: {
    marginTop: 16,
    marginHorizontal: 30,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: "white",
    height: 45,
    alignItems: "center",
  },
  icon: {
    fontSize: 25,
    color: "black",
    marginLeft: 10,
  },
});

export default LoginScreen;
