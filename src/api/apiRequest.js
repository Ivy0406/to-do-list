import axios from 'axios';
import Cookies from 'js-cookie';

const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API_BASE
})

apiRequest.interceptors.request.use((config)=>{
    const token = Cookies.get("todoUserToken");
    if(token){
        config.headers.Authorization = token;
    }
    return config;
    },(error)=>{
        return Promise.reject(error);}
)

export default apiRequest;