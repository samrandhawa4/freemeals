<template>
  <v-app class="cover-back">
    <v-navigation-drawer temporary v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.native.stop="sideNav = !sideNav"
        class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;font-family: 'Pacifico', cursive;padding-right: 6px;">FreeMeal </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        
        <v-btn
          flat
          v-for="item in guestItems"
          :to="item.link"
          :key="item.title"
          v-if="!isLoggedIn"
          >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          flat
          v-for="item in authItems"
          :to="item.link"
          :key="item.title"
          v-if="isLoggedIn"
          >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          flat
          @click.native="onLogout"
          key="logout"
          v-if="isLoggedIn"
          >
          <v-icon left dark>power_settings_new</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        isLoggedIn: this.$auth.isAuthenticated(),
        menuItems: [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' },
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' }
        ],
        guestItems: [
          { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' }
        ],
        authItems: [
          { icon: 'local_pizza', title: 'Meals', link: '/posts', subLink: false },
          { icon: 'person', title: 'Profile', link: '/profile', subLink: false }
        ]
      }
    },
    methods: {
      onLogout () {
        this.$auth.destroyToken()
        this.$router.go('/signin')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
