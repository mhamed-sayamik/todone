<script setup>
    import { ref } from "vue";
    import Task from "@/components/Task.vue";
    //random data just for test
    const tasks=ref([{name: "clean the room before mom notices the miss"}, 
    {name: "clean the room before mom notices the miss because life is complicated and my heart broke why i'm confessing i only need random text amd also dont get loser"}, 
    ]);
    //new task to be added
    const newTask = ref('')
    // add task function
    function addTask(taskText){
        tasks.value.push({name: taskText});
        //reset the input
        newTask.value = '';
    }
    function deleteTask(taskIndex){
        tasks.value.splice(taskIndex, 1)
    }
</script>

<template>
    <div class="px-4 sm:px-8 lg:px-36 xl:px-64 py-8 h-screen box-border relative">

        <!--list of tasks section-->
        <section class="h-4/5">
            <h2 class="text-4xl capitalize mb-10 text-secondary font-primary">tasks</h2>
            <!--loop troughout the tasks-->
            <div class="flex flex-col gap-7 h-3/4 overflow-y-scroll">
                <TransitionGroup>
                    <Task v-for="(task, index) in tasks" @clicked-delete="deleteTask(index)" :key="index">{{task.name}}</Task>
                </TransitionGroup>
            </div>
        </section>

        <!--new task section-->
        <section class="flex flex-col justify-center h-1/5">
            <h3 class="text-center text-secondary text-2xl mb-4 font-secondary text-2xl tracking-wider">new task</h3>
            <input type="text" placeholder="Task to do" v-model="newTask" @keyup.enter="addTask(newTask)" class="rounded-2xl h-12 border-primary border-1 px-12 text-2xl font-primary">
        </section>
    </div>

</template>