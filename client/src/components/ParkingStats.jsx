"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ParkingStats({ refreshKey }) {
  const [stats, setStats] = useState({
    "2-wheeler": { total: 100, occupied: 0 },
    "3-wheeler": { total: 50, occupied: 0 },
    "4-wheeler": { total: 200, occupied: 0 },
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5001/api/parking/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error("Failed to fetch stats")

      const data = await res.json()
      setStats(data)
    } catch (err) {
      console.error("Failed to load stats:", err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchStats()
  }, [refreshKey])

  if (loading) {
    return <p className="text-center py-6">Loading parking stats...</p>
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {["2-wheeler", "3-wheeler", "4-wheeler"].map((type) => (
        <ParkingCard
          key={type}
          title={`${type.replace("-", " ").toUpperCase()}`}
          total={stats[type]?.total || 0}
          occupied={stats[type]?.occupied || 0}
        />
      ))}
    </div>
  )
}

function ParkingCard({ title, total, occupied }) {
  const available = total - occupied
  const percent = total > 0 ? Math.round((occupied / total) * 100) : 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={percent} className="h-2" />
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
            {percent >= 90
              ? "Almost full! Hurry up."
              : percent >= 70
              ? "Filling up quickly."
              : "Plenty of spaces available."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
