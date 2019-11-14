<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" validation :lazy-validation="lazy">
              <v-text-field
                label="Email"
                :rules="emailRules"
                name="email"
                prepend-icon="person"
                type="email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                label="Password"
                name="password"
                prepend-icon="lock"
                :counter="6"
                type="password"
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                name="confirm-password"
                prepend-icon="lock"
                :counter="6"
                type="password"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmit" :loading="loading" :disabled="!valid || loading">Create account</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
const emailRegex = /.+@.+/;
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      lazy: false,
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => emailRegex.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 6 || "Password must be equal or more than 6 characters"
      ],
      confirmPasswordRules: [
          v => !!v || "Password is required",
          v => v === this.password || 'Password should match'
      ]
    };
  },
  computed: {
    loading(){
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch('regUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => console.log(err))
      }
    }
  }
};
</script>