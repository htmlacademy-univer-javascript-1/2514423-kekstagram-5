function checkTheString(string, maxLength) {
  if (string.length <= maxLength) {
    return string.length <= maxLength;
  }
}
// Cтрока короче 20 символов
checkTheString('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkTheString('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkTheString('проверяемая строка', 10); // false

function PalindrimeString(string) {
  const newString = string.toLowerCase();
  return newString === newString.split('').reverse().join('');
}
// Строка является палиндромом
PalindrimeString('топот'); // true
// Несмотря на разный регистр, тоже палиндром
PalindrimeString('ДовОд'); // true
// Это не палиндром
PalindrimeString('Кекс'); // false

function parseTime(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

function checkMeetingTime(startTime, endTime, meetingStart, meetingDuration) {
  const startMinutes = parseTime(startTime);
  const endMinutes = parseTime(endTime);
  const meetingStartMinutes = parseTime(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  if (meetingEndMinutes > endMinutes || meetingStartMinutes < startMinutes) {
    return false;
  }

  return meetingEndMinutes <= endMinutes && meetingStartMinutes >= startMinutes;
}

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120);     // true
checkMeetingTime('08:00', '14:30', '14:00', 90);  // false
checkMeetingTime('14:00', '17:30', '08:0', 90);  // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false
