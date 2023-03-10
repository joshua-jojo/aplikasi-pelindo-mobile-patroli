<template lang="">
    <div class="overflow-auto">
        <suspense>
            <tampilkanPostingan :id="props.id"></tampilkanPostingan>
            <template #fallback>
                <teleport to='#loading'>
                    <div class="absolute w-screen h-screen bg-gray-800 bg-opacity-70 z-[100] flex justify-center items-center">
                        <div class="flex flex-col justify-center items-center gap-2">
                            <loadingBar></loadingBar>
                        </div>
                    </div>
                </teleport>
            </template>
        </suspense>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import tampilkanPostingan from './tampilkanPostingan.vue'
import loadingBar from '@/component/loading/loadingBar.vue';

const props = defineProps({
    id: String
})
</script>
<style lang="">
    
</style>