// LineChart.tsx
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface TrafficDataPoint {
  day: number;        // ngày (1 -> 31)
  violations: number; // số vi phạm
}

interface LineChartProps {
  data?: TrafficDataPoint[];
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data = [],
  width = screenWidth - 60,
  height = 200,
}) => {
  if (data.length === 0) {
    return (
      <View style={styles.emptyWrapper}>
        <Text style={styles.emptyText}>Không có dữ liệu</Text>
      </View>
    );
  }

  const chartWidth = width;
  const chartHeight = height;

  // maxDay: nếu data ít hơn thì vẫn fix tới 31 để chia đều
  const maxDay = Math.max(...data.map((d) => d.day), 31);
  const stepX = chartWidth / (maxDay - 1);

  // maxViolations: tránh trường hợp toàn bộ là 0
  const maxViolations = Math.max(...data.map((d) => d.violations), 1);

  // Chia trục Y thành 4 mốc (0%, 25%, 50%, 75%, 100%)
  const yLabels = [0, 0.25, 0.5, 0.75, 1].map(r =>
    Math.round(r * maxViolations)
  );

  // Tính các mốc hiển thị trục X (ngày trong tháng)
  const xLabels = [1, 5, 10, 15, 20, 25, maxDay];

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", margin: 20 }}>
        The number of Violations per Day
      </Text>

      <View style={styles.chartWrapper}>
        {/* Y axis labels */}
        <View style={[styles.yAxisLabels, { height: chartHeight }]}>
          {yLabels.reverse().map((label, i) => (
            <Text key={i} style={styles.axisLabel}>
              {label}
            </Text>
          ))}
        </View>

        {/* Chart */}
        <View
          style={[styles.chartContainer, { width: chartWidth, height: chartHeight }]}
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <View
              key={i}
              style={[
                styles.gridLine,
                { top: chartHeight - ratio * chartHeight },
              ]}
            />
          ))}

          {/* Line segments */}
          {data.map((point, index) => {
            if (index === data.length - 1) return null;

            const x1 = (point.day - 1) * stepX;
            const y1 = chartHeight - (point.violations * chartHeight) / maxViolations;

            const x2 = (data[index + 1].day - 1) * stepX;
            const y2 =
              chartHeight - (data[index + 1].violations * chartHeight) / maxViolations;

            const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

            return (
              <View
                key={`line-${index}`}
                style={[
                  styles.lineSegment,
                  {
                    left: x1,
                    top: y1,
                    width: length,
                    transform: [{ rotate: `${angle}deg` }],
                  },
                ]}
              />
            );
          })}

          {/* Data points */}
          {data.map((point, index) => {
            const x = (point.day - 1) * stepX;
            const y = chartHeight - (point.violations * chartHeight) / maxViolations;

            return (
              <View
                key={`point-${index}`}
                style={[
                  styles.dataPoint,
                  {
                    left: x - 4,
                    top: y - 4,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>

      {/* X axis labels (ngày trong tháng) */}
      <View style={[styles.xAxisLabels, { width: chartWidth, marginLeft: 40 }]}>
        {xLabels.map((label, i) => (
          <Text key={i} style={styles.xAxisLabel}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
    marginBottom: 32,
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  yAxisLabels: {
    justifyContent: "space-between",
    width: 40,
    marginRight: 24,
  },
  axisLabel: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "right",
  },
  chartContainer: {
    position: "relative",
    backgroundColor: "#fff",
  },
  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  lineSegment: {
    position: "absolute",
    height: 2,
    backgroundColor: "#3b82f6",
    borderRadius: 1,
    transformOrigin: "left center", // thêm để xoay đúng tâm
  },
  dataPoint: {
    position: "absolute",
    backgroundColor: "#3b82f6",
    width: 8,
    height: 8,
    borderRadius: 4,
  },  
  xAxisLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  xAxisLabel: {
    fontSize: 11,
    color: "#6b7280",
    paddingHorizontal:12
  },
  emptyWrapper: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#9ca3af",
  },
});

export default LineChart;
