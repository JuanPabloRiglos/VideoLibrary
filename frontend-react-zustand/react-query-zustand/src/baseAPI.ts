import axios from "axios";

const api = axios.create({
    baseURL :'http://localhost:3444/videos'
});

export default api