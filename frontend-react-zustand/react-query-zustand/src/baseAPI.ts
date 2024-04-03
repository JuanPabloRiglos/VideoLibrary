import axios from "axios";
const URL_ENV = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3444'

export const api = axios.create({
    baseURL : `${URL_ENV}/videos` 
});

export const apiUsers = axios.create({
    baseURL : `${URL_ENV}/users`
});
// BORRAR< SOLO PARA SABER COMO FUNCIONABA PARA EL PROyECTO  