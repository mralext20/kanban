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
          You are now logged in! Click
          <router-link class="text-light" :to="{ name: 'boards' }">here</router-link>&nbsp;to create a new board!
        </h5>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

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
span:hover {
  transition: text-decoration 0.5s ease;
  text-decoration: underline;
}
#login-span:hover {
  color: lightblue;
  cursor: pointer;
}
</style>