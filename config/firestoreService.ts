// firestoreService.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";

// Hàm lấy toàn bộ documents trong collection "photos"
export async function getAllPhotos() {
  try {
    const querySnapshot = await getDocs(collection(db, "photos"));
    const photos: any[] = [];

    querySnapshot.forEach((doc) => {
      photos.push({
        id: doc.id,   // 👈 thêm id để dễ render
        ...doc.data()
      });
    });

    return photos;
  } catch (error) {
    console.error("Lỗi khi lấy toàn bộ photos:", error);
    return [];
  }
}
export interface TrafficDataPoint {
  day: number;
  violations: number;
}
export async function getViolationsPerDay(): Promise<TrafficDataPoint[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "photos"));

    const counts: { [key: number]: number } = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.timestamp) {
        const date = new Date(data.timestamp.seconds * 1000);
        const day = date.getDate(); // ngày trong tháng (1 - 31)

        counts[day] = (counts[day] || 0) + 1;
      }
    });

    // Trả về đúng định dạng TrafficDataPoint
    const result: TrafficDataPoint[] = Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      violations: counts[i + 1] || 0,
    }));

    return result;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return [];
  }
}
