import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data - in a real app, this would come from an API
const mockParkingData = {
  twoWheeler: { total: 100, occupied: 65 },
  threeWheeler: { total: 50, occupied: 20 },
  fourWheeler: { total: 200, occupied: 150 },
};

function ParkingStats() {
  const [parkingData, setParkingData] = useState(mockParkingData);

  useEffect(() => {
    const interval = setInterval(() => {
      setParkingData((prev) => ({
        twoWheeler: {
          ...prev.twoWheeler,
          occupied: Math.max(
            0,
            Math.min(prev.twoWheeler.total, prev.twoWheeler.occupied + Math.floor(Math.random() * 3) - 1)
          ),
        },
        threeWheeler: {
          ...prev.threeWheeler,
          occupied: Math.max(
            0,
            Math.min(prev.threeWheeler.total, prev.threeWheeler.occupied + Math.floor(Math.random() * 3) - 1)
          ),
        },
        fourWheeler: {
          ...prev.fourWheeler,
          occupied: Math.max(
            0,
            Math.min(prev.fourWheeler.total, prev.fourWheeler.occupied + Math.floor(Math.random() * 3) - 1)
          ),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <ParkingTypeCard title="2-Wheeler Parking" {...parkingData.twoWheeler} />
      <ParkingTypeCard title="3-Wheeler Parking" {...parkingData.threeWheeler} />
      <ParkingTypeCard title="4-Wheeler Parking" {...parkingData.fourWheeler} />
    </div>
  );
}

function ParkingTypeCard({ title, total, occupied }) {
  const available = total - occupied;
  const percentOccupied = (occupied / total) * 100;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={percentOccupied} className="h-2" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Available</p>
              <p className="text-2xl font-bold text-green-600">{available}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Occupied</p>
              <p className="text-2xl font-bold text-blue-600">{occupied}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {percentOccupied >= 90
              ? "Almost full! Hurry up."
              : percentOccupied >= 70
              ? "Filling up quickly."
              : "Plenty of spaces available."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default ParkingStats;