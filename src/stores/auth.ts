import { baseURL } from "@/configs"
import client, { type Response } from "@/libs/axios"
import type { AxiosError, AxiosResponse } from "axios"
import axios from "axios"

import { jwtDecode } from "jwt-decode"
import { defineStore } from "pinia"
import Swal from "sweetalert2"
import { computed, onMounted, ref } from "vue"

export interface User {
  _id: string
  username: string
  role: string
}

export interface Credentials {
  username: string
  password: string
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isAuthenticated = ref<boolean>(false)
  //
  onMounted(() => {
    const storedToken = localStorage.getItem("auth_token")
    token.value = storedToken || null
    user.value = loadUser(token.value as string) || null
    isAuthenticated.value = !!token.value
  })
  //
  const loadUser = (token: string): User | null => {
    try {
      return jwtDecode(token) as User
    } catch (error) {
      return null
    }
  }

  const logout = (): void => {
    localStorage.removeItem("auth_token")
    user.value = null
    token.value = null
    isAuthenticated.value = false
    location.replace("/auth/login")
  }

  const register = async (credentials: Credentials): Promise<void> => {
    const { username, password } = credentials

    await axios({
      method: "post",
      url: `${baseURL}/auth/register`,
      data: { username, password }
    })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            title: "Registration Successful",
            text: "You can now log in",
            icon: "success"
          })
          location.replace("/auth/login")
        }
      })
      .catch((error) => {
        const response = error.response?.data as Response
        const status = error.response?.status
        const message = "An unexpected error occurred"

        switch (status) {
          case 400:
            Swal.fire({
              title: "Bad Request",
              text: response.message,
              icon: "error"
            })
            break
          case 409:
            Swal.fire({
              title: "Conflict",
              text: response.message,
              icon: "error"
            })
            break
          default:
            Swal.fire({
              title: "Error",
              text: message,
              icon: "error"
            })
        }
      })
  }

  const login = async (credentials: Credentials): Promise<void> => {
    const { username, password } = credentials

    await axios({
      method: "post",
      url: `${baseURL}/auth/login`,
      data: {
        username,
        password
      }
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("auth_token", response.data.data.token)
          user.value = jwtDecode(response.data.data.token) as User
          token.value = response.data.data.token
          isAuthenticated.value = true
          location.replace("/")
        }
      })
      .catch((err) => {
        const response = err.response?.data as Response
        const status = err.response?.status
        const message = "An unexpected error occurred"

        switch (status) {
          case 404:
            Swal.fire({
              title: "Not Found",
              text: message,
              icon: "error"
            })
            break
          case 401:
            Swal.fire({
              title: "Unauthorized",
              text: message,
              icon: "error"
            })
            break
          default:
            Swal.fire({
              title: "Error",
              text: "An error occurred while trying to log in",
              icon: "error"
            })
            break
        }
      })
  }

  return {
    user,
    token,
    isAuthenticated,
    logout,
    login,
    register
  }
})
