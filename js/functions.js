function checkTheString(string, maxLength) {
  if (string.length <= maxLength) {
    return string.length <= maxLength;
  }
}
// Cтрока короче 20 символов
console.log(checkTheString('проверяемая строка', 20)); // true
// Длина строки ровно 18 символов
console.log(checkTheString('проверяемая строка', 18)); // true
// Строка длиннее 10 символов
console.log(checkTheString('проверяемая строка', 10)); // false

function PalindrimeString(string) {
  const newString = string.toLowerCase();
  return newString === newString.split('').reverse().join('')
}
// Строка является палиндромом
console.log(PalindrimeString('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(PalindrimeString('ДовОд')); // true
// Это не палиндром
console.log(PalindrimeString('Кекс'));  // false

