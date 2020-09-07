const calendar = document.getElementById("calendar");
const moods = document.querySelectorAll('.mood');

const months = [
   'January', 
   'February', 
   'March', 
   'April', 
   'May', 
   'June', 
   'July',
   'August',
   'Septempber',
   'October',
   'November',
   'December'
];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let currentYear = 2020;
const defaultColor = 'white';
let activeColor = ''

moods.forEach(mood => {
   mood.addEventListener('click', ()=> {
      if(mood.classList.contains('selected'))
      {
         mood.classList.remove('selected');
         activeColor = defaultColor;
      }
         
      else
      {
         for(let i=0; i<5; i++)
            moods[i].classList.remove('selected');
         mood.classList.add('selected');
         activeColor = getComputedStyle(mood).getPropertyValue('color');
      }
   })
})

months.forEach((month, idx) =>{
   let newMonthHTML = `
   <div class="months month_${idx}">
      <h3>${month}</h3>
      <div class="days_space">
         ${weekDays
            .map(weekDay => `<span class="day_space">${weekDay}</span>`)
            .join(' ')}
      </div>
      <div class="dates_space"></div>
   </div>`
   calendar.innerHTML += newMonthHTML;
})

const dates = getDates(currentYear);
dates.map(date => console.log(date));

dates.forEach((date) => {
   const month = date.getMonth();
   const monthEl = document.querySelector(`.month_${month} .dates_space`);
   if(date.getDate() === 1 && date.getDay() !== 0)
   {
      for(let i=0; i<date.getDay(); i++)
      {
         const emptySpot = createEmptySpot();
         monthEl.appendChild(emptySpot);
      }
   }

   const dateSpot = createDateSpot(date);
   monthEl.appendChild(dateSpot);
})

const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
   circle.addEventListener('click', ()=> {
      circle.style.backgroundColor = activeColor;
   })
})

function getDates(year)
{
   const startDate = new Date(`January 1 ${year}`);
   const lastDate = new Date(`December 31 ${year}`);

   const days = [startDate];
   let lastDateInArray = days[0];

   while(lastDateInArray.getTime() !== lastDate.getTime())
   {
      days.push(advanceDate(lastDateInArray));
      lastDateInArray = days[days.length-1];
   }
   
   return days;
}

function advanceDate(date)
{
   let result = new Date(date);
   result.setDate(date.getDate() + 1);
   return result;
}

function createEmptySpot(){
   const es = document.createElement('span');
   es.classList.add('day');
   return es;
}

function createDateSpot(date) {
   const es = document.createElement('span');
   es.classList.add('day');
   es.innerHTML = `<span class="circle">${date.getDate()} </span>`;
   return es;
}