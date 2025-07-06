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
  const getTrips = async () => {
    const res = await axios.get(urlGetAll);
    return res;
  };

  const getTripsOrderByAuthUser = async () => {
    const res = await axios.get(`/destinations/user`);
    return res;
  };

  const getTripById = async (id) => {
    const res = await axios.get(`/destinations/${id}`);
    return res;
  };

  return {
    getTrips,
    getTripsOrderByAuthUser,
    getTripById
  }
}