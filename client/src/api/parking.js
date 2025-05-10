const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Park a vehicle (create a new parking entry)
export const parkVehicle = async (vehicleData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/parking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(vehicleData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to park vehicle');
  }

  return await response.json();
};

// Check live parking availability
export const checkParkingAvailability = async () => {
  const response = await fetch(`${API_BASE_URL}/parking/availability`);
  if (!response.ok) {
    throw new Error('Failed to fetch parking availability');
  }
  return await response.json();
};

// ✅ Fetch user's parking history
export const getParkingHistory = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/parking/history`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch parking history');
  }

  return await response.json();
};


export const endParkingSession = async (parkingId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/parking/${parkingId}/exit`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to end parking session');
  }

  return await response.json();
};

export const getParkingStats = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/parking/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch parking stats');
  }

  return await response.json();
};
