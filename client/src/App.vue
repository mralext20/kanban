<template>
  <div class="bg-dark text-light" id="app">
    <navbar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import { onAuth } from "@bcwdev/auth0-vue";

export default {
  name: "App",
  data() {
    return {};
  },
  async beforeCreate() {
    try {
      await onAuth();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    } catch (err) {
      this.$router.push({ name: "home" });
    }
  },
  components: {
    Navbar
  }
};
</script>


<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

#app {
  font-family: "Roboto Slab", serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  min-height: 100vh;
  background-image: url(https://www.genelockwoods.com/wp-content/uploads/2017/10/wood-large-background-min.jpeg);
  background-position: center;
  background-size: cover;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>