<template>
  <div class="home text-light container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="pt-3">Welcome to your Project Boards</h1>
        <h5
          class="pt-5"
        >Your project boards allow you to quickly and easily organize tasks into lists and individual items.</h5>
        <h5 v-if="!$auth.isAuthenticated">
          Simply
          <span id="login-span" @click="login" v-if="!$auth.isAuthenticated">login</span> to get started and create your first board!
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
  text-decoration: underline;
}
#login-span:hover {
  color: lightblue;
  cursor: pointer;
}
</style>