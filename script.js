//[ I ] Порахуй голосні!
function countVowels(str) {
    //зробив масив з голосними літерами, з яким буду звірятись
    let arrVowels = ["а","е","є","и","і","і","ї","о","у","ю","я","a","e","i","o","u","y", ]
    let count = 0; //додав зміну для підрахунку
    for (let char of str){
        let newChar = char.toLowerCase();//всі літери переводжу в ніжній регістр
        if (arrVowels.includes(newChar)){
            count++ //якщо є співпадіння додаю значення до підрахунку
        }
    }
    return count
}
console.log("I =>",countVowels("Hello World"))
console.log("I =>",countVowels("My dear WATSON!"))

//[ II ] Посунься!
function moveOver(arr, settings) {
    if (settings == "end"){
        let firstElem = arr.shift();// дістаємо елемент з початку
        arr.push(firstElem) //додаємо елемент до кінця
        return arr
    } else if (settings == "start"){
        let firstElem = arr.pop(); //дістаємо елемент з кінця
        arr.unshift(firstElem) //додаємо елемент на початок.
        return arr
    } else {
        return arr
    }
}
console.log("II =>",moveOver([1,2,3,4], 'end'))
console.log("II =>",moveOver([1,2,3,4], 'start'))

//[ III ] Знайди мене, якщо зможеш!
function findLongestWord(str) {
    let arrStr = str.split(" "); //робимо з рядка масив
    //сортуємо масив по довжині
    arrStr.sort(function (a, b) {
        if (a.length > b.length) {
          return 1;
        }
        if (a.length < b.length) {
          return -1;
        }
        return 0;
      })
      //додав умови по яким можна зрозуміти скільки коротких слів , щоб визначити кінцеву відповідь
    if ((arrStr?.[0].length == arrStr?.[1].length) && (arrStr?.[0].length != arrStr?.[arrStr.length-1].length)){
        return `longest: ${arrStr[arrStr.length-1]}, first shortest: ${arrStr[0]}`
    } else if ((arrStr?.[0].length != arrStr?.[1].length)){
        return `longest: ${arrStr[arrStr.length-1]}, shortest: ${arrStr[0]}`
    } else {
        return `longest and shortest: ${arrStr[0]}`
    }
}
console.log("III =>",findLongestWord("The quick brown fox jumped over the lazy dog"))
console.log("III =>",findLongestWord("a aa aaa aaaa"))
console.log("III =>",findLongestWord("tttt tttt tttt tttt"))
