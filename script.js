//[ I ] Порахуй голосні!
function countVowels(str) {
    let arrVowels = ["а","е","є","и","і","і","ї","о","у","ю","я","a","e","i","o","u","y", ]
    let count = 0;
    for (let char of str){
        let newChar = char.toLowerCase();
        if (arrVowels.includes(newChar)){
            count++
        }
    }
    return count
}
console.log("I =>",countVowels("Hello World"))
console.log("I =>",countVowels("My dear WATSON!"))

//[ II ] Посунься!
function moveOver(arr, settings) {
    if (settings == "end"){
        let firstElem = arr.shift();
        arr.push(firstElem)
        return arr
    } else if (settings == "start"){
        let firstElem = arr.pop();
        arr.unshift(firstElem)
        return arr
    } else {
        return arr
    }
}
console.log("II =>",moveOver([1,2,3,4], 'end'))
console.log("II =>",moveOver([1,2,3,4], 'start'))

//[ III ] Знайди мене, якщо зможеш!
function findLongestWord(str) {
    let arrStr = str.split(" ");
    //змінюємо порядок в масиві
    arrStr.sort(function (a, b) {
        if (a.length > b.length) {
          return 1;
        }
        if (a.length < b.length) {
          return -1;
        }
        return 0;
      })
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
