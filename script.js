
//використав setTimeout щоб сторінка провантажилась і ми не дивились на білий екран
setTimeout(() => startGame(), 1000);

//саму гру поділив на етапи-функції, бо по логіці хоті щоб промальовувались елементи послідовно, а повідомлення зупиняють код
function startGame() {
    let text = `Привіт, друже! В тебе є унікальна можливість зіграти зі мною у гру "Вгадай число". Правила дуже прості - я загадую число від 1 до 10 і ти маєш його вгадати. 
    \nЯкщо вгадаєш, то зможеш прийняти участь в інтерактивній історії, де від твоїх рішень залежить фінал історії, ну а якщо ні - зможеш колись спробувати ще! I так поїхали!`;
    alert(text);
    text = `Зіграєш зі мною?`;
    let resChoice = confirm(text);
    if (resChoice) {
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        let elem = document.getElementById('number');
        elem.innerHTML = randomNumber;
        setTimeout(() => game(randomNumber), 500);
    } else {
        text = `Можливо в інший раз. До побачення!`;
        alert(text);
        createImg("./img/sad.svg", "img-sad", "sad", "place-for-text")
    }


    function game(numberGame) {
        let textPrompt = `Як думаєш, яке число я загадав?`;
        let namberUser = prompt(textPrompt);
        if(!namberUser){
            text = `Можливо в інший раз дограєш. До побачення!`;
            alert(text);
        } else {
            if (!namberUser.match(/^\d+$/)) {
                textPrompt = `Ой, щось не те ти вводиш... Числа - це щось з математики`;
                alert(textPrompt);
                game(numberGame);
            } else {
                if (namberUser == numberGame) {
                    textPrompt = `Супер! Ти вгадав! Поїхали далі!`;
                    alert(textPrompt);
                    addClass("blur", "without-blur");
                    setTimeout(() => tellStory(), 2000);
                } else {
                    textPrompt = `Нажаль я загадав інше слово...`;
                    alert(textPrompt);
                    addClass("blur", "without-blur");
                    createImg("./img/sad.svg", "img-sad", "sad", "place-for-text")
                }
            }
        }
        
    }


}

