import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, View } from "react-native";
import {
  TrafficDataPoint,
  getAllPhotos,
  getViolationsPerDay,
} from "../../config/firestoreService";
import LineChart from "../components/LineChart";
import StatCard from "../components/StatCard";

interface PhotoData {
  id: string;
  image_base64: string;
  ten_duong: string;
  timestamp: any;
}

const Dashboard: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [data, setData] = useState<TrafficDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu biểu đồ
        const result = await getViolationsPerDay();
        setData(result);

        // Lấy danh sách ảnh vi phạm
        const photoResult = await getAllPhotos(); 
        setPhotos(photoResult);

      } catch (error) {
        console.error("Lỗi khi load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }
  const groupedPhotos: Record<string, any[]> = photos.reduce((acc: Record<string, any[]>, photo: any) => {
  const dateKey = photo.timestamp?.seconds
    ? new Date(photo.timestamp.seconds * 1000).toLocaleDateString()
    : "Không xác định";

  if (!acc[dateKey]) {
    acc[dateKey] = [];
  }
  acc[dateKey].push(photo);
  return acc;
}, {} as Record<string, any[]>);


  return (
    <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#F5F6FA" }}>
      <Text
        style={{
          fontFamily: "Nunito Sans",
          fontSize: 32,
          fontWeight: "bold",
          color: "#202224",
          marginBottom: 32,
        }}
      >
        Dashboard
      </Text>

      {/* Thống kê */}
      <StatCard 
        title="Total Violation Per Month"
        value={photos.length.toString()} // tổng số ảnh vi phạm
        percentage="8.5%"
        isIncrease={true}
      />

      {/* Biểu đồ */}
      <LineChart data={data} width={Dimensions.get("window").width - 40} /> 
      
      {/* Danh sách ảnh vi phạm */}
      
      {Object.entries(groupedPhotos).map(([date, photosInDay]) => (
  <View
    key={date}
    style={{
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
      elevation: 2,
    }}
  >
    <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
      {date}
    </Text>

    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
      {photosInDay.map((photo: any) => (
        <Image
          key={photo.id}
          source={{ uri: `data:image/jpeg;base64,${photo.image_base64}` }}
          style={{
            width: 300  , // 2 ảnh 1 hàng
            height: 150,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      ))}
    </View>
  </View>
))}
    </ScrollView>
  );
};

export default Dashboard;
