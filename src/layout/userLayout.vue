<template>
    <div data-theme="winter">
        <div class="navbar sticky top-0 bg-base-100 z-50 shadow">
            <div class="navbar-start">
                <div class="h-[3rem] pl-4">
                    <img src="../assets/logo.png" class=" h-full">
                </div>
            </div>
            <div class="navbar-end gap-2">
                <router-link v-if="!store.state.login" :to="{ name: 'auth.login' }"
                    class="btn btn-outline btn-sm btn-primary">Login</router-link>
                <div v-else class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-ghost gap-2">
                        <div class="w-max">
                            {{ store.state.user.nama }}
                        </div>
                        <i class="fa-solid fa-caret-down"></i>
                    </label>
                    <ul tabindex="0"
                        class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <!-- <li>
                            <a class="justify-between">
                                Profile
                                <span class="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li> -->
                        <li @click="logout"><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Content -->
        <div>
            <router-view></router-view>
        </div>
        <div class="btm-nav z-50">
            <router-link :to="{ name: 'user.dashboard' }">
                <div class="text-primary" :class="{ active: props.master?.title == 'Beranda' }">
                    <div class="flex flex-col justify-center items-center gap-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            class="bi bi-house-door-fill" viewBox="0 0 16 16">
                            <path
                                d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                        </svg>
                        <span class="text-sm">Beranda</span>
                    </div>
                </div>
            </router-link>
            <router-link :to="{ name: 'user.postingan.tambah' }" class="text-primary"
                v-if="!($route.name == 'user.postingan.tambah')">
                <div class="absolute bottom-5 left-0 right-0 mx-auto btn btn-circle btn-primary p-8">
                    <div class="text-base-100 -mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor"
                            class="bi bi-camera-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path
                                d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                        </svg>
                    </div>
                </div>
            </router-link>
                <router-link :to="{name : 'callcenter.show'}" class="text-primary" :class="{ active: props.master?.title == 'Call Center' }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-telephone-outbound-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <span class="text-sm">Call Center</span>
                </router-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { useStore } from 'vuex';
import { Preferences } from '@capacitor/preferences';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()
const props = defineProps({
    master: Object
})
async function logout() {
    await axios({
        method: 'post',
        url: 'auth/logout',
        data: {
            token: store.state.user.token
        }
    })
    // console.log(store.state.login = false);
    await Preferences.remove({ key: 'informationAuth' })
    store.state.login = false
    router.push({
        name: 'auth.login'
    })
}
</script>
<style></style>
