//[ I ] Freeze me

const fileSystem = {
    name: "root",
    type: "folder",
    children: [
     {
      name: "folder1",
      type: "folder",
      children: [
       { name: "file1.txt", type: "file" },
       { name: "file2.txt", type: "file" }
      ]
     },
     {
      name: "folder2",
      type: "folder",
      children: [
       { name: "file3.txt", type: "file" }
      ]
     }
    ]
   };

   function freezeObj(obj){
    //перевіряємо тип 
    if (typeof obj === 'object') {
        //якщо об"єкт - перебираємо ключі
        for(let key in obj) {
            if (Array.isArray(obj[key])){
                //якщо ключ масив, то перевикликаємо функцію для кожного елементу
                for(let i = 0; i < obj[key].length; i++){
                    freezeObj(obj[key][i])
                }
            } else if (typeof obj[key] == 'object'){
                //якщо об"єкт - викликаємо і для нього
                freezeObj(obj[key])
            }
        }
        //морозимо перший рівень 
        Object.freeze(obj)
    }
   }
   freezeObj(fileSystem);
   fileSystem.children[0].name = 2
   fileSystem.name = 2
   fileSystem.children[0].children[0].name = 2
   console.log("[ I ] Freeze me =>",fileSystem)


   //[ II ] Days difference

function daysBetweenDates(dateOne, dateTwo) {
    const date1 = new Date(dateOne);
    const date2 = new Date(dateTwo);
    // дивимось скільки часу в юнікс між датами без врахування знаку
    const differenceTime = Math.abs(date2.getTime() - date1.getTime());
    //визначаємо скільки мілісекунд в добі
    const millisecondsInDay = 1000 * 3600 * 24;
    //рахуємо скільки днів 
    const differenceInDays = Math.floor(differenceTime / millisecondsInDay);
    return differenceInDays;
}

console.log("[ II ] Days difference =>", daysBetweenDates("2024-03-11", "2024-03-16"))

//[ III ] How old are you?

function calculateAge(date) {
    const birthDate = new Date(date);
    const dateNow = new Date();
    let age = dateNow.getFullYear() - birthDate.getFullYear();
    if (age <0) {
        return "Десь помилка, виходить ви ще не народидились =)";
    }
    // перевіряємо чи вже було день народження в цьому році
    const birthMonth = birthDate.getMonth();
    const currentMonth = dateNow.getMonth();
    const birthDay = birthDate.getDate();
    const currentDay = dateNow.getDate();
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        age--;
    }
    return age;
}

console.log("[ III ] How old are you? =>", calculateAge("2023-04-09"));

//[ IV ] Final countdown

function timeToFutureDate(date) {
    const futureDate = new Date(date);
    const currentTime = Date.now();
    const futureTime = futureDate.getTime();

    let timeDifference = (futureTime - currentTime)/1000;
    if (timeDifference<0){
        return "Вказана дата в минулому"
    }
    // Розрахунок секунд у хвилинах, годинах, днях
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    //визначаємо дні
    const days = Math.floor(timeDifference / secondsInDay);
    //дивимось що лишилось після розрахунку
    timeDifference %= secondsInDay;
     //визначаємо години
    const hours = Math.floor(timeDifference / secondsInHour);
    timeDifference %= secondsInHour;
     //визначаємо хвилини
    const minutes = Math.floor(timeDifference / secondsInMinute);
    timeDifference %= secondsInMinute;
    //визначаємо секунди
    const seconds = Math.floor(timeDifference);

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

console.log("[ IV ] Final countdown =>", timeToFutureDate("2024-03-20T23:24:59"))

//[ V ] Working Days

function workingDaysToDeadline(deadline) {
    const currentDate = new Date();
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const deadlineDate = new Date(deadline);
    let workingDays = 0;

    // Перевіряємо, чи поточна дата менша за дедлайн
    while (currentDate < deadlineDate) {
        // Отримання дня тижня 
        const dayOfWeek = currentDate.getDay();
        // iшукаємо неділю та суботу
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workingDays++;
        }
        // змінюємо день
        currentDate.setTime(currentDate.getTime() + millisecondsInDay);
    }
    return workingDays;
}

console.log("[ V ] Working Days =>", workingDaysToDeadline("2024-03-25"))
