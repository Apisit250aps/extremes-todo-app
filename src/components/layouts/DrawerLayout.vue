<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router"
import Navbar from "../navigates/Navbar.vue"
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <Navbar>
        <div class="navbar-start lg:hidden">
          <label
            for="dashboard-drawer"
            class="btn btn-ghost drawer-button lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </label>
        </div>
      </Navbar>
      <main class="">
        <RouterView />
      </main>
    </div>
    <div class="drawer-side">
      <label
        for="dashboard-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-56 p-4">
        <!-- Sidebar content here -->
        <li>
          <h2 class="menu-title">Dashboard</h2>
          <ul>
            <li>
              <RouterLink to="/dashboard">Dashboard</RouterLink>
            </li>
          </ul>
        </li>
        <li>
          <h2 class="menu-title">Manage</h2>
          <ul>
            <li>
              <RouterLink to="/project">Projects</RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
