<template>
  <v-menu
        min-width="200px"
        rounded
      >
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
          >
            <v-avatar
              color="brown"
              size="large"
            >
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar
                color="brown"
              >
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                rounded
                variant="text"
                @click="HandleEditAccount"
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                rounded
                variant="text"
                @click="HandleLogout"
              >
                Disconnect
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
</template>

<script>
export default {
    data: () => ({
      user: {
        initials: "",
        fullName: '',
        email: "",
      },
    }),

    props: ['userinfo'],

    watch: {
      userinfo() {
        this.HandleUserDataChange();
      }
    },
    methods: {
      HandleLogout() {
        this.$store.dispatch("auth/logout").then(() => {
          this.$router.go();
        })
      },
      HandleEditAccount()  {
        this.$router.push("/profile");
      },
      HandleUserDataChange() {
        let name = this.userinfo.name;
        let surname = this.userinfo.surname;
        this.user.initials = name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
        this.user.fullName = name + ' ' + surname;
        this.user.email = this.userinfo.email;
      }
    }
  }
</script>

<style>

</style>