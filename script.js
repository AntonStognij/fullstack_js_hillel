let arrCounty = [
    {
        id: "1",
        name: "Україна",
        price: "500",
        currency: "$",
        stylesTop: "50%",
        stylesLeft: "84%"
    },
    {
        id: "2",
        name: "Італія",
        price: "1500",
        currency: "$",
        stylesTop: "70%",
        stylesLeft: "57%"
    },
    {
        id: "3",
        name: "Франція",
        price: "2500",
        currency: "$",
        stylesTop: "58%",
        stylesLeft: "35%"
    },
    {
        id: "4",
        name: "Іспанія",
        price: "3000",
        currency: "$",
        stylesTop: "75%",
        stylesLeft: "24%"
    },
    {
        id: "5",
        name: "Англія",
        price: "2000",
        currency: "$",
        stylesTop: "42%",
        stylesLeft: "28%"
    }
]


//запускаєм додаток
appTravels();


function appTravels() {
    setTimeout(() => askBudget(), 1500);
}

//запитує бюджет і запускає різні сценарії
function askBudget(text = "Це твій космічний консультат з подорожей. Вкажи скільки ти готовий витрати на подорож у розрахунку на одну людину в доларах?") {
    let budget = prompt(`${text}`)
    if (!budget) {
        let text = "Сподіваюсь помандруємо іншим разом! До зустрічі!"
        let wordsAstronaut = "До зустрічі! =)"
        alert(text)
        addClassByClass("circle", "active")
        changeText(wordsAstronaut, "words-astronaut")
    } else {
        if (!budget.match(/^\d+$/)) {
            textPrompt = `Мені потрібна лише цифра і я зможу тобі порадити чудову поїздку`;
            askBudget(textPrompt)
        } else {
            textPrompt = `Є! Дякую!`;
            alert(textPrompt);
            //відмальовуємо країни
            setTimeout(() => setСountries(arrCounty, budget), 1500);
            addClassByClass("circle", "active")
            let wordsAstronaut = "Привіт! Клікни на країну в яку б ти хотів поїхати, а я перевірю чи тобі вистачить грошей."
            changeText(wordsAstronaut, "words-astronaut")
        }
    };
}


//функція додає клас по className
function addClassByClass(classNameElem, classNameAdd) {
    if (classNameElem) {
        let elem = document.querySelectorAll(`.${classNameElem}`);
        elem.forEach(el => {
            el.classList.add(`${classNameAdd}`);
        })
    }
}

//функція видаляє клас по className
function removeClassByClass(classNameElem, classNameRemove) {
    if (classNameElem) {
        let elem = document.querySelectorAll(`.${classNameElem}`);
        elem.forEach(el => {
            el.classList.remove(`${classNameRemove}`);
        })
    }
}
//функція додає  клас по id
function addClassById(id, className) {
    if (id) {
        let elem = document.getElementById(`${id}`);
        elem.classList.add(`${className}`);
    }
}
//функція сторює елемент-країну
function createElemCountry(content, idElem, left, top, budget) {
    let elem = document.createElement(`div`);
    elem.innerHTML = `${content}`;
    let parent = document.getElementById("blok-img");
    elem.setAttribute("class", "country active-country");
    elem.setAttribute("id", `${idElem}`);
    elem.style.left = `${left}`;
    elem.style.top = `${top}`;
    elem.addEventListener("click", function (e) {
        removeClassByClass("country-ok", "country-ok");
        removeClassByClass("country-not", "country-not")
        var idElem = e.target.id;;
        let checkSummRes = checkSumm(budget, arrCounty, idElem)
        if (checkSummRes.res) {
            this.setAttribute("class", "country active-country country-ok");
            setTimeout(() => getNewPrice(checkSummRes.selectPrice, true), 1500);    
        } else {
            if (checkSummRes.arr.length > 0) {
                checkSummRes.arr.forEach(function (elem) {
                    addClassById(elem, "country-ok")
                });
            }
            this.setAttribute("class", "country active-country country-not");
        }

    });
    parent.appendChild(elem);
};
//функція сторює елементи країни з масиву
function setСountries(arr, budget) {
    arr.forEach(function (elem) {
        createElemCountry(elem.name, elem.id, elem.stylesLeft, elem.stylesTop, budget)
    });
};

