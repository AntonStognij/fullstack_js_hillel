
//події на вибір тарифу
document.addEventListener('mouseover', function (e) {
    let elem = e.target;
    if (elem.matches('.wrap-price .btn-oval')) {
        var parentElement = elem.closest(".wrap-price");
        parentElement.classList.add('active-block');
    }
});

document.addEventListener('mouseout', function (e) {
    let elem = e.target;
    if (elem.matches('.wrap-price .btn-oval')) {
        var parentElement = elem.closest(".wrap-price");
        removeClass(parentElement, 'active-block')
    }
})

//дії на переміщення фото
document.addEventListener('click', function (e) {
    let elem = e.target;
    if (elem.matches('.btn-left-right') || elem.matches('.btn-left-right span')) {
        let action = elem.getAttribute("data-action");
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
})

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

