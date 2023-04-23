<template>
    <v-app-bar class="justify-space-between">
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>
            <router-link to="/" class="nav__logo">
                UzExpoMarket
            </router-link>
        </v-app-bar-title>
        <v-row class="v-col-2" no-gutters>
            <v-col cols="12">
                <user-profile-menu v-if="currentUserStatus" :userinfo="user"></user-profile-menu>
                <router-link to="/register" v-if="!currentUserStatus">
                    <h3>Sign Up</h3>
                </router-link>
            </v-col>
        </v-row>

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="left" temporary>
        <v-list :lines="false" density="compact" nav>
            <v-list-item v-for="(item, i) in NavigationList" :key="i" :value="item" active-color="primary" :to="item.to">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import UserService from '@/services/User/UserService';
import UserProfileMenu from './User/UserProfileMenu.vue'
export default {
    components: { UserProfileMenu },
    name: "Nav-bar",
    data() {
        return {
            user: "",
            drawer: false,
            items: [],
            search: ""
        }
    },
    computed: {
        currentUserStatus() {
            return this.$store.state.auth.status.loggedIn;
        },

        NavigationList() {
            return this.items.filter(item => item.if);
        },

        isManufacturer() {
            return this.$store.state.auth.role == "Manufacturer" ? true : false;
        },

        isDistributor() {
            return this.$store.state.auth.role == "Distributor" ? true : false;
        }
    },
    watch: {
        currentUserStatus(newVal) {
            if (newVal == true) {
                this.GetUser();
                this.UpdateNavList();
            }
        },

        isManufacturer() {
            this.UpdateNavList();
        },

        isDistributor() {
            this.UpdateNavList();
        }
    },
    methods: {
        async GetUser() {
            if (this.currentUserStatus == true) {
                UserService.GetUser().catch(err => {
                    if (err.response.status == 401) {
                        this.$store.dispatch("auth/logout").then(() => {
                            this.$router.go();
                        })
                    }
                }).then(result => {
                    this.user = result.data;
                });
            }
        },

        UpdateNavList() {
            this.items = [
                { text: 'Home', icon: 'mdi-folder', to: "/", if: true },
                { text: 'Create Product', icon: 'mdi-account-multiple', to: "/product/create", if: this.isManufacturer },
                { text: 'Register', icon: 'mdi-account-multiple', to: "/register", if: !this.currentUserStatus },
                { text: 'My Products', icon: 'mdi-account-multiple', to: "/manufacturer-products", if: this.isManufacturer },
                { text: 'Search Products', icon: 'mdi-account-multiple', to: "/products-search", if: true },

            ];
        },

        
    },
    mounted() {
        this.GetUser();
        this.UpdateNavList();
    }
}
</script>

<style>
.nav__logo {
    color: black;
    text-decoration: none;
}
</style>