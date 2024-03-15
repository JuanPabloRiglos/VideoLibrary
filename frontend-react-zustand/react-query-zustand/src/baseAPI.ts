import axios from "axios";

export const api = axios.create({
    baseURL :'http://localhost:3444/videos'
});

export const apiUsers = axios.create({
    baseURL :'http://localhost:3444/users'
});
// BORRAR< SOLO PARA SABER COMO FUNCIONABA PARA EL PROyECTO  