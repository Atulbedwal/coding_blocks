"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function ParkVehicleForm({onParked}) {
  const [selectedVehicle, setSelectedVehicle] = useState("")
  const [isNewVehicle, setIsNewVehicle] = useState(false)
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [fuelType, setFuelType] = useState("")
  const [vehiclePhoto, setVehiclePhoto] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [userVehicles, setUserVehicles] = useState([])

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:5001/api/vehicles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()
        if (res.ok) {
          setUserVehicles(data)
        } else {
          console.error(data.error)
        }
      } catch (err) {
        console.error("Failed to fetch user vehicles:", err)
      }
    }

    fetchVehicles()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      let vehicleId

      if (isNewVehicle) {
        if (!vehicleNumber || !vehicleType || !fuelType) {
          throw new Error("Please fill all required fields")
        }

        const vehicleResponse = await fetch("http://localhost:5001/api/vehicles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            number: vehicleNumber,
            type: vehicleType,
            fuelType,
            photoUrl: "https://via.placeholder.com/150",
          }),
        })

        if (!vehicleResponse.ok) {
          const data = await vehicleResponse.json()
          throw new Error(data.error || "Failed to add vehicle")
        }

        const newVehicle = await vehicleResponse.json()
        vehicleId = newVehicle.id
      } else {
        if (!selectedVehicle) {
          throw new Error("Please select a vehicle")
        }

        vehicleId = parseInt(selectedVehicle)
      }

      // Now park the vehicle
      const parkingResponse = await fetch("http://localhost:5001/api/parking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ vehicleId }),
      })

      if (!parkingResponse.ok) {
        const data = await parkingResponse.json()
        throw new Error(data.error || "Failed to park vehicle")
      }

      setShowSuccess(true)
      setShowError(false)
      onParked?.()
    } catch (error) {
      setErrorMessage(error.message)
      setShowError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your vehicle has been successfully parked.
          </AlertDescription>
        </Alert>
      )}

      {showError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center space-x-2 mb-6">
        <Button variant={!isNewVehicle ? "default" : "outline"} onClick={() => setIsNewVehicle(false)}>
          Use Existing Vehicle
        </Button>
        <Button variant={isNewVehicle ? "default" : "outline"} onClick={() => setIsNewVehicle(true)}>
          Add New Vehicle
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isNewVehicle ? (
          <div className="space-y-2">
            <Label htmlFor="vehicle">Select Vehicle</Label>
            <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
              <SelectTrigger id="vehicle">
                <SelectValue placeholder="Select a vehicle" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {userVehicles.length === 0 ? (
                  <SelectItem disabled>Loading...</SelectItem>
                ) : (
                  userVehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                      {vehicle.number} ({vehicle.fuelType})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                placeholder="e.g., MH01AB1234"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2 ">
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger id="vehicleType">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="2-wheeler">2-Wheeler</SelectItem>
                  <SelectItem value="3-wheeler">3-Wheeler</SelectItem>
                  <SelectItem value="4-wheeler">4-Wheeler</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel Type</Label>
              <Select value={fuelType} onValueChange={setFuelType}>
                <SelectTrigger id="fuelType">
                  <SelectValue placeholder="Select fuel type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="PETROL">Petrol</SelectItem>
                  <SelectItem value="DIESEL">Diesel</SelectItem>
                  <SelectItem value="CNG">CNG</SelectItem>
                  <SelectItem value="ELECTRIC">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehiclePhoto">Vehicle Photo</Label>
              <Input
                id="vehiclePhoto"
                type="file"
                accept="image/*"
                onChange={(e) => setVehiclePhoto(e.target.files[0])}
              />
              <p className="text-xs text-gray-500">Upload a clear photo of your vehicle</p>
            </div>
          </>
        )}

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Park Vehicle"}
          </Button>
        </div>
      </form>
    </div>
  )
}
