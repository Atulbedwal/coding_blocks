import { Link } from 'react-router-dom'
import  ParkingStats  from '@/components/ParkingStats'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">UrbanSlot</h1>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Parking Management</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find and reserve parking spaces with ease. Track your vehicles and manage your parking expenses all in one
            place.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Current Parking Availability</h3>
          <ParkingStats />
        </section>

        <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Multiple Vehicle Types</h3>
            <p className="text-gray-600">Support for 2-wheelers, 3-wheelers, and 4-wheelers with different pricing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Special Electric Vehicle Rates</h3>
            <p className="text-gray-600">Electric vehicles park for free, supporting green transportation.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Digital Wallet</h3>
            <p className="text-gray-600">Manage your parking expenses with our integrated wallet system.</p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>Register and create your account</li>
            <li>Add your vehicles to your profile</li>
            <li>Check parking availability in real-time</li>
            <li>Park your vehicle and confirm entry</li>
            <li>Pay automatically through your wallet when you leave</li>
          </ol>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© 2025 UrbanSlot. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link to="/terms" className="hover:underline">
                Terms
              </Link>
              <Link to="/privacy" className="hover:underline">
                Privacy
              </Link>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home