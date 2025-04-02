import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/store/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(response => response, error => {
  if (error.response) {
    if(error.response.status === 401){
        window.$notify('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',false);
        router.push('/iniciar-sesion'); 
    }else if(error.response.status === 403){
        window.$notify('No tienes permiso para acceder al recursos solicitado.', false);
        router.push('/inicio'); 
    }
  }
  return Promise.reject(error);
});

// api.interceptors.request.use(config => {
//     const store = useAuthStore();
//     if (store) {
//       config.headers.Authorization = `Bearer ${store.logged.jwt}`;
//     }
//     return config;
//   }, error => Promise.reject(error));

api.interceptors.request.use(
  (config) => {
    try {
      const store = useAuthStore();
      if (store?.logged?.jwt) {
        config.headers.Authorization = `Bearer ${store.logged.jwt}`;
      }
    } catch (error) {
      console.error("Error obteniendo el store de autenticación:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;