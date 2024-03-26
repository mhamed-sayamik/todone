<script setup>
    import Heading from'@/components/Heading.vue';
    import { ref, onMounted, watch} from "vue";
    import { db } from "@/database";
    const today = new Date().toISOString().slice(0, 10);
    const startDate = ref(today);
    const nbDays = 30;
    const achievements = ref([]);
    onMounted(async() => {
        try{
            achievements.value =  await retrieveAchievements( addDays(startDate.value, -29), addDays(startDate.value, 1));
        }catch(error){
            console.error(error);
        }
    }),
    watch(startDate, async(newStartDate) =>{
    try{
        achievements.value =   await retrieveAchievements(addDays(startDate.value, -29), addDays(startDate.value, 1));
    }catch(error){
            console.error(error);
        }
    })
    
    function nextPage(){
        startDate.value = addDays(startDate.value, nbDays);
    }
    function previousPage(){
        startDate.value = addDays(startDate.value, -nbDays);
    }


    function generateCalendar(startDate, endDate){
        const datesArray = []
        let date = startDate;
        while(date != endDate){
            datesArray.push({date, workTime: 0, crowns: 0});
            date = addDays(date, 1);
        }
        datesArray.reverse();
        return datesArray; 
    } 
    function updateDay(calendar, date, workTime){
        const dayIndex = calendar.findIndex(day => 
                    day.date == date);
        calendar[dayIndex].workTime = workTime;
        const nbCrowns = Math.floor(workTime/ (60 * 30));
        calendar[dayIndex].crowns = nbCrowns;
    }
    async function retrieveAchievements(startDate, endDate){
        const achievements = generateCalendar(startDate, endDate)
        console.log(endDate);
        var date = startDate;
        var workTime = 0;
        await db.entries.where('date').between(startDate, endDate).each(entry => 
        {
                //the date have changed
            if (entry.date !== date) {
            
            //entry.date is the current iteration date is the iteration before
            //push date after all same dates are calucated
            updateDay(achievements, date, workTime);
            //reset worktime
            workTime = 0;   
            date = entry.date;
            
            }
            //always add entry time
            workTime += entry.workTime;   
        });
        updateDay(achievements, date, workTime);
        return achievements;
    }
    
    function addDays(dateString, nbDays) {
    nbDays = parseInt(nbDays);
    const currentDate = new Date(dateString);
    const resultDay = new Date(currentDate.getTime() + nbDays * 24 * 60 * 60 * 1000);
    const resultDayString = resultDay.toISOString().slice(0, 10);
    return resultDayString;
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
      
        return `Work time: ${hours} hours, ${minutes} minutes and ${remainingSeconds} seconds.`;
      }

   /* const achievementsHistory = [
  { date: '20/07/2023', crowns: 8 },
  { date: '19/07/2023', crowns: 10 },
  { date: '18/07/2023', crowns: 7 },
  { date: '17/07/2023', crowns: 6 },
  { date: '16/07/2023', crowns: 9 },
  { date: '15/07/2023', crowns: 11 },
  { date: '14/07/2023', crowns: 5 },
  { date: '13/07/2023', crowns: 12 },
  { date: '12/07/2023', crowns: 8 },
  { date: '11/07/2023', crowns: 6 },
  { date: '10/07/2023', crowns: 10 },
  { date: '09/07/2023', crowns: 7 },
  { date: '08/07/2023', crowns: 9 },
  { date: '07/07/2023', crowns: 11 },
  { date: '06/07/2023', crowns: 6 },
  { date: '05/07/2023', crowns: 8 },
  { date: '04/07/2023', crowns: 10 },
  { date: '03/07/2023', crowns: 7 },
  { date: '02/07/2023', crowns: 9 },
  { date: '01/07/2023', crowns: 5 }
];*/

</script>

<template>
    <div class="bg-background px-4 sm:px-8 lg:px-36 xl:px-64 py-8 h-screen box-border relative overflow-y-scroll text-white">
        <Heading class="mb-14">achievements</Heading>
        
        <!--control-->
        <section>
            <!--date picker-->
            <div class="mb-14">
                <label for="datepicker" class="text-xl tracking-wide mr-12 font-light">start from:</label>
                <input type="date" name="datepicker" v-model="startDate" class="bg-background border-primary focus:border-primary focus:ring-primary rounded-xl">
            </div>
            
            <!--desktop navigator-->
        </section>
        <!--calendar-->
        <table class="table-fixed w-full">
            <tbody>
                <tr v-for='day in achievements' class="border-primary border-b-2 last:border-b-0" >
                    <!--day-->
                    <td class="w-1/3 text-center text-xl md:text-2xl align-center align-middle border-primary border-r-2  py-6">{{day.date}}</td>
                    
                    <!--crowns-->
                    <td class="relative flex w-full flex-wrap gap-x-4 gap-y-2 py-4 px-4 "
                        :title="formatTime(day.workTime)">
                        <img v-for="i in day.crowns" src="@/assets/crown.png" alt="crown" height=""
                        class="object-contain h-12 sm:h-16 ">
                       
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- navigator-->
        <section class="flex justify-evenly mt-12">
            <button class="flex items-center" @click="previousPage">
                <i class='bx bx-left-arrow-alt text-xl text-accent mr-2 md:text-2xl lg:text-3xl'></i>
                <p class="font-secondary text-white text-xl md:text-2xl hover:text-accent">back</p>
            </button>
            <button class="flex items-center" @click="nextPage">
                <p class="font-secondary text-white text-xl md:text-2xl hover:text-accent">next</p>
                <i class='bx bx-right-arrow-alt text-xl text-accent mr-2 md:text-2xl lg:text-3xl' ></i>
            </button>
        </section>
    </div>
</template>
