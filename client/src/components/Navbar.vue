<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-none sticky-top">
    <router-link class="navbar-brand" :to="{ name: 'home' }">
      <img
        src="https://cdn1.iconfinder.com/data/icons/agile/500/agile_sprint_plan-512.png"
        height="30"
        width="30"
      />
      <span class="ml-3">Kanban</span>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="{ active: $route.name == 'home' }">
          <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
        </li>
        <li
          class="nav-item"
          v-if="$auth.isAuthenticated"
          :class="{ active: $route.name == 'boards' }"
        >
          <router-link class="nav-link" :to="{ name: 'boards' }">My Dashboard</router-link>
        </li>
      </ul>
      <span class="navbar-text">
        <button class="btn btn-secondary" @click="login" v-if="!$auth.isAuthenticated">Login</button>
        <button class="btn btn-danger" @click="logout" v-else>Logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import NotificationService from "../NotificationService.js";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});
export default {
  name: "Navbar",
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      NotificationService.toast("Logged In");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    async logout() {
      await this.$auth.logout();
      this.$store.dispatch("resetBearer");
      this.$router.push({ name: "home" });
      NotificationService.toast("Logged Out");
    }
  }
};
</script>

<style>
</style>
