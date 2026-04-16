import { useRouter } from 'expo-router';
import { useState } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleLogin = async () => {
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ success → go to home
      router.replace("/home");

    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoBox}>
        <Text style={styles.logoSubtitle}>Rootine</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          placeholderTextColor="#bbb"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#bbb"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* ❗ Inline error */}
        {error && <Text style={styles.error}>{error}</Text>}

        {/* ✅ Button ALWAYS clickable */}
        <TouchableOpacity
          style={[
            styles.loginBtn,
            (!email || !password) && styles.disabledBtn
          ]}
          onPress={() => {
            if (!email || !password) {
              Alert.alert("Missing Fields", "Please enter email and password.");
              return;
            }

            handleLogin();
          }}
        >
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 40,
  },

  logoBox: {
    alignItems: "center",
    marginBottom: 40,
  },

  logoSubtitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
  },

  form: {
    width: "100%",
    marginBottom: 24,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
    marginTop: 14,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#111",
    backgroundColor: "#fafafa",
  },

  loginBtn: {
    width: "100%",
    backgroundColor: "#111",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },

  loginBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  disabledBtn: {
    backgroundColor: "#ccc", // looks disabled but still clickable
  },

  error: {
    color: "#b00020",
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    textAlign: "center",
  },
});
