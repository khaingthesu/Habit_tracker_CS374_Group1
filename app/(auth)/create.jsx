import { Link } from 'expo-router';
import { useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";

// Get device dimensions for responsive design
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
// Login Screen Component
const SignupScreen = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
          <View style={styles.logoBox}>
              <Text style={styles.logoSubtitle}>Rootine</Text>
          </View>


          <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor="#bbb"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail} />

              <Text style={styles.label}>Password</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Create Password; at least 8 characters"
                  placeholderTextColor="#bbb"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword} />


        <Link href="/home" asChild>
          <TouchableHighlight style={styles.loginBtn}
            onPress={() => {
            if (email || password) {
            Alert.alert("Missing Fields", "Please enter your email and password.");
                return;
                }}}
            >
            <Text style={styles.loginBtnText}>Sign Up</Text>
          </TouchableHighlight>
        </Link>
      </View><View style={styles.footer}>
              <View style={styles.divider} />
              <View style={styles.signupRow}>
                  <Text style={styles.footerText}> Have an account?  </Text>
                  <Link href="/login" asChild>
                      <Text style={styles.signupLink}>Log in</Text>
                  </Link>
              </View>
          </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingTop: 10,
  },
header: {
    flex: 1.5,
    backgroundColor: 'teal',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
topBar:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    },

logoBox: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoIcon: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  
  logoSubtitle: {
    fontSize: 13,
    color: "#999",
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
  forgot: {
    color: "#4f8ef7",
    fontSize: 13,
    textAlign: "right",
    marginTop: 8,
    marginBottom: 20,
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#111",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
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
  signupLink: {
    color: "#4f8ef7",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default SignupScreen;