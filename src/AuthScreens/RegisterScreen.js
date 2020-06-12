import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordAgain, setPasswordAgain] = React.useState("");

  async function registerUser() {
    if (
      name == "" &&
      surname == "" &&
      email == "" &&
      password == "" &&
      passwordAgain == ""
    ) {
      Alert.alert("Tüm alanları doldurunuz.");
    } else if (password == passwordAgain) {
      fetch("http://192.168.1.28/taksicil/register.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          surname: surname,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          Alert.alert(responseJson);
          if (responseJson === "User Registered Successfully") {
            navigation.navigate("Login");
          } else {
            Alert.alert(responseJson);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      Alert.alert("Girilen Şifreler Uyuşmuyor");
    }
  }

  return (
    <ImageBackground
      source={require("../../assets/login.png")}
      style={styles.backgroundImage}
    >
      <MaterialIcons
        name="keyboard-backspace"
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.headerStyle}>KAYIT FORMU</Text>

      <View style={styles.outerBox}>
        <Text style={styles.textStyle}>
          *Yaptığınız yorumlarda yalnızca isminizin ve soyisminizin baş harfleri
          gözükür.
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 30,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.firstInput}>
            <MaterialIcons name="person-outline" style={styles.icon} />
            <TextInput
              placeholder="İsim"
              autoCapitalize="none"
              style={styles.textInputStyleFirst}
              onChangeText={setName}
            />
          </View>
          <View style={styles.firstInput}>
            <MaterialIcons name="person" style={styles.icon} />
            <TextInput
              placeholder="Soyisim"
              autoCapitalize="none"
              style={styles.textInputStyleFirst}
              onChangeText={setSurname}
            />
          </View>
        </View>

        <View style={styles.inputStyle}>
          <MaterialCommunityIcons name="email-outline" style={styles.icon} />
          <TextInput
            placeholder="Email adresi"
            autoCapitalize="none"
            style={styles.textInputStyle}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputStyle}>
          <Feather name="lock" style={styles.icon} />
          <TextInput
            placeholder="Şifre"
            autoCapitalize="none"
            style={styles.textInputStyle}
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputStyle}>
          <Feather name="lock" style={styles.icon} />
          <TextInput
            placeholder="Tekrar şifre"
            autoCapitalize="none"
            style={styles.textInputStyle}
            secureTextEntry
            onChangeText={setPasswordAgain}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={{ color: "white", fontWeight: "700", fontSize: 17 }}>
            Kayıt Ol
          </Text>
        </TouchableOpacity>
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
  backIcon: {
    fontSize: 35,
    marginTop: 30,
    marginLeft: 25,
    color: "black",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  outerBox: {
    alignSelf: "center",
    marginTop: 20,
    width: 350,
    backgroundColor: "#00000030",
    borderRadius: 20,
  },
  headerStyle: {
    color: "#e3386a",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "700",
    alignSelf: "center",
  },
  firstInput: {
    marginTop: 15,
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    width: 140,
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    marginHorizontal: 30,
    fontWeight: "700",
    marginTop: 15,
  },
  inputStyle: {
    marginTop: 15,
    marginHorizontal: 30,
    flexDirection: "row",
    height: 45,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 28,
    color: "black",
    marginLeft: 5,
  },
  textInputStyle: {
    marginLeft: 8,
    width: 300,
  },
  textInputStyleFirst: {
    marginLeft: 8,
    width: 130,
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#FFCC4D",
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginHorizontal: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RegisterScreen;