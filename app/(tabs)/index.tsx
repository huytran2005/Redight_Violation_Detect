import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../config/FirebaseConfig";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Sign in successfully");
      router.replace("/dashboard"); 
      
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        {/* Left section */}
        <LinearGradient
          colors={["#6a11cb", "#2575fc"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            flex: 1,
            borderRadius: 12,
            padding: 20,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 10,
            }}
          >
            Sign in to
          </Text>
          <Text style={{ fontSize: 16, color: "#f0f0f0", marginBottom: 20 }}>
            Lorem Ipsum is simply
          </Text>
          <Text style={{ fontSize: 14, color: "#e0e0e0" }}>
            If you don’t have an account register
          </Text>
          <Image
            style={{ margin: 100 }}
            source={require("../../assets/images/image.png")}
          />
        </LinearGradient>

        {/* Right section (form) */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#fafafa",
            borderRadius: 12,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
            Sign in
          </Text>

          {/* Email */}
          <TextInput
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              padding: 10,
              marginBottom: 15,
            }}
          />

          {/* Password */}
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          />
          {/* Login button */}
          <TouchableOpacity
            onPress={signIn}
            style={{
              backgroundColor: "#4A90E2",
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
