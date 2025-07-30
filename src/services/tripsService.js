import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = false;

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export const TripsService = () => {
  const urlGetAll = '/destinations';
  
  // Obtener todos los destinos
  const getTrips = async () => {
    const res = await axios.get(urlGetAll);
    return res;
  };
  
  // Obtener destinos del usuario autenticado
  const getTripsOrderByAuthUser = async () => {
    const res = await axios.get(`/destinations/user`);
    return res;
  };
  
  // Obtener destino por ID
  const getTripById = async (id) => {
    const res = await axios.get(`/destinations/${id}`);
    return res;
  };
  
  // Crear nuevo destino
  const createTrip = async (data) => {
    const res = await axios.post('/destinations', data);
    return res;
  };
  
  // Actualizar destino
  const updateTrip = async (id, data) => {
    const res = await axios.put(`/destinations/${id}`, data);
    return res;
  };
  
  // Eliminar destino
  const deleteTrip = async (id) => {
    const res = await axios.delete(`/destinations/${id}`);
    return res;
  };
  
  // Buscar por título
  const getTripsByTitle = async (title) => {
    const res = await axios.get(`/destinations/title/${title}`);
    return res;
  };
  
  // Buscar por país
  const getTripsByCountry = async (country) => {
    const res = await axios.get(`/destinations/country/${country}`);
    return res;
  };
  
  // Buscar por ciudad
  const getTripsByCity = async (city) => {
    const res = await axios.get(`/destinations/city/${city}`);
    return res;
  };

  return {
    getTrips,
    getTripsOrderByAuthUser,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
    getTripsByTitle,
    getTripsByCountry,
    getTripsByCity
  }
}