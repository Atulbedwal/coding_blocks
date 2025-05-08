const API_BASE_URL = 'http://localhost:5001/api';

export const getWallet = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/wallet`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch wallet');
  }

  return await response.json();
};

export const addMoneyToWallet = async (amount) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/wallet/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ amount })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add money');
  }

  return await response.json();
};
