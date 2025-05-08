"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// ✅ This function fetches parking history from your backend
const fetchParkingHistory = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch("http://localhost:5001/api/parking/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || "Failed to load parking history")
  }
  return await res.json()
}

export function ParkingHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [history, setHistory] = useState([])

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchParkingHistory()
        setHistory(data)
      } catch (err) {
        console.error("Error fetching history:", err.message)
      }
    }

    loadHistory()
  }, [])

  const filteredHistory = history.filter((item) =>
    item.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by vehicle number..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle</TableHead>
              <TableHead>Entry Time</TableHead>
              <TableHead>Exit Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No parking history found
                </TableCell>
              </TableRow>
            ) : (
              filteredHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.vehicleNumber}</div>
                      <div className="text-sm text-gray-500">{item.vehicleType}</div>
                    </div>
                  </TableCell>
                  <TableCell>{format(new Date(item.timeIn), "MMM dd, yyyy HH:mm")}</TableCell>
                  <TableCell>
                    {item.timeOut ? format(new Date(item.timeOut), "MMM dd, yyyy HH:mm") : "-"}
                  </TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.amount !== null ? `₹${item.amount}` : "-"}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === "active" ? "Active" : "Completed"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
