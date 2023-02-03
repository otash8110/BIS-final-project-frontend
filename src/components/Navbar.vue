<template>
    <v-app-bar class="justify-space-between">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>
            <router-link to="/" class="nav__logo">
                UzExpoMarket
            </router-link>
        </v-app-bar-title>
        <v-row class="v-col-8">
            <v-col>
                <v-text-field label="Search for products" hide-details single-line class="flex-grow-1"></v-text-field>
            </v-col>
            <v-col cols="2" class="d-flex align-center">
                <v-btn icon="mdi-magnify"></v-btn>
            </v-col>
        </v-row>
        <v-row class="v-col-2" no-gutters>
            <v-col cols="12">
                <user-profile-menu v-if="currentUserStatus"></user-profile-menu>
                <router-link to="/register" v-if="!currentUserStatus">
                    <h3>Sign Up</h3>
                </router-link>
            </v-col>
        </v-row>

    </v-app-bar>
</template>

<script>
import UserProfileMenu from './User/UserProfileMenu.vue'
export default {
    components: { UserProfileMenu },
    name: "Nav-bar",
    computed: {
        currentUserStatus() {
            return this.$store.state.auth.status.loggedIn;
        }
    }
}
</script>

<style>
.nav__logo {
    color: black;
    text-decoration: none;
}
</style>