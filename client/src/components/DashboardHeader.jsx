"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, User, X } from "lucide-react";

export function DashboardHeader({ userType }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-gray-800">
              ParkEase
            </Link>

            <nav className="hidden md:flex ml-10 space-x-8">
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/dashboard?tab=vehicles" className="text-gray-600 hover:text-gray-900">
                My Vehicles
              </Link>
              <Link to="/dashboard?tab=history" className="text-gray-600 hover:text-gray-900">
                History
              </Link>
              {userType === "admin" && (
                <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm font-medium">
              {userType === "admin" ? "Admin" : "User"} Account
            </span>

            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-100">
                        {userType === "admin" ? "AD" : "US"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 z-[1000] mt-2 " 
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-2">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard?tab=vehicles"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Vehicles
            </Link>
            <Link
              to="/dashboard?tab=history"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              History
            </Link>
            {userType === "admin" && (
              <Link
                to="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
            <div className="pt-2 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-700"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}