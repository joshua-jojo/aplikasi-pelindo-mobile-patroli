<template lang="">
    <div class="flex flex-col gap-3">
        <router-link :to="{name : 'user.postingan.show', params : {id:item.id}}" v-for="(item) in postinganData" 
            :key="item.id" >
            <cardComponent 
            :src="item.files.split('#')[0]" 
            :title="'#' + item.id + ' - ' + item.title"
            :date="
                new Date(item.created_at).getDate() +
                '/' +
                (new Date(item.created_at).getMonth() + 1) +
                '/' +
                new Date(item.created_at).getFullYear()
            "
            ></cardComponent>
        </router-link>
    </div>
    <div class="flex justify-center" v-if="postinganHabis">
        {{postinganHabis}}
    </div>
</template>
<script lang="ts" setup>

import cardComponent from '@/component/card/cardComponent.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useStore, } from 'vuex';
const props = defineProps({
    cari : {
        type : String,
        default : '',
    }
})

const store = useStore()
const item = ref(20);
const postinganHabis = ref('');
const postinganData = ref([]);
const postinganTotal = ref(0);
async function getData() {
    const dataAPI = await axios({
        method: 'post',
        url: '/guest/postingan/all',
        data: {
            getItem: item.value,
            token: store.state.user.token,
            cari: props.cari,
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    postinganData.value = dataAPI.data.data
    postinganTotal.value = dataAPI.data.total
    if(postinganTotal.value == 0){
        postinganHabis.value = 'belum ada laporan'
    }
}
await getData()

onMounted(() => {
    const body = document.getElementById('halamanBeranda')
    body?.addEventListener('scroll', async (e: any) => {
        const scrollHeight = e.target.scrollHeight;
        const scrollTop = e.target.scrollTop;
        const clientHeight = e.target.clientHeight;
        const selisih = await ((scrollTop + clientHeight) >=scrollHeight)
        
        if (await selisih) {
            const postinganSekarang = postinganData.value.length
            const postinganSelisih = postinganSekarang < postinganTotal.value
            if (await postinganSelisih) {
                item.value += 20;
                await getData()

            }
            else {
                postinganHabis.value = 'Laporan Habis'
            }
        }
    })
})
</script>