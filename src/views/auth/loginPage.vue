<template lang="">
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content w-full flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">Login</h1>
        </div>
                <div class="alert alert-error w-full h-max capitalize" v-if="message">{{message}}</div>
        <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div class="card-body">
                <inputComponent title="Email" v-model="form.email" :error="errors.email ?errors.email[0] : null"></inputComponent>
                <inputComponent password title="Password" v-model="form.password" :error="errors.password ? errors.password[0] : null"></inputComponent>
                <div class="flex justify-between">
                    <router-link :to="{name: 'auth.register'}" class="label">
                        <span class=" link link-primary">Daftar Sekarang</span>
                    </router-link>
                    <label class="label">
                        <span class=" link link-secondary">Lupa Password</span>
                    </label>
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" :class="{'loading' : loading}" @click="login">Login</button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import inputComponent from '@/component/inputComponent.vue';
import axios from 'axios';
import { reactive,ref } from 'vue';
import { useStore } from 'vuex';
import { Preferences } from '@capacitor/preferences';
import { useRouter } from 'vue-router';
const form = reactive({
    password : '',
    email : '',
})
const store = useStore()
const router = useRouter()
const loading = ref(false)
const errors = reactive({
    email : null,
    password : null,
})
const message = ref('')

async function login() {
    loading.value = true
    const response = await axios({
        method : 'post',
        url : 'auth/login',
        data : form
    })
    loading.value = true
    
    if(await response.data.status == 'error'){
        loading.value = false
        store.state.login = false
        errors.email = response.data.errors?.email
        errors.password = response.data.errors?.password
        message.value = response.data.message
    }else if(response.data.status == 'success'){
        store.state.login = true
        store.state.user.nama = response.data.data.name
        store.state.user.email = response.data.data.email
        store.state.user.token = response.data.data.token
        const dataUser = {
            login : store.state.login,
            user : {
                nama : store.state.user.nama,
                email : store.state.user.email,
                token : store.state.user.token,
            },
        }
        
        await Preferences.set({
            key : 'informationAuth',
            value : JSON.stringify(dataUser)
        })
        router.push({
            name : 'user.dashboard'
        })
    }
}
</script>
<style lang=""></style>
