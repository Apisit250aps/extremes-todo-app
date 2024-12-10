// src/axios.js
import { baseURL } from "@/configs";
import axios, { type AxiosResponse } from "axios"


export interface Response {
  success: boolean
  message: string
  data: any
}

const client = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  timeout: 10000, // Timeout in milliseconds
  headers: {
    "Content-Type": "application/json"
  }
})

client.interceptors.request.use(
  (config) => {
    // Add Authorization token if available
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

client.interceptors.response.use(
  (response) => response ,
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...")
      location.replace("/auth/login")
    }
    return Promise.reject(error)
  }
)

export default client
