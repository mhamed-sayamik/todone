import {ref} from 'vue';
import { db } from "@/database";
export function useTimer(){
    const isRunning = ref(false);
    const sessionTime = ref(0);
    let recentStart = 0;
    let recentFrame = 0;
    //funciton update sessionTimer
    function startClock(){
        isRunning.value = true;
        recentStart = Date.now();
        recentFrame = Date.now();
    }
    function pauseClock(){
        isRunning.value  = false;
        let delta = Date.now() - recentFrame;
        recentFrame = Date.now();
        sessionTime.value += delta;
    }
    function updateClock(){
        if(isRunning.value){
        let delta = Date.now() - recentFrame; // milliseconds elapsed since start
        recentFrame = Date.now();
        sessionTime.value += delta // in second
        }
    }
    function formatTime(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
      
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      }

    setInterval(updateClock, 1000); // update about every second
    return {isRunning, sessionTime, startClock, pauseClock, formatTime}
}