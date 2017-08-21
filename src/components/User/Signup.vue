<template>
<v-container fluid>
   <v-layout row wrap justify-center>
     <v-flex xs12 sm4>
       <v-card>
         <v-toolbar dark class="blue lighten-1">
           <v-toolbar-title>Signup</v-toolbar-title>
         </v-toolbar>
         <v-card-text>
           <v-container fluid>
             <v-layout row wrap>
               <v-flex xs12>
                <div class="round">
                  <croppa v-model="photo"></croppa>
                </div>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="First Name"
                   v-model="fname"
                   :error-messages="errors.fname"
                   max="15"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="Last Name"
                   v-model="laname"
                   :error-messages="errors.laname"
                   max="15"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="E-mail"
                   v-model="email"
                   :error-messages="errors.email"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                <v-text-field
                   name="pass"
                   label="Password"
                   :error-messages="errors.password"
                   hint="At least 8 characters"
                   v-model="pass"
                   min="5"
                   :append-icon="p ? 'visibility_off' : 'visibility'"
                   :type="p ? 'password' : 'text'"
                   :append-icon-cb="() => (p = !p)"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="City"
                   :error-messages="errors.city"
                   v-model="city"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="Mobile"
                   :error-messages="errors.mobile"
                   v-model="mobile"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <p v-if="errors.photo" class="error--text">{{errors.photo[0]}}</p>
                 <v-btn primary dark light :loading="loading" block @click.native="signup">Signup</v-btn>
               </v-flex>
             </v-layout>
           </v-container>
         </v-card-text>
       </v-card>
     </v-flex>
    <app-snackbar :data="data"></app-snackbar>
   </v-layout>
 </v-container>
</template>
<script>
  import Snackbar from '../Snackbar'
  export default {
    components: {
      'app-snackbar': Snackbar
    },
    data () {
      return {
        fname: '',
        laname: '',
        email: '',
        pass: '',
        mobile: '',
        city: '',
        errors: [],
        data: {
          message: '',
          model: false,
          context: 'error'
        },
        loading: false,
        photo: this.myCroppa,
        p: false
      }
    },
    methods: {
      signup () {
        this.loading = true
        this.$http.post('http://codedegg.com/api/signup',
          { fname: this.fname,
            laname: this.laname,
            email: this.email,
            password: this.pass,
            city: this.city,
            mobile: this.mobile,
            photo: this.photo.generateDataUrl()
          })
            .then(
              (response) => {
                if (response.status === 201) {
                  this.data = {
                    model: true,
                    context: 'success',
                    message: response.body.message
                  }
                  this.loading = false
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
                  }
                  console.log(error)
                }
            )
      }
    }
  }
</script>
<style>
.round, .croppa-container{
 border-radius: 80%;
 overflow:hidden;
 width:200px;
 margin: auto;
 margin-bottom: 10px;
 height:200px;
}
</style>
