<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2>
      <v-container fluid>
        <v-toolbar class="light-blue" dark>
          <v-btn icon>
            <v-icon>tune</v-icon>
          </v-btn>
          <v-toolbar-title>Meals</v-toolbar-title>
          <v-spacer></v-spacer>
       </v-toolbar>
       <div class="white pad-6">
           <v-btn flat small @click.native="appendSearch('vegetarian')"><v-icon left success>local_pizza</v-icon>Vegetarian</v-btn>
           <v-btn flat small @click.native="appendSearch('vegan')"><v-icon left primary>local_pizza</v-icon>Vegan</v-btn>
           <v-btn flat small @click.native="appendSearch('non-vegetarian')"><v-icon left error>local_pizza</v-icon>Non Vegetarian</v-btn>
       </div>
     </v-container>
    </v-flex>
    <v-flex xs12 sm8 offset-sm2>
     <v-container fluid v-for="(post,index) in posts" v-bind:key="post.index">
      <v-card>
       <v-carousel>
          <v-carousel-item
            v-for="(item,i) in post.photos"
            v-bind:src="`http://codedegg.com/gallery/posts/thumbs/${item.photo}`"
            :key="i">
          </v-carousel-item>
        </v-carousel>
        <v-list two-line>
        <v-list-tile>
            <v-list-tile-action>
              <v-icon :class="foodType(post.category)">local_pizza</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{post.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{post.content}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>room</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{post.place}}</v-list-tile-title>
              <v-list-tile-sub-title>Pick up address</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>av_timer</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{post.date}}</v-list-tile-title>
              <v-list-tile-sub-title>Pickup Date</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action></v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{post.time}}</v-list-tile-title>
              <v-list-tile-sub-title>Time</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        <v-divider inset></v-divider>
          <v-list-tile>
           <v-list-tile-avatar>
              <img :src="getThumb(post.users.photo)" :alt="post.users.first_name" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{post.users.first_name}} {{post.users.last_name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{post.users.city}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-container>
    </v-flex>
    <v-btn
       primary
       dark
       fab
       fixed
       bottom
       right
     >
       <v-icon class="text--white">keyboard_arrow_up</v-icon>
    </v-btn>
  </v-layout>
</template>
<script>
  export default {
    data: () => ({
      cards: [
        { title: 'Pre-fab homes', src: 'https://vuetifyjs.com/static/doc-images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://vuetifyjs.com/static/doc-images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://vuetifyjs.com/static/doc-images/cards/plane.jpg', flex: 6 }
      ],
      route: [],
      posts: []
    }),
    mounted () {
      this.getPosts()
    },
    methods: {
      getPosts () {
        const URL = 'http://codedegg.com/api/'
        this.$http.get(URL + 'meals')
        .then(response => {
          console.log(response)
          this.posts = response.body.posts.data
        })
        .catch((error) => {
          if (error.statusText === 'Unauthorized') {
            this.$auth.destroyToken()
          }
        })
      },
      getPhoto (photo) {
        if (photo) {
          return 'http://codedegg.com/gallery/posts/thumbs/' + photo
        }
      },
      getThumb (photo) {
        if (photo) {
          return 'http://codedegg.com/gallery/user/thumbs/' + photo
        }
      },
      foodType (val) {
        if (val === 1) {
          return 'success--text'
        } else if (val === 2) {
          return 'primary--text'
        } else {
          return 'error--text'
        }
      },
      appendSearch (val) {
        return this.$router.push(val)
      }
    }
  }
</script>
<style>
.list__tile__title, .list__tile__sub-title{
  overflow-x: auto !important;
  white-space: normal !important;
}
.pad-6{
 padding-top: 6px;
 padding-bottom: 6px;
}
</style>
