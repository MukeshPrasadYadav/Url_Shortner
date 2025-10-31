import axios from "axios";;


const api=axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true
});

api.interceptors.request.use(
    (config)=>{
        console.log(config);
        return config;
    },
    (error)=>Promise.reject(error)
)

api.interceptors.response.use(
    (response)=>response.data,
    (error)=>{
        const message=error?.response?.data?.message || error.message;
        console.log(`[Api Error]: ${message}`);
        return Promise.reject(error)
    }
)

export default api;