<template>
  <v-app>
    <v-layout>
      <navbar />
      <v-main>
        <ToastNotification />
        <div class="pa-6">
          <router-view />
        </div>
      </v-main>
    </v-layout>
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
    },
    currentUserWSConnection() {
      return this.$store.state.signalr.connection;
    },
    isManufacturer() {
      return this.$store.state.auth.role == "Manufacturer" ? true : false;
    }
  },
  mounted() {
    if (this.currentUserStatus && this.currentUserWSConnection == null) {
      this.$store.dispatch('signalr/createConnection');
    }

    console.log(this.isManufacturer);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
