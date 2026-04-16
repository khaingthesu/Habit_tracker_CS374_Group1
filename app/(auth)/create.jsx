import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
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
import { auth, db } from '../../firebase';

// Screen size
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSignup = async () => {
    console.log("Signup clicked");
    setError(null);

    // ✅ Basic validation
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Save user to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Account created!");

      // Firebase already logs user in → go to home
      router.replace("/");

    } catch (err) {
      // Better error messages
      if (err.code === "auth/email-already-in-use") {
        setError("Email already registered.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <View style={styles.container}>

      {/* Logo / Title */}
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
          placeholder="At least 6 characters"
          placeholderTextColor="#bbb"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

       {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

        <TouchableOpacity
                    style={[
                        styles.loginBtn,
                        (!email || password.length < 6) && { backgroundColor: "#1b1a1a" }
                    ]}
                    onPress={() => {
                        if (!email || !password) {
                        setError("Please enter email and password.");
                        return;
                        }

                        if (password.length < 6) {
                        setError("Password must be at least 6 characters.");
                        return;
                        }

                        handleSignup();
                    }}
        >
  <Text style={styles.loginBtnText}>Sign Up</Text>
</TouchableOpacity>
      </View> 

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.divider} />
        <View style={styles.signupRow}>
          <Text style={styles.footerText}>Have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
                <Text style={styles.signinLink}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

    </View>
  );
};

export default SignupScreen;

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

  error: {
    color: "#b00020",
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    textAlign: "center",
  },

  footer: {
    width: "100%",
    alignItems: "center",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ebebeb",
    marginBottom: 16,
  },

  signupRow: {
    flexDirection: "row",
    marginBottom: 28,
  },

  footerText: {
    color: "#888",
    fontSize: 14,
  },

  signinLink: {
    color: "#4f8ef7",
    fontSize: 14,
    fontWeight: "600",
  },
});
