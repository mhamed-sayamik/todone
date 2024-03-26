const entries = [
  { date: '2024-03-01', taskId: 1, workTime: 5 },
  { date: '2024-03-02', taskId: 2, workTime: 3 },
  { date: '2024-03-02', taskId: 3, workTime: 7 },
  { date: '2024-03-04', taskId: 4, workTime: 2 },
  { date: '2024-03-04', taskId: 5, workTime: 4 },
  { date: '2024-03-09', taskId: 6, workTime: 6 },
  { date: '2024-03-09', taskId: 7, workTime: 3 },
  { date: '2024-03-09', taskId: 8, workTime: 5 },
  { date: '2024-03-09', taskId: 9, workTime: 2 },
  { date: '2024-03-13', taskId: 10, workTime: 7 },
  { date: '2024-03-16', taskId: 11, workTime: 6 },
  { date: '2024-03-18', taskId: 12, workTime: 4 },
  { date: '2024-03-19', taskId: 13, workTime: 3 },
  { date: '2024-03-19', taskId: 14, workTime: 5 },
  { date: '2024-03-22', taskId: 15, workTime: 2 },
  { date: '2024-03-22', taskId: 16, workTime: 7 },
];
var date = startDate;
var workTime = 0;
const achievements = [];
 var i =0;
entries.forEach(entry => {
  
  //the date have changed
  if (entry.date !== date) {
 
    //entry.date is the current iteration date is the iteration before
    //push date after all same dates are calucated
    achievements.push({ date, workTime });
    //reset worktime
    workTime = 0;
          //loop to fill gap between dates
          while(addDays(date, 1) !== entry.date){
            date = addDays(date, 1);
            
            achievements.push({ date, workTime: 0});
            if(i==0) console.log(date);
          }
          
    date = entry.date;
    
  }
  //always add entry time
  workTime += entry.workTime;
});
achievements.push({ date, workTime });

console.log(achievements);
function addDays(dateString, nbDays) {
  nbDays = parseInt(nbDays);
  const currentDate = new Date(dateString);
  const resultDay = new Date(
    currentDate.getTime() + nbDays * 24 * 60 * 60 * 1000;
  );
  const resultDayString = resultDay.toISOString().slice(0, 10);
  return resultDayString;
}