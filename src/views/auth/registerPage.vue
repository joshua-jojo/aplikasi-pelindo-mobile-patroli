<template lang="">
    <div class="hero min-h-screen bg-base-200">
        <div class="hero-content w-full flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
            <h1 class="text-5xl font-bold">Register</h1>
            <p class="py-6">
            </p>
        </div>
        <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div class="card-body">
                <inputComponent title="Nama" v-model="form.name" :error="errors.name?errors.name[0] : null"></inputComponent>
                <inputComponent title="Email" v-model="form.email" :error="errors.email?errors.email[0] : null"></inputComponent>
                <div class="grid grid-cols-2 gap-2">
                    <inputComponent password title="Password" v-model="form.password" :error="errors.password?errors.password[0] : null"></inputComponent>
                    <inputComponent password title="Reply Password" v-model="form.password_confirmation"></inputComponent>
                </div>
                <div class="flex justify-between">
                    <router-link :to="{name : 'auth.login'}" class="label">
                        <span class="link link-primary">Sudah Punya Akun? Login.</span>
                    </router-link>
                </div>
                <div class="form-control mt-6">
                    <button class="btn btn-primary" :class="{'loading' : loading}" @click="submit">Register</button>
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {Preferences} from '@capacitor/preferences'

const loading = ref(false)
const router = useRouter()
const errors = ref({})
const store = useStore()
const form = reactive({
    name : null,
    email : null,
    password : null,
    password_confirmation : null,
})

async function submit () {
    let response : any = await axios.post('/auth/register',form,{
        onUploadProgress : () => {
            loading.value = true
        },
    })
    loading.value = false
    response = response.data
    if(await response.status == 'error'){
        errors.value = response.error
    } else if (response.status == 'success'){
        store.state.login = true
        store.state.user.nama = response.data.name
        store.state.user.email = response.data.email
        store.state.user.token = response.data.token[0].token
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
