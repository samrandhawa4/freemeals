<template>
<v-container fluid>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar class="light-blue" dark>
          <v-btn icon>
            <v-icon>sort</v-icon>
          </v-btn>
          <v-toolbar-title>My Posts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon to="/post/create">
            <v-icon>note_add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line subheader>
          <v-subheader inset>Meals</v-subheader>
          <app-post
            v-for="post in posts"
            :post="post"
            v-bind:key="post.id"
            @deletePost="deletePost($event)"
            @openDialog="openDialog($event)"
            @openEditDialog="openEditDialog($event)"
          ></app-post>
          <div class="text-xs-center">
            <v-pagination
              v-bind:length.number="paginate.number"
              @input="linkPage"
              v-model="paginate.page"
            ></v-pagination>
          </div>
        </v-list>
      </v-card>
    </v-flex>
    <v-snackbar
     :timeout=3000
     :success="status === 'success'"
     :error="status === 'success'"
     v-model="snackbar"
     >
     {{ message }}
     <v-btn flat dark icon @click.native="snackbar = false"><v-icon>close</v-icon></v-btn>
   </v-snackbar>
  </v-layout>
</v-container>
</template>

<script>
  const token = localStorage.getItem('token')
  const URL = 'http://codedegg.com/api/'
  import Post from './Post'
  import Form from './Form'
  export default {
    components: {
      'app-post': Post,
      'post-form': Form
    },
    data () {
      return {
        posts: [],
        post: [],
        status: 'success',
        snackbar: false,
        message: null,
        paginate: {
          page: 0,
          total: 0,
          path: null
        }
      }
    },
    created () {
      this.getPosts()
    },
    methods: {
      closeDialog () {
        this.dialog = false
      },
      openDialog () {
        this.dialog = true
      },
      pagination (paginate) {
        this.posts = paginate.data
        this.paginate.page = paginate.current_page
        this.paginate.number = paginate.last_page
        this.paginate.path = paginate.path
      },
      getPosts (page) {
        let pageUrl = URL + 'mymeals?token=' + token
        if (page) {
          pageUrl = URL + 'mymeals?page=' + page + '&token=' + token
        }
        this.$http.get(pageUrl)
        .then(response => {
          console.log(response)
          this.pagination(response.body.posts)
        })
        .catch((error) => {
          if (error.statusText === 'Unauthorized') {
            this.$auth.destroyToken()
          }
        })
      },
      showSnackbar (status, message) {
        this.snackbar = true
        this.status = status
        this.message = message
      },
      updatePost (data) {
        const position = this.posts.findIndex((element) => {
          return element.id === data.id
        })
        this.posts.splice(position, 1)
        this.posts.unshift(data)
      },
      addPost (data) {
        console.log(data)
        this.posts.unshift(data)
      },
      deletePost (id) {
        this.$http.delete(URL + 'post/' + id + '?token=' + token)
        .then(response => {
          console.log(response)
          const position = this.posts.findIndex((element) => {
            return element.id === id
          })
          this.posts.splice(position, 1)
        })
        .catch((error) => {
          if (error.statusText === 'Unauthorized') {
            this.$auth.destroyToken()
          }
        })
      },
      linkPage (page) {
        this.getPosts(page)
      }
    }
  }
</script>
