<template>
  <div class="home text-light container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="pt-3">Welcome to your Project Boards</h1>
        <h5
          class="pt-5"
        >Your project boards allow you to quickly and easily organize tasks into lists and individual items.</h5>
        <h5 class="pt-4" v-if="!$auth.isAuthenticated">
          Simply
          <span id="login-span" @click="login">login</span> to get started and create your first board!
        </h5>
        <h5 v-else class="pt-4">
          You are now logged in!
          <router-link class="text-light" :to="{ name: 'boards' }">Click here</router-link>&nbsp;to create a new board!
        </h5>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import NotificationService from "../NotificationService.js";

let _api = axios.create({
  baseURL: "https://localhost:3000",
  withCredentials: true
});

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
      NotificationService.toast("Logged In");
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    }
  },
  components: {}
};
</script>


<style scoped>
span {
  color: white;
}
a {
  transition: color 0.4s ease, text-shadow 0.4s ease !important;
  color: white;
  text-shadow: 2px 2px 2px black;
  text-decoration: none;
}

a:hover {
  transition: color 0.4s ease, text-shadow 0.4s ease !important;
  color: darkgray !important;
  text-shadow: 1px 1px 2px gray;
}
#login-span:hover {
  color: lightblue;
  cursor: pointer;
}
</style>