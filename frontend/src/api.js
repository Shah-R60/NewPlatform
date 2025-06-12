import axios from 'axios';

const api = axios.create({
     baseURL :"http://localhost:5000/auth",
})

export const googleAuth = (code)=>{
  return   api.get(`/google?code=${code}`, {
    withCredentials: true,
    cors: {
      origin: 'http://localhost:5000',
      credentials: true,
    },
  })
}