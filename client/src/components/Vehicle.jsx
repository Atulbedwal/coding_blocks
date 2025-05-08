// import { useEffect, useState } from 'react';
// import { api, setAuthToken } from '../api/api';

// const Vehicle = () => {
//   const [vehicles, setVehicles] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setAuthToken(token); 
//       fetchVehicles();
//     }
//   }, []);

//   const fetchVehicles = async () => {
//     try {
//       const response = await api.get('/vehicles');
//       setVehicles(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Your Vehicles</h2>
//       <ul>
//         {vehicles.map((vehicle) => (
//           <li key={vehicle.id}>
//             {vehicle.name} - {vehicle.plateNumber}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Vehicle;