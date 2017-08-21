<template>
<v-container fluid>
   <v-layout row wrap justify-center>
     <v-flex xs12 sm4>
       <v-card>
         <v-toolbar dark class="blue lighten-1">
           <v-toolbar-title>
            <v-icon dark>person</v-icon>
             Profile
            </v-toolbar-title>
         </v-toolbar>
         <v-card-text>
           <v-container fluid>
             <v-layout row wrap>
               <v-flex xs12>
                <div class="round">
                  <croppa
                  v-model="photo"
                  :initial-image="getPhoto(image)"></croppa>
                </div>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="First Name"
                   v-model="fname"
                   max="15"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="Last Name"
                   v-model="laname"
                   max="15"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="City"
                   v-model="city"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="Mobile"
                   v-model="mobile"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-text-field
                   label="E-mail"
                   v-model="email"
                 ></v-text-field>
               </v-flex>
               <v-flex xs12>
                 <v-btn primary dark light :loading="loading" block @click.native="onSubmit">Update</v-btn>
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
  const URL = 'http://127.0.0.1:8000/api/'
  const token = localStorage.getItem('token')
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
        city: '',
        mobile: '',
        data: {
          message: '',
          model: false,
          context: 'error'
        },
        errors: [],
        loading: false,
        photo: this.myCroppa,
        p: false
      }
    },
    created () {
      this.getProfile()
    },
    methods: {
      getProfile () {
        let data = this.$auth.getUser()
        if (data) {
          this.email = data.email
          this.fname = data.first_name
          this.laname = data.last_name
          this.image = data.photo
        }
        let pageUrl = URL + 'profile?token=' + token
        this.$http.get(pageUrl)
        .then(response => {
          console.log(response)
          this.city = response.body.user.city
          this.mobile = response.body.user.mobile
        })
        .catch((error) => {
          if (error.statusText === 'Unauthorized') {
            this.$auth.destroyToken()
          }
        })
      },
      getPhoto (photo) {
        if (photo) {
          return 'http://127.0.0.1:8000/gallery/user/thumbs/' + photo
        }
      },
      onSubmit () {
        this.loading = true
        this.$http.post('http://127.0.0.1:8000/api/signup',
            { fname: this.fname, laname: this.laname, email: this.email, photo: this.photo.generateDataUrl() },
            )
            .then(
              (response) => {
                if (response.status === 201) {
                  this.message = response.body.message
                  this.data = {
                    model: true,
                    context: 'error',
                    message: 'Oh you have to remove the errors first'
                  }
                }
                this.loading = false
                console.log(response)
              }
            )
            .catch(
                (error) => {
                  this.loading = false
                  this.data = {
                    model: true,
                    context: 'error',
                    message: 'Oh you have to remove the errors first'
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
