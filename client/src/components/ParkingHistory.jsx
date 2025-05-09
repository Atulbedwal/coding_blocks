"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const fetchParkingHistory = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch("http://localhost:5001/api/parking/history", {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error("Failed to load parking history")
  return await res.json()
}

export function ParkingHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [history, setHistory] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchParkingHistory()
        setHistory(data)
      } catch (err) {
        console.error("Fetch error:", err.message)
      }
    }
    load()
  }, [])

  const handleExit = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`http://localhost:5001/api/parking/${id}/exit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Exit failed")
      }

      const updated = await res.json()

      setHistory((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                timeOut: updated.timeOut,
                duration: updated.duration,
                amount: updated.amount,
                status: "completed",
              }
            : item
        )
      )
    } catch (err) {
      alert(err.message)
    }
  }

  const handleClearHistory = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("http://localhost:5001/api/parking/history/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.ok) throw new Error("Failed to clear history")
      setHistory([])
    } catch (err) {
      alert(err.message)
    }
  }

  const filtered = history.filter((item) =>
    item.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) =>
    status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800"

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
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
          <Button variant="destructive" className=" bg-black text-white hover:bg-gray-800" onClick={handleClearHistory}>
            Clear History
          </Button>
        </div>
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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No parking history found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-medium">{item.vehicleNumber}</div>
                    <div className="text-sm text-gray-500">{item.vehicleType}</div>
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
                  <TableCell>
                    {item.status === "active" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExit(item.id)}
                      >
                        Exit
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-400">Exited</span>
                    )}
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
