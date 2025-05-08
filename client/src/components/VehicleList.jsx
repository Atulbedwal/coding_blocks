"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit, Trash2 } from "lucide-react"

const fuelTypeColorMap = {
  ELECTRIC: "bg-green-500",
  CNG: "bg-blue-500",
  PETROL: "bg-yellow-500",
  DIESEL: "bg-red-500",
}

export function VehicleList() {
  const [vehicles, setVehicles] = useState([])
  const [editVehicle, setEditVehicle] = useState(null)
  const [formData, setFormData] = useState({ number: "", fuelType: "", photo: "" })

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch("http://localhost:5001/api/vehicles", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        setVehicles(data || [])
      } else {
        console.error(data.error)
      }
    } catch (err) {
      console.error("Failed to fetch vehicles:", err)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`http://localhost:5001/api/vehicles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setVehicles((prev) => prev.filter((v) => v.id !== id))
      } else {
        const error = await res.json()
        console.error("Delete failed:", error.message)
      }
    } catch (err) {
      console.error("Delete request error:", err)
    }
  }

  const handleEditClick = (vehicle) => {
    setEditVehicle(vehicle)
    setFormData({
      number: vehicle.number,
      fuelType: vehicle.fuelType,
      photo: vehicle.photo,
    })
  }

  const handleEditSave = async () => {
    const token = localStorage.getItem("token")
    try {
      const res = await fetch(`http://localhost:5001/api/vehicles/${editVehicle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        await fetchVehicles()
        setEditVehicle(null)
      } else {
        const error = await res.json()
        console.error("Update failed:", error.message)
      }
    } catch (err) {
      console.error("Edit request error:", err)
    }
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 mb-4">You haven't added any vehicles yet.</p>
        <Button>Add Your First Vehicle</Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              <img
                src={vehicle.photo || "/placeholder.svg"}
                alt={vehicle.number}
                className="object-cover w-full h-full"
              />
              <Badge className={`absolute top-2 right-2 ${fuelTypeColorMap[vehicle.fuelType] || "bg-gray-500"}`}>
                {vehicle.fuelType}
              </Badge>
            </div>
            <CardContent className="pt-4">
              <h3 className="font-bold text-lg">{vehicle.number}</h3>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => handleEditClick(vehicle)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(vehicle.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {editVehicle && (
        <Dialog open={!!editVehicle} onOpenChange={() => setEditVehicle(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Vehicle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="number">Vehicle Number</Label>
                <Input
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Input
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  name="photo"
                  value={formData.photo}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setEditVehicle(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
