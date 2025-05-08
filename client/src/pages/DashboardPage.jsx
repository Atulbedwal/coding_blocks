import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ParkingStats from "@/components/ParkingStats";
import {DashboardHeader}  from "@/components/DashboardHeader"
import  {VehicleList}  from "@/components/VehicleList"
import  {ParkingHistory}  from "@/components/ParkingHistory"
import  Wallet  from "@/components/Wallet"
import  {ParkVehicleForm}  from "@/components/ParkVehicleForm"

const DashboardPage = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userType = localStorage.getItem("userType")

    if (!token) {
      navigate("/login")
      return
    }

    setUserType(userType)
    setIsLoading(false)
  }, [navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userType={userType} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Parking Availability</CardTitle>
              <CardDescription>Current status of parking spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <ParkingStats />
            </CardContent>
          </Card>

          <Wallet />
        </div>

        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
            <TabsTrigger value="park">Park Vehicle</TabsTrigger>
            <TabsTrigger value="history">Parking History</TabsTrigger>
          </TabsList>

          <TabsContent value="vehicles" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Vehicles</h2>
              <Button>Add New Vehicle</Button>
            </div>
            <VehicleList />
          </TabsContent>

          <TabsContent value="park">
            <Card>
              <CardHeader>
                <CardTitle>Park a Vehicle</CardTitle>
                <CardDescription>Enter your vehicle details to park</CardDescription>
              </CardHeader>
              <CardContent>
                <ParkVehicleForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Parking History</CardTitle>
                <CardDescription>Your previous parking sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <ParkingHistory />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {userType === "admin" && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Admin Controls</CardTitle>
              <CardDescription>Manage parking system settings</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline">Manage Pricing</Button>
              <Button variant="outline">View All Users</Button>
              <Button variant="outline">System Reports</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

export default DashboardPage