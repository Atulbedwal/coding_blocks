// client/src/api/upload.js
export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('http://localhost:5001/api/upload', {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload file');
    }
  
    const data = await response.json();
    return data.url;
  };