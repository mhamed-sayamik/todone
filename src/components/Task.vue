<script setup>
  defineProps(['id'])
</script>

<template>
  <div class="bg-primary px-5 py-4 rounded-xl flex justify-between">
    <p class="text-white text-lg font-primary w-3/5 md:w-1/2  line-clamp-2">
      <slot></slot>
    </p>
    <div class="flex items-center w-1/3 md:w-1/3">
      <router-link class="w-1/2 flex justify-center items-center group" :to="{name: 'timer', params: {taskId: id}}">
        <!--play icon-->
        <svg class="hidden md:block fill-white group-hover:fill-accent mr-3"  height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg"><path d="m7.87 21.28c-.79 0-1.54-.19-2.2-.57-1.56-.9-2.42-2.73-2.42-5.14v-7.13001c0-2.42.86-4.24 2.42-5.14s3.57-.73 5.67.48l6.17 3.56c2.09 1.21 3.25 2.87001 3.25 4.67001s-1.15 3.46-3.25 4.67l-6.17 3.56c-1.21.69-2.39 1.04-3.47 1.04zm0-17.06001c-.54 0-1.02.12-1.45.37-1.08.62-1.67 1.99-1.67 3.85v7.12001c0 1.86.59 3.22 1.67 3.85s2.56.45 4.17-.48l6.17-3.56c1.61-.93 2.5-2.12 2.5-3.37s-.89-2.44001-2.5-3.37001l-6.17-3.56c-.98-.56-1.9-.85-2.72-.85z"/></svg>
        <div class="text-white text-xl text-secondary group-hover:text-accent">start</div>
      </router-link>
      
      <button class="w-1/2 flex justify-center items-center group" @click="$emit('clickedDelete')">
        <!--trash icon-->
        <svg class="hidden md:block fill-white group-hover:fill-accent mr-3" xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 0 24 24" width="36"><path d="m0 0h24v24h-24z"  opacity="0"/><g><path d="m21 6h-5v-1.67a2.42 2.42 0 0 0 -2.5-2.33h-3a2.42 2.42 0 0 0 -2.5 2.33v1.67h-5a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-11h1a1 1 0 0 0 0-2zm-11-1.67c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33v1.67h-4zm8 14.67a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1-1v-11h12z"/><path d="m9 17a1 1 0 0 0 1-1v-4a1 1 0 0 0 -2 0v4a1 1 0 0 0 1 1z"/><path d="m15 17a1 1 0 0 0 1-1v-4a1 1 0 0 0 -2 0v4a1 1 0 0 0 1 1z"/></g></svg>
        <!--trash icon-->
        <p class="text-white text-xl group-hover:text-accent">delete</p>
      </button>
    </div>
  </div>
</template>