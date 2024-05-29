// import axios from "axios";

// export const api = axios.create({
//     baseURL :'http://localhost:3444/videos'
// });

// export const apiUsers = axios.create({
//     baseURL :'http://localhost:3444/users'
// });
// BORRAR< SOLO PARA SABER COMO FUNCIONABA PARA EL PROyECTO  
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
    baseURL: `${backendUrl}/videos`
});

export const apiUsers = axios.create({
    baseURL: `${backendUrl}/users`
});
