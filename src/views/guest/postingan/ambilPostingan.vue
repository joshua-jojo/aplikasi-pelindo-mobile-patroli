<template lang="">
    <div class="flex flex-col gap-3">
        <cardComponent 
        v-for="(item) in postinganData" 
        :key="item.id" 
        :src="item.files" 
        :title="item.title" 
        :date="
            new Date(item.created_at).getDate() +
            '/' +
            (new Date(item.created_at).getMonth() + 1) +
            '/' +
            new Date(item.created_at).getFullYear()
        "></cardComponent>
    </div>
    <div class="flex justify-center" v-if="postinganHabis">
        Postingan telah habis
    </div>
    <div class="flex justify-center" v-else>
        Loading
    </div>
</template>
<script lang="ts" setup>

import cardComponent from '@/component/card/cardComponent.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const item = ref(5);
const postinganHabis = ref(false);
const postinganData = ref([]);
const postinganTotal = ref(0);
async function getData() {
    const dataAPI = await axios({
        method: 'post',
        url: '/guest/postingan/all',
        data: {
            getItem: item.value
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    });
    postinganData.value = dataAPI.data.data
    postinganTotal.value = dataAPI.data.total
}
await getData()

onMounted(() => {
    const body = document.getElementById('halamanBeranda')
    body?.addEventListener('scroll', async (e: any) => {
        const scrollHeight = e.target.scrollHeight;
        const scrollTop = e.target.scrollTop;
        const selisih = await (scrollHeight - scrollTop)
        if (selisih < 822) {
            const postinganSekarang = postinganData.value.length
            const postinganSelisih = postinganSekarang < postinganTotal.value
            if (postinganSelisih) {
                item.value += 5;
                getData()
            }
            else {
                postinganHabis.value = true
            }
        }
    })
})
</script>