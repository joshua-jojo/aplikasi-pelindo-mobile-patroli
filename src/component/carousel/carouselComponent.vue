<template lang="">
    <div class="carousel w-full rounded-box">
        <div class="carousel-item w-full" :id="`item${index}`" v-for="(item, index) in 3" :key="index">
            <img :src="require(`@/assets/banner/banner${index+1}.jpg`)" class="w-full rounded-box object-cover h-40" />
        </div>
    </div>
</template>
<script lang="ts" setup>

</script>
<style lang="">
    
</style>