import axios from "axios"

const authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

//cho phép đính kèm cookie lên BE phục vụ cơ chế JWT Token ở chế độ httpOnly Cokkie => Cors ở BE cũng phải set thành true
authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    config.headers["Content-Type"] = "application/json"
    if(config.headers['mediaType']==="file")
    {
       config.headers["Content-Type"] = "multipart/form-data"
    }
    config.headers["ngrok-skip-browser-warning"] = "69420"

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("alooo")
    }
    return Promise.reject(error)
  },
)
export default authorizedAxiosInstance
