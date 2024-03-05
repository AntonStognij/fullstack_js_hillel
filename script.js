
//таск 1
function getEhchangeRate() {
    let text = "Привіт, я твій помічник з конвертації валюти. Я буду орієнтуватись на курс НБУ, тому курс в банках може відрізнятись, але бути в районі моїх розрахунків. Ну і може бути похибка при конвертуванні маленьких сум через округлення. Опиши, що ти хочеш конвертувати!";
    if (!checkDate()) {
        //варіант коли дані треба оновити
        const api = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
        fetch(`${api}`)
            .then(res => res.json())
            .then(res => {
                let hryvniaDollar;
                let hryvniaEvro;
                res.forEach(element => {
                    if (element.r030 == 840) {
                        hryvniaDollar = element;
                    }
                    if (element.r030 == 978) {
                        hryvniaEvro = element;
                    }
                });
                let dataСourse = {
                    "hryvniaDollar": hryvniaDollar,
                    "hryvniaEvro": hryvniaEvro
                }
                sessionStorage.setItem('dataСourse', JSON.stringify(dataСourse));
                changeText(text, "talk")
                actionApp();

            }).catch(function (text) {
                console.log("Error", text);
            });
    } else {
        //варіант коли дані беремо з пам"яті
        changeText(text, "talk")
        actionApp();

    }


}

