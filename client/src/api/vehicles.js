const API_BASE_URL = 'http://localhost:5001/api';

// Add a new vehicle
export const addVehicle = async (vehicleData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/vehicles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(vehicleData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add vehicle');
  }
  return await response.json();
};

// Delete a vehicle by ID
export const deleteVehicleById = async (vehicleId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete vehicle');
  }

  return await response.json();
};

// Get all vehicles of the logged-in user
export const getVehiclesByUser = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/vehicles`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch vehicles');
  }

  return await response.json();
};

// ✅ NEW: Update a vehicle by ID
export const updateVehicleById = async (vehicleId, updatedData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/vehicles/${vehicleId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update vehicle');
  }

  return await response.json();
};

export const fetchParkingHistory = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/parking/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch parking history");
  }

  return await response.json();
};

