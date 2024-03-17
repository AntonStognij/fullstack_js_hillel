//[ I ] Wheater

const wheater = {
    "Monday": 20,
    "Tuesday": 10,
    "Wednesday": 5,
    "Thursday": -1,
    "Friday": 0,
    "Saturday": 35,
    "Sunday": 18,
    "getMaxTemperature": function () {
        let arr = Object.values(this).filter((element) => (typeof element != "function"))
        return Math.max(...arr)
    },
    "getMinTemperature": function () {
        let arr = Object.values(this).filter((element) => (typeof element != "function"))
        return Math.min(...arr)
    },
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case "string":
                let arrDay = Object.keys(this).filter((element) => (element.includes("day")))
                let strDay = arrDay.reduce(function (sum, element) {
                    return sum + `(${element.slice(0, 2)})-`;
                }, " ");
                return strDay.slice(0, strDay.length - 1);
            case "number":
                let arr = Object.values(this).filter((element) => (typeof element != "function"));
                let averageTemperature = arr.reduce(function (sum, element) {
                    return sum + element
                }, 0);
            return (averageTemperature/arr.length).toFixed(2)     
        }

    }
}

console.log("максимальна температура за тиждень =>",wheater.getMaxTemperature())
console.log("мінімальна температура за тиждень", wheater.getMinTemperature()) 
console.log("Дні тижня скорочені => ", String(wheater)) 
console.log("Середня температура => " , Number(wheater))

//[ II ] Library

function Library() {
    this.countId = 0
    //стор для книг
    this.allBooks = [],
    //стор для користувачів
    this.allUsers = [],
    //метод додає книгу
    this.addBook = function (book) {
        ++this.countId;
        book.id = this.countId;
        this.allBooks = [...this.allBooks, book]
    }
    //метод повертає книгу по id з базу
    this.returnBookById = function (id) {
    //перевіряємо чи є такий користувач в базі
    let book = this.allBooks.find((element) => element.id == id)
        if (book) {
           return book
        } else {
            console.log("Книга відсутня в базі")
        }
    }
    //метод шукає книгу по автору
    this.findBooksByAuthor = function (nameAuthor) {
        //перевіряємо чи є такий користувач в базі
        let book = this.allBooks.filter((element) => element.author.match(nameAuthor))
        let bookCanTake = book.filter((element) => element.status == "доступно")
        return {
            allVooksFound:book,
            availableBooks:bookCanTake
        }
    }
    //метод шукає книгу по назві
    this.findBooksByName = function (name) {
        //перевіряємо чи є такий користувач в базі
        let book = this.allBooks.filter((element) => element.name.match(name))
        let bookCanTake = book.filter((element) => element.status == "доступно")
        return {
            allVooksFound:book,
            availableBooks:bookCanTake
        }
    }
    //метод шукає доступні книги
    this.listAvailableBooks = function () {
        return this.allBooks.filter((element) => element.status == "доступно")
    }
}

function Book({ name, author, date, rating, status }) {
    this.name = name, //назва
    this.author = author //автор 
    this.date = date, //дата видання
    this.status = status, //стус книги
    this.rating = rating, //рейтинг
    this.countReviews = 0, //кількість оцінок
    this.arrRating = [] //масив з оцінками
    //метод додає рейтинг
    this.addRating = function (phoneUser, arrUser, rating) {
        //перевіряємо чи обєкті користувача була ця книга
        const checkUser = arrUser.find((element) => element.phone == phoneUser && element.allBooks.find((item) => item.id == this.id)) 
        if (checkUser) {
            //якщо була :
            this.countReviews++ //збільшуємолічильник
            this.arrRating.push(rating) //пушимо в масив оцінку
            //визначаємо середню оцінку
            let res = this.arrRating.reduce(function (sum, element) {
                return sum + element
            }, 0);
            this.rating = res/this.arrRating.length ; //ділимо суму оцінок
        } else {
            console.log("Ви ж не читали книгу, навіщо ставити оцінку?")
        }

    }
    //метод повертає рейтинг
    this.getAverageRating = function () {
      return this.rating
    }
}


