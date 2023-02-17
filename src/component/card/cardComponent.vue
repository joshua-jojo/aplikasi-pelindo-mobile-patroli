<template lang="">
    <div class="card bg-base-100 border card-compact card-side">
        <figure v-if="src">
            <img :src="props.src" class="object-cover h-28 w-32" v-if="props.src.split('.')[props.src.split('.').length-1] == 'jpg'"/>
            <video 
            :src="`${props.src}#t=0.1`" 
            class="object-cover h-28 w-32" 
            v-else-if="props.src.split('.')[props.src.split('.').length-1] != 'mp4'"
            height="100%"
            width="100%" 
            muted
            preload="metadata"
            ></video>
        </figure>
        <div class="card-body">
            <span class="badge badge-primary badge-sm" v-if="tag != null">{{ tag }}</span>
            <h2 class="card-title text-sm">{{ title }}</h2>
            <div class="py-2"></div>
            <div class="card-actions justify-end">
                <span class="opacity-50">{{ date }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
    id: Number,
    src: String,
    tag: String,
    title: String,
    body: String,
    date: String,
})

</script>
<style lang=""></style>
