import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useUserContext } from "../context/UserContext";

export default function ProfileScreen() {
  const { user, setUser } = useUserContext();
  const [userData, setUserData] = React.useState([]);
  const [changedName, setChangedName] = React.useState(userData[0]?.name);
  const [changedSurname, setChangedSurname] = React.useState(
    userData[0]?.surname
  );
  const [changedPassword, setChangedPassword] = React.useState(
    userData[0]?.password
  );

  React.useEffect(() => {
    try {
      fetch("http://192.168.1.28/taksicil/getUserData.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setUserData(responseJson);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  async function updateUserData() {
    try {
      const response = await fetch(
        "http://192.168.1.28/taksicil/updateUser.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            changedName: changedName,
            changedSurname: changedSurname,
            changedPassword: changedPassword,
          }),
        }
      );
      const parsedResponse = await response.json();
      Alert.alert(parsedResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 15 }}>
          Profil
        </Text>

        <FontAwesome
          name="sign-out"
          style={styles.signOutIcon}
          onPress={() => setUser((ps) => ({ ...ps, email: "" }))}
        />
      </View>

      <Text style={styles.accountText}>Hesap Bilgilerin</Text>

      <View style={styles.section}>
        <MaterialIcons name="person-outline" style={styles.icon} />
        <Text style={styles.text}>AD</Text>
        <TextInput
          style={styles.textInput}
          placeholder={userData[0]?.name}
          value={changedName}
          onChangeText={setChangedName}
        ></TextInput>
      </View>

      <View style={styles.section}>
        <MaterialIcons name="person" style={styles.icon} />
        <Text style={styles.text}>SOYAD</Text>
        <TextInput
          style={styles.textInput}
          placeholder={userData[0]?.surname}
          value={changedSurname}
          onChangeText={setChangedSurname}
        ></TextInput>
      </View>

      <View style={styles.section}>
        <MaterialCommunityIcons name="email-outline" style={styles.icon} />
        <Text style={styles.text}>EMAIL</Text>
        <Text>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Feather name="lock" style={styles.icon} />
        <Text style={styles.text}>YENİ ŞİFRE</Text>
        <TextInput
          style={styles.textInput}
          placeholder={userData[0]?.password}
          value={changedPassword}
          onChangeText={setChangedPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={updateUserData}>
        <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>
          Bilgilerini Güncelle
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#FFCC4D",
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 40,
  },
  signOutIcon: {
    fontSize: 30,
    position: "absolute",
    right: 10,
    bottom: 11,
  },
  accountText: {
    alignSelf: "center",
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: 30,
    height: 42,
    alignItems: "center",
    marginTop: 10,
    borderColor: "gray",
    borderWidth: 0.8,
    borderRadius: 5,
  },
  icon: {
    fontSize: 28,
    marginLeft: 5,
  },
  text: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 15,
    color: "gray",
    width: 100,
  },
  textInput: {
    height: 30,
    width: 180,
  },
  button: {
    backgroundColor: "#e3386a",
    width: 200,
    flexDirection: "row",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    marginTop: 30,
  },
});
