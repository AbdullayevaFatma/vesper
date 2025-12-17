export const RESTAURANT_CONFIG = {
  totalTables: 20,
  maxCapacityPerTable: 6,
};

export function isValidEmail(email) {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}

export function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

export function isPastDate(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const inputDate = new Date(dateString);
  inputDate.setHours(0, 0, 0, 0);
  
  return inputDate < today;
}

export function isValidTime(time) {
  const validTimes = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
    '23:00', '23:30', '00:00', '00:30', '01:00'
  ];
  return validTimes.includes(time);
}