function User({ name, phone, dateBirth, takeBooks, allBooks }) {
    this.name = name,//ім"я
    this.phone = phone //телефон
    this.dateBirth = dateBirth, //день народження
    this.takeBooks = takeBooks, //масив з книга які взяті і не повернуті
    this.allBooks = allBooks, //всі книги які брались користувачем
    //метод взяття книги
    this.borrowBook = function (arrBooks, arrUser, id) {
        //первіряємо статус книги
            let book = arrBooks.find(item => item.id == id && item.status == "доступно");
            if (book) {
                //якщо доступно:
                this.takeBooks = [...this.takeBooks, book] //додаємо в масив гниг на прочитанні
                this.allBooks = [...this.allBooks, book] //додаємо в масив усіх книг що брав користувач
                let indexBook = arrBooks.findIndex(item => item.id == id); //шукаємо індекс книги в масиві бібліотеки
                arrBooks[indexBook].status = "видано" //змінюємо статус книги
            } else {
                console.log("Нажаль ця книга у нас зараз недоступна, оберіть будь ласка іншу")
            }
        },
    // метод повернення книги
    this.returnBook = function (arrInLibrary, id) {
            let indexBook = this.takeBooks.findIndex(element => element.id == id);//перевіряємо чи книга яку здають є в користувача
            if (indexBook != -1){
                //якщо є
                this.takeBooks.splice(indexBook, 1) //видаляємо книгу
                let indexBookInLibrary = arrInLibrary.findIndex(element => element.id == id); //шукаємо індекс книги в масиві у бібліотеці
                arrInLibrary[indexBookInLibrary].status = "доступно" //змінюємо статус книги
            } 
        }
    //додає користувача в бузу бібліотеки
    this.addUserToDatabase = function (arrUser) {
        //перевіряємо чи є такий користувач в базі
        let checkUser = arrUser.find((element) => element.name == this.name && element.dateBirth == this.dateBirth)
        if (!checkUser) {
            arrUser.push(this)
        } else {
            console.log("Вже зареєстрований такий читач")
        }

    }

}

const library = new Library() //стоврюємо бібліотеку
//додаємо книги
library.addBook(new Book({  name: "Кульбабове вино", author: "Р. Бредбері", date: "2008", rating: 0, "status": "доступно", countReviews: 0 }))
library.addBook(new Book({  name: "На Західному фронті без змін", author: "Е. М. Ремарк", date: "2007", rating: 0, "status": "доступно", countReviews: 0 }))
library.addBook(new Book({  name: "Володар перснів", author: "Джон Р. Р. Толкін", date: "2002", rating: 0, "status": "доступно", countReviews: 0 }))
library.addBook(new Book({  name: "Три товариші", author: "Е. М. Ремарк", date: "1995", rating: 0, "status": "доступно", countReviews: 0 }))
//стоврюємо користувачів
let andriy = new User({ name: "Андій Кравченко", phone: "+380505683187", dateBirth: "19.07.1992", takeBooks: [], allBooks: [] })
let anton =  new User({ name: "Антон Стогній", phone: "+380635683187", dateBirth: "09.04.1992", takeBooks: [], allBooks: [] })
let jenia =  new User({ name: "Євген Стогній", phone: "+380965683187", dateBirth: "09.04.1992", takeBooks: [], allBooks: [] })
//додаємо користувачів в базу
andriy.addUserToDatabase(library.allUsers)
anton.addUserToDatabase(library.allUsers)
jenia.addUserToDatabase(library.allUsers)
andriy.borrowBook(library.allBooks, library.allUsers, 2) //Андрій бере книгу з ід 2
andriy.borrowBook(library.allBooks, library.allUsers, 1) //Андрій бере книгу з ід 1
andriy.returnBook(library.allBooks, 1);//Андрій повертає книгу 1
anton.borrowBook(library.allBooks, library.allUsers, 1) //Антон бере книгу з ід 1
const book = library.returnBookById(1); //знаходимо книгу з id 1
book.addRating("+380505683187", library.allUsers, 5) //користувач з телефоном +380505683187 ставить оцінку книзі 5
book.addRating("+380635683187", library.allUsers, 1) //користувач з телефоном +380635683187 ставить оцінку книзі 1
console.log( "рейтинг книги 'book' =>",book.getAverageRating()) 
console.log("Результати пошуку по автору",library.findBooksByAuthor("Антон")) 
console.log("Результати пошуку по назві",library.findBooksByName("Володар перснів")) 
console.log("Всі доступні книги в бібліотеці", library.listAvailableBooks(""))
console.log("Бібліотека =>", library)
