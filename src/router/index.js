import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/pages/login.vue'
import profile from '@/pages/profile.vue'
import register from '@/pages/register.vue'
import myFollows from '@/pages/my-follows.vue'
import editProfile from '@/pages/edit-profile.vue'
import myPosts from '@/pages/my-posts.vue'
import myFavorites from '@/pages/my-favorites.vue'
import index from '@/pages/index.vue'
import newsDetail from '@/pages/news-detail.vue'
import brillComments from '@/pages/brill-comments.vue'
import search from '@/pages/search.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'index',
      path: '/',
      component: index
    },
    {
      name: 'search',
      path: '/search',
      component: search
    },
    {
      name: 'news-detail',
      path: '/news-detail/:id',
      component: newsDetail
    },
    {
      name: 'brill-comments',
      path: '/brill-comments/:id',
      component: brillComments
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'profile',
      path: '/profile',
      component: profile
    },
    {
      name: 'register',
      path: '/register',
      component: register
    },
    {
      name: 'my-follows',
      path: '/my-follows',
      component: myFollows
    },
    {
      name: 'edit-profile',
      path: '/edit-profile',
      component: editProfile
    },
    {
      name: 'my-posts',
      path: '/my-posts',
      component: myPosts
    },
    {
      name: 'my-favorites',
      path: '/my-favorites',
      component: myFavorites
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/profile') {
    if (!localStorage.getItem('current_dh_user_token')) next('/login')
    else next()
  } else next()
})

export default router