//функція починає розповідати історію
function tellStory() {
    dellElem("title");
    dellElem("blur");
    dellElem("number");
    addClass("place-for-text", "story");
    let textH1 = 'Загадкова Історія Скайвокера в епоху Лицарства';
    createElemText("h1", "place-for-text", textH1);
    let textP = `У королівстві, де легенди оживають, молодий оруженосець Люк мріє стати рицарем. Він служить Сір Роберту, рицарю, який вважає, що честь — це найвища добродійність.
    <br>Сір Роберт ставить перед Люком випробування, що визначить його долю.`;
    createElemText("p", "place-for-text", textP);
    createImg("./img/Skywalker.png", "img-skywalker", "Skywalker", "main-block")
    setTimeout(() => actionStore(), 1000);
    let textConfirm = '';
    let textTrue = '';
    let textFalse = '';
    let count = "";

    function actionStore() {
        let textAction = `1. Вирушити в ліс\n2. Піти через село\n3. Відправитися до замку дракона`;
        let action = prompt(textAction)
        if (action == 1) {
            count += 1;
            textP = `Люк зустрічає чарівницю, що пропонує зілля сили в обмін на обіцянку.`
            createElemText("p", "place-for-text", textP);
            textConfirm = `Погодитись на пропозицію чарівниці?\n 
            1 - Так
            2 - Ні`;
            textTrue = `Люк отримує надприродну силу, але залишається в боргу перед чарівницею.`;
            textFalse = `Люк вибирає чесний шлях, відмовляючись від легкого успіху.`
            setTimeout(() => actionFirstPart(textConfirm, textTrue, textFalse), 1000);
        } else if (action == 2) {
            count += 2;
            textP = `Люк допомагає селянам, які потерпають від голови розбійників.`
            createElemText("p", "place-for-text", textP);
            textConfirm = `Допомогти силою чи знайти мирне рішення?\n 
            1 - Допомогти силою
            2 - Знайти мирне рішення `;
            textTrue = `Люк використовує силу для захисту селян, але отримує поранення.`;
            textFalse = `Люк вирішує конфлікти миром, заробляючи повагу як лідера.`
            setTimeout(() => actionFirstPart(textConfirm, textTrue, textFalse), 1000);
        } else if (action == 3) {
            count += 3;
            textP = `Люк вирішує випробувати себе, викликаючи дракона на бій.`
            createElemText("p", "place-for-text", textP);
            textConfirm = `Що робимо з драконом?\n 
            1 - Бій з драконом
            2 - Спроба перемовин`;
            textTrue = `Люк гине, але його вчинок вважається героїчним.`;
            textFalse = `Люк дізнається, що дракон не хоче воювати, і вони досягають миру.`
            setTimeout(() => actionFirstPart(textConfirm, textTrue, textFalse, "1"), 1000);
        } else if (!action) {
            alert("На жаль, наша історія залишиться незакінченою... Сподіваюь продовжимо наступного разу =)");
        } else {
            alert("Обери номер з вказаних варіантів");
            actionStore();
        }

        function actionFirstPart(text, textTrue, textFalse, off = false) {
            let resChoice = prompt(text);
            if (off != resChoice) {
                if (resChoice == 1) {
                    count += 1;
                    createElemText("p", "place-for-text", textTrue);
                    setTimeout(() => actionSecondPart(), 1000);

                } else if (resChoice == 2) {
                    count += 2;
                    createElemText("p", "place-for-text", textFalse);
                    setTimeout(() => actionSecondPart(), 1000);
                } else {
                    alert("Обери номер з вказаних варіантів");
                    actionFirstPart(textConfirm, textTrue, textFalse, "1")
                }
            } else {
                createElemText("p", "place-for-text", textTrue);
                alert("Нажаль Люк помер =(");
            }


            function actionSecondPart() {
                textP = `Після повернення з подорожей Люка викликають на турнір.`;
                createElemText("p", "place-for-text", textP);
                setTimeout(() => promtForSecondPart(), 1000);

                function promtForSecondPart() {
                    textAction = `1. Боротьба за честь\n2. Допомога іншому учаснику\n3. Відмова від бою`;
                    action = prompt(textAction);
                    if (action == 1) {
                        count += 1;
                        textP = `Люк демонструє свої навички, здобуваючи повагу.`
                        createElemText("p", "place-for-text", textP);
                        setTimeout(() => actionThreePart(), 1000);
                    } else if (action == 2) {
                        count += 2;
                        textP = `Люк допомагає пораненому рицарю, показуючи своє серце.`
                        createElemText("p", "place-for-text", textP);
                        setTimeout(() => actionThreePart(), 1000);
                    } else if (action == 3) {
                        count += 3;
                        textP = `Люк відмовляється боротися, стверджуючи, що справжній рицар знає, коли не варто воювати.`
                        createElemText("p", "place-for-text", textP);
                        setTimeout(() => actionThreePart(), 1000);
                    } else if (!action) {
                        alert("На жаль, наша історія залишиться незакінченою... Сподіваюь продовжимо наступного разу =)");
                    } else {
                        alert("Обери номер з вказаних варіантів");
                        promtForSecondPart();
                    }
                }

                function actionThreePart() {
                    textP = `Король, вражений діями Люка, пропонує йому останнє завдання.`;
                    createElemText("p", "place-for-text", textP);
                    setTimeout(() => promtForThreedPart(), 1000);
                    function promtForThreedPart(){
                        textAction = `1. Захистити королівство\n2. Пошук зниклої реліквії\n`;
                        action = prompt(textAction);
                        if (action == 1) {
                            count += 1;
                            textP = `Люк веде війська проти ворога, демонструючи свою відвагу`
                            createElemText("p", "place-for-text", textP);
                            getRes();
                        } else if (action == 2) {
                            count += 2;
                            textP = `Люк вирушає за древньою реліквією, що може врятувати королівство.`
                            createElemText("p", "place-for-text", textP);
                            getRes()
                        } else if (!action) {
                            alert("На жаль, наша історія залишиться незакінченою... Сподіваюь продовжимо наступного разу =)");
                        } else {
                            alert("Обери номер з вказаних варіантів");
                            actionThreePart();
                        }
                    }
                    //функція дивиться які рішення приймались по ходу
                    function getRes(){
                        if (count.match(/^121/)){
                            textP = `Люк стає рицарем, відомим своєю чесністю та мужністю, обираючи шлях служіння королівству.`
                            alert(textP);
                            createElemText("p", "place-for-text", textP);
                        } else if (count.match(/^223/)){
                            textP = `Люк залишає турнір, стаючи захисником селян і прикладом для інших, що справжня сила криється в мудрості та співчутті.`
                            alert(textP);
                            createElemText("p", "place-for-text", textP);
                        } else if (count.match(/^3212/)||count.match(/^3222/)||count.match(/^3232/)){
                            textP = `Люк доводить, що можна знайти мир навіть із драконами, і врятувати королівство без насильства, стаючи легендою.`
                            alert(textP);
                            createElemText("p", "place-for-text", textP);
                        } else {
                            textP = `Люк красавчик! І жив довго та щасливо! =)`
                            alert(textP);
                            createElemText("p", "place-for-text", textP);
                        }
                        
                    }
                }
            }

        }
    }
}






//функція додає клас
function addClass(id, nameClass) {
    let elem = document.getElementById(id);
    elem.classList.add(nameClass);
}
//видяляє елемент
function dellElem(id) {
    let elem = document.getElementById(id);
    elem.remove();
}

//функція створює елемент
function createElemText(type, idParent, text) {
    let parent = document.getElementById(idParent);
    let elem = document.createElement(type);
    elem.innerHTML = text;
    parent.appendChild(elem);
}

function createImg(url, className, alt, idParent) {
    let parent = document.getElementById(idParent);
    let elem = document.createElement("img");
    elem.setAttribute("src", url);
    elem.setAttribute("class", className);
    elem.setAttribute("alt", alt);
    parent.appendChild(elem);
}








