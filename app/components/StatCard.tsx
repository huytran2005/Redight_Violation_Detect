import { Ionicons } from "@expo/vector-icons"; // hoặc react-native-vector-icons
import React from "react";
import { Text, View } from "react-native";

interface StatCardProps {
  title: string;
  value: string;
  percentage: string;
  isIncrease: boolean; 
}

export default function StatCard({
  title,
  value,
  percentage,
  isIncrease,
}: StatCardProps) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: 180,
        marginBottom:32
      }}
    >
      {/* Title */}
      <Text style={{ color: "#6b7280", fontSize: 14, marginBottom: 4 }}>
        {title}
      </Text>

      {/* Value + Icon */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", flex: 1 }}>
          {value}
        </Text>
        <View
          style={{
            backgroundColor: "#f3f4f6",
            padding: 8,
            borderRadius: 12,
          }}
        >
          <Ionicons name="people" size={20} color="#6366f1" />
        </View>
      </View>

      {/* Percentage */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Text
          style={{
            color: isIncrease ? "green" : "red",
            fontSize: 12,
            fontWeight: "600",
            marginLeft: 4,
          }}
        >
        </Text>
      </View>
    </View>
  );
}
