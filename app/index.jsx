import { Link } from 'expo-router';
import {
Dimensions,
Image,
StyleSheet,
Text,
TouchableOpacity,
View } from "react-native";
import Logo from "../assets/logo.png";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const HomePage = () => {
  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.topBar}>
        <Image source={Logo} style={styles.logoIcon} />
        <Text style={styles.logoSubtitle}>
          Build better days, one habit at a time.
        </Text>
      </View>
<View style={styles.bottomPart}>
      {/* Sign In Button */}
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.signinBtn}>
          <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>
      </Link>

      {/* Sign Up */}
      <Link href="/create" asChild>
        <TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Text style={styles.signupLink}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </Link>
</View>
    </View>
  );
};

export default HomePage;

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
    height: 150,
    width: 150,
    marginBottom: 20,
marginTop: 45,
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
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ebebeb",
    marginBottom: 16,
  },
  signupRow: {
    flexDirection: "row",
    marginBottom: 40,
  },
  footerText: {
    color: "#888",
    fontSize: 20,
  },
  signupLink: {
    color: "#4f8ef7",
    fontSize: 20,
    fontWeight: "600",
  },

signinBtn: {
    
    width: "100%",
    backgroundColor: "#111",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
signinText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    
},
bottomPart: {
    width: "85%",
    marginTop: 80, 
    alignItems: "center",
    justifyContent: "center",
},
});

