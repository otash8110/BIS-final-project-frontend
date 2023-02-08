<template>

  <v-app>
    <navbar />
    <v-main>
      <ToastNotification />
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link v-if="!currentUserStatus" to="/register">Register</router-link>
      </nav>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import ToastNotification from './components/ToastNotification.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    ToastNotification
},
  computed: {
    currentUserStatus() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  
  mounted() {
    if (this.currentUserStatus) {
    this.$store.dispatch('signalr/createConnection')
  } 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
