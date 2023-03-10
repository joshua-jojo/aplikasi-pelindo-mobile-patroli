import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import store from '../store'
import { ref } from 'vue';
import { Preferences } from '@capacitor/preferences';
import expired from '../composables/authentikasi/cekToken'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'initial',
    redirect: { name: 'user.dashboard' }
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layout/authLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('../views/auth/loginPage.vue')
      },
      {
        path: 'register',
        name: 'auth.register',
        component: () => import('../views/auth/registerPage.vue')
      },
    ]
  },
  {
    path: '/user',
    component: () => import('../layout/userLayout.vue'),
    children: [
      {
        path: 'callcenter',
        name: 'callcenter.show',
        component: () => import('../views/callCenter.vue')
      },
      {
        path: 'dashboard',
        name: 'user.dashboard',
        component: () => import('../views/guest/berandaUser.vue')
      },
      {
        path: 'postingan/show/:id',
        name: 'user.postingan.show',
        props: true,
        component: () => import('../views/guest/postingan/ambilPostingan.vue')
      },
      {
        path: 'postingan/tambah',
        name: 'user.postingan.tambah',
        component: () => import('../views/guest/postingan/tambahPostingan.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

async function getStatus() {
  const informationAuth: any = await Preferences.get({ key: 'informationAuth' })
  const final = await JSON.parse(informationAuth.value);

  
  const userActive = await expired(final ? final.user.token : '')
  const status = ref(false)
  if(await userActive){
    store.state.user.nama = null
    store.state.user.email = null
    store.state.user.token = null
    store.state.login = false
  } else {
    status.value = true
    store.state.login = final.login
    store.state.user = final.user
  }
  
  return status.value
}


router.beforeEach(async (to) => {
  const login = await getStatus()
  console.log(login);
  
  if (!login) {
    if (to.name != 'auth.login' && to.name != 'auth.register') {
      router.push({
        name: 'auth.login'
      })
    }
  }


})

export default router
