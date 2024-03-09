//[ I ]
const books = [
    { title: 'Гаррі Поттер', author: 'Дж.К. Ролінг' },
    { title: '1984', author: 'Джордж Орвелл' },
    { title: 'Хоббіт', author: 'Дж.Р.Р. Толкієн' }
];

function getFirstBookByAuthor(arr, nameAutor) {
    return arr.find((el) => el.author == nameAutor);
}
console.log("I =>", getFirstBookByAuthor(books, 'Дж.Р.Р. Толкієн'));

//[ II ]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newArr = numbers.filter((el) => el % 2 == 0);
console.log("II =>", newArr)
//[ III ]
const prices = [100, 200, 300, 400, 500];
const newPrices = prices.map(el => {
    return (el * 1.1).toFixed(0);
});
console.log("III =>", newPrices)

//[ IV ]
const numbers2 = [45, 80, 32, 100, 105];
let isNum = numbers2.some(el => el > 100);
console.log("IV =>", isNum)

//[ V ]

const nums = [1, 2, 3, 4, 5, -6, 7];
let isAllPositive = nums.every(el => el > 0)
console.log("V =>", isAllPositive)

//[ VI ]
const sentences = ["Я люблю JavaScript", "Масиви це весело", "Програмування це круто"];
const newSentences = sentences.map(el => {
    return el.split(" ")[0]
})
console.log("VI =>", newSentences);

//[ [ VII ] ]
const sentences2 = ["JavaScript цікавий", "Масиви це корисно", "Вивчайте програмування щодня"];
const sumWords = sentences2.reduce(function (sum, el) {
    return sum + el.split(" ").length;
}, 0);
console.log(sumWords)

//[ VIII ] 

function createcOrderSystem() {
    //масив замовлень
    let orders = [];
    //ввів зміну щоб визначати id замовлення
    let countId = 0;
    //вирішив меню дадати і звідти брати дані у замовлення
    let arrMenu = [
        {
            id: "1",
            nameDish: "Жарена картопля",
            price: 50
        },
        {
            id: "2",
            nameDish: "Борщ",
            price: 70
        },
        {
            id: "3",
            nameDish: "Шашличок",
            price: 100
        },
        {
            id: "4",
            nameDish: "Веренички",
            price: 45
        }
    ];
    //функція додає ставу у меню
    function addDish(name, price, newId) {
        if (arrMenu.find(item => item.id == newId)) {
            console.log("Не унікальне id")
        } else if (name && price) {
            let objDish = {
                id: newId,
                nameDish: name,
                price: price
            }
            arrMenu.push(objDish)
        } else {
            console.log("Назва страви і ціна є обов'язковими. Перегляньте введені параметри і повторіть спробу")
        }

    }
    //функція видаляє страву з меню
    function removeDish(name) {
        let indexDellDish = arrMenu.findIndex(dish => dish.nameDish == name);
        if (indexDellDish != -1) {
            arrMenu.splice(indexDellDish, 1);
        } else {
            console.log("Страва відсутня в меню")
        }
    }
    //функція показує меню
    function getMenu() {
        console.log(arrMenu)
    }
    //функція додає замовлення, в ідеї офіціант в планшеті обирає меню , а в систему йде ід страви, щоб зручніше було з ним працювати
    function addOrder(dishId, table) {
        const dishIdStr = dishId.replace(/\s+/g, '');
        const dishIdArr = dishIdStr.split(",")
        let dishesOrder = arrMenu.filter((el) => dishIdArr.includes(el.id))
        if (dishesOrder.length) {
            let countPrice = dishesOrder.reduce(function (sum, el) {
                return sum + el.price;
            }, 0);

            let order = {
                id: ++countId,
                table: table,
                dishes: dishesOrder,
                amount: countPrice,
                status: "новий"
            }
            orders.push(order);
        }
    }

    //отримує всі замовлення в системі
    function getOrders() {
        console.log(orders)
    }
    //функція підраховує вартість замовлення по столу
    function getTotalAmount(tableNumber) {
        let amount = orders.reduce(function (sum, el) {
            if (el.table == tableNumber && el.status == "видано") {
                return sum + el.amount;
            } else {
                return sum
            }
        }, 0);
        return amount
    }
    //функція змінює статус
    function changeOrderStatus(ordersId, status) {
        let indexOrder = orders.findIndex(order => order.id == ordersId)
        orders[indexOrder].status = status;
    }
    //видаляє замовлення
    function cancelOrder(orderId) {
        let indexDellOrder = orders.findIndex(order => order.id == orderId);
        if (indexDellOrder != -1) {
            orders.splice(indexDellOrder, 1);
        }
    }


    return {
        addDish: addDish,
        removeDish: removeDish,
        getMenu: getMenu,
        addOrder: addOrder,
        getOrders: getOrders,
        getTotalAmount: getTotalAmount,
        changeOrderStatus: changeOrderStatus,
        cancelOrder: cancelOrder
    }

}

const myRestaurant = createcOrderSystem();
myRestaurant.addOrder("1,2,3", 1)
myRestaurant.addOrder("1,2,3", 2)
myRestaurant.addOrder("1,2,3", 1)
myRestaurant.getOrders()
myRestaurant.changeOrderStatus(1, "видано")
myRestaurant.getOrders()
myRestaurant.addOrder("4", 1)
myRestaurant.getOrders()
myRestaurant.cancelOrder(2)
myRestaurant.getOrders()
myRestaurant.changeOrderStatus(3, "видано")
console.log(myRestaurant.getTotalAmount(1))


