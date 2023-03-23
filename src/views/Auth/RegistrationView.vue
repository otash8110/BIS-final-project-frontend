<template>
  <v-container>
    <v-row class="flex-column">
      <v-col cols="2">
        <h1 class="text-left">Register</h1>
      </v-col>
      <v-col>
        <v-form v-model="form" @submit.prevent="onSubmit">

          <v-select v-model="user.role" :items="rolesArray" label="Role" :rules="[validation.required]"></v-select>

          <v-text-field v-model="user.name" :readonly="loading" :rules="[validation.required]" class="mb-2" clearable
            label="Name"></v-text-field>

          <v-text-field v-model="user.surname" :readonly="loading" :rules="[validation.required]" class="mb-2" clearable
            label="Surname"></v-text-field>

          <v-text-field v-model="user.email" :readonly="loading" :rules="[validation.emailValidation]" class="mb-2"
            clearable label="Email"></v-text-field>

          <v-sheet border="lg opacity-12" class="text-body-2 mb-3" max-width="550">
            <v-container fluid>
              <p>Password rules:</p>
              <p>Has minimum 8 characters in length.</p>
              <p>At least one uppercase English letter.</p>
              <p>At least one lowercase English letter.</p>
              <p>At least one digit.</p>
              <p>At least one special character.</p>
            </v-container>
          </v-sheet>

          <v-text-field v-model="user.password" :readonly="loading" :rules="[validation.passwordValidation]" class="mb-2" clearable
            label="Password" type="password" placeholder="Enter your password"></v-text-field>

          <br>

          <v-btn :loading="loading" block color="success" size="large" type="submit" variant="elevated">
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
    <v-row class="justify" v-if="message">
      <v-col cols="4">
        <h2>
          <v-alert :type="alertType">
            {{ message }}</v-alert>
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { roles } from "../../models/Enums/Roles";
import User from "../../models/User";
import { emailValidation, passwordValidation } from "../../services/Validation/FormValidations";

export default {
  data: () => ({
    form: false,
    user: new User(),
    roles,
    loading: false,
    message: null,
    alertType: "success",
    validation: {
      emailValidation,
      passwordValidation,
      required(v) {
        return !!v || 'Field is required'
      },
    }
  }),

  computed: {
    rolesArray() {
      return Object.values(this.roles);
    }
  },

  methods: {
    onSubmit() {
      if (!this.form) return

      this.loading = true

      this.$store.dispatch("auth/register", this.user)
        .then(
          result => {

            this.message = "Success register";
            this.alertType = "success";
            result;
          },
          error => {
            console.log(error);
            this.message = "Fail register";
            this.alertType = "error";
            this.loading = false;
            error;
          }
        )
    },

  },
}
</script>

<style></style>