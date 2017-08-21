<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar class="blue lighten-1" dark>
          <v-btn icon to="/posts">
            <v-icon>list</v-icon>
          </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>Post About Meal</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon light to="/post/create">
              <v-icon>note_add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <h2 class="subheading mb-5">Lets make your day wonderful by giving meal to needy one <v-icon warning>tag_faces</v-icon></h2>
            <v-select
                v-bind:items="items"
                item-text="text"
                item-value="id"
                v-model="category"
                label="Food for"
                :error-messages="errors.category"
                hint="Example: Food for vegan"
                persistent-hint
              ></v-select>
              <v-text-field
                label="Food Name"
                hint="Tell the name of food"
                v-model="title"
                :error-messages="errors.title"
                persistent-hint
              ></v-text-field>
              <v-text-field
                label="Food description"
                hint="Give brief description about that food"
                v-model="content"
                :error-messages="errors.content"
                multi-line
                persistent-hint
              ></v-text-field>
            <div class="input-group input-group--prepend-icon input-group--text-field">
                <div class="input-group__input">
                  <v-icon class="input-group__prepend-icon">location_on</v-icon>
                  <gmap-autocomplete
                    placeholder="Select Place"
                    class="input"
                    v-model="place"
                    @place_changed="setPlace"
                  >
                  </gmap-autocomplete>
                </div>
                <div class="input-group__details">
                  <div class="input-group__messages">
                    <div class="input-group__error" v-if="errors.place">{{errors.place[0]}}</div>
                    <div class="input-group__hint" v-if="!errors.place">Type Pickup address</div>
                  </div>
                </div>
            </div>
            <app-picker
              :date="date"
              :time="time"
              @saveDate="saveDate($event)"
              @saveTime="saveTime($event)"
              :errorDate="errors.date"
              :errorTime="errors.time"
            >
            </app-picker>
            <file-upload
             :url="URL"
             :ph="images"
             :progress="progress"
             @onUpload="onUpload($event)"
             hint="End time to pickup the food"
            ></file-upload>
            <p class="error--text" v-if="errors.photos">Photo is required</p>
            <v-btn primary dark light :loading="loading" block @click.native="onSave" v-if="editMode">Update</v-btn>
            <v-btn primary dark light :loading="loading" block @click.native="onCreate" v-if="!editMode">Post</v-btn>
          </v-card-text>
          <app-snackbar :data="data"></app-snackbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Pickers from './Pickers'
import FileUpload from '../FileUpload'
import Snackbar from '../Snackbar'
const token = localStorage.getItem('token')
const URL = 'http://127.0.0.1:8000/api/'
export default {
  components: {
    'app-picker': Pickers,
    'file-upload': FileUpload,
    'app-snackbar': Snackbar
  },
  data () {
    return {
      loading: false,
      category: null,
      title: '',
      content: '',
      date: null,
      place: '',
      time: null,
      photos: [],
      images: [],
      data: {
        message: '',
        model: false,
        context: 'error'
      },
      menu: false,
      progress: 0,
      errors: [],
      URL: URL,
      editMode: false,
      items: [
        { id: 1, text: 'Vegetarian' },
        { id: 2, text: 'Non Vegetarian' },
        { id: 3, text: 'Vegan' }
      ]
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getPost(this.$route.params.id)
      this.editMode = true
    }
  },
  methods: {
    setPlace (place) {
      this.place = place.formatted_address
    },
    saveDate (val) {
      this.date = val
    },
    saveTime (val) {
      this.time = val
    },
    onUpload (photo) {
      this.progress = 0
      this.photos = photo
    },
    getPost (id) {
      this.$http.get(URL + 'post/' + id + '?token=' + token)
      .then(response => {
        if (response.status === 200) {
          this.category = response.body.post.category
          this.title = response.body.post.title
          this.content = response.body.post.content
          this.place = response.body.post.place
          this.date = response.body.post.date
          this.time = response.body.post.time
          this.images = response.body.post.photos
        }
      })
      .catch((error) => {
        if (error.status === 422) {
          this.errors = error.body
        }
        if (error.status === 401) {
          this.$auth.destroyToken()
        }
        console.log(error)
      })
    },
    onSave () {
      let vm = this
      vm.loading = true
      this.$http.post(URL + 'post/' + this.$route.params.id + '?token=' + token, {
        title: this.title,
        category: this.category,
        content: this.content,
        place: this.place,
        date: this.date,
        time: this.time,
        photos: this.photos
      },
        {
          progress (e) {
            if (e.lengthComputable) {
              vm.progress = (e.loaded / e.total * 100)
            }
          }
        })
      .then(response => {
        if (response.status === 201) {
          this.data = {
            model: true,
            context: 'success',
            message: response.body.message
          }
        }
        this.loading = false
      })
      .catch((error) => {
        if (error.status === 422) {
          this.errors = error.body
          this.data = {
            model: true,
            context: 'error',
            message: 'Oh you have to remove the errors first'
          }
        }
        this.loading = false
        console.log(error)
      })
    },
    onCreate () {
      let vm = this
      vm.loading = true
      this.$http.post(URL + 'post/create?token=' + token, {
        title: this.title,
        category: this.category,
        content: this.content,
        place: this.place,
        date: this.date,
        time: this.time,
        photos: this.photos
      },
        {
          progress (e) {
            if (e.lengthComputable) {
              vm.progress = (e.loaded / e.total * 100)
            }
          }
        })
      .then(response => {
        if (response.status === 201) {
          this.data = {
            model: true,
            context: 'success',
            message: response.body.message
          }
          this.category = ''
          this.title = ''
          this.content = ''
          this.place = ''
          this.date = ''
          this.time = ''
          this.images = ''
        }
        this.loading = false
      })
      .catch((error) => {
        if (error.status === 422) {
          this.errors = error.body
          this.data = {
            model: true,
            context: 'error',
            message: 'Oh you have to remove the errors first'
          }
        }
        this.loading = false
        console.log(error)
      })
    }
  }
}
</script>
