<template>
  <v-container>
    <v-row class="flex-column">
      <v-col cols="2">
            <h1 class="text-left">Register</h1>
        </v-col>
      <v-col>
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Password"
            placeholder="Enter your password"
          ></v-text-field>
  
          <br>
  
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Sign up
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Have an account?
        <router-link to="/login">Sign in!</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
    }),

    methods: {
      onSubmit () {
        if (!this.form) return

        this.loading = true

        this.$store.dispatch("auth/register", )
      },
      required (v) {
        return !!v || 'Field is required'
      },
    },
  }
</script>

<style>

</style>