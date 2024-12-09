<template>
  <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <form class="card-body">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="username"
          class="input input-bordered"
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
          required
        />
        <label class="label">
            <RouterLink to="login" class="label-text-alt link link-hover">I'm haven an account!</RouterLink>
        </label>
      </div>
      <div class="form-control mt-6">
        <button class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
