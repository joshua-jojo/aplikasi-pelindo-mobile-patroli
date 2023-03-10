<template lang="">
    <div class="form-control w-full">
        <label class="label">
            <span class="label-text">{{props.title}}</span>
        </label>
        <input :value="props.modelValue" :type="password?'password':'text'" @input="$emit('update:modelValue', $event.target.value)" :placeholder="`Input ${props.title}`" class="input input-bordered w-full" />
        <label class="label">
            <span class="label-text-alt text-error" v-if="props.error">{{props.error}}</span>
        </label>
    </div>
</template>
<script lang="ts" setup>

const props = defineProps({
    title: String,
    modelValue: String,
    error: String,
    password: Boolean,
})
</script>
<style lang="">
    
</style>