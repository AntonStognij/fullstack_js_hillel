
getDateStr()

function getDateStr(){
    let minutesUser;
    do {
        minutesUser = prompt ("Давай конвертуємо хвилини у гарний вигляд! Вкажи час в хвилинах (число має бути до 6000), а я виведу тобі результат!")
        if (!minutesUser) {
            alert("Допобачення!");
            return
        }
      } while ((minutesUser&& !minutesUser.match(/^\d+$/)) || minutesUser >=6000);
    
    let days = Math.floor(minutesUser / 1440);
    let hours = Math.floor((minutesUser % 1440) / 60);
    let minutes = minutesUser % 60;
    var res = "";
    if (days > 0) {
        res += days + ` ${getCorrectName("days", `${days}`)} `;
    }
    if (hours > 0) {
        res += hours + ` ${getCorrectName("hours", `${hours}`)} `;
    }
    res += minutes + ` ${getCorrectName("minutes", `${minutes}`)} `;
    alert(res)
}
function getCorrectName(param, count){
    let arrCount = count.split('');
    if(param =="days"){
        if ( arrCount[arrCount.length-1].match(/1$/)){
            return "день"
        } else if (arrCount[arrCount.length-1].match(/2$|3$|4$/)){
            return "дні"
        } else {
            return "днів"
        }
    } else if (param =="hours"){
        if ( arrCount[arrCount.length-1].match(/1$/)){
            return "година"
        } else if (arrCount[arrCount.length-1].match(/2$|3$|4$/)){
            return "години"
        } else {
            return "годин"
        }
    } else if (param =="minutes"){
        if ( arrCount[arrCount.length-1].match(/1$/)){
            return "хвилина"
        } else if (arrCount[arrCount.length-1].match(/2$|3$|4$/)){
            return "хвилини"
        } else {
            return "хвилин"
        }
    }
}