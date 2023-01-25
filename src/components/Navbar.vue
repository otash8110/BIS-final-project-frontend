<template>
    <v-app-bar class="justify-space-between">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-app-bar-title>
            UzExpoMarket
        </v-app-bar-title>
        <v-row class="flex-grow-1 v-col-8">
            <v-col>
                <v-text-field label="Search for products" hide-details single-line class="flex-grow-1"></v-text-field>
            </v-col>
            <v-col cols="2" class="d-flex align-center">
                <v-btn icon="mdi-magnify"></v-btn>
            </v-col>
        </v-row>
            <user-profile-menu></user-profile-menu>
    </v-app-bar>
</template>

<script>
import UserProfileMenu from './User/UserProfileMenu.vue'
export default {
  components: { UserProfileMenu },
    name: "Nav-bar"
}
</script>

<style>

</style>