<script setup>
    import Heading from'@/components/Heading.vue';
    import { ref , computed} from "vue";
    import { useRouter, useRoute } from 'vue-router';
    import { db } from "@/database";
    import {useTimer} from '@/timer';
    const todo = ref('');
    const notes = ref('');
    const router = useRouter();
    const route = useRoute();
    const taskId = parseInt(route.params.taskId); 
    var entryId;
    window.onbeforeunload = confirmExit;
    const formatedTime = computed(()=>{
        return formatTime(sessionTime.value)
    })

    const crownsNumber = computed(()=>{
        return Math.floor(sessionTime.value / (1000 * 60 * 30))
    })

    init();
    
    async function init(){
        try{
            //retrieve task data
            const task = await db.tasks.get(taskId);
            if(!task) {
                console.error('task not found')
                return;
            }
            notes.value = task.notes;
            todo.value = task.name;

            entryId = await getEntry();

        }catch(error){
            console.error(error);
        }
    }
    
    async function updateNotes(){
        try{
            await db.tasks.update(taskId, {'notes': notes.value})
        }catch(error){
            console.error(error);
        }
    }

    async function markComplete(){
        try{
            await db.tasks.update(taskId, {'status': 'complete'})
            router.push({name: 'tasks'});
        }catch(error){
            console.error(error);
        }
    }
    async function getEntry(){
        try{
            //retrive today task time entry or create
            const today = new Date().toISOString().slice(0, 10);
            var todayTaskEntry = await db.entries.where({date: today, taskId}).toArray();
            todayTaskEntry = todayTaskEntry[0];
            var _entryId;
            if(todayTaskEntry){
                let workTimeInMili = Math.floor(todayTaskEntry.workTime*1000);
                sessionTime.value = workTimeInMili;
                _entryId = todayTaskEntry.id;
            }else{
                _entryId = await db.entries.add({date: today, taskId, workTime: 0});
            }
        }catch(error){
            console.error(error);
        }
        return _entryId;
    }
    
    //timer 
    const {isRunning, sessionTime, startClock, pauseClock, formatTime} = useTimer();
    function confirmExit() {
        if(isRunning.value) return "You need to first stop the timer or your progress wouldnt be saved !";
    }
    
    async function pauseTimer(){
        pauseClock();
        
        try{
            //Store the session timer as the new work time in database
            const today = new Date().toISOString().slice(0, 10);
            let todayTaskEntry = await db.entries.get(entryId);
            let sessionTimeInSec = Math.floor(sessionTime.value / 1000);
            await db.entries.update(todayTaskEntry.id , {workTime: sessionTimeInSec});
            
            //update todayWorktime

        }catch(error){
            console.error(error);
        }
        
    }
    function startTimer(){
        startClock();
    }
    
      
</script>

<template>
    
    
    <div class="bg-background  px-4 sm:px-16  py-8 lg:px-36 relative">
            <Heading class="mb-14">timer</Heading>
            <!--mobile crowns-->
            <section class="flex w-full flex-wrap gap-x-8 gap-y-2 mb-16 md:mb-24" alt="today's achievements">
            <img v-for="i in crownsNumber" src="@/assets/crown.png" alt="crown" height=""
            class="object-contain h-12 sm:h-16">
            </section>
            <!--control-->
            <section class="mb-24 lg:mb-36 w-full">
                <!--timer-->
                <div class="flex justify-center items-center mb-8 md:mb-16 md:gap-8">
                    <div class="bg-primary px-12 py-8 sm:px-16 md:px-36 lg:px-56 flex justify-center items-center py-4 rounded-xl"><p class="text-white font-primary text-4xl font-medium ">{{formatedTime}}</p></div>
                    <button @click="pauseTimer" v-show="isRunning"><i class='bx bx-pause text-[5rem] md:text-[6rem] text-white hover:text-accent'></i></button>
                    <button @click="startTimer" v-show="!isRunning"><i class='bx bx-play text-[5rem] md:text-[6rem] text-white hover:text-accent'></i></button>
                </div>
                <!--actions-->
                <div class="flex justify-evenly ">
                    <button @click="markComplete">
                        <div class="flex items-center">
                            <i class='bx bx-check-double  text-xl text-accent mr-2 md:text-2xl lg:text-3xl'></i>
                            <button class="font-secondary text-white text-xl md:text-2xl hover:text-accent">mark as complete</button>
                        </div>
                    </button>
                    <router-link :to="{name: 'tasks'}">
                        <div class="flex items-center">
                        <i class='bx bx-arrow-back text-xl text-accent mr-2 md:text-2xl lg:text-3xl' ></i>
                        <button class="font-secondary text-white text-xl md:text-2xl hover:text-accent">return to tasks</button>
                        </div>
                    </router-link>
                </div>
            </section>
        <!--task infos-->
        <section class="w-full  ">
            <textarea  placeholder="write your notes or anything you want here" class="w-full  h-96 bg-background border-primary text-white text-lg  p-4 rounded-3xl placeholder-white focus:border-primary focus:ring-primary mb-24" v-model="notes" @change="updateNotes"></textarea>
            <div class="px-4 "><p class="text-xl sm:text-2xl text-center text-white tracking-wide lg:text-3xl ">{{ todo }}</p></div>
        </section>
        
    </div>
</template>
