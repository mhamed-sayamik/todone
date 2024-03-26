<script setup>
    import { ref } from "vue";
    import Task from "@/components/Task.vue";
    import Heading from "@/components/Heading.vue";
    import { db } from "@/database";
    import { liveQuery } from "dexie";
    import { useObservable } from "@vueuse/rxjs";


    //retrieve data
    const tasks = ref([]);
    retrieveTasks();
    //new task to be added
    const newTask = ref('')
    
    async function retrieveTasks(){
        try{
            tasks.value = await db.tasks.where('status').equalsIgnoreCase('incomplete').toArray();
        }
        catch(error){
            console.error(error);
        }
    }
    // add task function
    async function addTask(taskText){
        try{
        //store task in the database
        await db.tasks.add({name: taskText, notes: '', status: 'incomplete'});
        retrieveTasks();
        //reset the input
        newTask.value = '';
        
        }
        catch(error){
            console.error(error);
        }
    }
    async function deleteTask(taskIndex){
        try{
            await db.tasks.delete(taskIndex);
            retrieveTasks();
        }catch(error){
            console.error(error);
        }
    }
</script>

<template>
    
    <div class="bg-background px-4 sm:px-8 lg:px-36 xl:px-64 py-8 h-screen box-border relative">
        <!--list of tasks section-->
        <section class="h-5/6 ">
            <div class="mb-14 flex justify-between items-start">
                <Heading>tasks</Heading>
                <div class="flex mr-4 gap-4">
                    <router-link :to="{name: 'achievements'}" class=" tracking-wide  text-white  px-4  transition ease-in-out delay-75  hover:text-accent    border-primary  border-l-2   font-secondary text-base "><p>Achievements</p></router-link>
                </div>
            </div>
            <!--loop troughout the tasks-->
            <div class="flex flex-col gap-7 h-3/4  overflow-y-scroll pr-4">
                <TransitionGroup>
                    <Task v-for="task in tasks" :key="task.id" :id="task.id" @clicked-delete="deleteTask(task.id)" >{{task.name}} </Task>
                </TransitionGroup>
            </div>
        </section>

        <!--new task section-->
        <section class="flex flex-col justify-center h-1/6  relative">
            <input type="text" placeholder="Task to do" v-model="newTask" @keyup.enter="addTask(newTask)" class="w-full bg-background text-white placeholder:text-white focus:border-primary focus:ring-primary rounded-2xl h-12 border-primary border-1 px-12 text-xl font-primary absolute bottom-0">
        </section>
   
    </div>
</template>