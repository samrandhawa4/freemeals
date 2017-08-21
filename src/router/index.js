import Home from '@/components/Home'
import Posts from '@/components/Post/Posts'
import PostCreate from '@/components/Post/Create'
import PostEdit from '@/components/Post/Edit'
import UserSignin from '@/components/User/Signin'
import UserSignup from '@/components/User/Signup'
import UserProfile from '@/components/User/Profile'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false
    }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    meta: {
      auth: true
    }
  },
  {
    path: '/post/create',
    name: 'PostCreate',
    component: PostCreate,
    meta: {
      auth: true
    }
  },
  {
    path: '/post/edit/:id',
    name: 'PostEdit',
    component: PostEdit,
    meta: {
      auth: true
    }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      auth: true
    }
  },
  {
    path: '/signup',
    name: 'UserSignup',
    component: UserSignup,
    meta: {
      guest: true
    }
  },
  {
    path: '/signin',
    name: 'UserSignin',
    component: UserSignin,
    meta: {
      guest: true
    }
  }
]

export default routes