getEhchangeRate()
//функція порівнює дати
function checkDate() {
    const data = sessionStorage.getItem('dataСourse');
    const dataСourse = JSON.parse(data);
    return (dataСourse?.hryvniaDollar?.exchangedate === getToday() && dataСourse?.hryvniaEvro?.exchangedate === getToday())

}
//функція отримує сьогоднішню дату
function getToday() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Місяці починаються з 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${day}.${month}.${year}`
}

function workWithData(value) {
    const data = sessionStorage.getItem('dataСourse');
    const dataСourse = JSON.parse(data);
    let objCurrency = findCurrency(value)
    console.log(objCurrency)
    console.log(dataСourse)
    //дивимось у що конвертувати
    if (objCurrency?.elemFromCurrency?.currency == "840" && objCurrency?.elemToCurrency?.currency == "980") {
        //доллари в гривню
        let sum = (objCurrency.elemFromCurrency.amount * dataСourse.hryvniaDollar.rate).toLocaleString("de-DE", { style: "currency", currency: "UAH", minimumFractionDigits: 2 });
        changeText(`Якщо я правильно тебе зрозумів, що ти хочеш конвертувати ${objCurrency.elemFromCurrency.amount}$ в гривні, то по курсу НБУ ти зможеш отримати ${sum}  =)`, "talk")
    } else if (objCurrency?.elemFromCurrency?.currency == "980" && objCurrency?.elemToCurrency?.currency == "840") {
        let sum = (objCurrency.elemFromCurrency.amount / dataСourse.hryvniaDollar.rate).toLocaleString("de-DE", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
        changeText(`Якщо я правильно тебе зрозумів, що ти хочеш конвертувати ${objCurrency.elemFromCurrency.amount} UAH в долари, то по курсу НБУ ти зможеш отримати ${sum}  =)`, "talk")
    } else if (objCurrency?.elemFromCurrency?.currency == "978" && objCurrency?.elemToCurrency?.currency == "980") {
        let sum = (objCurrency.elemFromCurrency.amount * dataСourse.hryvniaEvro.rate).toLocaleString("de-DE", { style: "currency", currency: "UAH", minimumFractionDigits: 2 });
        changeText(`Якщо я правильно тебе зрозумів, що ти хочеш конвертувати ${objCurrency.elemFromCurrency.amount} EUR в гривні, то по курсу НБУ ти зможеш отримати ${sum}  =)`, "talk")
    } else if (objCurrency?.elemFromCurrency?.currency == "980" && objCurrency?.elemToCurrency?.currency == "978") {
        let sum = (objCurrency.elemFromCurrency.amount / dataСourse.hryvniaEvro.rate).toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
        changeText(`Якщо я правильно тебе зрозумів, що ти хочеш конвертувати ${objCurrency.elemFromCurrency.amount} UAH в євро, то по курсу НБУ ти зможеш отримати ${sum}  =)`, "talk")
    } else if (objCurrency?.elemFromCurrency?.currency == "840" && objCurrency?.elemToCurrency?.currency == "978") {
        let rate = dataСourse.hryvniaDollar.rate/dataСourse.hryvniaEvro.rate //визначаємо курс по відношенню до гривні
        let sum = (objCurrency.elemFromCurrency.amount * rate).toLocaleString("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
        changeText(`Якщо я правильно тебе зрозумів, що ти хочеш конвертувати ${objCurrency.elemFromCurrency.amount} USD в євро, то по курсу НБУ ти зможеш отримати ${sum}  =)`, "talk")
    } else if (objCurrency?.elemFromCurrency?.currency == "978" && objCurrency?.elemToCurrency?.currency == "840") {
        let rate = dataСourse.hryvniaEvro.rate/dataСourse.hryvniaDollar.rate //визначаємо курс по відношенню до гривні
        let sum = (objCurrency.elemFromCurrency.amount * rate).toLocaleString("de-DE", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
        changeText(`Якщо я правильно тебе зрозумів, що ти хочеш конвертувати ${objCurrency.elemFromCurrency.amount} EUR в долари, то по курсу НБУ ти зможеш отримати ${sum}  =)`, "talk")
    }
}

function changeText(text, id, needInterval = true) {
    let elem = document.getElementById(id);
    let textToContent = '';
    if (needInterval){
        let lastintervalId = sessionStorage.getItem('intervalId');
        if (lastintervalId) {
            //зупиняємо попердній текст, якщо він не зупинений
            clearInterval(lastintervalId)
        }
        let arrText = text.split(" ")
        let intervalId = setInterval(() => {
            if (arrText.length == 0) {
                clearInterval(intervalId)
                //видаляємо id  з стора по закінченню формування тексту
                sessionStorage.removeItem('intervalId');
            } else {
                let word = arrText.shift()
                textToContent += word + ' ';
                elem.innerHTML = textToContent;
            }
        }, 300);
        //записуємо ід на випадок, якщо буде новий текст, щоб зупинити попердній
        sessionStorage.setItem('intervalId', JSON.stringify(intervalId));
    } else {
        elem.innerHTML = text;
    }
    

}
function actionApp() {
    let inputElement = document.getElementById("textInput");
    inputElement.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            workWithData(inputElement.value);
            dellNone("talk-user");
            changeText(inputElement.value, "talk-user", false)
            inputElement.value = "";
        }
    });
}

function findCurrency(text) {
    let textArr = text.split(" ");
    let arrFindValue = [];
    const textNotunderstand = "Погано тебе зрозумів, перефразуй будь ласка. Опиши, що ти хочеш конвертувати =)"
    let goodBuy;
    for (let i = 0; i < textArr.length; i++) {
        if (textArr[i].match(/^дол|^dol|\$/gi)) {
            arrFindValue.push({
                currency: "840",
                amount: isNumber(+textArr[i - 1].replace(",",".")) ? +textArr[i - 1].replace(",",".") : null
            })
        }
        if (textArr[i].match(/^євр|^eur|^евр/gi)) {
            arrFindValue.push({
                currency: "978",
                amount: isNumber(+textArr[i - 1].replace(",",".")) ? +textArr[i - 1].replace(",",".") : null
            })
        }
        if (textArr[i].match(/^грн|^uah|^грив/gi)) {
            arrFindValue.push({
                currency: "980",
                amount: isNumber(+textArr[i - 1].replace(",",".")) ? +textArr[i - 1].replace(",",".") : null
            })
        }
    }
    if (arrFindValue.length > 0) {
        let elemFromCurrency = arrFindValue.find(el => el.amount);
        let elemToCurrency = arrFindValue[arrFindValue.length - 1];
        if ((!elemFromCurrency || !elemToCurrency) || (elemFromCurrency.currency == elemToCurrency.currency)) {
            changeText(textNotunderstand, "talk")
        } else {
            return {
                elemFromCurrency: elemFromCurrency,
                elemToCurrency: elemToCurrency
            }
        }
    } else {
        changeText(textNotunderstand, "talk")
    }



}
//функція перевіряє чи значення число
function isNumber(value) {
    return !isNaN(value);
}

//змінює стиль в едемента
function dellNone(id) {
    let elem = document.getElementById(id);
    console.log(elem.style.display)
    elem.style.display = "block";
    
}

//таск 2
const myAccount = createInvestmentAccount(1000, 5);
 
function createInvestmentAccount (initialAmount, annualInterestRate) {
    let bodyDeposit = initialAmount;
    let percentInvestment = annualInterestRate;
    let profit = 0;
    function deposit(amount) {
        bodyDeposit += amount;
    }
    function withdraw(amount) {
        bodyDeposit-=amount
    }
    function calculateProfit(years){
        //A = P * (1 + r/n) ^ (nt); P - початкова сума, r- %, n - кількість нарахувань у рік, t - час  в роках
        const calculatedBalance = (bodyDeposit * Math.pow(1 + (percentInvestment/100) / (12 * years), 12 * years));
        profit = calculatedBalance - bodyDeposit;
        bodyDeposit = calculatedBalance;
    }
    function getAccountInfo(){
        console.log ("сума коштів на рахунку =>", bodyDeposit.toFixed(2));
        console.log ("процентна ставка  =>", annualInterestRate);
        console.log ("отриманий прибуток  =>", profit.toFixed(2));
    }
    return {
        deposit:deposit,
        withdraw:withdraw,
        calculateProfit:calculateProfit,
        getAccountInfo:getAccountInfo
    }
}

myAccount.deposit(300)
myAccount.withdraw(100)
myAccount.calculateProfit(1)
myAccount.getAccountInfo()
