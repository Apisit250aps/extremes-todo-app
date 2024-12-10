<template>
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <form class="card-body" @submit.prevent="register">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="username"
          class="input input-bordered"
          v-model="username"
          required
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          class="input input-bordered"
          v-model="password"
          required
        />
        <label class="label">
          <RouterLink to="login" class="label-text-alt link link-hover"
            >I'm haven an account!</RouterLink
          >
        </label>
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth"
import { ref } from "vue"
import { RouterLink } from "vue-router"
const auth = useAuthStore()

const username = ref<string>("")
const password = ref<string>("")

const register = (e: Event): void => {
  e.preventDefault()
  auth.register({ username: username.value, password: password.value })
}
</script>

<style scoped></style>
