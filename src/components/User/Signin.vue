<template>
<v-container fluid>
   <v-layout row wrap justify-center>
     <v-flex xs12 sm4>
      <h1 class="logo">Free Meal</h1>
       <v-card>
         <v-toolbar dark class="blue lighten-1">
           <v-toolbar-title>Sign in</v-toolbar-title>
         </v-toolbar>
         <v-card-text>
         <form @submit.prevent="onSubmit">
           <v-container fluid>
             <v-layout row wrap>
               <v-flex xs12>
                 <v-text-field
                   label="E-mail"
                   v-model="email"
                   :error-messages="errors.email"
                   prepend-icon="person"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                <v-text-field
                   name="pass"
                   label="Password"
                   hint="At least 8 characters"
                   v-model="pass"
                   min="5"
                   prepend-icon="lock"
                   :error-messages="errors.password"
                   :append-icon="p ? 'visibility_off' : 'visibility'"
                   :type="p ? 'password' : 'text'"
                   :append-icon-cb="() => (p = !p)"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-layout row wrap>
                   <v-flex xs6>
                     <v-checkbox value="remember" v-model="remember" label="Remember me"></v-checkbox>
                   </v-flex>
                   <v-flex xs6>
                     <v-btn flat class="normal-btn" to="/forget">Lost Password?</v-btn>
                   </v-flex>
                 </v-layout>
               </v-flex>
               <v-flex xs12>
                 <v-btn primary type="submit" dark light :loading="loading" block>Sign In</v-btn>
               </v-flex>
               <v-flex xs12>
                <v-divider class="m-20"></v-divider>
               </v-flex>
               <v-flex xs12>
                <v-btn secondary flat block to="/signup">Dont't have account ? create account</v-btn>
               </v-flex>
             </v-layout>
           </v-container>
           </form>
         </v-card-text>
       </v-card>
     </v-flex>
     <app-snackbar :data="data"></app-snackbar>
   </v-layout>
 </v-container>
</template>
<script>
  const URL = 'http://127.0.0.1:8000/api/'
  import Snackbar from '../Snackbar'
  export default {
    components: {
      'app-snackbar': Snackbar
    },
    data () {
      return {
        email: '',
        pass: '',
        status: 'error',
        snackbar: false,
        message: '',
        loading: false,
        remember: true,
        errors: [],
        data: {
          message: '',
          model: false,
          context: 'error'
        },
        photo: this.myCroppa,
        p: false
      }
    },
    methods: {
      onSubmit () {
        this.loading = true
        this.$http.post('http://codedegg.com/api/signin',
            { email: this.email, password: this.pass },
            )
            .then(
              (response) => {
                if (response.status === 201) {
                  this.data = {
                    model: true,
                    context: 'success',
                    message: 'Please wait your account is loading'
                  }
                  this.loading = false
                  const token = response.data.token
                  this.$auth.setToken(token)
                  this.getProfile()
                }
                this.loading = false
                console.log(response)
              }
            )
            .catch(
                (error) => {
                  this.loading = false
                  if (error.status === 422) {
                    this.errors = error.body
                    this.data = {
                      model: true,
                      context: 'error',
                      message: 'Oh you have to remove the errors first'
                    }
                    this.loading = false
                  }
                  console.log(error)
                }
            )
      },
      getProfile () {
        const token = localStorage.getItem('token')
        this.$http.get(URL + 'profile?token=' + token)
            .then((response) => {
              if (response.status === 201) {
                this.$auth.setUser(response.data.user)
                this.$router.go('/profile')
              }
              console.log(response)
            })
            .catch((error) => {
              console.log(error)
            })
      }
    }
  }
</script>
<style>
.logo{
 font-family: 'Pacifico', cursive;
 color: #fff;
 margin-top:20px;
 margin-bottom:20px;
 text-align: center;
 font-size: 42px;
}
.normal-btn{
  color: #777 !important;
  margin: 16px 0;
}
.m-20 {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
