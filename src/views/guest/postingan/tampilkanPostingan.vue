<template lang="">
    <div class="max-h-screen overflow-auto bg-base-200">
        <div class="p-4">
            <div class="card bg-base-100 shadow max-w-3xl mx-auto">
                <div class="card-body">
                    <div class="card-title">
                        #{{ dataPostingan.id + " - " }}{{ dataPostingan.title }}
                    </div>
                    <p class="text-sm">
                        <span
                            class="badge badge-sm mr-1"
                            :class="{
                                'badge-info': dataPostingan.status == 'New',
                                'badge-warning': dataPostingan.status == 'Process',
                                'badge-error': dataPostingan.status == 'Pending',
                            }"
                            >{{ dataPostingan.status }}</span
                        >{{ new Date(dataPostingan.created_at) }} by
                        {{ dataPostingan.name }}
                    </p>
                    <div class="divider"></div>
                    <template v-for="(item,index) in dataPostingan.files" :key="index">
                        <img
                            :src="item"
                            class="rounded-box"
                            v-if="
                                item.split('.')[item.split('.').length - 1] ==
                                'jpg'
                            "
                        />
                        <video
                            controls
                            :src="`${item}#t=0.1`"
                            class="rounded-box"
                            v-else-if="
                                item.split('.')[item.split('.').length - 1] ==
                                'mp4'
                            "
                        ></video>
                    </template>
                    <div class="alert alert-info shadow">
                        <div>
                            <span>
                                <p>{{ dataPostingan.body }}</p>
                                <div class="divider"></div>
                                <p>Lokasi: {{ dataPostingan.location }}</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div class="pb-[8rem]"></div>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})


const dataPostingan = ref()
const dataApi = await axios({
    method: 'post',
    url: '/guest/postingan/ambil',
    data: {
        postingan_id: props.id,
        token: store.state.user.token,
    },
    headers: {
        'Content-Type': 'multipart/form-data',
    }
})
dataPostingan.value = await dataApi.data.data;

</script>