addEventListener("DOMContentLoaded", (event) => {

    createSnow()
    choosePlanHover();
    moveComment();


    //дії на переміщення коментів
    function moveComment() {
        const arrButtons = document.querySelectorAll(".btn-left-right");
        const arrButtonsSpan = document.querySelectorAll(".btn-left-right span");
        [...arrButtons, ...arrButtonsSpan].forEach(moveElem);

        function moveElem(elem) {
            elem.addEventListener('click', actinOnClick)
        }

        function actinOnClick(event) {
            let action = this.getAttribute("data-action");
            let id = getId();
            if (action == "right") {
                if (id < 5) {
                    dellClassById(id, "active-block")
                    id++;
                    addClassById(id)

                }
            } else if (action == "left") {
                if (id > 1) {
                    dellClassById(id, "active-block");
                    id--;
                    addClassById(id)
                }
            }
            changeElem(action, id)
        }
    }


    //функція шукає активний елемент, повертаэ його id + видає клас
    function getId() {
        let elem = document.querySelector(".block-customers .active-block");
        return elem.id;
    }
    //функція видаляє клас з елемента
    function removeClass(elem, className) {
        if (elem) {
            elem.classList.remove(className);
        }

    }

    //функція додає клас по id
    function addClassById(id) {
        if (id) {
            let elem = document.getElementById(`${id}`);
            elem.classList.add('active-block');
        }

    }
    //функція видаляє клас по id
    function dellClassById(id, className) {
        if (id) {
            let elem = document.getElementById(`${id}`);
            removeClass(elem, className)
        }
    }

    //змінна для changeElem
    var option = false;
    //функція змінює елемент, коли потрібно
    function changeElem(btn, idElem) {
        let elemWrap = document.querySelector(".wrap");
        let coordsWrap = elemWrap.getBoundingClientRect();
        let elem = document.getElementById(`${idElem}`);
        let coordsElem = elem.getBoundingClientRect();
        let elemForChange = document.querySelector(".block-customers");
        let computedStyle = window.getComputedStyle(elemForChange);
        let gapValue = computedStyle.getPropertyValue('gap').replace("px", "");
        gapValue = +gapValue;
        if (btn == "right") {
            let x = (idElem * coordsElem.width) + ((idElem - 1) * gapValue)
            if (x > coordsWrap.width) {
                let res = coordsWrap.width - (idElem * coordsElem.width) - ((idElem - 1) * gapValue)
                elemForChange.style.position = "relative";
                elemForChange.style.left = `${res}px`;
                option = true;
            }
        } else if (btn == "left") {
            let x = elemForChange.style.left.replace("px", "");
            x = +x;
            if (coordsElem.x < coordsWrap.x) {
                if (option) {
                    let n = Math.floor(coordsWrap.width / (coordsElem.width + gapValue))
                    x = x - (coordsWrap.width - ((coordsElem.width * n) + (gapValue * n) + coordsElem.width));
                    option = false
                } else {
                    let res = x + gapValue + coordsElem.width;
                    x = res
                }
                elemForChange.style.position = "relative";
                elemForChange.style.left = `${x}px`;
            }

        }

    }


    //події на вибір тарифу
    function choosePlanHover() {

        const priceButtons = document.querySelectorAll(".wrap-price .btn-oval");
        [...priceButtons].forEach(choosePlan)


        function choosePlan(element) {
            const events = ['mouseover', 'mouseout'];
            events.forEach((eventName) => element.addEventListener(eventName, planOnMouseHandler))

        }

        function planOnMouseHandler(event) {
            const parentElement = event.target.closest(".wrap-price");
            parentElement.classList.toggle('active-block');
        }
    }

    function createSnow() {
        let iterationCount = 0;

        function intervalFunction() {
            iterationCount++;
            let count = getRandom(10, 20)
            for (let i = 0; i < count; i++) {
                createElem(getRandom(1, 95))
            }
            if (iterationCount === 4) {
                clearInterval(intervalId);
            }
        }
        const intervalId = setInterval(intervalFunction, 3000);

    }

    function createElem(left) {
        let arrClassName = ["snow-slow", "snow-normal", "snow-fast", "snow-very-slow", "snow-very-fast"]
        let elem = document.createElement("img");
        elem.setAttribute("src", "./img/snow.svg");
        elem.setAttribute("class", `snow ${arrClassName[getRandom(0, 6)]}`);
        elem.setAttribute("alt", "snow");
        elem.style.left = `${left}%`;
        document.body.appendChild(elem);
    }
    //отримуємо рандомне значення
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    }

});