//функція сторює елементи країни з масиву
function changeText(text, id) {
    if (id) {
        let elem = document.getElementById(`${id}`);
        elem.innerHTML = `${text}`;
    }
};
//перевіряємо бюджет
function checkSumm(summ, arr, id) {
    let arrNormCounry = [];
    for (let i = 0; i < arr.length; i++) {
        if (id == arr[i].id) {
            if (+summ >= arr[i].price) {
                let wordsAstronaut = "Ця країна нам по карману! А давай перевіримо, може вдасця поїхати дешевше!"
                changeText(wordsAstronaut, "words-astronaut")
                return {
                    res: true,
                    arr: [],
                    selectPrice: arr[i].price
                }
            }
        }
        if (+summ >= arr[i].price) {
            arrNormCounry.push(arr[i].id)
        }
        let wordsAstronaut = "Нажаль там задорого... Якщо вдасця знайти дешевше поїздки, то я покажу тобі де вони. Я підсвічу тобі їх зеленим!"
        changeText(wordsAstronaut, "words-astronaut")
    }
    return {
        res: false,
        arr: arrNormCounry,
        selectPrice: null
    }
}

function getNewPrice(oldPrice, start) {
    let textPromt;
    let promoCode;
    if (start) {
        textPromt = "Підкажи, ти має якийсь код знижки? Якщо так - вкажи його нижче!";
        promoCode = prompt(`${textPromt}`).trim();
    }
    textPromt = "Скільки осіб буде їхати? Вкажи числом кількість!";
    let countPeople = prompt(`${textPromt}`);
    if (!countPeople) {
        textPromt = "Добре, буду вважати що одна!";
        countPeople = 1;
        alert(textPromt)
        let res = checkingСonditions(oldPrice, promoCode, countPeople, 1000)
        changeText(res, "words-astronaut");
    } else if (!countPeople.match(/^\d+$/)) {
        getNewPrice(oldPrice, false)
    } else {
        let res = checkingСonditions(oldPrice, promoCode, countPeople, 1000)
        changeText(res, "words-astronaut");
    }

}

function checkingСonditions(oldPrice, promoCode, countPeople, discountAmount) {
    let text;
    let purchaseAmount = oldPrice * countPeople;
    let startAmount = purchaseAmount;
    switch (promoCode) {
        case 'NEWYEAR':
            purchaseAmount *= 0.8;
            text = "Ти маєш знижку по промокоду NEWYEAR (20%)"
            break;
        case 'BLACKFRIDAY':
            purchaseAmount *= 0.7;
            text = "Ти маєш знижку по промокоду BLACKFRIDAY (30%)"
            break;
        case 'SUMMERSALE':
            purchaseAmount *= 0.85;
            text = "Ти маєш знижку по промокоду SUMMERSALE (15%)"
            break;
        default:
            purchaseAmount *= 0.95;
            text = "Ти маєш знижку (5%)"
    }
    console.log(countPeople)
    if (countPeople >= 3) {
        purchaseAmount *= 0.95;
        text = text + " + в тебе ще є знижка за кількість людей (5%)"
    }
    if (+oldPrice > discountAmount) {
        purchaseAmount *= 0.9;
        text = text + " + в тебе ще є знижка за загальну суму витрат (10%)"
    }
    if (purchaseAmount < startAmount) {
        text = `${text}. От ти вже і зекономив! Замість ${startAmount}, тобі поїздка обійдеться в ${purchaseAmount}$. Вітаю!`
    } else {
        text = `Щось зі знижками тобі не пощастило... =(. Поїздка тобі обійдеться в ${purchaseAmount}$.  Сподіваюсь від подорожі ти отримаєш море задоволення!`
    }
    return text;
};